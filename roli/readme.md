# My First Reverse Engineering Experiment :D

reqparam and reqparampost using hex format -> base64 -> encrypted data -> json

Example in javascript

```javascript
const { Buffer } = require("node:buffer");
const hexString = "6332566A636D5630627942745A584E7A5957646C";
const base64 = Buffer.from(hexString, "hex").toString();
const decoded = Buffer.from(base64, "base64").toString("hex");

console.log(decoded);
```

# Sample

[POST] login
Protocol:
https
Host:
roli.telkomsel.com
Path:
/api/user/login
PARAMETERS
key:
m0b1l3
version_number:
3.0.6
token:
66767a7231666f3777582f62317666517855593179645a634863656a37752f7a42373553394c6e52464553366a30544a7355637249776b32434e30716b62616569466173736c576875656c2b0a48444868474266387a773d3d0a
reqparam:
54797554594d587172656e2b4a4c5a6a365367356e466b534964543263344777624a626e51316258674f676e7766306f7048786435737175644d4a756933644955617a7a564f76342b6566450a62537663624b31754f417967577a62514238453749524b4d4c43462f56577162566f6635464164346e2f5876464266647673325a772b52336c3444536f654473534b71726f644767554a31620a51505a744d626b416f663744512f64517768484d46794c7445475559494459526446576a476e636f71537377443335626b645747616e664e4479494c414455745965734f46466a664f2f6a300a6e4533687354637a6b32354b6275707732702b436b6b446366526e4c645379367863697a563372446c6a6133586a58336f665637466c396c7131363635314b704862447056484468495876420a417747324c726563794b4f4e767671684b485437344d62365a4378646f733575696f51637130312f646a4d435355684b2f335730647271422b54764a49512f7174316834557a707043704e500a673451624e44486f594f72306d49737a78504d4e45314832504b414d49594d41674948776638307851796e5232645a42445735382b33704f626c4a726231496d4c672f6956774c7737536c570a76504664396b32686c646c456b69636a577958517a645a694e6334353679715958524f566e645576383666367853416d75643347586d41740a

body request: reqparampost

#### There's unusual behaviour whereas the coin and valid_coin response didn't match

Sample response:

`api/user/valid_coin` endpoint

```json
{
  "error": false,
  "message": "MSISDN coin validity",
  "data": [
    { "coin": "33300", "valid_until": "2023-12-31", "status": "1" },
    { "coin": "71000", "valid_until": "2024-12-31", "status": "1" }
  ]
}
```

`api/user/coin` endpoint

```json
{
  "error": false,
  "message": "find data profile",
  "data": "105300"
}
```

# You can see the _total_ coin validity is `104300` but the other one is `105300` ??? need to investigate further

## anyway here's the part of interesting error from api/user/coin :v

```json
{
  "error": true,
  "message": "002 - Something Wrong With Your Request.",
  "errno": [{ "errno": 1062, "sqlstate": "23000", "error": "Duplicate entry '66767a7231666f3777582f62317666517855593179574139544b484572444b5a' for key 'itoken'" }]
}
```

it turns out, the error is caused by wrong value in a property of token XD

## Backup credential manually - no need to login - devices need to be rooted

```bash
# use 'adb root' if you need adb to have root access
adb pull "//data\data\com.telkomsel.roli\shared_prefs\TelkomselOptinPref.xml"
# modif the content and send back to device
adb push TelkomselOptinPref.xml "//data\data\com.telkomsel.roli\shared_prefs\TelkomselOptinPref.xml"
```

`//` is needed if you on git bash, see [the stackoverflow](https://stackoverflow.com/questions/16344985/how-do-i-pass-an-absolute-path-to-the-adb-command-via-git-bash-for-windows)
otherwise it will be error

\*Tadi kek na ngebug, 1/2 bjir daily chance to play nya, tapi sayang cannot reproduce O_O (mungkin kebijakan dari sono nya dah diperbarui)
