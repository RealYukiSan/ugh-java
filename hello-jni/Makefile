SDK := $(HOME)/Android/Sdk/platforms/android-34/android.jar
JAVA_FILES := $(wildcard apk/src/com/example/hellojni/*.java)
CLASS_FILES := $(patsubst %.java, %.class, $(JAVA_FILES))
DEX_FILE := classes.dex
NATIVE_FILE := hello-jni.c
APK := samplebuild.apk
ALIGNED_APK := aligned.apk
SIGNED_APK := hello_jni.apk
KEYSTORE := debug.keystore
JAVA_PATH := java/hemlo
KOTLIN_PATH := kotlin/hellojni
JAVA_CLASS := HelloJni.class
HEADER_PATH := /usr/lib/jvm/java-22-openjdk
NATIVE_PATH := ./jni
KOTLIN_FILE := HelloJni.kt
JAVA_FILE := HelloJni.java
LIB_FILE := libhello-jni.so
JAR_FILE := hello_java.jar

.PHONY: menu build_apk run_kotlin run_java clean

menu:
	@echo "Menu:"
	@echo "- build_apk, build android application"
	@echo "- run_kotlin, run compiled kotlin program"
	@echo "- run_java, run compiled java program"
	@echo "- clean"

build_apk: $(SIGNED_APK)

run_kotlin: compile_native compile_kotlin
	@java -Djava.library.path="./jni" -jar ./hello_kt.jar

run_java: compile_native compile_java jar
	@java -Djava.library.path="./jni" -jar $(JAR_FILE)

compile_java: $(JAVA_PATH)/$(JAVA_FILE)
	@javac $<

compile_kotlin:
	@kotlinc $(KOTLIN_PATH)/$(KOTLIN_FILE) -include-runtime -d hello_kt.jar

compile_native: $(NATIVE_PATH)/$(LIB_FILE)

$(NATIVE_PATH)/$(LIB_FILE): $(NATIVE_PATH)/$(NATIVE_FILE)
	gcc -I$(HEADER_PATH)/include/ -I$(HEADER_PATH)/include/linux/ -o $(NATIVE_PATH)/$(LIB_FILE) -shared -fPIC $<

jar: $(JAR_FILE)

$(JAR_FILE): $(JAVA_PATH)/$(JAVA_CLASS)
	@jar --create --file $(JAR_FILE) --main-class="hemlo.HelloJni" -C ./java hemlo/$(JAVA_CLASS)

clean:
	@echo "Cleaning up..."
	@rm -frv *.apk* apk/src/com/example/hellojni/*.class $(DEX_FILE) $(KEYSTORE) *.jar res.zip libs obj lib

# The below section are for Android

$(APK): apk/AndroidManifest.xml $(SDK)
	@echo "Building..."
	@ndk-build NDK_DEBUG=0
	@mv libs lib
	@aapt2 compile --dir apk/res -o res.zip
	@aapt2 link --manifest apk/AndroidManifest.xml -I $(SDK) res.zip -o $(APK)

$(CLASS_FILES): $(JAVA_FILES) $(SDK)
	@javac -classpath $(SDK) -source 17 -target 17 $(JAVA_FILES)

$(DEX_FILE): $(CLASS_FILES)
	@d8 apk/src/com/example/hellojni/*.class --lib $(SDK)

$(ALIGNED_APK): $(APK) $(DEX_FILE)
	zip -ur $(APK) lib
	@zip -uj $(APK) $(DEX_FILE)
	@zipalign -p -f -v 4 $(APK) $(ALIGNED_APK)

$(KEYSTORE):
	@keytool -genkey -v -keystore $(KEYSTORE) -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Lorem, OU=Lorem Department, O=Ipsum Corporation, L=Anytown, ST=CA, C=US"

$(SIGNED_APK): $(ALIGNED_APK) $(KEYSTORE)
	@apksigner sign --ks $(KEYSTORE) --ks-pass pass:android --out $(SIGNED_APK) $(ALIGNED_APK)

.DEFAULT_GOAL := menu
