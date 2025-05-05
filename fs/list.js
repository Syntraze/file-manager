import fs from "fs/promises";
import path from "path";

export const list = async () => {
  try {
    const currentDir = process.cwd();
    const files = await fs.readdir(currentDir);

    const detailedList = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(currentDir, file);
        const stats = await fs.stat(filePath);
        return {
          Name: file,
          Type: stats.isDirectory() ? "directory" : "file",
        };
      })
    );

    detailedList.sort((a, b) => a.Name.localeCompare(b.Name));

    console.table(detailedList);
  } catch (err) {
    console.log("Operation failed");
  }
};
