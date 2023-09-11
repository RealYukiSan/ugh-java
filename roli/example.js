#!node

const { decrypt, encrypt } = require("./cryptography");

const decrypted = decrypt("6b772f5a43696c7234556b5944316b7a7a69532f37513d3d")
console.log(decrypted);

const encrypted = encrypt('some_data')
console.log(encrypted);