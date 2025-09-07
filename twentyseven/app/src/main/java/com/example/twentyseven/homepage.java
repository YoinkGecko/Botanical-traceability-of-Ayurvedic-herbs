package com.example.twentyseven;

import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class homepage extends AppCompatActivity {

    TextView wlcusrname;
    Button newdatacollectionbutton, checkstatusbutton;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_homepage);
        wlcusrname = findViewById(R.id.welcomeusername);
        newdatacollectionbutton = findViewById(R.id.newdatacollectionbutton);
        checkstatusbutton = findViewById(R.id.checkstatusbutton);

        checkstatusbutton.setOnClickListener(v-> testserver());
        newdatacollectionbutton.setOnClickListener(v -> {
            Intent i = new Intent(this,datacollectionpage.class);
            startActivity(i);
        });

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    }

    public void testserver() {
        // Create OkHttpClient
        OkHttpClient client = new OkHttpClient();

        // Define request (replace IP with your system’s local IP if testing on phone)
        Request request = new Request.Builder()
                .url("https://910809199552.ngrok-free.app/test") // For Android Emulator use 10.0.2.2
                .build();

        // Run request asynchronously
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                runOnUiThread(() -> {
                    Toast.makeText(homepage.this, "Server Error: " + e.getMessage(), Toast.LENGTH_SHORT).show();
                });
            }


            public void onResponse(Call call, Response response) throws IOException {
                if (response.isSuccessful()) {
                    String res = response.body().string();

                    // Update UI on main thread
                    runOnUiThread(() -> {
                        Toast.makeText(homepage.this, "Response: " + res, Toast.LENGTH_SHORT).show();
                        wlcusrname.setText("Server says: " + res);
                    });
                }
            }
        });
    }
}