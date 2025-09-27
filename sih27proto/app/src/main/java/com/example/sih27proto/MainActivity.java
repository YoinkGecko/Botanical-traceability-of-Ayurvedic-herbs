package com.example.sih27proto;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import org.json.JSONObject;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class MainActivity extends AppCompatActivity {

    EditText phonenumberobj, otp;
    Button submitotp;
    OkHttpClient client = new OkHttpClient();
    public static final MediaType JSON = MediaType.get("application/json; charset=utf-8");

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        phonenumberobj = findViewById(R.id.phonenumber);
        otp = findViewById(R.id.otp);
        submitotp = findViewById(R.id.submitotp);

        submitotp.setOnClickListener(v -> submitotp());

        // Apply padding for system bars
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    }

    public void submitotp() {
        // Get input values
        String phoneText = phonenumberobj.getText().toString().trim();
        String otpText = otp.getText().toString().trim();

        // Validate phone number
        if (phoneText.isEmpty() || phoneText.length() != 10) {
            phonenumberobj.setError("Invalid Phone Number");
            return;
        }

        // Validate OTP is not empty
        if (otpText.isEmpty()) {
            otp.setError("Enter OTP");
            return;
        }

        // Call API to check phone number in DB
        checkPhoneInDB(phoneText, otpText);
    }

    private void checkPhoneInDB(String phone, String otpText) {
        try {
            JSONObject json = new JSONObject();
            json.put("phone", phone);

            RequestBody body = RequestBody.create(json.toString(), JSON);
            Request request = new Request.Builder()
                    .url("https://9rp3msd0-5001.inc1.devtunnels.ms/check-phone") // Emulator: 10.0.2.2, real device: use PC LAN IP
                    .post(body)
                    .build();

            client.newCall(request).enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    runOnUiThread(() ->
                            Toast.makeText(MainActivity.this, "Server error: " + e.getMessage(), Toast.LENGTH_SHORT).show()
                    );
                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {
                    String resStr = response.body().string();
                    runOnUiThread(() -> {
                        try {
                            JSONObject resJson = new JSONObject(resStr);

                            boolean success = resJson.getBoolean("success");
                            boolean exists = resJson.getBoolean("exists");

                            if (success && exists) {
                                // Check if "data" exists to avoid crash
                                if (resJson.has("data")) {
                                    JSONObject farmerData = resJson.getJSONObject("data");

                                    // Save farmer data to SharedPreferences
                                    SharedPreferences prefs = getSharedPreferences("farmerdatapref", MODE_PRIVATE);
                                    SharedPreferences.Editor editor = prefs.edit();
                                    editor.putString("FarmerID", farmerData.optString("FarmerID", ""));
                                    editor.putString("FarmerName", farmerData.optString("FarmerName", ""));
                                    editor.putString("FarmerPhone", farmerData.optString("FarmerPhone", ""));
                                    editor.putString("District", farmerData.optString("District", ""));
                                    editor.apply();

                                    // Validate OTP
                                    if (otpText.equals("1234")) {
                                        Intent i = new Intent(MainActivity.this, Farmershomepage.class);

                                        startActivity(i);
                                    } else {
                                        otp.setError("Invalid OTP");
                                    }
                                    Toast.makeText(MainActivity.this, "farmer data received", Toast.LENGTH_SHORT).show();
                                } else {
                                    Toast.makeText(MainActivity.this, "No farmer data received", Toast.LENGTH_SHORT).show();
                                }
                            } else {
                                Toast.makeText(MainActivity.this, "Phone number not registered", Toast.LENGTH_SHORT).show();
                            }

                        } catch (Exception e) {
                            Log.e("API_ERROR", "Parse error", e);
                        }
                    });
                }
            });

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}