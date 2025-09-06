package com.example.sih27app;

import android.os.Bundle;
import android.view.View;
import android.widget.*;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.UUID;

public class datacollection extends AppCompatActivity {

    LinearLayout stage1Layout;
    ScrollView stage2Layout;

    EditText collectorName, collectorId, collectionId;
    EditText speciesCode, quantityKg, geoLatitude, geoLongitude, accuracyMeters, timestampUtc;
    Spinner harvestMethod;
    Button nextBtn, submitBtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_datacollection);

        // Stage 1
        stage1Layout = findViewById(R.id.stage1Layout);
        collectorName = findViewById(R.id.collectorName);
        collectorId = findViewById(R.id.collectorId);
        collectionId = findViewById(R.id.collectionId);
        nextBtn = findViewById(R.id.nextBtn);

        // Auto-generate UUID
        collectionId.setText(UUID.randomUUID().toString());

        // Stage 2
        stage2Layout = findViewById(R.id.stage2Layout);
        speciesCode = findViewById(R.id.speciesCode);
        quantityKg = findViewById(R.id.quantityKg);
        geoLatitude = findViewById(R.id.geoLatitude);
        geoLongitude = findViewById(R.id.geoLongitude);
        accuracyMeters = findViewById(R.id.accuracyMeters);
        timestampUtc = findViewById(R.id.timestampUtc);
        harvestMethod = findViewById(R.id.harvestMethod);
        submitBtn = findViewById(R.id.submitBtn);

        // Populate timestamp
        String currentTime = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.getDefault()).format(new Date());
        timestampUtc.setText(currentTime);

        // Populate spinner
        ArrayAdapter<String> adapter = new ArrayAdapter<>(this,
                android.R.layout.simple_spinner_item,
                new String[]{"manual", "mechanical", "wild"});
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        harvestMethod.setAdapter(adapter);

        // Switch Stage 1 -> Stage 2
        nextBtn.setOnClickListener(v -> {
            if (collectorName.getText().toString().isEmpty() ||
                    collectorId.getText().toString().isEmpty()) {
                Toast.makeText(this, "Please fill collector info", Toast.LENGTH_SHORT).show();
                return;
            }
            stage1Layout.setVisibility(View.GONE);
            stage2Layout.setVisibility(View.VISIBLE);
        });

        // Final submit
        submitBtn.setOnClickListener(v -> {
            if (speciesCode.getText().toString().isEmpty() ||
                    quantityKg.getText().toString().isEmpty() ||
                    geoLatitude.getText().toString().isEmpty() ||
                    geoLongitude.getText().toString().isEmpty()) {
                Toast.makeText(this, "Please fill all required crop details", Toast.LENGTH_SHORT).show();
                return;
            }

            Toast.makeText(this, "Data submitted successfully ✅", Toast.LENGTH_LONG).show();
        });
    }
}