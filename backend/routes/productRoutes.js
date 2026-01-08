const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

/* Get all products */
router.get("/", async (req, res) => {
  const data = await Product.find()
    .populate("categoryId")
    .populate("subCategoryId");
  res.json(data);
});

/* Get by id */
router.get("/:id", async (req, res) => {
  const data = await Product.findById(req.params.id);
  res.json(data);
});

/* Add */
router.post("/", async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

/* Update */
router.put("/:id", async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

/* Delete */
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;
