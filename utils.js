
export const handleInvalidArgs = (message) => console.log(`Invalid input. ${message}`);

export const executeSafely = async (fn, errorMessage) => {
  try {
    await fn();
  } catch {
    console.log(`Operation failed. ${errorMessage}`);
  }
};
