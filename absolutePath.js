import path from "path";
import process from "process";

export const resolveAbsolutePath = (inputPath) => {
  const isAbsolute = path.isAbsolute(inputPath);
  return isAbsolute
    ? path.normalize(inputPath)
    : path.resolve(process.cwd(), inputPath);
};
