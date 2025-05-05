import fs from "fs";
import fsPromises from "fs/promises";
import zlib from "zlib";
import path from "path";
import { resolveAbsolutePath } from "../absolutePath.js";

export const decompress = async (inputPath, destinationPath) => {
  const compressedFilePath = resolveAbsolutePath(inputPath);
  const destinationDir = resolveAbsolutePath(destinationPath);
  const outputFileName = path.basename(compressedFilePath, ".br");
  const outputFilePath = path.join(destinationDir, outputFileName);

  try {
    await fsPromises.access(compressedFilePath, fs.constants.R_OK);

    const readStream = fs.createReadStream(compressedFilePath);
    const writeStream = fs.createWriteStream(outputFilePath);
    const brotliStream = zlib.createBrotliDecompress();

    const stream = readStream.pipe(brotliStream).pipe(writeStream);

    stream.on("finish", () => {
      console.log(
        `Decompression complete. You are currently in ${process.cwd()}`
      );
    });

    stream.on("error", handleError(stream));
  } catch {
    handleError()();
  }
};
