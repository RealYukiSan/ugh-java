package dom.domain;
import android.widget.TextView;
import android.app.Activity;

public final class SayingHello extends Activity
{
    protected @Override void onCreate(final android.os.Bundle activityState)
    {
        super.onCreate(activityState);
        final TextView textV = new TextView(this);
        textV.setText("Hello world");
        setContentView(textV);
    }
}
