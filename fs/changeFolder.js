import process from "process";
import path from "path";

export const changeFolder = async (targetPath) => {
  try {
    const rootDir = path.parse(process.cwd()).root;
    const currentDir = process.cwd();

    if (targetPath === "up") {
      if (currentDir === rootDir) {
        console.log("You cannot do this operation");
      } else {
        process.chdir("..");
      }
    } else {
      process.chdir(targetPath);
    }
  } catch {
    console.error("Operation failed");
  }
};
