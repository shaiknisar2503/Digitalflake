import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const saveCategory = async () => {
    await axios.post("http://localhost:5000/api/categories", {
      name,
      image
    });
    navigate("/category");
  };

  return (
    <div className="layout">
      <Sidebar active="Category" />
      <div className="main">
        <Header />

        <div className="form-page">
          <h3>Add Category</h3>

          <div className="form-row">
            <div>
              <label>Category Name</label>
              <input
                type="text"
                placeholder="Enter category name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label>Upload Image</label>
              <div className="upload-box">
                {image ? (
                  <img src={image} alt="preview" />
                ) : (
                  <span>Upload image</span>
                )}
                <input
                  type="text"
                  placeholder="Paste image URL"
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button className="cancel" onClick={() => navigate("/category")}>
              Cancel
            </button>
            <button className="confirm" onClick={saveCategory}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
