import fs from "fs";
import process from "process";
import { resolveAbsolutePath } from "../absolutePath.js";

export const read = async (fileToRead) => {
  const absolutePath = resolveAbsolutePath(fileToRead);
  const stream = fs.createReadStream(absolutePath, "utf8");

  stream.on("data", (chunk) => {
    console.log(chunk);
  });

  stream.on("error", () => {
    console.log("Operation failed");
  });

  stream.on("close", () => {
    const currentDir = process.cwd();
    console.log(`You are currently in ${currentDir}`);
  });
};
