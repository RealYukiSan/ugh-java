### log

str6 and jSONObject from public String H in RbHelperClass

str and H in else block scope, from public final void O1 in MasukActivity

### desc

str contain decrypted reqparampost

H contain URL and encrypted hex reqparam

str6 contain URL and some param

jSONObject contain decrypted reqparam

### todo

- findout encryption mechanism for reqparam and reqparampost [done]
- findout attendance api (reedem / 30 days) [founded on daily_reward/info_indirect]
- observe proses perpanjang validity coin
- create auto-fill survey
- create scheduler script like cronjob? register as startup program?
- Since the login device affects other devices (to be logged out), do we need to implement auto-relog? [done]
- apakah ada celah pada kode referral invite friend? biar bisa nuyul :v

### what I want to understand

- What is shared object?

[.locals 4](https://stackoverflow.com/questions/56074422/increase-local-registers-in-smali-and-use-new-register)

pN = 0-1

vN = 0-3

v0, v1 free

p0 = v2

p1 = v3

### there's difference usage between

invoke- virtual | static | direct

useful resources for cryptography

- [History of cryptography](https://www.youtube.com/watch?v=9pp9YpginNg)
- [High-level overview of cryptography](https://www.youtube.com/watch?v=jhXCTbFnK8o)
- [English Wikipedia AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard#:~:text=AES%20is%20a%20variant%20of%20Rijndael%2C%20with%20a%20fixed%20block,a%20maximum%20of%20256%20bits.)
- [Indonesian Wikipedia AES](https://id.wikipedia.org/wiki/Standar_Enkripsi_Lanjutan)

### variant algorithm for cryptography

- DES
- AES
- RSA
- ...and more

```java
AlgorithmParameters params = cipher.getParameters();
byte[] iv = params.getParameterSpec(IvParameterSpec.class).getIV();

DatatypeConverter.printHexBinary(iv)
DatatypeConverter.printHexBinary(this.d.getEncoded());

Log.i('AcakKata', str)
Log.i('AcakKata', new String(h(str)))
// check if str equal to g(decode)
Log.i('AcakKata', g(decode))
```

### constant

A Key = m0b1l3

Unique identifier = rol1#@#netr3fo

Cipher/Decipher attribute:

IV = ROlITE%lKo#S2019

Secret = T%Elko#SROl1%819

Algorithm = AES

transformation = AES/CBC/PKCS7Padding

properties from reqparampost on user_choose_wof endpoint:

- wheel id attribute: current_timestamp-session_id-wheel_id-unique_identifier
- wheel item id attribute: current_timestamp-session_id-items_id-unique_identifier
- token attribute: android_id-current_timestamp-unique_identifier-api_endpoint

env:

- id_user
- session
- username/phone number/msisdn

unanswered questions:

- session_id? Is this a real id or encrypted data?

Daily API:

- daily_reward/info_indirect [fetch info from api and show on home screen] tested on test.js
- daily_reward/info [useless endpoint]
- daily_reward/indirect_redeem [reedem current coin in N days, `{"error":true,"message":"Mohon maaf, karena sahabat Oli baru aktif lagi, reward harian kamu baru bisa diambil setelah 24 jam. Terima kasih."}`] hipotesis/asumsi karena relog device
- daily_reward/process_redeem [useless endpoint]
- daily_reward/check_status [`{"error":false,"message":"belum melakukan redeem","trx_status":"empty","created_at":""}`] tested on test.js

### Sample

decrypted indirect_redeem data

query string:

- token
- app version
- key
- reqparam: `{...device_metadata,app version,token,msisdn,id_user}` no key included

body request:

`{key,session,msisdn,"reqid":"11092023071712-b96ee37e1984860a4bc2c5ddd503d88c939b964b-8-rol1#@#netr3fo",token,app version}`

11092023071712 = actually a date, tgl 11 bulan 09, thn 2023, jam 07 menit 17 detik 12

b96ee37e1984860a4bc2c5ddd503d88c939b964b = a session

check_status keyword: `this.h.N0` `this.h.K3(J1);` `tglRedeemDaily` dan berkaitan dengan `indirect_redeem`

Interesting endpoint: [GET] internal_counter/my_counter it seems update or increment the daily N/30 days proof with search `home_bonus_info_sisa` keyword both on code and resource

query:

- reqparam (session included here)
- token
- app version
- key

Sample reqparam: `{key,session,android metadata,version_number,token,msisdn,id_user}`

Sample response: `{"error":false,"message":"get internal counter","data":"22"}`

agak weird sih auth methodnya pake session tapi gak disimpen di cookie, dan bukan jwt token yang disimpen di header juga, mungkin emang sengaja buat custom auth sendiri tapi gak tau ni best practice atau engga nya dari sisi developer

todo: gather information on `tgl*` especially `tglCounter` vs `tglRedeemDaily` on session manager

reedem button: `label_redeem_indirect` menjadi readonly setelah hit endpoint indirect_redeem dan mendptkan response seperti di atas, dan kupikir yang menyebabkannya adalah line berikut `if (J1.equals(this.h.F0()) && !this.h.J().equalsIgnoreCase("") && this.h.K() > 0) {` dan itu dipanggil dari `HomeFragment.this.f6(parseInt);`

read info `internal_counter/my_counter` and permutasi `optin/update_counter`

btw sepertinya kebanyakan api endpoint hanya untuk memperbarui ui / view screen saja, e.g: `user/coin` `daily_reward/info_indirect`

### List Order of daily attandance

## `internal_counter/my_counter`

get current counted day, for e.g total 30 - remaining 21 = current 9

## `daily_reward/info_indirect`

I think it's only for print on the home screen :v
`{"error":false,"message":"coin found","data":[{"id":"reward29","title":"RoLiRewardDay29","counter":"29","reward":"29000 Koin","total":30000}]}`

## `optin/update_counter`

if the conditions are met
