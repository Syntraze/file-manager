import fs from "fs";
import path from "path";
import { resolveAbsolutePath } from "../absolutePath.js";
export const copy = async (whatToRead, whereToCopy) => {
  const pathRead = resolveAbsolutePath(whatToRead);
  const pathCopy = resolveAbsolutePath(whereToCopy);
  const fileName = pathRead.split("\\").slice(-1)[0];
  const whereToWrite = path.join(pathCopy, fileName);
  const readableStream = fs.createReadStream(pathRead);
  const writableStream = fs.createWriteStream(whereToWrite);

  readableStream.setEncoding("utf8");
  return new Promise((resolve, reject) => {
    writableStream.on("finish", resolve);
    writableStream.on("error", () => {
      reject("Operation failed");
    });
    readableStream.on("error", () => {
      reject("Operation failed");
    });
    readableStream.pipe(writableStream);
  });
};
