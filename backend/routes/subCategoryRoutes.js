const express = require("express");
const SubCategory = require("../models/SubCategory");

const router = express.Router();

/* Get all subcategories */
router.get("/", async (req, res) => {
  const data = await SubCategory.find().populate("categoryId");
  res.json(data);
});

/* Get by id */
router.get("/:id", async (req, res) => {
  const data = await SubCategory.findById(req.params.id);
  res.json(data);
});

/* Add */
router.post("/", async (req, res) => {
  const sub = await SubCategory.create(req.body);
  res.json(sub);
});

/* Update */
router.put("/:id", async (req, res) => {
  const updated = await SubCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

/* Delete */
router.delete("/:id", async (req, res) => {
  await SubCategory.findByIdAndDelete(req.params.id);
  res.json({ msg: "Deleted" });
});

module.exports = router;

