import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("Active");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/categories/${id}`)
      .then(res => {
        setName(res.data.name);
        setImage(res.data.image);
        setStatus(res.data.status);
      });
  }, [id]);

  const updateCategory = async () => {
    await axios.put(`http://localhost:5000/api/categories/${id}`, {
      name,
      image,
      status
    });
    navigate("/category");
  };

  return (
    <div className="layout">
      <Sidebar active="Category" />
      <div className="main">
        <Header />

        <div className="form-page">
          <h3>Edit Category</h3>

          <div className="form-row">
            <div>
              <label>Category Name</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div>
              <label>Upload Image</label>
              <div className="upload-box">
                {image && <img src={image} alt="preview" />}
                <input
                  type="text"
                  placeholder="Paste image URL"
                  onChange={e => setImage(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label>Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button className="cancel" onClick={() => navigate("/category")}>
              Cancel
            </button>
            <button className="confirm" onClick={updateCategory}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
