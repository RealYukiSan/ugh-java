log:
str6 and jSONObject from public String H in RbHelperClass
str and H in else block scope, from public final void O1 in MasukActivity

desc:
str contain decrypted reqparampost
H contain URL and encrypted hex reqparam
str6 contain URL and some param
jSONObject contain decrypted reqparam

todo:
findout encryption mechanism for reqparam and reqparampost
findout attendance api (reedem / 30 days)
create auto-fill survey
create scheduler script like cronjob? register as startup program?

what I want to understand:

- What is shared object?

[.locals 4](https://stackoverflow.com/questions/56074422/increase-local-registers-in-smali-and-use-new-register)

pN = 0-1
vN = 0-3

v0, v1 free
p0 = v2
p1 = v3

there's difference usage between:
invoke- virtual | static | direct

useful resources for cryptography

- [History of cryptography](https://www.youtube.com/watch?v=9pp9YpginNg)
- [High-level overview of cryptography](https://www.youtube.com/watch?v=jhXCTbFnK8o)
- [English Wikipedia AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard#:~:text=AES%20is%20a%20variant%20of%20Rijndael%2C%20with%20a%20fixed%20block,a%20maximum%20of%20256%20bits.)
- [Indonesian Wikipedia AES](https://id.wikipedia.org/wiki/Standar_Enkripsi_Lanjutan)

variant algorithm for cryptography:

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

constant:
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
