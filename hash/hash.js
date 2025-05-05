import crypto from "crypto";
import fs from "fs";
import { resolveAbsolutePath } from "../absolutePath.js";

export const calculateHash = async (relativeFilePath) => {
  const absoluteFilePath = resolveAbsolutePath(relativeFilePath);

  return new Promise((resolve, reject) => {
    const hashStream = crypto.createHash("sha256");
    const fileStream = fs.createReadStream(absoluteFilePath);

    fileStream.on("error", () => reject(new Error("Failed to read file")));
    fileStream.on("data", (chunk) => hashStream.update(chunk));
    fileStream.on("end", () => {
      const fileHash = hashStream.digest("hex");
      resolve(fileHash);
    });
  });
};
