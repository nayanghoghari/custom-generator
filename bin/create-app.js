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

fs.copy(currentDir, targetDir)
  .then(() => console.log(`Successfully created project at ${targetDir}`))
  .catch((err) => console.error(err));
