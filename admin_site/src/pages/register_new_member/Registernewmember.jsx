import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle, UserPlus } from "lucide-react";

const Registernewmember = () => {
  const [whoisnewmember, setWhoisnewmember] = useState("");
  const [formData, setFormData] = useState({});
  const [statusMessage, setStatusMessage] = useState(null);
  const [district, setDistrict] = useState("");
  const navigate = useNavigate();

  // 🔹 Fetch admin district on load
  useEffect(() => {
    const phone = localStorage.getItem("phonenumber");
    if (phone) {
      fetch(`http://localhost:5001/api/admin/district/${phone}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.district) {
            setDistrict(data.district);
            setFormData((prev) => ({ ...prev, district: data.district }));
          }
        })
        .catch((err) => console.error("Error fetching district:", err));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
          District: district,
          Password: formData.password,
        };
      } else if (whoisnewmember === "processor") {
        url = "http://localhost:5001/api/processors";
        payload = {
          ProcessorName: formData.processorName,
          ProcessorPhone: formData.processorPhone,
          District: district,
          LicenseNo: formData.licenseNo,
          Password: formData.password,
        };
      } else if (whoisnewmember === "lab") {
        url = "http://localhost:5001/api/labtesters";
        payload = {
          LabTesterName: formData.labTesterName,
          LabTesterPhone: formData.labTesterPhone,
          District: district,
          AccreditationNo: formData.accreditationNo,
          Password: formData.password,
        };
      } else if (whoisnewmember === "manufacturer") {
        url = "http://localhost:5001/api/manufacturers";
        payload = {
          ManufacturerName: formData.manufacturerName,
          ManufacturerPhone: formData.manufacturerPhone,
          District: district,
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

      setStatusMessage({
        type: "success",
        text: `${whoisnewmember} registered successfully!`,
      });
      setFormData({ district });
    } catch (err) {
      console.error(err);
      setStatusMessage({ type: "error", text: " Failed to register member" });
    }

    setTimeout(() => setStatusMessage(null), 4000);
  };

  const InputField = ({ type, name, placeholder }) => (
    <input
      type={type}
      name={name}
      value={formData[name] || ""}
      onChange={handleChange}
      placeholder={placeholder}
      className="input w-full mb-3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />
  );

  const FormWrapper = ({ title, children, buttonText, buttonColor }) => (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md animate-fadeIn"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <UserPlus className="w-5 h-5 text-indigo-500" />
        {title}
      </h3>
      {children}
      <p className="text-sm text-gray-600 mb-3">
        District: <b>{district}</b>
      </p>
      <button
        type="submit"
        className={`w-full py-2 px-4 rounded-lg text-white font-medium transition ${buttonColor}`}
      >
        {buttonText}
      </button>
    </form>
  );

  const renderForm = () => {
    switch (whoisnewmember) {
      case "farmer":
        return (
          <FormWrapper
            title="Add New Farmer"
            buttonText="Save Farmer"
            buttonColor="bg-green-500 hover:bg-green-600"
          >
            <InputField
              type="text"
              name="farmerName"
              placeholder="Farmer Name"
            />{" "}
            <InputField
              type="text"
              name="farmerPhone"
              placeholder="Phone Number"
            />{" "}
            <InputField
              type="password"
              name="password"
              placeholder="Password"
            />{" "}
          </FormWrapper>
        );
      case "processor":
        return (
          <FormWrapper
            title="Add New Processor"
            buttonText="Save Processor"
            buttonColor="bg-blue-500 hover:bg-blue-600"
          >
            <InputField
              type="text"
              name="processorName"
              placeholder="Processor Name"
            />
            <InputField
              type="text"
              name="processorPhone"
              placeholder="Phone Number"
            />
            <InputField
              type="text"
              name="licenseNo"
              placeholder="License Number"
            />
            <InputField
              type="password"
              name="password"
              placeholder="Password"
            />
          </FormWrapper>
        );
      case "lab":
        return (
          <FormWrapper
            title="Add New Lab Tester"
            buttonText="Save Lab Tester"
            buttonColor="bg-purple-500 hover:bg-purple-600"
          >
            <InputField
              type="text"
              name="labTesterName"
              placeholder="Lab Tester Name"
            />
            <InputField
              type="text"
              name="labTesterPhone"
              placeholder="Phone Number"
            />
            <InputField
              type="text"
              name="accreditationNo"
              placeholder="Accreditation Number"
            />
            <InputField
              type="password"
              name="password"
              placeholder="Password"
            />
          </FormWrapper>
        );
      case "manufacturer":
        return (
          <FormWrapper
            title="Add New Manufacturer"
            buttonText="Save Manufacturer"
            buttonColor="bg-orange-500 hover:bg-orange-600"
          >
            <InputField
              type="text"
              name="manufacturerName"
              placeholder="Manufacturer Name"
            />
            <InputField
              type="text"
              name="manufacturerPhone"
              placeholder="Phone Number"
            />
            <InputField
              type="text"
              name="licenseNo"
              placeholder="License Number"
            />
            <InputField
              type="password"
              name="password"
              placeholder="Password"
            />
          </FormWrapper>
        );
      default:
        return (
          <p className="text-gray-500 italic mt-6 text-center">
            Select a member type from the dropdown above.
          </p>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-gray-100 font-sans px-4 relative">
      {/* Back button */}
      <button
        onClick={() => navigate("/supply-chain-overview-dashboard")}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-700 hover:text-gray-900 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back</span>
      </button>

      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Register New Member
      </h2>

      {/* Dropdown */}
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

      {/* Form render */}
      {renderForm()}

      {/* Success/Error Toast */}
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
