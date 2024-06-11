## Note on build simple hello world APK

- since d8 dexer [not support javac 21](https://code2care.org/java-jdk-21/fix-unsupported-major-minor-version-65-0-java-jdk-21/) yet, we need to lower the target and source
- [stackoverflow](https://stackoverflow.com/questions/59895743/replacement-for-bootclasspath-option-in-java), use classpath instead of bootclasspath

These command will generate the following output:

- aapt2 link: generate samplebuild.apk
- javac: compile source code to .class
- d8: transform .class to .dex
- zip: add .dex to samplebuild.apk with zip command
- zipalign: optimized aligned.apk
- keytool: generate key, debug.keystore
- apksigner: final apk, signing.apk

## Try to repatch the apk

`baksmali dis classes.dex`, edit the string on generated `.smali`
add modified dex to repatch the apk:

```shell
smali as out/dom/domain/SayingHello.smali -o classes.dex
zip -uj samplebuild.apk classes.dex
zipalign -p -f -v 4 samplebuild.apk aligned.apk
apksigner sign --ks debug.keystore --ks-pass pass:android --out signed.apk aligned.apk
```

### Screenshot view:
![image](https://github.com/RealYukiSan/ugh-java/assets/126035476/88744e2a-0656-4263-bc78-2825fb482c0c)
![image](https://github.com/RealYukiSan/ugh-java/assets/126035476/0ea908d4-985b-4060-944a-8fc32fc09244)
![image](https://github.com/RealYukiSan/ugh-java/assets/126035476/980f3bfa-3d30-4a0a-897b-ea9689e041fa)
