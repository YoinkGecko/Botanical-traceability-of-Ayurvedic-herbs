package com.example.sih27proto;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class Farmershomepage extends AppCompatActivity {

    TextView showfarmername;
    Button gotonewcollection;
    RecyclerView recyclerView;
    CollectionAdapter adapter;
    List<CollectionModel> collectionList = new ArrayList<>();
    OkHttpClient client = new OkHttpClient();

    private Handler handler = new Handler(Looper.getMainLooper());
    private Runnable fetchRunnable;
    private static final long REFRESH_INTERVAL = 3000; // 3 seconds

    private void startAutoFetch(String farmerId) {
        fetchRunnable = new Runnable() {
            @Override
            public void run() {
                fetchCollections(farmerId);
                handler.postDelayed(this, REFRESH_INTERVAL);
            }
        };
        handler.post(fetchRunnable); // start first run
    }

    private void stopAutoFetch() {
        if (handler != null && fetchRunnable != null) {
            handler.removeCallbacks(fetchRunnable);
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        stopAutoFetch(); // stop auto-fetch when activity is destroyed
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_farmershomepage);

        showfarmername = findViewById(R.id.farmername);
        gotonewcollection = findViewById(R.id.newcollectionbut);
        recyclerView = findViewById(R.id.collectionRecyclerView);

        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        adapter = new CollectionAdapter(collectionList);
        recyclerView.setAdapter(adapter);

        SharedPreferences prefs = getSharedPreferences("farmerdatapref", MODE_PRIVATE);
        String farmerName = prefs.getString("FarmerName", "");
        String farmerId = prefs.getString("FarmerID", "");
        startAutoFetch(farmerId);
        showfarmername.setText(farmerName);

        gotonewcollection.setOnClickListener(v -> gotonewcollection());

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        // fetch data from server
        fetchCollections(farmerId);
    }

    private void fetchCollections(String farmerId) {
        // 👇 Yahan apna API URL daal
        String url = "https://cgq4646h-5001.inc1.devtunnels.ms/farmer/collections?farmerId=" + farmerId;

        Request request = new Request.Builder()
                .url(url)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                new Handler(Looper.getMainLooper()).post(() ->
                        Toast.makeText(Farmershomepage.this, "Failed to load data", Toast.LENGTH_SHORT).show()
                );
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (response.isSuccessful()) {
                    try {
                        String resStr = response.body().string();
                        JSONArray arr = new JSONArray(resStr);

                        collectionList.clear();
                        for (int i = 0; i < arr.length(); i++) {
                            JSONObject obj = arr.getJSONObject(i);

                            int batchId = obj.optInt("FbatchID", 0);
                            String status = obj.optString("Status", "N/A");
                            String type = obj.optString("TypeOfHerb", "N/A");
                            String timestamp = obj.optString("Timestamp", "N/A");
                            String approvedBy = obj.optString("ApprovedBy", "N/A");

                            collectionList.add(new CollectionModel(batchId, status, type, timestamp, approvedBy));
                        }

                        new Handler(Looper.getMainLooper()).post(() -> adapter.notifyDataSetChanged());

                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        });
    }

    public void gotonewcollection() {
        Intent i = new Intent(Farmershomepage.this, farmernewcollectionpage.class);
        startActivity(i);
    }
}