import { exec } from "node:child_process";
import { promisify } from "node:util";
import {
  OWNER,
  REPO,
  downloadBuildArtifacts,
} from "./download-build-artifacts.mjs";

const execAsync = promisify(exec);

console.log("Starting Script...");

let commitRes = await execAsync(
  `git ls-remote https://github.com/${OWNER}/${REPO}.git refs/heads/main`,
);
let commit = commitRes.stdout.split("\t")[0];
let label = `commit ${commit}`;
console.log(`Downloading artifacts from GitHub for ${label}...`);

await downloadBuildArtifacts(commit, "experimental");

console.log("Downloaded build artifacts!");

console.log("Committing build artifacts...");

await execAsync(
  'git config --global user.email "matthewjameshamlin@gmail.com"',
);
await execAsync("git config --global user.name 'Matt Hamlin'");

await execAsync("git add .", { cwd: "./" });
await execAsync("git commit -m 'chore: download build artifacts'", {
  cwd: "./",
});
await execAsync("git push -u origin main");
