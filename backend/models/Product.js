const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory"
  },
  image: String,
  status: { type: String, default: "Active" }
});

module.exports = mongoose.model("Product", productSchema);
