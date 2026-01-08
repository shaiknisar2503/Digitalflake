import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("Active");
  const [cats, setCats] = useState([]);
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/categories")
      .then(res => setCats(res.data));

    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        setName(res.data.name);
        setCategoryId(res.data.categoryId);
        setSubCategoryId(res.data.subCategoryId);
        setImage(res.data.image);
        setStatus(res.data.status);
      });
  }, [id]);

  useEffect(() => {
    if (categoryId) {
      axios.get("http://localhost:5000/api/subcategories")
        .then(res =>
          setSubs(res.data.filter(s => s.categoryId._id === categoryId))
        );
    }
  }, [categoryId]);

  const update = async () => {
    await axios.put(`http://localhost:5000/api/products/${id}`, {
      name, categoryId, subCategoryId, image, status
    });
    navigate("/products");
  };

  return (
    <div className="layout">
      <Sidebar active="Products" />
      <div className="main">
        <Header />

        <div className="form-page">
          <h3>Edit Product</h3>

          <div className="form-row">
            <input value={name} onChange={e => setName(e.target.value)} />

            <select value={categoryId} onChange={e => setCategoryId(e.target.value)}>
              {cats.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>

            <select value={subCategoryId} onChange={e => setSubCategoryId(e.target.value)}>
              {subs.map(s => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>

            <select value={status} onChange={e => setStatus(e.target.value)}>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="upload-box">
            <input value={image} onChange={e => setImage(e.target.value)} />
          </div>

          <div className="form-actions">
            <button className="cancel" onClick={() => navigate("/products")}>Cancel</button>
            <button className="confirm" onClick={update}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
