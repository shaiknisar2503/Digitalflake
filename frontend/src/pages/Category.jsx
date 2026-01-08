import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DeleteModal from "../components/DeleteModal";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const loadData = async () => {
    const res = await axios.get("http://localhost:5000/api/categories");
    setCategories(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="layout">
      <Sidebar active="Category" />
      <div className="main">
        <Header />

        <div className="page">
          <div className="page-header">
            <h3>Category</h3>
            <div className="actions">
              <input placeholder="Search..." />
              <button className="add">Add New</button>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Category name</th>
                <th>Image</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c, i) => (
                <tr key={c._id}>
                  <td>{i + 1}</td>
                  <td>{c.name}</td>
                  <td>
                    <img src={c.image} alt="" className="thumb" />
                  </td>
                  <td className={c.status === "Active" ? "active" : "inactive"}>
                    {c.status}
                  </td>
                  <td>
                    ✏️ 🗑️
                    <span onClick={() => setSelectedId(c._id)}> 🗑️</span>
                  </td>
                </tr>
              ))}

              <td>
  <span onClick={() => navigate(`/category/edit/${c._id}`)}>✏️</span>
  <span onClick={() => setSelectedId(c._id)}> 🗑️</span>
</td>

            </tbody>
          </table>
        </div>

        {selectedId && (
          <DeleteModal
            onClose={() => setSelectedId(null)}
            onConfirm={async () => {
              await axios.delete(
                `http://localhost:5000/api/categories/${selectedId}`
              );
              setSelectedId(null);
              loadData();
            }}
          />
        )}
      </div>
    </div>
  );
}

<button className="add" onClick={() => navigate("/category/add")}>
  Add New
</button>

