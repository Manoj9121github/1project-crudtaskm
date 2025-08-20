import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then(() => {
        setData(data.filter((user) => user.id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">User Management</h1>

      <Link
        to={"/create"}
        className="mb-6 bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow-md transition-all duration-200"
      >
        + Add User
      </Link>

      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-6 overflow-x-auto">
        <table className="w-full border border-gray-200 text-gray-800">
          <thead>
            <tr className="bg-blue-100 text-gray-900 uppercase text-sm font-semibold">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr
                key={i}
                className={`${
                  i % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                } hover:bg-gray-200 transition`}
              >
                <td className="p-3 border text-center font-medium">{d.id}</td>
                <td className="p-3 border">{d.name}</td>
                <td className="p-3 border">{d.email}</td>
                <td className="p-3 border">{d.phone}</td>
                <td className="p-3 border flex justify-center space-x-2">
                  <Link
                    to={`/read/${d.id}`}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded shadow-sm transition"
                  >
                    View
                  </Link>
                  <Link
                    to={`/update/${d.id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded shadow-sm transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(d.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow-sm transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
