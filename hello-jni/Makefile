SDK := $(HOME)/Android/Sdk/platforms/android-34/android.jar
JAVA_FILES := $(wildcard src/dom/domain/*.java)
CLASS_FILES := $(patsubst %.java, %.class, $(JAVA_FILES))
DEX_FILE := classes.dex
NATIVE_FILE := hello-jni.c
APK := samplebuild.apk
ALIGNED_APK := aligned.apk
SIGNED_APK := hello_jni.apk
KEYSTORE := debug.keystore
JAVA_DIR := java/hemlo
KOTLIN_DIR := kotlin/hemlo
JAVA_CLASS := HelloJni.class
HEADER_PATH := /usr/lib/jvm/java-22-openjdk

.PHONY: menu build_apk run_kotlin run_java clean

menu:
	@echo "Menu:"
	@echo "- build_apk, build android application"
	@echo "- run_kotlin, run compiled kotlin program"
	@echo "- run_java, run compiled java program"
	@echo "- clean"

build_apk: $(SIGNED_APK)

run_kotlin: compile_native compile_kotlin

run_java: compile_native compile_java jar

compile_native: $(NATIVE_FILE)
	gcc -I$(HEADER_PATH)/include/ -I$(HEADER_PATH)/include/linux/ -o libhello-jni.so -shared -fPIC $<

clean:
	@echo "Cleaning up..."
	@rm -fv *.apk* src/dom/domain/*.class $(DEX_FILE) $(KEYSTORE)

$(JAVA_CLASS): $(JAVA_DIR)/HelloJni.java
	@javac $<

$(JAR_FILE): $(JAVA_CLASS)
$(JAR_FILE): $(CLASS_DIR)/Hello.class
	# 2.1 alternative:
	# $(JAR) --create --file hemlo.jar --main-class="hemlo" $<

# The below section are for Android

$(APK): AndroidManifest.xml $(SDK)
	@echo "Building..."
	@aapt2 link --manifest AndroidManifest.xml -I $(SDK) -o $(APK)

$(CLASS_FILES): $(JAVA_FILES) $(SDK)
	@javac -classpath $(SDK) -source 17 -target 17 $(JAVA_FILES)

$(DEX_FILE): $(CLASS_FILES)
	@d8 src/dom/domain/SayingHello.class --lib $(SDK)

$(ALIGNED_APK): $(APK) $(DEX_FILE)
	@zip -uj $(APK) $(DEX_FILE)
	@zipalign -p -f -v 4 $(APK) $(ALIGNED_APK)

$(KEYSTORE):
	@keytool -genkey -v -keystore $(KEYSTORE) -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Lorem, OU=Lorem Department, O=Ipsum Corporation, L=Anytown, ST=CA, C=US"

$(SIGNED_APK): $(ALIGNED_APK) $(KEYSTORE)
	@apksigner sign --ks $(KEYSTORE) --ks-pass pass:android --out $(SIGNED_APK) $(ALIGNED_APK)

.DEFAULT_GOAL := menu
