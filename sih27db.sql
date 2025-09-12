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
    Photos TEXT
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
    Photos TEXT,
    Timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);