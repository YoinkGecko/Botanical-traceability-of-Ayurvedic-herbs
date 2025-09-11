create database sih27db;
use sih27db;

-- =======================================
-- Districts (Lookup Table)
-- =======================================
CREATE TABLE districts (
    DistrictId VARCHAR(50) PRIMARY KEY,
    DistrictName VARCHAR(100) NOT NULL,
    StateName VARCHAR(100) NOT NULL,
    ZoneName VARCHAR(100),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =======================================
-- Admins Table
-- =======================================
CREATE TABLE admins (
    AdminId VARCHAR(50) PRIMARY KEY,
    AdminName VARCHAR(100) NOT NULL,
    AdminPhone VARCHAR(15) UNIQUE NOT NULL,
    AdminEmail VARCHAR(100) UNIQUE,
    AdminAddhaarNumber VARCHAR(12) UNIQUE,
    AdminType ENUM('SuperAdmin','RegionalAdmin') NOT NULL,
    AdminPass VARCHAR(255) NOT NULL,
    AdminLocation VARCHAR(255),
    DistrictId VARCHAR(50),
    LastLoginTime TIMESTAMP,
    FailedLoginAttempts INT DEFAULT 0,
    AccountStatus ENUM('Active','Inactive','Suspended') DEFAULT 'Active',
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CreatedBy VARCHAR(50),
    FOREIGN KEY (DistrictId) REFERENCES districts(DistrictId)
);

-- =======================================
-- Farmers (Cultivated Collection)
-- =======================================
CREATE TABLE farmers_collection (
    FarmerBatchID BIGINT AUTO_INCREMENT PRIMARY KEY,
    FarmerName VARCHAR(100) NOT NULL,
    FarmerPhone VARCHAR(15),
    FarmerID VARCHAR(50),
    HerbType VARCHAR(100) NOT NULL,
    ScientificName VARCHAR(150),
    Quantity DECIMAL(10,2) NOT NULL,
    GPSLocation VARCHAR(100) NOT NULL,
    Accuracy DECIMAL(5,2),
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Photos TEXT,
    DistrictId VARCHAR(50),
    HarvestMethod ENUM('Manual','Mechanical') DEFAULT 'Manual',
    CreatedByAdminId VARCHAR(50),
    FOREIGN KEY (DistrictId) REFERENCES districts(DistrictId),
    FOREIGN KEY (CreatedByAdminId) REFERENCES admins(AdminId)
);

-- =======================================
-- Wild Collectors (Forest / Natural Habitat Collection)
-- =======================================
CREATE TABLE wild_collection (
    CollectorBatchID BIGINT AUTO_INCREMENT PRIMARY KEY,
    CollectorName VARCHAR(100) NOT NULL,
    CollectorPermitNo VARCHAR(50) NOT NULL,
    HerbType VARCHAR(100) NOT NULL,
    ScientificName VARCHAR(150),
    Quantity DECIMAL(10,2) NOT NULL,
    GPSLocation VARCHAR(100) NOT NULL,
    Accuracy DECIMAL(5,2),
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Photos TEXT,
    ForestDivision VARCHAR(100),
    RangeName VARCHAR(100),
    SustainabilityCertificate VARCHAR(100),
    CreatedByAdminId VARCHAR(50),
    FOREIGN KEY (CreatedByAdminId) REFERENCES admins(AdminId)
);

-- =======================================
-- Processing Facilities
-- =======================================
CREATE TABLE processing_facility (
    ProcessingBatchID BIGINT AUTO_INCREMENT PRIMARY KEY,
    LinkedBatchIDs TEXT NOT NULL,
    ProcessingStep ENUM('Drying','Grinding','Extraction','Storage','Other') NOT NULL,
    Parameters TEXT,
    FacilityID VARCHAR(50) NOT NULL,
    LicenseNo VARCHAR(50),
    GPSLocation VARCHAR(100),
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Photos TEXT,
    CreatedByAdminId VARCHAR(50),
    FOREIGN KEY (CreatedByAdminId) REFERENCES admins(AdminId)
);

-- =======================================
-- Testing Laboratories
-- =======================================
CREATE TABLE laboratory_tests (
    TestBatchID BIGINT AUTO_INCREMENT PRIMARY KEY,
    LinkedBatchID VARCHAR(50) NOT NULL,
    LabID VARCHAR(50) NOT NULL,
    AccreditationNo VARCHAR(50),
    TestType ENUM('Moisture','Pesticide','DNA','Other') NOT NULL,
    TestResults TEXT,
    CertificateFile VARCHAR(255),
    PassFail ENUM('PASS','FAIL','PENDING') DEFAULT 'PENDING',
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CreatedByAdminId VARCHAR(50),
    FOREIGN KEY (CreatedByAdminId) REFERENCES admins(AdminId)
);

-- =======================================
-- Manufacturers (Formulation Stage)
-- =======================================
CREATE TABLE manufacturers (
    ManufacturingBatchID BIGINT AUTO_INCREMENT PRIMARY KEY,
    LinkedBatchIDs TEXT NOT NULL,
    ProductName VARCHAR(150) NOT NULL,
    ProductForm ENUM('Tablet','Powder','Oil','Capsule','Other') NOT NULL,
    Ingredients TEXT NOT NULL,
    PackagingInfo TEXT,
    QRCodeID VARCHAR(100) UNIQUE,
    FactoryID VARCHAR(50) NOT NULL,
    LicenseNo VARCHAR(50),
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CreatedByAdminId VARCHAR(50),
    FOREIGN KEY (CreatedByAdminId) REFERENCES admins(AdminId)
);

-- =======================================
-- Distributors / Retailers
-- =======================================
CREATE TABLE distribution (
    DistributionBatchID BIGINT AUTO_INCREMENT PRIMARY KEY,
    LinkedManufacturingBatchIDs TEXT NOT NULL,
    ShipmentDetails TEXT,
    WarehouseID VARCHAR(50),
    StoreID VARCHAR(50),
    StorageConditions TEXT,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CreatedByAdminId VARCHAR(50),
    FOREIGN KEY (CreatedByAdminId) REFERENCES admins(AdminId)
);