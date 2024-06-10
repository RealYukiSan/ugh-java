#include <jni.h>

// did you wonder why the name sucks?
// read this: https://stackoverflow.com/questions/32470463/what-is-the-naming-convention-for-java-native-interface-method-and-module-name
jstring Java_com_example_hellojni_HelloJni_stringFromJNI(JNIEnv* env, jobject thiz)
{
  return (*env)->NewStringUTF(env, "Hello from JNI!");
}
