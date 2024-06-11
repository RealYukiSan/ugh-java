#!/bin/bash

# Cek apakah jumlah parameter kurang dari 1
if [ $# -lt 1 ]; then
    echo "Menu:"
    echo "- build"
    echo "- clean"
    exit 1
fi

# Cek nilai parameter pertama
case $1 in
    build)
        echo "Building..."
	ndk-build -d --trace NDK_DEBUG=1
	mv libs lib
	SDK="$HOME/Android/Sdk/platforms/android-34/android.jar"
	aapt2 compile --dir res -o res.zip
	aapt2 link --manifest AndroidManifest.xml -I $SDK res.zip -o samplebuild.apk
	javac -classpath $SDK -source 17 -target 17 src/com/example/hellojni/*.java
	d8 src/com/example/hellojni/*.class --lib $SDK
	zip -ur samplebuild.apk lib
	zip -uj samplebuild.apk classes.dex
	zipalign -p -f -v 4 samplebuild.apk aligned.apk
	apksigner sign --ks debug.keystore --ks-pass pass:android --out hello-jni.apk aligned.apk
        ;;
    clean)
        echo "Cleaning up..."
		mv lib libs
		ndk-build clean
		rm -fv *.apk* src/com/example/hellojni/*.class classes.dex res.zip debug.keystore
	;;
    *)
        echo "Invalid parameter"
        ;;
esac

