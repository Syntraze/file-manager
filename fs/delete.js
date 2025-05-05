import fs from "fs";
import { resolveAbsolutePath } from "../absolutePath.js";


export const remove = async (fileToDelete) => {
  const absolutePath = resolveAbsolutePath(fileToDelete);
  return new Promise((resolve, reject) => {
    fs.unlink(absolutePath, (err) => {
      if (err) {
        reject("Operation failed");
      } else {
        resolve("File successfully deleted");
      }
    });
  });
};
