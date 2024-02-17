this repo created in order to understand how Android build system actually works under the hood

## Manual Build simple hello world APK

- since d8 dexer [not support javac 21](https://code2care.org/java-jdk-21/fix-unsupported-major-minor-version-65-0-java-jdk-21/) yet, we need to lower the target and source
- [stackoverflow](https://stackoverflow.com/questions/59895743/replacement-for-bootclasspath-option-in-java), use classpath instead of bootclasspath

```shell
aapt2 link --manifest AndroidManifest.xml -I "C:\Android\platforms\android-31\android.jar" -o samplebuild.apk
javac -classpath "C:\Android\platforms\android-31\android.jar" -source 17 -target 17 src\dom\domain\*.java
d8 src/dom/domain/SayingHello.class --lib "C:\Android\platforms\android-31\android.jar"
zip -uj samplebuild.apk classes.dex
zipalign -p -f -v 4 samplebuild.apk aligned.apk
keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
apksigner sign --ks debug.keystore --ks-pass pass:android --out signed.apk aligned.apk
```

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

## Repatch other apk (telkomsel roli)

```shell
apktool d telkomsel_roli.apk # modify smali stage
apktool b telkomsel_roli -o patched_roli.apk
zipalign -p -f -v 4 patched_roli.apk aligned_roli.apk
apksigner sign --ks debug.keystore --ks-pass pass:android --out final_roli.apk aligned_roli.apk # Make sure you've generated the keystore.
adb install final_roli.apk # final signed patched  aligned apk
```

### [Other Link](https://www.facebook.com/permalink.php?story_fbid=pfbid06v2GZ6ctwsWStEkVt9KhYLzc3Gg8sQTpks9jqnFcEpJRKaiWepB45NxH4FbBDSMSl&id=100090321692618)

### Todo:
- add kotlin example, [reference](https://stackoverflow.com/questions/44690812/kotlin-file-to-apk-android-flow)
- add hello-jni
- update view and remove check for update popup
- add APKs to releases

### Screenshot view:
![image](https://github.com/RealYukiSan/ugh-java/assets/126035476/88744e2a-0656-4263-bc78-2825fb482c0c)

