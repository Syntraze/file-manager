import os from "os";


export const changeToHomeDirectory = async () => {
  try {
    const homeDirectory = os.homedir();
    process.chdir(homeDirectory);
  } catch (error) {
    console.error("Failed to change to home directory:", error.message);
  }
};


export const osFunc = async (parameter) => {
  try {
    switch (parameter) {
      case "--EOL":
        return JSON.stringify(os.EOL);

      case "--cpus": {
        const cpus = os.cpus();
        return {
          "Amount of CPUs": cpus.length,
          "Models and Clock Rates": cpus.map((cpu) => ({
            model: cpu.model,
            speedGHz: (cpu.speed / 1000).toFixed(2),
          })),
        };
      }

      case "--homedir":
        return os.homedir();

      case "--username":
        return os.userInfo().username;

      case "--architecture":
        return process.arch;

      default:
        return "Invalid input";
    }
  } catch (err) {
    throw new Error("Operation failed");
  }
};
