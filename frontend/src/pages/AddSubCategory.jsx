import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function AddSubCategory() {
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState("");
  const [cats, setCats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/categories")
      .then(res => setCats(res.data));
  }, []);

  const save = async () => {
    await axios.post("http://localhost:5000/api/subcategories", {
      name, categoryId, image
    });
    navigate("/subcategory");
  };

  return (
    <div className="layout">
      <Sidebar active="Subcategory" />
      <div className="main">
        <Header />

        <div className="form-page">
          <h3>Add Sub Category</h3>

          <div className="form-row">
            <input placeholder="Sub Category" onChange={e => setName(e.target.value)} />
            <select onChange={e => setCategoryId(e.target.value)}>
              <option>Select Category</option>
              {cats.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="upload-box">
            <input placeholder="Image URL" onChange={e => setImage(e.target.value)} />
          </div>

          <div className="form-actions">
            <button className="cancel" onClick={() => navigate("/subcategory")}>Cancel</button>
            <button className="confirm" onClick={save}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
