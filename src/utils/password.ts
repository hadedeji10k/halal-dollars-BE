import crypto from 'crypto';
const iterationLists = [390000, 260000]

async function hash(text: string) {
  const iterations = iterationLists[Math.floor(Math.random() * iterationLists.length)]

  const salt = crypto.randomBytes(15).toString("hex");

  const derivedKey = crypto.pbkdf2Sync(text, salt, iterations, 32, 'sha256');

  const key = derivedKey.toString("base64");
  const hashed = `pbkdf2_sha256$${iterations}$${salt}$${key}`;

  return hashed
}

async function verify(text: string, hash: string) {
  const hashedSplitted = hash.split("$");

  const salt = hashedSplitted[2];
  const iterations = Number(hashedSplitted[1]);

  const derivedKey = crypto.pbkdf2Sync(text, salt, iterations, 32, 'sha256');

  const key = derivedKey.toString("base64");
  const hashed = `pbkdf2_sha256$${iterations}$${salt}$${key}`;

  return hashed === hash
}

export const password = { hash, verify };
