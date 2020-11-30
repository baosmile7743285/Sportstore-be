const express = require("express");
const router = express.Router();
// const controllerAuth = require("../controllers/auth");
const productRangeModel = require("../models/productRange");
const categoryModel = require("../models/categories");

router.get("/:categoryId", async (req, res) => {
  const data = await productRangeModel.getProductRange();

  res.status(200).send(data);
});

router.post("/:categoryId", async (req, res) => {
  const { productRangeName } = req.body;
  const categoryId = req.params.categoryId;
  const category = await categoryModel.getCategory(categoryId);
  const { typeId } = category;
  const data = {
    categoryId: categoryId,
    typeId: typeId,
    productRangeName: productRangeName,
  };
  const insertData = await productRangeModel.insertProductRange(data);

  res.status(200).send(insertData);
});

module.exports = router;
