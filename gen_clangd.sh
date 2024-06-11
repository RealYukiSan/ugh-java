#!/bin/bash

echo "Generate .clangd file..."
# makesure to define the variable and export it on the .bashrc file
echo -ne "CompileFlags:\n\tAdd: -I$ANDROID_SDK/ndk/26.2.11394342/toolchains/llvm/prebuilt/linux-x86_64/sysroot/usr/include" > .clangd
