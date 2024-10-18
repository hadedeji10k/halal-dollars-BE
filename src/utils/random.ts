export const generateOTP = (
  options: { type: "num" | "alpha" | "alphanum"; length?: number },
) => {
  const seed = {
    num: "0123456789",
    alpha: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    alphanum: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  };

  const length = options.length || 4;
  const type = options.type;

  let output = "";
  for (let i = 0; i < length; i++) {
    output += seed[type][Math.floor(Math.random() * seed[type].length)];
  }

  const result = output.charAt(0) === "0" ? `9${output.slice(1)}` : output;

  return result;
};
