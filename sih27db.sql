CREATE DATABASE sih27db;
USE sih27db;

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
-- Farmers (Master Registration)
-- =======================================
CREATE TABLE farmers (
    FarmerID VARCHAR(50) PRIMARY KEY,
    FarmerName VARCHAR(100) NOT NULL,
    FarmerPhone VARCHAR(15) UNIQUE,
    AadhaarNumber VARCHAR(12) UNIQUE,
    Address TEXT,
    DistrictId VARCHAR(50),
    RegistrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Active','Inactive','Suspended') DEFAULT 'Active',
    CreatedByAdminId VARCHAR(50),
    FOREIGN KEY (DistrictId) REFERENCES districts(DistrictId),
    FOREIGN KEY (CreatedByAdminId) REFERENCES admins(AdminId)
);

-- Farmers Collection (Event/Batch)
CREATE TABLE farmers_collection (
    FarmerBatchID BIGINT AUTO_INCREMENT PRIMARY KEY,
    FarmerID VARCHAR(50) NOT NULL,
    HerbType VARCHAR(100) NOT NULL,
    ScientificName VARCHAR(150),
    Quantity DECIMAL(10,2) NOT NULL,
    GPSLocation VARCHAR(100) NOT NULL,
    Accuracy DECIMAL(5,2),
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Photos TEXT,
    HarvestMethod ENUM('Manual','Mechanical') DEFAULT 'Manual',
    CreatedByAdminId VARCHAR(50),
    FOREIGN KEY (FarmerID) REFERENCES farmers(FarmerID),
    FOREIGN KEY (CreatedByAdminId) REFERENCES admins(AdminId)
);

-- =======================================
-- Wild Collectors (Master)
-- =======================================
CREATE TABLE wild_collectors (
    CollectorID VARCHAR(50) PRIMARY KEY,
    CollectorName VARCHAR(100) NOT NULL,
    CollectorPhone VARCHAR(15),
    PermitNo VARCHAR(50) UNIQUE,
    Address TEXT,
    ForestDivision VARCHAR(100),
    DistrictId VARCHAR(50),
    RegistrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Active','Inactive','Suspended') DEFAULT 'Active',
    CreatedByAdminId VARCHAR(50),
    FOREIGN KEY (DistrictId) REFERENCES districts(DistrictId),
    FOREIGN KEY (CreatedByAdminId) REFERENCES admins(AdminId)
);

-- Wild Collection (Event/Batch)
CREATE TABLE wild_collection (
    CollectorBatchID BIGINT AUTO_INCREMENT PRIMARY KEY,
    CollectorID VARCHAR(50) NOT NULL,
    HerbType VARCHAR(100) NOT NULL,
    ScientificName VARCHAR(150),
    Quantity DECIMAL(10,2) NOT NULL,
    GPSLocation VARCHAR(100) NOT NULL,
    Accuracy DECIMAL(5,2),
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Photos TEXT,
    RangeName VARCHAR(100),
    SustainabilityCertificate VARCHAR(100),
    CreatedByAdminId VARCHAR(50),
    FOREIGN KEY (CollectorID) REFERENCES wild_collectors(CollectorID),
    FOREIGN KEY (CreatedByAdminId) REFERENCES admins(AdminId)
);

-- =======================================
-- Processing Facilities (Master)
-- =======================================
CREATE TABLE processing_facilities (
    FacilityID VARCHAR(50) PRIMARY KEY,
    FacilityName VARCHAR(150) NOT NULL,
    LicenseNo VARCHAR(50) UNIQUE,
    OwnerName VARCHAR(100),
    Address TEXT,
    DistrictId VARCHAR(50),
    GPSLocation VARCHAR(100),
    RegistrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Active','Inactive','Suspended') DEFAULT 'Active',
    CreatedByAdminId VARCHAR(50),
    FOREIGN KEY (DistrictId) REFERENCES districts(DistrictId),
    FOREIGN KEY (CreatedByAdminId) REFERENCES admins(AdminId)
);

-- Processing Facility Batch
CREATE TABLE processing_facility_batches (
    ProcessingBatchID BIGINT AUTO_INCREMENT PRIMARY KEY,
    FacilityID VARCHAR(50) NOT NULL,
    LinkedBatchIDs TEXT NOT NULL,
    ProcessingStep ENUM('Drying','Grinding','Extraction','Storage','Other') NOT NULL,
    Parameters TEXT,
    GPSLocation VARCHAR(100),
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Photos TEXT,
    CreatedByAdminId VARCHAR(50),
    FOREIGN KEY (FacilityID) REFERENCES processing_facilities(FacilityID),
    FOREIGN KEY (CreatedByAdminId) REFERENCES admins(AdminId)
);

