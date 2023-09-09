const {
  createDecipheriv,
  createCipheriv,
} = require('node:crypto');
const { Buffer } = require('node:buffer');

const algorithm = 'aes-128-cbc';

function encrypt(data) {
  const cipher = createCipheriv(algorithm, "T%Elko#SROl1%819", "ROlITE%lKo#S2019")
  let encrypted = cipher.update(data, 'utf8', 'base64');
  encrypted += cipher.final("base64")
  return Buffer.from(encrypted).toString("hex")
}

function decrypt(data) {
  // ver 1
  const decipher = createDecipheriv(algorithm, "T%Elko#SROl1%819", "ROlITE%lKo#S2019");
  
  // ver 2 | more technical and imperative, I guess?
  // const key = Buffer.from("T%Elko#SROl1%819", "utf-8");
  // const iv = Buffer.from("ROlITE%lKo#S2019", "utf-8");
  // const secretKey = createSecretKey(key)
  // const decipher = createDecipheriv(algorithm, secretKey, iv);

  const base64String = Buffer.from(data, "hex").toString()
  const encrypted = Buffer.from(base64String, "base64")
  let decrypted = decipher.update(encrypted, 'utf8', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted
}

module.exports = {
  decrypt,
  encrypt
}
