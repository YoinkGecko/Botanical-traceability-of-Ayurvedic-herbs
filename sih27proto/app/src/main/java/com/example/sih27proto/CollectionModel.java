package com.example.sih27proto;

public class CollectionModel {
    private int fbatchID;
    private String status;
    private String typeOfHerb;
    private String timestamp;
    private String approvedBy;

    public CollectionModel(int fbatchID, String status, String typeOfHerb, String timestamp, String approvedBy) {
        this.fbatchID = fbatchID;
        this.status = status;
        this.typeOfHerb = typeOfHerb;
        this.timestamp = timestamp;
        this.approvedBy = approvedBy;
    }

    public int getFbatchID() { return fbatchID; }
    public String getStatus() { return status; }
    public String getTypeOfHerb() { return typeOfHerb; }
    public String getTimestamp() { return timestamp; }
    public String getApprovedBy() { return approvedBy; }
}