-- =======================================
-- Laboratories (Master)
-- =======================================
CREATE TABLE laboratories (
    LabID VARCHAR(50) PRIMARY KEY,
    LabName VARCHAR(150) NOT NULL,
    AccreditationNo VARCHAR(50) UNIQUE,
    Address TEXT,
    DistrictId VARCHAR(50),
    ContactPerson VARCHAR(100),
    ContactPhone VARCHAR(15),
    RegistrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Active','Inactive','Suspended') DEFAULT 'Active',
    CreatedByAdminId VARCHAR(50),
    FOREIGN KEY (DistrictId) REFERENCES districts(DistrictId),
    FOREIGN KEY (CreatedByAdminId) REFERENCES admins(AdminId)
);

-- Laboratory Tests
CREATE TABLE laboratory_tests (
    TestBatchID BIGINT AUTO_INCREMENT PRIMARY KEY,
    LinkedBatchID VARCHAR(50) NOT NULL,
    LabID VARCHAR(50) NOT NULL,
    TestType ENUM('Moisture','Pesticide','DNA','Other') NOT NULL,
    TestResults TEXT,
    CertificateFile VARCHAR(255),
    PassFail ENUM('PASS','FAIL','PENDING') DEFAULT 'PENDING',
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CreatedByAdminId VARCHAR(50),
    FOREIGN KEY (LabID) REFERENCES laboratories(LabID),
    FOREIGN KEY (CreatedByAdminId) REFERENCES admins(AdminId)
);

-- =======================================
-- Manufacturers (Master)
-- =======================================
CREATE TABLE manufacturers (
    ManufacturerID VARCHAR(50) PRIMARY KEY,
    ManufacturerName VARCHAR(150) NOT NULL,
    LicenseNo VARCHAR(50) UNIQUE,
    FactoryAddress TEXT,
    DistrictId VARCHAR(50),
    ContactPerson VARCHAR(100),
    ContactPhone VARCHAR(15),
    RegistrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Active','Inactive','Suspended') DEFAULT 'Active',
    CreatedByAdminId VARCHAR(50),
    FOREIGN KEY (DistrictId) REFERENCES districts(DistrictId),
    FOREIGN KEY (CreatedByAdminId) REFERENCES admins(AdminId)
);

-- Manufacturer Batches
CREATE TABLE manufacturer_batches (
    ManufacturingBatchID BIGINT AUTO_INCREMENT PRIMARY KEY,
    ManufacturerID VARCHAR(50) NOT NULL,
    LinkedBatchIDs TEXT NOT NULL,
    ProductName VARCHAR(150) NOT NULL,
    ProductForm ENUM('Tablet','Powder','Oil','Capsule','Other') NOT NULL,
    Ingredients TEXT NOT NULL,
    PackagingInfo TEXT,
    QRCodeID VARCHAR(100) UNIQUE,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CreatedByAdminId VARCHAR(50),
    FOREIGN KEY (ManufacturerID) REFERENCES manufacturers(ManufacturerID),
    FOREIGN KEY (CreatedByAdminId) REFERENCES admins(AdminId)
);

-- =======================================
-- Distributors / Retailers (Master)
-- =======================================
CREATE TABLE distributors (
    DistributorID VARCHAR(50) PRIMARY KEY,
    DistributorName VARCHAR(150) NOT NULL,
    LicenseNo VARCHAR(50),
    WarehouseAddress TEXT,
    DistrictId VARCHAR(50),
    ContactPerson VARCHAR(100),
    ContactPhone VARCHAR(15),
    RegistrationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Active','Inactive','Suspended') DEFAULT 'Active',
    CreatedByAdminId VARCHAR(50),
    FOREIGN KEY (DistrictId) REFERENCES districts(DistrictId),
    FOREIGN KEY (CreatedByAdminId) REFERENCES admins(AdminId)
);

-- Distribution Batches
CREATE TABLE distribution_batches (
    DistributionBatchID BIGINT AUTO_INCREMENT PRIMARY KEY,
    DistributorID VARCHAR(50) NOT NULL,
    LinkedManufacturingBatchIDs TEXT NOT NULL,
    ShipmentDetails TEXT,
    StorageConditions TEXT,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CreatedByAdminId VARCHAR(50),
    FOREIGN KEY (DistributorID) REFERENCES distributors(DistributorID),
    FOREIGN KEY (CreatedByAdminId) REFERENCES admins(AdminId)
);