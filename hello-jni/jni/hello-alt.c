// alternative-way

#include "../java/hemlo_HelloJni.h"

JNIEXPORT char* JNICALL Java_HelloJNI_stringFromJNI(JNIEnv *env, jobject obj) {
    return "Hello, World from C!\n";
}
