package hemlo;

public class HelloJni
{
    public static void main(String[] args) {
        System.out.println(new HelloJni().stringFromJNI());
    }

    private native String stringFromJNI();

    static {
        System.loadLibrary("hello-jni");
    }
}