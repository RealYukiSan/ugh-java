package hemlo

external fun stringFromJNI(): String;

fun main() {
    System.loadLibrary("hello-jni")
    println(stringFromJNI())
}
