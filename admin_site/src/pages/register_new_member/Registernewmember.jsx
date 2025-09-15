import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, XCircle, UserPlus } from "lucide-react";

const Registernewmember = () => {
  const [whoisnewmember, setWhoisnewmember] = useState("");
  const [formData, setFormData] = useState({
    farmerName: "",
    farmerPhone: "",
    password: "",
    processorName: "",
    processorPhone: "",
    licenseNo: "",
    labTesterName: "",
    labTesterPhone: "",
    accreditationNo: "",
    manufacturerName: "",
    manufacturerPhone: "",
    district: "",
  });
  const [statusMessage, setStatusMessage] = useState(null);
  const [district, setDistrict] = useState("");
  const navigate = useNavigate();

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

      setFormData((prev) => {
        const resetData = { district };
        Object.keys(prev).forEach((key) => {
          if (key !== "district") resetData[key] = "";
        });
        return resetData;
      });
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
      className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md"
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

      <FormWrapper
        title={
          whoisnewmember === "farmer"
            ? "Add New Farmer"
            : whoisnewmember === "processor"
            ? "Add New Processor"
            : whoisnewmember === "lab"
            ? "Add New Lab Tester"
            : whoisnewmember === "manufacturer"
            ? "Add New Manufacturer"
            : "Select Member Type"
        }
        buttonText={
          whoisnewmember === "farmer"
            ? "Save Farmer"
            : whoisnewmember === "processor"
            ? "Save Processor"
            : whoisnewmember === "lab"
            ? "Save Lab Tester"
            : whoisnewmember === "manufacturer"
            ? "Save Manufacturer"
            : "Submit"
        }
        buttonColor={
          whoisnewmember === "farmer"
            ? "bg-green-500 hover:bg-green-600"
            : whoisnewmember === "processor"
            ? "bg-blue-500 hover:bg-blue-600"
            : whoisnewmember === "lab"
            ? "bg-purple-500 hover:bg-purple-600"
            : whoisnewmember === "manufacturer"
            ? "bg-orange-500 hover:bg-orange-600"
            : "bg-gray-400 cursor-not-allowed"
        }
      >
        {/* Only inputs change conditionally */}
        {whoisnewmember === "farmer" && (
          <>
            <InputField
              type="text"
              name="farmerName"
              placeholder="Farmer Name"
            />
            <InputField
              type="text"
              name="farmerPhone"
              placeholder="Phone Number"
            />
            <InputField
              type="password"
              name="farmerPassword"
              placeholder="Password"
            />
          </>
        )}
        {whoisnewmember === "processor" && (
          <>
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
          </>
        )}
        {whoisnewmember === "lab" && (
          <>
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
          </>
        )}
        {whoisnewmember === "manufacturer" && (
          <>
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
          </>
        )}
      </FormWrapper>

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
