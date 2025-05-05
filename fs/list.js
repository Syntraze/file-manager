import fs from "fs";

export const list = async () => {
  const currentDir = process.cwd();
  return new Promise((resolve, reject) => {
    fs.readdir(currentDir, (err, files) => {
      if (err) {
        reject("Operation failed");
      } else {
        resolve(files);
      }
    });
  });
};
