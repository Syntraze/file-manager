import process from "process";
export const currentDirectory = () => {
  let currDir = process.cwd();
  console.log(`You are currently in ${currDir}`);
};
