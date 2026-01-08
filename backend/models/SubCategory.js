const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  image: String,
  status: { type: String, default: "Active" }
});

module.exports = mongoose.model("SubCategory", subCategorySchema);
