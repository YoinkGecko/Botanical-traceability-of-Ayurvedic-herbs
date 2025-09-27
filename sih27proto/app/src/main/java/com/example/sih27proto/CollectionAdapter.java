package com.example.sih27proto;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;
import java.util.Locale;

public class CollectionAdapter extends RecyclerView.Adapter<CollectionAdapter.CollectionViewHolder> {

    private List<CollectionModel> collectionList;

    public CollectionAdapter(List<CollectionModel> collectionList) {
        this.collectionList = collectionList;
    }

    @NonNull
    @Override
    public CollectionViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        // Ensure you are using the correct list item XML here, e.g., list_item_collection
        // I will use 'item_collection' as in your provided code
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_collection, parent, false);
        return new CollectionViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull CollectionViewHolder holder, int position) {
        CollectionModel item = collectionList.get(position);

        // --- Data Binding ---
        // Note: I'm adjusting the string formatting to match the clean UI design from previous steps
        holder.tvBatchId.setText("Batch ID: " + item.getFbatchID());
        holder.tvTypeOfHerb.setText(item.getTypeOfHerb()); // Just the herb name
        holder.tvTimestamp.setText(item.getTimestamp() != null ? item.getTimestamp().split("T")[0] : "N/A"); // Show only date
        holder.tvApprovedBy.setText(item.getApprovedBy() == null || item.getApprovedBy().isEmpty() ? "N/A" : item.getApprovedBy());

        // --- Status Logic ---
        String status = item.getStatus().toUpperCase(Locale.ROOT);
        holder.tvStatus.setText(status); // Set status text

        // **CONDITIONAL LOGIC TO SET BACKGROUND COLOR**
        switch (status) {
            case "PENDING":
                // Set the yellow background drawable
                holder.tvStatus.setBackgroundResource(R.drawable.status_pending_background);
                break;
            case "REJECTED":
                // Set the red background drawable
                holder.tvStatus.setBackgroundResource(R.drawable.status_rejected_background);
                break;
            case "APPROVED":
                // Set the green background drawable
                holder.tvStatus.setBackgroundResource(R.drawable.status_approved_background);
                break;
            default:
                // Default light grey/transparent background for any other status
                holder.tvStatus.setBackgroundResource(R.drawable.status_default_background);
                break;
        }

    }

    @Override
    public int getItemCount() {
        return collectionList.size();
    }

    public static class CollectionViewHolder extends RecyclerView.ViewHolder {
        // Ensure variable names match the IDs in your list item XML
        TextView tvBatchId, tvStatus, tvTypeOfHerb, tvTimestamp, tvApprovedBy;

        public CollectionViewHolder(@NonNull View itemView) {
            super(itemView);
            tvBatchId = itemView.findViewById(R.id.tvBatchId);
            tvStatus = itemView.findViewById(R.id.tvStatus);
            tvTypeOfHerb = itemView.findViewById(R.id.tvTypeOfHerb);
            tvTimestamp = itemView.findViewById(R.id.tvTimestamp);
            tvApprovedBy = itemView.findViewById(R.id.tvApprovedBy);
        }
    }
}