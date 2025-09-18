CREATE DATABASE sih27;
USE sih27;

-- ================================
-- Admin Registration Table
-- ================================
CREATE TABLE admins (
    AdminID BIGINT AUTO_INCREMENT PRIMARY KEY,
    AdminName VARCHAR(100) NOT NULL,
    AdminPhone VARCHAR(15) UNIQUE NOT NULL,
    APass VARCHAR(255) NOT NULL,
    ARole ENUM('SuperAdmin','DistrictAdmin') NOT NULL,
    District VARCHAR(100) NOT NULL,
    status ENUM('ACTIVE','SUSPENDED') DEFAULT 'ACTIVE' 
);

-- ================================
-- Admin Functions (Audit Log)
-- ================================
CREATE TABLE admin_functions (
    ActionID BIGINT AUTO_INCREMENT PRIMARY KEY,
    AdminID BIGINT NOT NULL, -- Who performed the action
    Action ENUM('PENDING','APPROVED','REJECTED','ADDED_TO_BC') DEFAULT 'PENDING',
    TargetType ENUM('Farmer','Processor','LabTester','Manufacturer') NOT NULL,
    TargetID BIGINT NOT NULL, -- ID of the farmer/processor/labtester/manufacturer
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (AdminID) REFERENCES admins(AdminID)
);

-- ================================
-- Farmer Registration Table
-- ================================
CREATE TABLE farmers (
    FarmerID BIGINT AUTO_INCREMENT PRIMARY KEY,
    FarmerName VARCHAR(100) NOT NULL,
    FarmerPhone VARCHAR(15) UNIQUE NOT NULL,
    District VARCHAR(100) NOT NULL,
    Password VARCHAR(255)
);

-- ================================
-- Processor Registration Table
-- ================================
CREATE TABLE processors (
    ProcessorID BIGINT AUTO_INCREMENT PRIMARY KEY,
    ProcessorName VARCHAR(100) NOT NULL,
    ProcessorPhone VARCHAR(15) UNIQUE NOT NULL,
    LicenseNo VARCHAR(50),
    District VARCHAR(100) NOT NULL,
    Password VARCHAR(255)
);

-- ================================
-- Lab Tester Registration Table
-- ================================
CREATE TABLE labtesters (
    LabTesterID BIGINT AUTO_INCREMENT PRIMARY KEY,
    LabTesterName VARCHAR(100) NOT NULL,
    LabTesterPhone VARCHAR(15) UNIQUE NOT NULL,
    AccreditationNo VARCHAR(50),
    District VARCHAR(100) NOT NULL,
    Password VARCHAR(255)
);

-- ================================
-- Manufacturer Registration Table
-- ================================
CREATE TABLE manufacturers (
    ManufacturerID BIGINT AUTO_INCREMENT PRIMARY KEY,
    ManufacturerName VARCHAR(100) NOT NULL,
    ManufacturerPhone VARCHAR(15) UNIQUE NOT NULL,
    LicenseNo VARCHAR(50),
    District VARCHAR(100) NOT NULL,
    Password VARCHAR(255)
);

-- ================================
-- Data Collection Tables
-- ================================

-- ================================
-- Farmer Data Collection
-- ================================
CREATE TABLE farmer_data_collection (
    FbatchID BIGINT AUTO_INCREMENT PRIMARY KEY,
    Fid BIGINT NOT NULL,
    TypeOfHerb VARCHAR(100) NOT NULL,
    HarvestedBy ENUM('Manual','Mechanical') DEFAULT 'Manual',
    Quantity DECIMAL(10,2) NOT NULL,
    Location VARCHAR(100),
    LocationAccuracy DECIMAL(5,2),
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    District VARCHAR(100),
    Photos TEXT,
    Status ENUM('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
    ApprovedBy BIGINT DEFAULT NULL,
    FOREIGN KEY (Fid) REFERENCES farmers(FarmerID),
    FOREIGN KEY (ApprovedBy) REFERENCES admins(AdminID)
);

-- ================================
-- Processor Data Collection
-- ================================
CREATE TABLE processor_data_collection (
    PbatchID BIGINT AUTO_INCREMENT PRIMARY KEY,
    Pid BIGINT NOT NULL,
    LinkedFarmerBatchID BIGINT NOT NULL,
    ProcessingStep ENUM('Drying','Grinding','Extraction','Storage','Other') NOT NULL,
    WeightGivenByFarmer DECIMAL(10,2),
    WeightBeforeProc DECIMAL(10,2),
    WeightAfterProcessing DECIMAL(10,2),
    Parameters TEXT,
    Location VARCHAR(100),
    LocationAccuracy DECIMAL(5,2),
    District VARCHAR(100),
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Photos TEXT,
    Status ENUM('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
    ApprovedBy BIGINT DEFAULT NULL,
    FOREIGN KEY (Pid) REFERENCES processors(ProcessorID),
    FOREIGN KEY (LinkedFarmerBatchID) REFERENCES farmer_data_collection(FbatchID),
    FOREIGN KEY (ApprovedBy) REFERENCES admins(AdminID)
);

-- ================================
-- Lab Tester Data Collection
-- ================================
CREATE TABLE labtester_data_collection (
    LbatchID BIGINT AUTO_INCREMENT PRIMARY KEY,
    LabID BIGINT NOT NULL,
    LinkedBatchID BIGINT NOT NULL, -- from processor_data_collection
    TestType ENUM('Moisture','Pesticide','DNA','Other') NOT NULL,
    TestResults TEXT,
    DNASequence TEXT,
    PassFailStatus ENUM('PASS','FAIL','PENDING') DEFAULT 'PENDING',
    CertificateFile VARCHAR(255),
    Location VARCHAR(100), 
    
    LocationAccuracy DECIMAL(5,2),
    District VARCHAR(100),
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Photos TEXT,
    Status ENUM('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
    ApprovedBy BIGINT DEFAULT NULL,
    FOREIGN KEY (LabID) REFERENCES labtesters(LabTesterID),
    FOREIGN KEY (LinkedBatchID) REFERENCES processor_data_collection(PbatchID),
    FOREIGN KEY (ApprovedBy) REFERENCES admins(AdminID)
);


-- ================================
-- Manufacturer Data Collection
-- ================================
CREATE TABLE manufacturer_data_collection (
    MbatchID BIGINT AUTO_INCREMENT PRIMARY KEY,
    ManufacturerID BIGINT NOT NULL,
    ProductName VARCHAR(150) NOT NULL,
    ProductForm ENUM('Tablet','Powder','Oil','Capsule','Other') NOT NULL,
    Ingredients TEXT,
    PackagingInfo TEXT,
    WeightFinal DECIMAL(10,2),
    QRCodeID VARCHAR(100) UNIQUE,
    Location VARCHAR(100),
    District VARCHAR(100),
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Photos TEXT,
    Status ENUM('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
    ApprovedBy BIGINT DEFAULT NULL,
    FOREIGN KEY (ManufacturerID) REFERENCES manufacturers(ManufacturerID),
    FOREIGN KEY (ApprovedBy) REFERENCES admins(AdminID)
);

-- ================================
-- Junction Table for Manufacturer ↔ LabTester Batches
-- ================================
CREATE TABLE manufacturer_labtester_link (
    MbatchID BIGINT,
    LbatchID BIGINT,
    PRIMARY KEY (MbatchID, LbatchID),
    FOREIGN KEY (MbatchID) REFERENCES manufacturer_data_collection(MbatchID),
    FOREIGN KEY (LbatchID) REFERENCES labtester_data_collection(LbatchID)
);