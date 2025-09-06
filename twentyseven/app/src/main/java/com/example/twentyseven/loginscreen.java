package com.example.twentyseven;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class loginscreen extends AppCompatActivity {

    int i = 0;
    EditText phno , otp;
    Button sendotp;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.login_screen);
        phno = findViewById(R.id.phonenumber);
        otp = findViewById(R.id.otp);
        sendotp = findViewById(R.id.sentotp);
        sendotp.setOnClickListener(v->sendotpfunction());
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    }

    public void sendotpfunction(){

        if(i%2==0) {
            String phonenumber = phno.getText().toString();
            Toast.makeText(this, "Otp sent to " + phonenumber, Toast.LENGTH_SHORT).show();
            otp.setEnabled(true);
            sendotp.setText("Verify OTP");
            i++;
        }
        else{
            String otptext = otp.getText().toString();
            if (otptext.equals("1234")) {
                Toast.makeText(this, "Login Successful", Toast.LENGTH_SHORT).show();
                phno.setText("");
                otp.setText("");
                i++;

                Intent intent = new Intent(this, datacollectionpage.class);
                startActivity(intent);

            } else {
                Toast.makeText(this, "Login Failed", Toast.LENGTH_SHORT).show();
                i++;
                otp.setText("");
                otp.setEnabled(false);
                sendotp.setText("Send OTP");
            }
        }
    }
}