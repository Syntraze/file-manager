import { list } from "./fs/list.js";
import { read } from "./fs/read.js";
import { create } from "./fs/create.js";
import { rename } from "./fs/rename.js";
import { remove } from "./fs/delete.js";
import { copy } from "./fs/copy.js";
import { currentDirectory } from "./currentDirectory.js";
import { parseArguments } from "./parseArguments.js";
import readline from "readline";
import process from "process";
import { changeFolder } from "./fs/changeFolder.js";
import { compress } from "./compression/compress.js";
import { decompress } from "./compression/decompress.js";
import { osFunc, changeToHomeDirectory } from "./os/os.js";
import { calculateHash } from "./hash/hash.js"; 
import { executeSafely, handleInvalidArgs } from "./utils.js"; 
const username =
  process.argv.find((arg) => arg.startsWith("--username="))?.split("=")[1] ||
  "Guest";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(`Welcome! You are in File Manager, ${username}!`);
changeToHomeDirectory();
currentDirectory();

rl.on("line", async (inputRaw) => {
  const input = inputRaw.trim();
  const args = parseArguments(input);

  if (input === ".exit") {
    console.log(`Thank you for using File Manager, ${username}!`);
    rl.close();
    return;
  }

  if (input === "up") {
    changeFolder("up");
    return currentDirectory();
  }

  if (input.startsWith("cd ")) {
    return args.length !== 1
      ? handleInvalidArgs("Please provide a valid directory.")
      : (changeFolder(args[0]), currentDirectory());
  }

  if (input === "ls") {
    return executeSafely(async () => {
      const files = await list();
      console.log(files);
      currentDirectory();
    }, "Unable to list files.");
  }

  if (input.startsWith("rm ")) {
    return args.length !== 1
      ? handleInvalidArgs("Please provide a valid file to remove.")
      : executeSafely(async () => {
          const result = await remove(args[0]);
          console.log(result);
          currentDirectory();
        }, "Unable to remove the file.");
  }

  if (input.startsWith("cat ")) {
    return args.length !== 1
      ? handleInvalidArgs("Please provide a valid file to read.")
      : read(args[0]);
  }

  if (input.startsWith("add ")) {
    return args.length !== 1
      ? handleInvalidArgs("Please provide a valid file name to create.")
      : create(args[0]);
  }

  if (input.startsWith("cp ")) {
    return args.length !== 2
      ? handleInvalidArgs("Please provide source and destination.")
      : executeSafely(async () => {
          await copy(args[0], args[1]);
          currentDirectory();
        }, "Unable to copy the file.");
  }

  if (input.startsWith("mv ")) {
    return args.length !== 2
      ? handleInvalidArgs("Please provide source and destination.")
      : executeSafely(async () => {
          await copy(args[0], args[1]);
          await remove(args[0]);
          currentDirectory();
        }, "Unable to move the file.");
  }

  if (input.startsWith("rn ")) {
    return args.length !== 2
      ? handleInvalidArgs("Please provide old and new file names.")
      : executeSafely(async () => {
          const result = await rename(args[0], args[1]);
          console.log(result);
          currentDirectory();
        }, "Unable to rename the file.");
  }

  if (input.startsWith("hash ")) {
    return args.length !== 1
      ? handleInvalidArgs("Please provide a single file name.")
      : executeSafely(async () => {
          const hash = await calculateHash(args[0]);
          console.log(hash);
          currentDirectory();
        }, "Unable to calculate file hash.");
  }

  if (input.startsWith("compress ")) {
    return args.length !== 2
      ? handleInvalidArgs("Please provide source and destination.")
      : executeSafely(async () => {
          await compress(args[0], args[1]);
          console.log("File compressed successfully.");
        }, "Unable to compress the file.");
  }

  if (input.startsWith("decompress ")) {
    return args.length !== 2
      ? handleInvalidArgs("Please provide source and destination.")
      : executeSafely(async () => {
          await decompress(args[0], args[1]);
          console.log("File decompressed successfully.");
        }, "Unable to decompress the file.");
  }

  if (input.startsWith("os ")) {
    return args.length !== 1
      ? handleInvalidArgs("Please provide a valid OS parameter.")
      : executeSafely(async () => {
          const result = await osFunc(args[0]);
          console.log(result);
          currentDirectory();
        }, "Unable to execute OS command.");
  }

  console.log("Invalid command. Please try again.");
});

rl.on("SIGINT", () => {
  console.log(`Thank you for using File Manager, ${username}!`);
  rl.close();
});
