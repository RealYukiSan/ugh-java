#!node

const readline = require('node:readline');
const fs = require('node:fs');
const { stdin: input, stdout: output } = require('node:process');
const { encrypt, decrypt } = require('./decode');
const path = require('node:path');

const baseurl = "https://roli.telkomsel.com"
const config = {
  version_number: '3.0.6',
  android: {
    "android_id": "e6751f1da2754b8d", // or tapjoy ads?
    "model":"sdk_gphone64_x86_64",
    "android_sdk_version":"31",
    "manufacturer":"Google",
    "brand":"google",
    "os":"Android+12",
  },
  unique_identifier: 'rol1#@#netr3fo',
  key: 'm0b1l3',
  wheel_id: '13',
  wheel_item_id: '58' // 1000 coins!
};

async function run() {
  const rl = readline.createInterface({ input, output });
  let user
  let token
  let reqparam
  let reqparampost
  const form = new FormData()

  try {
    user = JSON.parse(fs.readFileSync(path.join(__dirname, "env.json"), "utf8"))
  } catch {
    const creds = {}
    creds.user_name = await new Promise(resolve => {
      rl.question('Phone> ', resolve);
    })
    creds.password = await new Promise(resolve => {
      rl.question('Password> ', resolve);
    })

    reqparampost = encrypt(JSON.stringify(creds))
    form.append("reqparampost", reqparampost)
    token = encrypt(tokenize("user/login"))
    reqparam = encrypt(JSON.stringify({
      "key": config.key,
      "version_number": config.version_number,
      "token": token,
      ...config.android
    }))
    const response = await fetch(new URL(`/api/user/login?key=${config.key}&version_number=${config.version_number}&token=${token}&reqparam=${reqparam}`, baseurl), {
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
    user = JSON.parse(data)

    fs.writeFileSync("./env.json", data, "utf8")
  }
  
  token = encrypt(tokenize("wheel/user_choose_wof"))
  reqparampost = encrypt(JSON.stringify({
    "key": config.key,
    "session": user.session,
    "wheel_id": encrypt(`${getCurrentDateTimeFormatted()}-${user.session}-${config.wheel_id}-${config.unique_identifier}`),
    "wheel_item_id": encrypt(`${getCurrentDateTimeFormatted()}-${user.session}-${config.wheel_item_id}-${config.unique_identifier}`),
    "msisdn": user.data.msisdn.replace(/^0/, '62'),
    "bahasa": "2",
    "id_user": user.data.id,
    "version_number": config.version_number,
    "token": token
  }))
  reqparam = encrypt(JSON.stringify({
    "key": config.key,
    "session": user.session,
    "version_number": config.version_number,
    "token": token,
    "msisdn": user.data.msisdn.replace(/^0/, '62'),
    "id_user": user.data.id,
    ...config.android,
  }))
  form.set("reqparampost", reqparampost)
  const spin_coin = await fetch(new URL(`/api/wheel/user_choose_wof?key=${config.key}&version_number=${config.version_number}&token=${token}&reqparam=${reqparam}`, baseurl), {
    method: "POST",
    body: form,
    headers: {
      'Accept-Encoding': 'gzip',
      'User-Agent': 'okhttp/4.9.0',
      'Connection': 'Keep-Alive',
      'Host': 'roli.telkomsel.com',
    }
  }).then(res => res.text())
  const result = JSON.parse(decrypt(spin_coin))
  if (result.message == "User not found.") {
    throw new Error('Please Relogin')
  }
  console.log(result)

  rl.close()
}

function relogin() {
  fs.unlinkSync("env.json")
  run()
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

run().catch(relogin)