import fs from "fs";
import { resolveAbsolutePath } from "../absolutePath.js";
import path from "path";

export const rename = async (oldName, newName) => {
  const currentPath = resolveAbsolutePath(oldName);
  const newPath = path.join(path.dirname(currentPath), newName);

  return new Promise((resolve, reject) => {
    fs.access(newPath, fs.constants.F_OK, (accessErr) => {
      if (!accessErr) {
        return reject("Operation failed");
      }

      fs.rename(currentPath, newPath, (renameErr) => {
        if (renameErr) {
          reject("Operation failed");
        } else {
          resolve("File renamed");
        }
      });
    });
  });
};
