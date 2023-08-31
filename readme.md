## Manual Build simple hello world APK

```powershell
PS C:\Users\Kyouma\HelloJava> aapt2.exe link --manifest .\AndroidManifest.xml -I "C:\Android\platforms\android-31\android.jar" -o samplebuild.apk
PS C:\Users\Kyouma\HelloJava> javac -bootclasspath "C:\Android\platforms\android-31\android.jar" -source 1.8 -target 1.8 .\src\dom\domain\*.java
PS C:\Users\Kyouma\HelloJava> d8.bat .\src\dom\domain\SayingHello.class --lib "C:\Android\platforms\android-31\android.jar"
PS C:\Users\Kyouma\HelloJava> zip -uj samplebuild.apk classes.dex
PS C:\Users\Kyouma\HelloJava> zipalign.exe -p -f -v 4 .\samplebuild.apk aligned.apk
PS C:\Users\Kyouma\HelloJava> keytool.exe -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
PS C:\Users\Kyouma\HelloJava> apksigner.bat sign --ks .\debug.keystore --ks-pass pass:android --out signed.apk .\aligned.apk
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

```
PS C:\Users\Kyouma\HelloJava> smali as ./out/dom/domain/SayingHello.smali -o classes.dex
PS C:\Users\Kyouma\HelloJava> zip -uj samplebuild.apk classes.dex
PS C:\Users\Kyouma\HelloJava> zipalign.exe -p -f -v 4 .\samplebuild.apk aligned.apk
PS C:\Users\Kyouma\HelloJava> apksigner.bat sign --ks .\debug.keystore --ks-pass pass:android --out signed.apk .\aligned.apk
```

## Repatch other apk (telkomsel roli)

```sh
apktool.bat d telkomsel_roli.apk # modify smali stage
apktool.bat b .\telkomsel_roli -o patched_roli.apk
zipalign.exe -p -f -v 4 .\patched_roli.apk aligned_roli.apk
apksigner.bat sign --ks .\debug.keystore --ks-pass pass:android --out final_roli.apk .\aligned_roli.apk # Make sure you've generated the keystore.
adb install .\final_roli.apk # final signed patched  aligned apk
```
