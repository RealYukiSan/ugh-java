#!node

const { decrypt, encrypt } = require("./decode");
const { tokenize, config, login, relogin } = require("./util");

/* testing custom request */
(async () => {
  const user = await login()
  const token = encrypt(tokenize("daily_reward/info_indirect"))
  const data = {
    "key":config.key,
    "counter":"29",
    "session":user.session,
    "user_id":user.data.id,
    "token":token,
    "msisdn":user.data.msisdn.replace(/^0/, '62'),
    "id_user":user.data.id,
    "version_number":config.version_number,
    ...config.android
  }
  const reqparam = encrypt(JSON.stringify(data))
  try {
    const response = await fetch("https://roli.telkomsel.com/api/daily_reward/info_indirect?" + `key=m0b1l3&token=${token}&version_number=3.0.6&reqparam=${reqparam}`).then(res => res.text())
    const result = decrypt(response)
    console.log(decrypt(response));
    if (result.message == "User not found.") {
      throw new Error('Please Relogin')
    }
  } catch {
    relogin()
  }
})()
