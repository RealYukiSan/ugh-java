#!/bin/bash

# Cek apakah jumlah parameter kurang dari 1
if [ $# -lt 1 ]; then
    echo "Menu:"
    echo "- build"
    echo "- clangd"
    echo "- clean"
    exit 1
fi

# Cek nilai parameter pertama
case $1 in
    build)
        echo "Building..."
	SDK="$HOME/Android/Sdk/platforms/android-34/android.jar"
	aapt2 link --manifest AndroidManifest.xml -I $SDK -o samplebuild.apk
	javac -classpath $SDK -source 17 -target 17 src/dom/domain/*.java
	d8 src/dom/domain/SayingHello.class --lib $SDK
	zip -uj samplebuild.apk classes.dex
	zipalign -p -f -v 4 samplebuild.apk aligned.apk
	apksigner sign --ks debug.keystore --ks-pass pass:android --out hello.apk aligned.apk
        ;;
    clean)
        echo "Cleaning up..."
	rm -fv *.apk* src/dom/domain/*.class classes.dex 
	;;
    clangd)
        echo "Generate .clangd file..."
        # makesure to define the variable and export it on the .bashrc file
        echo -ne "CompileFlags:\n\tAdd: -I$ANDROID_SDK/ndk/26.2.11394342/toolchains/llvm/prebuilt/linux-x86_64/sysroot/usr/include" > .clangd
	;;
    *)
        echo "Invalid parameter"
        ;;
esac

