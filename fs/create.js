import fs from "fs";

export const create = async (newFileName) => {
  const workingDir = process.cwd();
  const fullFilePath = `${workingDir}/${newFileName}`;
  const fileStream = fs.createWriteStream(fullFilePath);

  fileStream.write("", () => {
    console.log(`You are currently in ${workingDir}`);
  });
};
