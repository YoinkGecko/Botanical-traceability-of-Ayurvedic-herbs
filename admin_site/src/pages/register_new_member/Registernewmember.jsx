import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle, UserPlus } from "lucide-react";

// Individual form component
const MemberForm = ({ type, district, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    licenseNo: "",
    accreditationNo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(type, formData);
    // Reset form after submit
    setFormData({
      name: "",
      phone: "",
      password: "",
      licenseNo: "",
      accreditationNo: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <UserPlus className="w-5 h-5 text-indigo-500" />
        {type === "farmer"
          ? "Add New Farmer"
          : type === "processor"
          ? "Add New Processor"
          : type === "lab"
          ? "Add New Lab Tester"
          : "Add New Manufacturer"}
      </h3>

      {/* Fields for each member type */}
      {(type === "farmer" ||
        type === "processor" ||
        type === "lab" ||
        type === "manufacturer") && (
        <>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={
              type === "farmer"
                ? "Farmer Name"
                : type === "processor"
                ? "Processor Name"
                : type === "lab"
                ? "Lab Tester Name"
                : "Manufacturer Name"
            }
            className="input w-full mb-3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="input w-full mb-3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </>
      )}

      {type === "processor" || type === "manufacturer" ? (
        <input
          type="text"
          name="licenseNo"
          value={formData.licenseNo}
          onChange={handleChange}
          placeholder="License Number"
          className="input w-full mb-3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      ) : null}

      {type === "lab" ? (
        <input
          type="text"
          name="accreditationNo"
          value={formData.accreditationNo}
          onChange={handleChange}
          placeholder="Accreditation Number"
          className="input w-full mb-3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      ) : null}

      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        className="input w-full mb-3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <p className="text-sm text-gray-600 mb-3">
        District: <b>{district}</b>
      </p>

      <button
        type="submit"
        className={`w-full py-2 px-4 rounded-lg text-white font-medium transition ${
          type === "farmer"
            ? "bg-green-500 hover:bg-green-600"
            : type === "processor"
            ? "bg-blue-500 hover:bg-blue-600"
            : type === "lab"
            ? "bg-purple-500 hover:bg-purple-600"
            : "bg-orange-500 hover:bg-orange-600"
        }`}
      >
        {type === "farmer"
          ? "Save Farmer"
          : type === "processor"
          ? "Save Processor"
          : type === "lab"
          ? "Save Lab Tester"
          : "Save Manufacturer"}
      </button>
    </form>
  );
};

const Registernewmember = () => {
  const [whoisnewmember, setWhoisnewmember] = useState("");
  const [district, setDistrict] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const phone = localStorage.getItem("phonenumber");
    if (phone) {
      fetch(`http://localhost:5001/api/admin/district/${phone}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.district) setDistrict(data.district);
        })
        .catch((err) => console.error("Error fetching district:", err));
    }
  }, []);

  const handleFormSubmit = async (type, data) => {
    try {
      let url = "";
      let payload = {};

      if (type === "farmer") {
        url = "http://localhost:5001/api/farmers";
        payload = {
          FarmerName: data.name,
          FarmerPhone: data.phone,
          District: district,
          Password: data.password,
        };
      } else if (type === "processor") {
        url = "http://localhost:5001/api/processors";
        payload = {
          ProcessorName: data.name,
          ProcessorPhone: data.phone,
          District: district,
          LicenseNo: data.licenseNo,
          Password: data.password,
        };
      } else if (type === "lab") {
        url = "http://localhost:5001/api/labtesters";
        payload = {
          LabTesterName: data.name,
          LabTesterPhone: data.phone,
          District: district,
          AccreditationNo: data.accreditationNo,
          Password: data.password,
        };
      } else if (type === "manufacturer") {
        url = "http://localhost:5001/api/manufacturers";
        payload = {
          ManufacturerName: data.name,
          ManufacturerPhone: data.phone,
          District: district,
          LicenseNo: data.licenseNo,
          Password: data.password,
        };
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to register");

      setStatusMessage({
        type: "success",
        text: `${type} registered successfully!`,
      });
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: "error", text: "Failed to register member" });
    }

    setTimeout(() => setStatusMessage(null), 4000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-gray-100 font-sans px-4 relative">
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
        className="bg-white border border-gray-300 text-gray-700 rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-6"
      >
        <option value="">-- Select Member Type --</option>
        <option value="farmer">Farmer</option>
        <option value="processor">Processor</option>
        <option value="lab">Lab Tester</option>
        <option value="manufacturer">Manufacturer</option>
      </select>

      {whoisnewmember && (
        <MemberForm
          type={whoisnewmember}
          district={district}
          onSubmit={handleFormSubmit}
        />
      )}

      {statusMessage && (
        <div
          className={`fixed bottom-6 right-6 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg animate-fadeIn 
          ${
            statusMessage.type === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <XCircle className="w-5 h-5" />
          )}
          <span className="font-medium">{statusMessage.text}</span>
        </div>
      )}
    </div>
  );
};

export default Registernewmember;
