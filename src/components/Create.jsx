import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/users", values)
      .then(() => navigate("/"))
      .catch(err => console.error(err));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          Add New User
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-600 font-medium">Name</label>
            <input 
              type="text"
              value={values.name}
              onChange={e => setValues({...values, name: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600 font-medium">Email</label>
            <input 
              type="email"
              value={values.email}
              onChange={e => setValues({...values, email: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600 font-medium">Phone</label>
            <input 
              type="text"
              value={values.phone}
              onChange={e => setValues({...values, phone: e.target.value})}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium px-5 py-2 rounded-lg shadow transition-all duration-200"
          >
            Save User
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
