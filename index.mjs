import { exec } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
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

try {
  await execAsync(
    'git config --global user.email "matthewjameshamlin@gmail.com"',
  );
  await execAsync("git config --global user.name 'Matt Hamlin'");

  await execAsync("git add .", { cwd: "./" });
  await execAsync("git commit -m 'chore: download build artifacts'", {
    cwd: "./",
  });
  await execAsync("git push -u origin main");
} catch (e) {
  console.error("Failed to create and push commit", e);
}

console.log("Publishing artifacts to NPM!");

// find the allowlisted packages from `publishPackages` within `./${commit}`
// update their `name` field to be `@matthamlin/${existingPackageName}`
// and then run `npm publish` for each of them

let publishPackages = ["react-server-dom-esm"];

let scope = "@matthamlin";

for (let packageName of publishPackages) {
  let packagePath = path.join("./", commit, "oss-experimental", packageName);
  let packageJsonPath = path.join(packagePath, "package.json");
  let packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  packageJson.name = `${scope}/${packageName}`;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  await execAsync(`npm publish --access public`, { cwd: packagePath });
}

// for (let packageName of publishPackages) {
//   let packagePath = path.join("./", commit, packageName);
// }
