import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Registernewmember = () => {
  const [whoisnewmember, setWhoisnewmember] = useState("");
  const navigate = useNavigate();

  const renderForm = () => {
    switch (whoisnewmember) {
      case "farmer":
        return (
          <form className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md mt-6 animate-fadeIn">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Add New Farmer
            </h3>
            <input
              type="text"
              placeholder="Farmer Name"
              className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <select
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              defaultValue=""
            >
              <option value="" disabled>
                Select Location
              </option>
              <option value="village1">Village 1</option>
              <option value="village2">Village 2</option>
              <option value="village3">Village 3</option>
              <option value="city1">City 1</option>
            </select>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition"
            >
              Save Farmer
            </button>
          </form>
        );

      case "processor":
        return (
          <form className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md mt-6 animate-fadeIn">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Add New Processor
            </h3>
            <input
              type="text"
              placeholder="Processor Name"
              className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Factory Location"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Save Processor
            </button>
          </form>
        );

      case "lab":
        return (
          <form className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md mt-6 animate-fadeIn">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Add New Lab Test
            </h3>
            <input
              type="text"
              placeholder="Lab Name"
              className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              placeholder="Test Type"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition"
            >
              Save Lab
            </button>
          </form>
        );

      case "manufacturer":
        return (
          <form className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md mt-6 animate-fadeIn">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Add New Manufacturer
            </h3>
            <input
              type="text"
              placeholder="Manufacturer Name"
              className="w-full p-3 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              placeholder="Product Type"
              className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition"
            >
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
      {/* Back button at top-left */}
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

      {/* Dropdown */}
      <select
        value={whoisnewmember}
        onChange={(e) => setWhoisnewmember(e.target.value)}
        className="bg-white border border-gray-300 text-gray-700 rounded-md px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        <option value="">-- Select Member Type --</option>
        <option value="farmer">Farmer</option>
        <option value="processor">Processor</option>
        <option value="lab">Lab Test</option>
        <option value="manufacturer">Manufacturer</option>
      </select>

      {/* Form */}
      {renderForm()}
    </div>
  );
};

export default Registernewmember;
