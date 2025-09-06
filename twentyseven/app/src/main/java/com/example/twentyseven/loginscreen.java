package com.example.twentyseven;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.telephony.SmsManager;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class loginscreen extends AppCompatActivity {
    private static final String TAG = "loginscreen";
    private static final int SMS_PERMISSION_CODE = 101;

    EditText phonenumber, otp;
    Button sendotp;

    int stage = 0; // 0 = send OTP, 1 = verify OTP
    String generatedOtp = null;
    String phno = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.login_screen);

        phonenumber = findViewById(R.id.phonenumber);
        otp = findViewById(R.id.otp);
        sendotp = findViewById(R.id.sentotp);

        // restore after rotation
        if (savedInstanceState != null) {
            generatedOtp = savedInstanceState.getString("generatedOtp");
            stage = savedInstanceState.getInt("stage", 0);
            phno = savedInstanceState.getString("phno");
            if (stage == 1) sendotp.setText("Login");
        }

        sendotp.setOnClickListener(v -> {
            if (stage == 0) {
                phno = phonenumber.getText().toString().trim();
                if (phno.isEmpty()) {
                    Toast.makeText(this, "Please enter phone number", Toast.LENGTH_SHORT).show();
                    return;
                }
                // if user didn't provide '+' add +91 (only if no plus present)
                if (!phno.startsWith("+")) {
                    phno = "+91" + phno;
                }

                // Generate OTP and set state BEFORE requesting permission to avoid race
                generatedOtp = generateOtp();
                Log.d(TAG, "Generated OTP: " + generatedOtp);
                stage = 1;
                sendotp.setText("Login");

                // For debugging: show OTP in a toast (remove in production)
                Toast.makeText(this, "DEBUG OTP: " + generatedOtp, Toast.LENGTH_LONG).show();

                checkAndSendSms();
            } else { // stage == 1 -> verify
                String enteredOtp = otp.getText().toString().trim();
                if (enteredOtp.isEmpty()) {
                    Toast.makeText(this, "Please enter OTP", Toast.LENGTH_SHORT).show();
                    return;
                }

                Log.d(TAG, "Verifying. Expected: " + generatedOtp + " Entered: " + enteredOtp);

                if (generatedOtp != null && enteredOtp.equals(generatedOtp)) {
                    Toast.makeText(this, "OTP Correct ✅", Toast.LENGTH_SHORT).show();
                    // TODO: proceed to next activity
                } else {
                    Toast.makeText(this, "Invalid OTP ❌", Toast.LENGTH_SHORT).show();
                }
            }
        });

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    }

    private String generateOtp() {
        int randomPin = (int) (Math.random() * 900000) + 100000;
        return String.valueOf(randomPin);
    }

    private void checkAndSendSms() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.SEND_SMS)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.SEND_SMS}, SMS_PERMISSION_CODE);
        } else {
            sendotpfunct();
        }
    }

    public void sendotpfunct() {
        try {
            SmsManager smsManager = SmsManager.getDefault();
            smsManager.sendTextMessage(phno, null, "Your OTP is: " + generatedOtp, null, null);
            Toast.makeText(this, "OTP Sent to " + phno, Toast.LENGTH_SHORT).show();
        } catch (Exception e) {
            Log.e(TAG, "sendotpfunct error", e);
            Toast.makeText(this, "Failed to send SMS: " + e.getMessage(), Toast.LENGTH_LONG).show();
            // revert state so user can try again
            stage = 0;
            sendotp.setText("Send OTP");
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == SMS_PERMISSION_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                sendotpfunct();
            } else {
                Toast.makeText(this, "SMS Permission Denied", Toast.LENGTH_SHORT).show();
                // revert UI/state so user can try again
                stage = 0;
                sendotp.setText("Send OTP");
            }
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putString("generatedOtp", generatedOtp);
        outState.putInt("stage", stage);
        outState.putString("phno", phno);
    }
}