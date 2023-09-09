const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');
const { encrypt, decrypt } = require('./decode');

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
  wheel_id: '13',
  wheel_item_id: '58'
};

(async () => {
  const rl = readline.createInterface({ input, output });
  const creds = {}

  creds.user_name = await new Promise(resolve => {
    rl.question('Phone> ', resolve);
  })
  creds.password = await new Promise(resolve => {
    rl.question('Password> ', resolve);
  })
  creds.key = 'm0b1l3'
  
  let reqparampost = encrypt(JSON.stringify(creds))
  
  const form = new FormData()
  form.append("reqparampost", reqparampost)
  
  let token = encrypt(tokenize("user/login"))
  let reqparam = encrypt(JSON.stringify({
    "key": creds.key,
    "version_number": config.version_number,
    "token": token,
    ...config.android
  }))
  const response = await fetch(new URL(`/api/user/login?key=${creds.key}&version_number=${config.version_number}&token=${token}&reqparam=${reqparam}`, baseurl), {
    method: "POST",
    body: form,
    headers: {
      'Accept-Encoding': 'gzip',
      'User-Agent': 'okhttp/4.9.0',
      'Connection': 'Keep-Alive',
      'Host': 'roli.telkomsel.com',
    }
  }).then(res => res.text())
  const login = JSON.parse(decrypt(response))

  token = encrypt(tokenize("wheel/user_choose_wof"))
  reqparampost = encrypt(JSON.stringify({
    "key": creds.key,
    "session": login.session,
    "wheel_id": encrypt(`${getCurrentDateTimeFormatted()}-${login.session}-${config.wheel_id}-${config.unique_identifier}`),
    "wheel_item_id": encrypt(`${getCurrentDateTimeFormatted()}-${login.session}-${config.wheel_item_id}-${config.unique_identifier}`),
    "msisdn": login.data.msisdn.replace(/^0/, '62'),
    "bahasa": "2",
    "id_user": login.data.id,
    "version_number": config.version_number,
    "token": token
  }))
  reqparam = encrypt(JSON.stringify({
    "key": creds.key,
    "session": login.session,
    "version_number": config.version_number,
    "token": token,
    "msisdn": login.data.msisdn.replace(/^0/, '62'),
    "id_user": login.data.id,
    ...config.android,
  }))
  form.set("reqparampost", reqparampost)
  const spin_coin = await fetch(new URL(`/api/wheel/user_choose_wof?key=${creds.key}&version_number=${config.version_number}&token=${token}&reqparam=${reqparam}`, baseurl), {
    method: "POST",
    body: form,
    headers: {
      'Accept-Encoding': 'gzip',
      'User-Agent': 'okhttp/4.9.0',
      'Connection': 'Keep-Alive',
      'Host': 'roli.telkomsel.com',
    }
  }).then(res => res.text())
  console.log(decrypt(spin_coin))

  rl.close()
})()

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
