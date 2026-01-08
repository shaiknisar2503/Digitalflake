import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DeleteModal from "../components/DeleteModal";

export default function Products() {
  const [data, setData] = useState([]);
  const [delId, setDelId] = useState(null);
  const navigate = useNavigate();

  const load = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setData(res.data);
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="layout">
      <Sidebar active="Products" />
      <div className="main">
        <Header />

        <div className="page">
          <div className="page-header">
            <h3>Product</h3>
            <div>
              <input placeholder="Search..." />
              <button className="add" onClick={() => navigate("/products/add")}>
                Add New
              </button>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Product name</th>
                <th>Image</th>
                <th>Sub Category</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((p, i) => (
                <tr key={p._id}>
                  <td>{i + 1}</td>
                  <td>{p.name}</td>
                  <td><img src={p.image} className="thumb" /></td>
                  <td>{p.subCategoryId?.name}</td>
                  <td>{p.categoryId?.name}</td>
                  <td className={p.status === "Active" ? "active" : "inactive"}>
                    {p.status}
                  </td>
                  <td>
                    <span onClick={() => navigate(`/products/edit/${p._id}`)}>✏️</span>
                    <span onClick={() => setDelId(p._id)}> 🗑️</span>
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
                  `http://localhost:5000/api/products/${delId}`
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
