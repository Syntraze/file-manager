import process from 'process';
import path from 'path';
 
export const changeDirectory = async (whereToGo) => {
  try {
  const userHomeDir = path.parse(process.cwd()).root;
  const currDir = process.cwd();
  if (whereToGo == 'up') {
    if (currDir == userHomeDir) {
      console.log('You cannot go higher');
    } else {
      process.chdir('../');
    }
  }
  else {
    process.chdir(whereToGo);
  }
} catch (err) {
  console.error('Operation failed');
}}