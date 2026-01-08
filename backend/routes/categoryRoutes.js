const express = require("express");
const Category = require("../models/Category");
const router = express.Router();
const auth = require("../middleware/authMiddleware");


/* Get all categories */
router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

/* Add new category */
router.post("/", async (req, res) => {
  const category = await Category.create(req.body);
  res.json(category);
});

/* Add category */
router.post("/", async (req, res) => {
  const { name, image } = req.body;
  const category = await Category.create({ name, image });
  res.json(category);
});

/* Get category by id */
router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.json(category);
});

/* Update category */
router.put("/:id", async (req, res) => {
  const { name, image, status } = req.body;

  const updated = await Category.findByIdAndUpdate(
    req.params.id,
    { name, image, status },
    { new: true }
  );

  res.json(updated);
});



/* Delete category */
router.delete("/:id", async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted" });
});

router.post("/", auth(["admin"]), createCategory);
router.put("/:id", auth(["admin"]), updateCategory);
router.delete("/:id", auth(["admin"]), deleteCategory);

module.exports = router;
