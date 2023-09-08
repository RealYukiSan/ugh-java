const {
  createDecipheriv,
  createCipheriv,
  createSecretKey,
} = require('node:crypto');
const { Buffer } = require('node:buffer');

const algorithm = 'aes-128-cbc';

const decrypted = decrypt("54797554594d587172656e2b4a4c5a6a365367356e466b534964543263344777624a626e51316258674f676e7766306f7048786435737175644d4a756933644955617a7a564f76342b6566450a62537663624b31754f417967577a62514238453749524b4d4c43462f56577162566f6635464164346e2f5876464266647673325a772b52336c3444536f654473534b71726f644767554a31620a51505a744d626b416f663744512f64517768484d46794c7445475559494459526446576a476e636f71537377443335626b645747616e664e4479494c414455745965734f46466a664f2f6a300a6e4533687354637a6b32354b6275707732702b436b6b446366526e4c645379367863697a563372446c6a6133586a58336f665637466c396c7131363635314b704862447056484468495876420a417747324c726563794b4f4e767671684b485437344d62365a4378646f733575696f51637130312f646a4d435355684b2f335730647271422b54764a49512f7174316834557a707043704e500a673451624e44486f594f72306d49737a78504d4e45314832504b414d49594d41674948776638307851796e5232645a42445735382b33704f626c4a726231496d4c672f6956774c7737536c570a76504664396b32686c646c456b69636a577958517a645a694e6334353679715958524f566e645576383666367853416d75643347586d41740a")
console.log(decrypted);

const encrypted = encrypt('{"key":"m0b1l3","model":"sdk_gphone64_x86_64","android_sdk_version":"31","manufacturer":"Google","brand":"google","os":"Android+12","android_id":"e6751f1da2754b8d","version_number":"3.0.6","token":"66767a7231666f3777582f62317666517855593179645a634863656a37752f7a42373553394c6e52464553366a30544a7355637249776b32434e30716b62616569466173736c576875656c2b0a48444868474266387a773d3d0a"}')
console.log(encrypted);

function encrypt(data) {
  const cipher = createCipheriv(algorithm, "T%Elko#SROl1%819", "ROlITE%lKo#S2019")
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final("hex")
  return encrypted
}

function decrypt(data) {
  // ver 1
  const decipher = createDecipheriv(algorithm, "T%Elko#SROl1%819", "ROlITE%lKo#S2019");
  
  // ver 2 | more technical and imperative, I guess?
  // const key = Buffer.from("T%Elko#SROl1%819", "utf-8");
  // const iv = Buffer.from("ROlITE%lKo#S2019", "utf-8");
  // const secretKey = createSecretKey(key)
  // const decipher = createDecipheriv(algorithm, secretKey, iv);

  const base64String = Buffer.from(data, "hex").toString()
  const encrypted = Buffer.from(base64String, "base64")
  let decrypted = decipher.update(encrypted, 'utf8', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted
}

