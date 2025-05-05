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
import { osFunc } from "./os/os.js";
import { changeToHomeDirectory } from "./os/os.js";
const usernameArg = process.argv.find((arg) => arg.startsWith("--username="));
const username = usernameArg ? usernameArg.split("=")[1] : "Guest";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log(`Welcome! You are in File Manager, ${username}!`);
changeToHomeDirectory();
currentDirectory();

rl.on("line", async (command) => {
  const input = command.trim();
  const args = parseArguments(input);

  if (input === ".exit") {
    console.log(`Thank you for using File Manager, ${username}!`);
    rl.close();
    return;
  }

  switch (true) {
    case input === "up":
      changeFolder("up");
      currentDirectory();
      break;

    case input.startsWith("cd "):
      if (args.length !== 1) {
        console.log("Invalid input. Please provide a valid directory.");
      } else {
        changeFolder(args[0]);
        currentDirectory();
      }
      break;

    case input === "ls":
      try {
        const files = await list();
        console.log(files);
        currentDirectory();
      } catch {
        console.log("Operation failed. Unable to list files.");
      }
      break;

    case input.startsWith("rm "):
      if (args.length !== 1) {
        console.log("Invalid input. Please provide a valid file to remove.");
      } else {
        try {
          const result = await remove(args[0]);
          console.log(result);
          currentDirectory();
        } catch {
          console.log("Operation failed. Unable to remove the file.");
        }
      }
      break;

    case input.startsWith("cat "):
      if (args.length !== 1) {
        console.log("Invalid input. Please provide a valid file to read.");
      } else {
        read(args[0]);
      }
      break;

    case input.startsWith("add "):
      if (args.length !== 1) {
        console.log(
          "Invalid input. Please provide a valid file name to create."
        );
      } else {
        create(args[0]);
      }
      break;

    case input.startsWith("cp "):
      if (args.length !== 2) {
        console.log("Invalid input. Please provide source and destination.");
      } else {
        try {
          await copy(args[0], args[1]);
          currentDirectory();
        } catch {
          console.log("Operation failed. Unable to copy the file.");
        }
      }
      break;

    case input.startsWith("mv "):
      if (args.length !== 2) {
        console.log("Invalid input. Please provide source and destination.");
      } else {
        try {
          await copy(args[0], args[1]);
          await remove(args[0]);
          currentDirectory();
        } catch {
          console.log("Operation failed. Unable to move the file.");
        }
      }
      break;

    case input.startsWith("rn "):
      if (args.length !== 2) {
        console.log("Invalid input. Please provide old and new file names.");
      } else {
        try {
          const result = await rename(args[0], args[1]);
          console.log(result);
          currentDirectory();
        } catch {
          console.log("Operation failed. Unable to rename the file.");
        }
      }
      break;

    case input.startsWith("hash "):
      try {
        if (args.length > 1) {
          console.log("Invalid input. Please provide a single file name.");
        } else {
          const pathToFile = args[0];
          const hash = await calculateHash(pathToFile);
          console.log(hash);
          currentDirectory();
        }
      } catch (err) {
        console.log("Operation failed. Unable to rename the file.");
      }
      break;

    case input.startsWith("compress "):
      (async () => {
        try {
          if (args.length > 2) {
            console.log(
              "Invalid input. Please provide source and destination."
            );
          } else {
            const pathToFile = args[0];
            const pathToDestination = args[1];
            let dfg=compress(pathToFile, pathToDestination);
            console.log("File compressed successfully.");
          }
        } catch (err) {
          console.log("Operation failed. Unable to compress the file.");
        }
      })();
      break;

    case input.startsWith("decompress "):
      (async () => {
        try {
          if (args.length > 2) {
            console.log(
              "Invalid input. Please provide source and destination."
            );
          } else {
            const pathToFile = args[0];
            const pathToDestination = args[1];
            let ddg = await decompress(pathToFile, pathToDestination);
            console.log("File decompressed successfully.");
          }
        } catch (err) {
          console.log("Operation failed. Unable to decompress the file.");
        }
      })();
      break;

    case input.startsWith("os "):
      (async () => {
        try {
          if (args.length > 1) {
            console.log("Invalid input. Please provide a valid OS parameter.");
          } else {
            const parameter = args[0];
            const osCommand = await osFunc(parameter);
            console.log(osCommand);
            currentDirectory();
          }
        } catch (err) {
          console.log("Operation failed. Unable to execute OS command.");
        }
      })();
      break;

    default:
      console.log("Invalid command. Please try again.");
  }
});

rl.on("SIGINT", () => {
  console.log(`Thank you for using File Manager, ${username}!`);
  rl.close();
});
