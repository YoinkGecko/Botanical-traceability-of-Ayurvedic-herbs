package com.example.sih27app;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    EditText phoneInput, otpInput;
    Button getOtpBtn, verifyOtpBtn;

    // For demo purposes - fixed OTP
    private final String DEMO_OTP = "1234";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        phoneInput = findViewById(R.id.phoneInput);
        otpInput = findViewById(R.id.otpInput);
        getOtpBtn = findViewById(R.id.getOtpBtn);
        verifyOtpBtn = findViewById(R.id.verifyOtpBtn);

        getOtpBtn.setOnClickListener(v -> {
            String phone = phoneInput.getText().toString().trim();
            if (phone.isEmpty()) {
                Toast.makeText(this, "Enter phone number", Toast.LENGTH_SHORT).show();
            } else {
                // Always send OTP to demo number
                Toast.makeText(this, "OTP sent to +919920621584", Toast.LENGTH_SHORT).show();
                otpInput.setVisibility(View.VISIBLE);
                verifyOtpBtn.setVisibility(View.VISIBLE);
            }
        });

        verifyOtpBtn.setOnClickListener(v -> {
            String otp = otpInput.getText().toString().trim();
            if (otp.equals(DEMO_OTP)) {
                Toast.makeText(this, "Login Successful", Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(MainActivity.this, datacollection.class);
                startActivity(intent);
            } else {
                Toast.makeText(this, "Invalid OTP", Toast.LENGTH_SHORT).show();
            }
        });
    }
}