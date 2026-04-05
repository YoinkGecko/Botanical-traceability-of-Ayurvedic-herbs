package com.example.sih27proto;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;

import android.location.Location;
import android.content.SharedPreferences;

import androidx.activity.EdgeToEdge;

import org.json.JSONObject;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class farmernewcollectionpage extends AppCompatActivity {

    EditText farmeridobj, typeofherbobj, harvestedbyobj, quantityobj, locationobj, locationaccuracyobj, districtobj, photosobj;
    Button btnAdd;
    FusedLocationProviderClient fusedLocationClient;


    OkHttpClient client = new OkHttpClient();
    public static final MediaType JSON = MediaType.get("application/json; charset=utf-8");

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_farmernewcollectionpage);

        // Initialize views
        farmeridobj = findViewById(R.id.farmerid);
        districtobj = findViewById(R.id.district);
        locationobj = findViewById(R.id.location);
        locationaccuracyobj = findViewById(R.id.locationAccuracy);

        typeofherbobj = findViewById(R.id.typeOfHerb);
        harvestedbyobj = findViewById(R.id.harvestedBy);
        quantityobj = findViewById(R.id.quantity);
        photosobj = findViewById(R.id.photos);

        btnAdd = findViewById(R.id.btnAddData);
        btnAdd.setOnClickListener(v -> sendDataToServer());

        // Load saved farmer info
        SharedPreferences prefs = getSharedPreferences("farmerdatapref", MODE_PRIVATE);
        String farmerId = prefs.getString("FarmerID", "");
        String district = prefs.getString("District", "");
        farmeridobj.setText(farmerId);
        districtobj.setText(district);

        // Location setup
        fusedLocationClient = LocationServices.getFusedLocationProviderClient(this);
        getCurrentLocation();

    }

    private void getCurrentLocation() {
        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 101);
            return;
        }

        com.google.android.gms.location.LocationRequest locationRequest =
                com.google.android.gms.location.LocationRequest.create()
                        .setPriority(com.google.android.gms.location.LocationRequest.PRIORITY_HIGH_ACCURACY)
                        .setInterval(2000)
                        .setFastestInterval(1000);

        fusedLocationClient.requestLocationUpdates(locationRequest,
                new com.google.android.gms.location.LocationCallback() {
                    @Override
                    public void onLocationResult(com.google.android.gms.location.LocationResult locationResult) {
                        if (locationResult == null) return;

                        for (Location location : locationResult.getLocations()) {
                            if (location != null) {
                                double lat = location.getLatitude();
                                double lon = location.getLongitude();
                                float accuracy = location.getAccuracy();

                                locationobj.setText(lat + ", " + lon);
                                locationaccuracyobj.setText(String.valueOf(accuracy));
                            }
                        }
                    }
                },
                getMainLooper());
    }

    // Send Data to Server
    private void sendDataToServer() {
        try {
            JSONObject json = new JSONObject();
            json.put("FarmerID", farmeridobj.getText().toString().trim());
            json.put("TypeOfHerb", typeofherbobj.getText().toString().trim());
            json.put("HarvestedBy", harvestedbyobj.getText().toString().trim());
            json.put("Quantity", quantityobj.getText().toString().trim());
            json.put("Location", locationobj.getText().toString().trim());
            json.put("LocationAccuracy", locationaccuracyobj.getText().toString().trim());
            json.put("District", districtobj.getText().toString().trim());
            json.put("Photos", photosobj.getText().toString().trim());

            RequestBody body = RequestBody.create(json.toString(), JSON);

            Request request = new Request.Builder()
                    .url("https://cgq4646h-5001.inc1.devtunnels.ms/add-collection")
                    .post(body)
                    .build();

            client.newCall(request).enqueue(new Callback() {
                @Override
                public void onFailure(@NonNull Call call, @NonNull IOException e) {
                    runOnUiThread(() ->
                            Toast.makeText(farmernewcollectionpage.this, "Failed: " + e.getMessage(), Toast.LENGTH_LONG).show()
                    );
                }

                @Override
                public void onResponse(@NonNull Call call, @NonNull Response response) throws IOException {
                    String resStr = response.body().string();

                    runOnUiThread(() -> {
                        Toast.makeText(farmernewcollectionpage.this, "Server: " + resStr, Toast.LENGTH_LONG).show();

                        // ✅ Agar response sahi hai (200 status code)
                        if (response.isSuccessful()) {
                            clearFields();
                        }
                    });
                }
            });

        } catch (Exception e) {
            e.printStackTrace();
            Toast.makeText(this, "Error preparing data", Toast.LENGTH_SHORT).show();
        }
    }

    // ✅ Helper function to clear all EditTexts
    private void clearFields() {
        typeofherbobj.setText("");
        harvestedbyobj.setText("");
        quantityobj.setText("");
        locationobj.setText("");
        locationaccuracyobj.setText("");
        districtobj.setText("");
        photosobj.setText("");
        // FarmerID clear mat karna agar woh permanent hai,
        // warna yeh bhi empty karna hai toh niche line uncomment kar do
        // farmeridobj.setText("");
        Intent back = new Intent(this, Farmershomepage.class);
        startActivity(back);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == 101) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                getCurrentLocation();
            } else {
                Toast.makeText(this, "Location permission denied", Toast.LENGTH_SHORT).show();
            }
        }
    }
}