const readline = require('node:readline');
const fs = require('node:fs');
const path = require('node:path');
const { stdin: input, stdout: output } = require('node:process');
const { encrypt, decrypt } = require('./decode');
const { config } = require('./constant');
const rl = readline.createInterface({ input, output });

async function login() {
  let account
  const form = new FormData()
  try {
    account = JSON.parse(fs.readFileSync(path.join(__dirname, "env.json"), "utf8"))
  } catch {
    const creds = JSON.parse(fs.readFileSync(path.join(__dirname, "creds.json")), "utf8") || {}
    if (Object.keys(creds).length === 0) {
      creds.user_name = await new Promise(resolve => {
        rl.question('Phone> ', resolve);
      })
      creds.password = await new Promise(resolve => {
        rl.question('Password> ', resolve);
      })
    }

    const reqparampost = encrypt(JSON.stringify(creds))
    form.append("reqparampost", reqparampost)
    const token = encrypt(tokenize("user/login"))
    const reqparam = encrypt(JSON.stringify({
      "key": config.key,
      "version_number": config.version_number,
      "token": token,
      ...config.android
    }))
    const response = await fetch(new URL(`/api/user/login?key=${config.key}&version_number=${config.version_number}&token=${token}&reqparam=${reqparam}`, config.baseurl), {
      method: "POST",
      body: form,
      headers: {
        'Accept-Encoding': 'gzip',
        'User-Agent': 'okhttp/4.9.0',
        'Connection': 'Keep-Alive',
        'Host': 'roli.telkomsel.com',
      }
    }).then(res => res.text())
    const data = decrypt(response)
    
    fs.writeFileSync(path.join(__dirname, "env.json"), data, "utf8")
    account = JSON.parse(data)
    fs.writeFileSync(path.join(__dirname, "creds.json"), creds, "utf8")
  } finally {
    rl.close()
    return account
  }
}

async function relogin() {
  fs.unlinkSync("env.json")
  await login()
}

function randomize() {
  return Math.floor(Math.random() * 1000) + Math.floor(Math.random() * 5000)
}

function tokenize(endpoint) {
  return [config.android.android_id, getCurrentDateTimeFormatted(), config.unique_identifier, `${endpoint}${randomize()}`].join("-")
}

function getCurrentDateTimeFormatted() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0'); 
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const formattedDateTime = `${day}${month}${year}${hours}${minutes}${seconds}`;

  return formattedDateTime;
}

module.exports = {
  tokenize,
  getCurrentDateTimeFormatted,
  relogin,
  login
}