#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");

const targetDir = process.argv[2];

if (!targetDir) {
  console.error("Please specify the target directory");
  console.error("Usage: create-app <target-directory>");
  process.exit(1);
}

const currentDir = path.join(__dirname, "../");

const copyFiles = async () => {
  // Get list of files and directories in the template directory
  const filesToCopy = await fs.readdir(currentDir);

  // Filter out files or directories you want to exclude
  const filesToExclude = ["bin",".env", "node_modules"];

  for (let file of filesToCopy) {
    if (!filesToExclude.includes(file)) {
      const sourceFile = path.join(currentDir, file);
      const targetFile = path.join(targetDir, file);
      await fs.copy(sourceFile, targetFile);
    }
  }

  console.log(`Successfully created project at ${targetDir}`);
};

copyFiles();
