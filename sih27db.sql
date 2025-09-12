Create Database sih27;
use sih27;


-- ================================
-- Admin Registration Table
-- ================================
CREATE TABLE admins (
    AdminID BIGINT AUTO_INCREMENT PRIMARY KEY,
    AdminName VARCHAR(100) NOT NULL,
    AdminPhone VARCHAR(15) UNIQUE NOT NULL,
    APass VARCHAR(255) NOT NULL,
    ARole ENUM('SuperAdmin','DistrictAdmin') NOT NULL,
    District VARCHAR(100) NOT NULL
);


-- ================================
-- Admin Functions (Audit Log)
-- ================================
CREATE TABLE admin_functions (
    ActionID BIGINT AUTO_INCREMENT PRIMARY KEY,
    AdminID BIGINT NOT NULL,                -- Who performed the action
    Action ENUM('PENDING','APPROVED','REJECTED','ADDED_TO_BC') DEFAULT 'PENDING',
    TargetType ENUM('Farmer','Processor','LabTester','Manufacturer') NOT NULL,
    TargetID BIGINT NOT NULL,               -- ID of the farmer/processor/labtester/manufacturer
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
    Password VARCHAR(255) -- optional, if login required
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
    Fid VARCHAR(50) NOT NULL,
    TypeOfHerb VARCHAR(100) NOT NULL,
    HarvestedBy ENUM('Manual','Mechanical') DEFAULT 'Manual',
    Quantity DECIMAL(10,2) NOT NULL,
    Location VARCHAR(100),
    LocationAccuracy DECIMAL(5,2),
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    District VARCHAR(100),
    Photos TEXT,
    Status ENUM('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
	ApprovedBy VARCHAR(50) -- AdminID who approved
);

-- ================================
-- Processor Data Collection
-- ================================
CREATE TABLE processor_data_collection (
    PbatchID BIGINT AUTO_INCREMENT PRIMARY KEY,
    Pid VARCHAR(50) NOT NULL,
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
    ApprovedBy VARCHAR(50), -- AdminID who approved
    FOREIGN KEY (LinkedFarmerBatchID) REFERENCES farmer_data_collection(FbatchID)
);



-- ================================
-- Lab Tester Data Collection
-- ================================
CREATE TABLE labtester_data_collection (
    LbatchID BIGINT AUTO_INCREMENT PRIMARY KEY,
    LabID VARCHAR(50) NOT NULL,
    LinkedBatchID BIGINT NOT NULL, -- from processor_data_collection
    TestType ENUM('Moisture','Pesticide','DNA','Other') NOT NULL,
    TestResults TEXT, -- JSON or plain text
    PassFailStatus ENUM('PASS','FAIL','PENDING') DEFAULT 'PENDING',
    CertificateFile VARCHAR(255), -- file path or URL
    Location VARCHAR(100),
    LocationAccuracy DECIMAL(5,2),
    District VARCHAR(100),
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Photos TEXT,
    Status ENUM('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
    ApprovedBy VARCHAR(50), -- AdminID who approved
    FOREIGN KEY (LinkedBatchID) REFERENCES processor_data_collection(PbatchID)
);

-- ================================
-- Manufacturer Data Collection
-- ================================
CREATE TABLE manufacturer_data_collection (
    MbatchID BIGINT AUTO_INCREMENT PRIMARY KEY,
    ManufacturerID VARCHAR(50) NOT NULL,
    LinkedBatchIDs TEXT NOT NULL, -- can hold multiple labtester batch IDs
    ProductName VARCHAR(150) NOT NULL,
    ProductForm ENUM('Tablet','Powder','Oil','Capsule','Other') NOT NULL,
    Ingredients TEXT, -- structured list with proportions
    PackagingInfo TEXT,
    WeightFinal DECIMAL(10,2),
    QRCodeID VARCHAR(100) UNIQUE,
    Location VARCHAR(100),
    District VARCHAR(100),
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Photos TEXT,
    Status ENUM('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
    ApprovedBy VARCHAR(50) -- AdminID who approved
);