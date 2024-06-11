SDK := $(HOME)/Android/Sdk/platforms/android-34/android.jar
JAVA_FILES := $(wildcard src/dom/domain/*.java)
CLASS_FILES := $(patsubst %.java, %.class, $(JAVA_FILES))
DEX_FILE := classes.dex
APK := samplebuild.apk
ALIGNED_APK := aligned.apk
SIGNED_APK := hello.apk
KEYSTORE := debug.keystore

.PHONY: menu build_apk clean

menu:
	@echo "Menu:"
	@echo "- build_apk"
	@echo "- repatch_apk (not implemented yet.)"
	@echo "- decompile_apk (not implemented yet.)"
	@echo "- clean"

build_apk: $(SIGNED_APK)

clean:
	@echo "Cleaning up..."
	@rm -fv *.apk* src/dom/domain/*.class $(DEX_FILE) $(KEYSTORE)

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
