package com.example.sendsmsapp;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.telephony.SmsManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

public class MainActivity extends AppCompatActivity {

    EditText phonenumber, herb, quantity, harvestedBy;
    Button sendButton;
    final int PERMISSION_REQUEST_CODE = 101;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        phonenumber = findViewById(R.id.phonenumber);
        herb = findViewById(R.id.herb);
        quantity = findViewById(R.id.quantity);
        harvestedBy = findViewById(R.id.HarvestedBy);
        sendButton = findViewById(R.id.sendButton);

        // Request SMS permission if not granted
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.SEND_SMS)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.SEND_SMS}, PERMISSION_REQUEST_CODE);
        }

        sendButton.setOnClickListener(v -> {
            String phone = phonenumber.getText().toString().trim();
            String herbType = herb.getText().toString().trim();
            String qty = quantity.getText().toString().trim();
            String method = harvestedBy.getText().toString().trim();

            if (phone.isEmpty() || herbType.isEmpty() || qty.isEmpty() || method.isEmpty()) {
                Toast.makeText(this, "Please fill all fields", Toast.LENGTH_SHORT).show();
            } else {
                sendSMS("+919987222276", "Herb: " + herbType + "\nQuantity: " + qty + " kg\nHarvested By: " + method);
            }
        });
    }

    private void sendSMS(String phone, String message) {
        try {
            SmsManager smsManager = SmsManager.getDefault();
            smsManager.sendTextMessage(phone, null, message, null, null);
            Toast.makeText(this, "Data sent successfully", Toast.LENGTH_SHORT).show();
        } catch (Exception e) {
            Toast.makeText(this, "Failed to send SMS: " + e.getMessage(), Toast.LENGTH_LONG).show();
            e.printStackTrace();
        }
    }
}