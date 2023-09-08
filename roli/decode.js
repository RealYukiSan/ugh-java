const {
  createDecipheriv,
  createCipheriv
} = require('node:crypto');
const { Buffer } = require('node:buffer');

const algorithm = 'aes-128-cbc';
const key = Buffer.from("T%Elko#SROl1%819", "utf-8")
const iv = Buffer.from("ROlITE%lKo#S2019", "utf-8");

const decipher = createDecipheriv(algorithm, key, iv);

const encrypted = encrypt('this is a message');
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');

console.log(encrypted);
console.log(decrypted);

function encrypt(data) {
  const cipher = createCipheriv(algorithm, key, iv)
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final("hex")
  return encrypted
}

