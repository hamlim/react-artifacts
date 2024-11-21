import { exec as baseExec } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { promisify } from "node:util";

let exec = promisify(baseExec);

if (process.env.GH_TOKEN == null) {
  console.log(`{error Expected GH_TOKEN to be provided as an env variable}`);
  process.exit(1);
}

let OWNER = "facebook";
let REPO = "react";
let WORKFLOW_ID = "runtime_build_and_test.yml";
let GITHUB_HEADERS = `
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer ${process.env.GH_TOKEN}" \
  -H "X-GitHub-Api-Version: 2022-11-28"`.trim();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getWorkflowRun(commit) {
  let res = await exec(
    `curl -L ${GITHUB_HEADERS} https://api.github.com/repos/${OWNER}/${REPO}/actions/workflows/${WORKFLOW_ID}/runs?head_sha=${commit}&branch=main&exclude_pull_requests=true`,
  );

  let json = JSON.parse(res.stdout);
  let workflowRun;
  if (json.total_count === 1) {
    workflowRun = json.workflow_runs[0];
  } else {
    workflowRun = json.workflow_runs.find(
      (run) => run.head_sha === commit && run.head_branch === "main",
    );
  }

  if (workflowRun == null || workflowRun.id == null) {
    console.log(
      `{error The workflow run for the specified commit (${commit}) could not be found.}`,
    );
    process.exit(1);
  }

  return workflowRun;
}

async function getArtifact(workflowRunId, artifactName) {
  let res = await exec(
    `curl -L ${GITHUB_HEADERS} https://api.github.com/repos/${OWNER}/${REPO}/actions/runs/${workflowRunId}/artifacts?per_page=100&name=${artifactName}`,
  );

  let json = JSON.parse(res.stdout);
  let artifact;
  if (json.total_count === 1) {
    artifact = json.artifacts[0];
  } else {
    artifact = json.artifacts.find(
      (_artifact) => _artifact.name === artifactName,
    );
  }

  if (artifact == null) {
    console.log(
      `{error The specified workflow run (${workflowRunId}) does not contain any build artifacts.}`,
    );
    process.exit(1);
  }

  return artifact;
}

async function processArtifact(artifact, releaseChannel, commit) {
  // Download and extract artifact
  let cwd = process.cwd();
  await exec(`rm -rf ./build`, { cwd });
  await exec(`rm -rf ./a.zip`, { cwd });
  await exec(`rm -rf ./build.tgz`, { cwd });
  await exec(
    `curl -L ${GITHUB_HEADERS} ${artifact.archive_download_url} \
              > a.zip && unzip a.zip -d . && rm a.zip build2.tgz && tar -xvzf build.tgz && rm build.tgz`,
    {
      cwd,
    },
  );

  if (existsSync(join(cwd, commit))) {
    // if we've already processed this commit, skip
    console.log(`{info Already processed commit: ${commit}}`);
    return;
  }

  await exec(`mv ./build ./${commit}`, { cwd });

  if (!existsSync(join(cwd, commit))) {
    await exec(`mkdir ./${commit}`, { cwd });
  } else {
    await exec(`rm -rf ./${commit}/node_modules`, { cwd });
  }
  let sourceDir;
  // TODO: Rename release channel to `next`
  if (releaseChannel === "stable") {
    sourceDir = "oss-stable";
  } else if (releaseChannel === "experimental") {
    sourceDir = "oss-experimental";
  } else if (releaseChannel === "rc") {
    sourceDir = "oss-stable-rc";
  } else if (releaseChannel === "latest") {
    sourceDir = "oss-stable-semver";
  } else {
    console.error(`Internal error: Invalid release channel: ${releaseChannel}`);
    process.exit(releaseChannel);
  }
  await exec(`cp -r ./${commit}/${sourceDir} ./${commit}/node_modules`, {
    cwd,
  });
}

async function downloadArtifactsFromGitHub(_commit, releaseChannel) {
  let workflowRun;
  let retries = 0;

  let commitRes = await exec(
    `git ls-remote https://github.com/${OWNER}/${REPO}.git refs/heads/main`,
  );
  let commit = commitRes.stdout.split("\t")[0];

  // wait up to 10 mins for build to finish: 10 * 60 * 1_000) / 30_000 = 20
  while (retries < 20) {
    workflowRun = await getWorkflowRun(commit);
    if (typeof workflowRun.status === "string") {
      switch (workflowRun.status) {
        case "queued":
        case "in_progress":
        case "waiting": {
          retries++;
          console.log(`Build still in progress, waiting 30s...`);
          await sleep(30_000);
          break;
        }
        case "completed": {
          if (workflowRun.conclusion === "success") {
            let artifact = await getArtifact(
              workflowRun.id,
              "artifacts_combined",
            );
            await processArtifact(artifact, releaseChannel, commit);
            return;
          }
          console.log(
            `{error Could not download build as its conclusion was: ${workflowRun.conclusion}}`,
          );
          process.exit(1);
          break;
        }
        default: {
          console.log(
            `{error Unhandled workflow run status: ${workflowRun.status}}`,
          );
          process.exit(1);
        }
      }
    } else {
      retries++;
      console.log(
        `{error Expected workflow run status to be a string, got: ${workflowRun.status}. Retrying...}`,
      );
    }
  }

  console.log(
    `{error Could not download build from GitHub. Last workflow run: }

${workflowRun != null ? JSON.stringify(workflowRun, null, "\t") : workflowRun}`,
  );
  process.exit(1);
}

async function downloadBuildArtifacts(commit, releaseChannel) {
  let label = `commit ${commit}`;
  console.log(`Downloading artifacts from GitHub for ${label}...`);
  return downloadArtifactsFromGitHub(commit, releaseChannel);
}

export { downloadBuildArtifacts };
