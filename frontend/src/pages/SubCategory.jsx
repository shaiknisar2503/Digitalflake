import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DeleteModal from "../components/DeleteModal";

export default function SubCategory() {
  const [data, setData] = useState([]);
  const [delId, setDelId] = useState(null);
  const navigate = useNavigate();

  const load = async () => {
    const res = await axios.get("http://localhost:5000/api/subcategories");
    setData(res.data);
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="layout">
      <Sidebar active="Subcategory" />
      <div className="main">
        <Header />

        <div className="page">
          <div className="page-header">
            <h3>Sub Category</h3>
            <div>
              <input placeholder="Search..." />
              <button className="add" onClick={() => navigate("/subcategory/add")}>
                Add New
              </button>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Sub Category name</th>
                <th>Category name</th>
                <th>Image</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((s, i) => (
                <tr key={s._id}>
                  <td>{i + 1}</td>
                  <td>{s.name}</td>
                  <td>{s.categoryId?.name}</td>
                  <td><img src={s.image} className="thumb" /></td>
                  <td className={s.status === "Active" ? "active" : "inactive"}>
                    {s.status}
                  </td>
                  <td>
                    <span onClick={() => navigate(`/subcategory/edit/${s._id}`)}>✏️</span>
                    <span onClick={() => setDelId(s._id)}> 🗑️</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {delId && (
            <DeleteModal
              onClose={() => setDelId(null)}
              onConfirm={async () => {
                await axios.delete(
                  `http://localhost:5000/api/subcategories/${delId}`
                );
                setDelId(null);
                load();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
