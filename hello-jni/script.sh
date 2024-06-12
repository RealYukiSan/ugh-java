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
	ndk-build NDK_DEBUG=0
	mv libs lib
	SDK="$HOME/Android/Sdk/platforms/android-34/android.jar"
	aapt2 compile --dir apk/res -o res.zip
	aapt2 link --manifest apk/AndroidManifest.xml -I $SDK res.zip -o samplebuild.apk
	javac -classpath $SDK -source 17 -target 17 apk/src/com/example/hellojni/*.java
	d8 apk/src/com/example/hellojni/*.class --lib $SDK
	zip -ur samplebuild.apk lib
	zip -uj samplebuild.apk classes.dex
	zipalign -p -f -v 4 samplebuild.apk aligned.apk
	keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Lorem, OU=Lorem Department, O=Ipsum Corporation, L=Anytown, ST=CA, C=US"
	apksigner sign --ks debug.keystore --ks-pass pass:android --out hello-jni.apk aligned.apk
        ;;
    clean)
        echo "Cleaning up..."
		mv lib libs
		ndk-build clean
		rm -fv *.apk* apk/src/com/example/hellojni/*.class classes.dex apk/res.zip debug.keystore
	;;
    *)
        echo "Invalid parameter"
        ;;
esac

