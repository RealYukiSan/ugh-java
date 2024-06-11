package hellojni

fun main() {
    Nt().stringFromJNI()
}

class Nt {
    init {
        System.loadLibrary("hello-jni")
    }
    external fun stringFromJNI();
}