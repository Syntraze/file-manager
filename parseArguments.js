export const parseArguments = (inputLine) => {
  const [_, ...rawArgs] = inputLine.trim().split(" ");
  const joinedArgs = rawArgs.join(" ");

  let args;

  if (joinedArgs.includes('"')) {
    args = joinedArgs
      .split('"')
      .map((part) => part.trim())
      .filter((part) => part !== "" && part !== " ");
  } else {
    args = joinedArgs.split(" ").filter((part) => part !== "");
  }

  return args;
};
