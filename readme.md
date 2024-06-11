This repo created in order to understand how Android build system actually works under the hood.

## Repatch telkomsel roli apk

```shell
apktool d telkomsel_roli.apk # modify smali stage
apktool b telkomsel_roli -o patched_roli.apk
zipalign -p -f -v 4 patched_roli.apk aligned_roli.apk
apksigner sign --ks debug.keystore --ks-pass pass:android --out final_roli.apk aligned_roli.apk # Make sure you've generated the keystore.
adb install final_roli.apk # final signed patched  aligned apk
```

[Related link](https://www.facebook.com/permalink.php?story_fbid=pfbid06v2GZ6ctwsWStEkVt9KhYLzc3Gg8sQTpks9jqnFcEpJRKaiWepB45NxH4FbBDSMSl&id=100090321692618).
