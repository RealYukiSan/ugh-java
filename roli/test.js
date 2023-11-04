#!node

const { config } = require("./constant");
const { decrypt, encrypt } = require("./cryptography");
const { tokenize, login, relogin } = require("./util");

/* testing custom request */
(async () => {
  const user = await login()
  const base_data = {
    "key":config.key,
    "session":user.session,
    "msisdn":user.data.msisdn.replace(/^0/, '62'),
    "id_user":user.data.id,
    "user_id":user.data.id,
    "version_number":config.version_number,
    ...config.android
  }
  const counter_data = {
    ...base_data,
    "token": encrypt(tokenize("internal_counter/my_counter")),
  }
  const coin_data = {
    ...base_data,
    "token": encrypt(tokenize("user/coin")),
  }
  const valid_coin_data = {
    ...base_data,
    "token": encrypt(tokenize("user/valid_coin")),
  }

  try {
    const response = await fetch("https://roli.telkomsel.com/api/internal_counter/my_counter?" + `key=m0b1l3&token=${counter_data.token}&version_number=3.0.6&reqparam=${encrypt(JSON.stringify(base_data))}`).then(res => res.text())

    const total_coin = await fetch("https://roli.telkomsel.com/api/user/coin?" + `key=m0b1l3&token=${coin_data.token}&version_number=3.0.6&reqparam=${encrypt(JSON.stringify(coin_data))}`).then(res => res.text())

    const valid_coin = await fetch("https://roli.telkomsel.com/api/user/valid_coin?" + `key=m0b1l3&token=${valid_coin_data.token}&version_number=3.0.6&reqparam=${encrypt(JSON.stringify(valid_coin_data))}`).then(res => res.text())

    const result = decrypt(response)

    console.log(decrypt(response));
    console.log(decrypt(total_coin));
    console.log(decrypt(valid_coin));

    if (result.message == "User not found.") {
      throw new Error('Please Relogin')
    }
  } catch (e) {
    console.log(e);
    // relogin()
  }
})()
