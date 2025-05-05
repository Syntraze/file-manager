import fs from "fs";
import fsPromises from "fs/promises";
import zlib from "zlib";
import path from "path";
import { resolveAbsolutePath } from "../absolutePath.js";

export const compress = async (inputPath, destinationPath) => {
  const sourceFilePath = resolveAbsolutePath(inputPath);
  const destinationDir = resolveAbsolutePath(destinationPath);
  const compressedFilePath =
    path.join(destinationDir, path.basename(sourceFilePath)) + ".br";

  try {
    await fsPromises.access(sourceFilePath, fs.constants.R_OK);

    const readStream = fs.createReadStream(sourceFilePath);
    const writeStream = fs.createWriteStream(compressedFilePath);
    const brotliStream = zlib.createBrotliCompress();

    const stream = readStream.pipe(brotliStream).pipe(writeStream);

    stream.on("finish", () => {
      console.log(
        `Compression complete. You are currently in ${process.cwd()}`
      );
    });

    stream.on("error", handleError(stream));
  } catch {
    handleError()();
  }
};

const handleError = (stream) => () => {
  if (stream) stream.destroy();
  console.log("Operation failed");
  console.log(`You are currently in ${process.cwd()}`);
};
