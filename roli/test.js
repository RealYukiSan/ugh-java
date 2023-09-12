#!node

const { config } = require("./constant");
const { decrypt, encrypt } = require("./cryptography");
const { tokenize, login, relogin } = require("./util");

/* testing custom request */
(async () => {
  const user = await login()
  const token = encrypt(tokenize("optin/update_counter"))
  const form = new FormData()
  const reqparampost = encrypt(JSON.stringify({
    "key":config.key,
    "session":user.session,
    "user_id":user.data.id,
    "postr_user_hash":"null",
    "postr_user_id":"null",
    "counter_value":"10",
    "tgl_counter":"12-09-2023"
  }))
  form.append("reqparampost", reqparampost)
  const data = {
    "key":config.key,
    "session":user.session,
    "token":token,
    "msisdn":user.data.msisdn.replace(/^0/, '62'),
    "id_user":user.data.id,
    "version_number":config.version_number,
    ...config.android
  }
  const reqparam = encrypt(JSON.stringify(data))
  try {
    const response = await fetch("https://roli.telkomsel.com/api/optin/update_counter?" + `key=m0b1l3&token=${token}&version_number=3.0.6&reqparam=${reqparam}`, {
      method: "POST",
      body: form
    }).then(res => res.text())
    const result = decrypt(response)
    console.log(decrypt(response));
    if (result.message == "User not found.") {
      throw new Error('Please Relogin')
    }
  } catch {
    relogin()
  }
})()
