import { exec } from "node:child_process";
import { promisify } from "node:util";
import { downloadBuildArtifacts } from "./download-build-artifacts.mjs";

const execAsync = promisify(exec);

console.log("Starting Script...");

console.log("Downloading build artifacts...");
await downloadBuildArtifacts("main", "experimental");

console.log("Downloaded build artifacts!");

console.log("Committing build artifacts...");
await execAsync("git add .", { cwd: "./" });
await execAsync("git commit -m 'chore: download build artifacts'", {
  cwd: "./",
});
await execAsync("git push -u origin main");
