package com.example.twentyseven;

import android.Manifest;
import android.content.pm.PackageManager;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.app.ProgressDialog;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.UUID;

public class datacollectionpage extends AppCompatActivity {

    EditText collectorId, collectorName, collectionId, speciesCommon, speciesCode, quantityKg, locationField, accuracyMeters, timestampUTC;
    Spinner harvestMethod;
    Button submitBtn;

    LocationManager locationManager;
    ProgressDialog progressDialog;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_datacollectionpage);

        // Insets fix
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        // Bind fields
        collectorId = findViewById(R.id.collectorId);
        collectorName = findViewById(R.id.collectorName);
        collectionId = findViewById(R.id.collectionId);
        speciesCommon = findViewById(R.id.speciesCommon);
        speciesCode = findViewById(R.id.speciesCode);
        quantityKg = findViewById(R.id.quantityKg);
        locationField = findViewById(R.id.location);
        accuracyMeters = findViewById(R.id.accuracyMeters);
        timestampUTC = findViewById(R.id.timestampUTC);
        harvestMethod = findViewById(R.id.harvestMethod);
        submitBtn = findViewById(R.id.submitBtn);

        // Autofill CollectionId
        collectionId.setText(UUID.randomUUID().toString());

        // Autofill timestamp
        String nowUtc = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.US).format(new Date());
        timestampUTC.setText(nowUtc);

        // Example autofill user (later replace with logged-in user info)
        collectorId.setText("COLL123");
        collectorName.setText("John Doe");

        // Location Manager
        locationManager = (LocationManager) getSystemService(LOCATION_SERVICE);

        // Setup progress dialog
        progressDialog = new ProgressDialog(this);
        progressDialog.setMessage("Fetching location...");
        progressDialog.setCancelable(false);

        // Ask permission or start updates
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 1);
        } else {
            // ✅ Always show loader before fetching location
            progressDialog.show();
            startLocationUpdates();
        }

        // Submit button (later you can send to server)
        submitBtn.setOnClickListener(v -> {
            String data =
                    "CollectorId: " + collectorId.getText().toString() + "\n" +
                            "CollectorName: " + collectorName.getText().toString() + "\n" +
                            "CollectionId: " + collectionId.getText().toString() + "\n" +
                            "SpeciesCommon: " + speciesCommon.getText().toString() + "\n" +
                            "SpeciesCode: " + speciesCode.getText().toString() + "\n" +
                            "QuantityKg: " + quantityKg.getText().toString() + "\n" +
                            "Location: " + locationField.getText().toString() + "\n" +
                            "Accuracy: " + accuracyMeters.getText().toString() + "\n" +
                            "Timestamp: " + timestampUTC.getText().toString() + "\n" +
                            "HarvestMethod: " + harvestMethod.getSelectedItem().toString();

            android.widget.Toast.makeText(this, data, android.widget.Toast.LENGTH_LONG).show();
        });
    }

    private void startLocationUpdates() {
        try {
            locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0, 0,
                    new LocationListener() {
                        @Override
                        public void onLocationChanged(Location loc) {
                            // Hide loader once we got the location
                            if (progressDialog.isShowing()) {
                                progressDialog.dismiss();
                            }
                            locationField.setText(loc.getLatitude() + ", " + loc.getLongitude());
                            accuracyMeters.setText(String.valueOf(loc.getAccuracy()));
                        }
                    });
        } catch (SecurityException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode == 1) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                Toast.makeText(this,"Go Outdoor",Toast.LENGTH_SHORT).show();
                progressDialog.show(); // ✅ Show loader after granting permission
                startLocationUpdates();
            } else {
                locationField.setText("Permission Denied");
                accuracyMeters.setText("-");
            }
        }
    }
}