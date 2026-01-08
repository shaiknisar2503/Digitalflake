import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [cats, setCats] = useState([]);
  const [subs, setSubs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/categories")
      .then(res => setCats(res.data));
  }, []);

  useEffect(() => {
    if (categoryId) {
      axios.get("http://localhost:5000/api/subcategories")
        .then(res =>
          setSubs(res.data.filter(s => s.categoryId._id === categoryId))
        );
    }
  }, [categoryId]);

  const save = async () => {
    await axios.post("http://localhost:5000/api/products", {
      name, categoryId, subCategoryId
    });
    navigate("/products");
  };

  return (
    <div className="layout">
      <Sidebar active="Products" />
      <div className="main">
        <Header />

        <div className="form-page">
          <h3>Add Product</h3>

          <div className="form-row">
            <input placeholder="Product name" onChange={e => setName(e.target.value)} />

            <select onChange={e => setCategoryId(e.target.value)}>
              <option>Select Category</option>
              {cats.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>

            <select onChange={e => setSubCategoryId(e.target.value)}>
              <option>Select Subcategory</option>
              {subs.map(s => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button className="cancel" onClick={() => navigate("/products")}>Cancel</button>
            <button className="confirm" onClick={save}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
