import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

const Registernewmember = () => {
  const [whoisnewmember, setWhoisnewmember] = useState("");
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = "";
      let payload = {};

      if (whoisnewmember === "farmer") {
        url = "http://localhost:5001/api/farmers";
        payload = {
          FarmerName: formData.farmerName,
          FarmerPhone: formData.farmerPhone,
          District: formData.district,
          Password: formData.password,
        };
      } else if (whoisnewmember === "processor") {
        url = "http://localhost:5001/api/processors";
        payload = {
          ProcessorName: formData.processorName,
          ProcessorPhone: formData.processorPhone,
          District: formData.district,
          LicenseNo: formData.licenseNo,
          Password: formData.password,
        };
      } else if (whoisnewmember === "lab") {
        url = "http://localhost:5001/api/labtesters";
        payload = {
          LabTesterName: formData.labTesterName,
          LabTesterPhone: formData.labTesterPhone,
          District: formData.district,
          AccreditationNo: formData.accreditationNo,
          Password: formData.password,
        };
      } else if (whoisnewmember === "manufacturer") {
        url = "http://localhost:5001/api/manufacturers";
        payload = {
          ManufacturerName: formData.manufacturerName,
          ManufacturerPhone: formData.manufacturerPhone,
          District: formData.district,
          LicenseNo: formData.licenseNo,
          Password: formData.password,
        };
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to register");

      const data = await res.json();
      setSuccessMessage(`✅ ${whoisnewmember} registered successfully!`);
      setFormData({});
    } catch (err) {
      console.error(err);
      setSuccessMessage("❌ Failed to register member");
    }

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const renderForm = () => {
    switch (whoisnewmember) {
      case "farmer":
        return (
          <form onSubmit={handleSubmit} className="form-box">
            <h3 className="form-title">Add New Farmer</h3>
            <input
              type="text"
              name="farmerName"
              value={formData.farmerName || ""}
              onChange={handleChange}
              placeholder="Farmer Name"
              className="input"
            />
            <input
              type="text"
              name="farmerPhone"
              value={formData.farmerPhone || ""}
              onChange={handleChange}
              placeholder="Phone Number"
              className="input"
            />
            <input
              type="text"
              name="district"
              value={formData.district || ""}
              onChange={handleChange}
              placeholder="District"
              className="input"
            />
            <input
              type="password"
              name="password"
              value={formData.password || ""}
              onChange={handleChange}
              placeholder="Password"
              className="input"
            />
            <button type="submit" className="btn-green">
              Save Farmer
            </button>
          </form>
        );

      case "processor":
        return (
          <form onSubmit={handleSubmit} className="form-box">
            <h3 className="form-title">Add New Processor</h3>
            <input
              type="text"
              name="processorName"
              value={formData.processorName || ""}
              onChange={handleChange}
              placeholder="Processor Name"
              className="input"
            />
            <input
              type="text"
              name="processorPhone"
              value={formData.processorPhone || ""}
              onChange={handleChange}
              placeholder="Phone Number"
              className="input"
            />
            <input
              type="text"
              name="district"
              value={formData.district || ""}
              onChange={handleChange}
              placeholder="District"
              className="input"
            />
            <input
              type="text"
              name="licenseNo"
              value={formData.licenseNo || ""}
              onChange={handleChange}
              placeholder="License Number"
              className="input"
            />
            <input
              type="password"
              name="password"
              value={formData.password || ""}
              onChange={handleChange}
              placeholder="Password"
              className="input"
            />
            <button type="submit" className="btn-blue">
              Save Processor
            </button>
          </form>
        );

      case "lab":
        return (
          <form onSubmit={handleSubmit} className="form-box">
            <h3 className="form-title">Add New Lab Tester</h3>
            <input
              type="text"
              name="labTesterName"
              value={formData.labTesterName || ""}
              onChange={handleChange}
              placeholder="Lab Tester Name"
              className="input"
            />
            <input
              type="text"
              name="labTesterPhone"
              value={formData.labTesterPhone || ""}
              onChange={handleChange}
              placeholder="Phone Number"
              className="input"
            />
            <input
              type="text"
              name="district"
              value={formData.district || ""}
              onChange={handleChange}
              placeholder="District"
              className="input"
            />
            <input
              type="text"
              name="accreditationNo"
              value={formData.accreditationNo || ""}
              onChange={handleChange}
              placeholder="Accreditation Number"
              className="input"
            />
            <input
              type="password"
              name="password"
              value={formData.password || ""}
              onChange={handleChange}
              placeholder="Password"
              className="input"
            />
            <button type="submit" className="btn-purple">
              Save Lab Tester
            </button>
          </form>
        );

      case "manufacturer":
        return (
          <form onSubmit={handleSubmit} className="form-box">
            <h3 className="form-title">Add New Manufacturer</h3>
            <input
              type="text"
              name="manufacturerName"
              value={formData.manufacturerName || ""}
              onChange={handleChange}
              placeholder="Manufacturer Name"
              className="input"
            />
            <input
              type="text"
              name="manufacturerPhone"
              value={formData.manufacturerPhone || ""}
              onChange={handleChange}
              placeholder="Phone Number"
              className="input"
            />
            <input
              type="text"
              name="district"
              value={formData.district || ""}
              onChange={handleChange}
              placeholder="District"
              className="input"
            />
            <input
              type="text"
              name="licenseNo"
              value={formData.licenseNo || ""}
              onChange={handleChange}
              placeholder="License Number"
              className="input"
            />
            <input
              type="password"
              name="password"
              value={formData.password || ""}
              onChange={handleChange}
              placeholder="Password"
              className="input"
            />
            <button type="submit" className="btn-orange">
              Save Manufacturer
            </button>
          </form>
        );

      default:
        return (
          <p className="text-gray-500 italic mt-6">
            Select a member type from the dropdown above.
          </p>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 font-sans px-4 relative">
      <button
        onClick={() => navigate("/supply-chain-overview-dashboard")}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back</span>
      </button>

      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Register New Member
      </h2>

      <select
        value={whoisnewmember}
        onChange={(e) => setWhoisnewmember(e.target.value)}
        className="bg-white border border-gray-300 text-gray-700 rounded-md px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <option value="">-- Select Member Type --</option>
        <option value="farmer">Farmer</option>
        <option value="processor">Processor</option>
        <option value="lab">Lab Tester</option>
        <option value="manufacturer">Manufacturer</option>
      </select>

      {renderForm()}

      {successMessage && (
        <div className="mt-6 flex items-center gap-2 text-green-600 bg-green-100 border border-green-300 px-4 py-2 rounded-md shadow-sm">
          <CheckCircle2 className="w-5 h-5" />
          <span>{successMessage}</span>
        </div>
      )}
    </div>
  );
};

export default Registernewmember;
