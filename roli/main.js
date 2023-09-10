#!node

const { config } = require('./constant');
const { encrypt, decrypt } = require('./decode');
const { relogin, login, tokenize, getCurrentDateTimeFormatted } = require('./util');

async function run() {
  const form = new FormData()
  const user = await login()
  const token = encrypt(tokenize("wheel/user_choose_wof"))
  const reqparampost = encrypt(JSON.stringify({
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
  const reqparam = encrypt(JSON.stringify({
    "key": config.key,
    "session": user.session,
    "version_number": config.version_number,
    "token": token,
    "msisdn": user.data.msisdn.replace(/^0/, '62'),
    "id_user": user.data.id,
    ...config.android,
  }))
  form.set("reqparampost", reqparampost)
  const spin_coin = await fetch(new URL(`/api/wheel/user_choose_wof?key=${config.key}&version_number=${config.version_number}&token=${token}&reqparam=${reqparam}`, config.baseurl), {
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
}

run().catch(async () => {
  await relogin()
  run()
})