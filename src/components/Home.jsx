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
      <h1 className="text-4xl font-semibold mb-6 text-gray-800">
        User Management
      </h1>

      <Link
        to={"/create"}
        className="mb-6 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow transition-all duration-200"
      >
        + Add User
      </Link>

      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-6 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-800">
              <th className="p-3 border">Id</th>
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
                  i % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="p-3 border text-center">{d.id}</td>
                <td className="p-3 border">{d.name}</td>
                <td className="p-3 border">{d.email}</td>
                <td className="p-3 border">{d.phone}</td>
                <td className="p-3 border flex justify-center space-x-2">
                  <Link
                    to={`/read/${d.id}`}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded shadow transition"
                  >
                    View
                  </Link>
                  <Link
                    to={`/update/${d.id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded shadow transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(d.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
