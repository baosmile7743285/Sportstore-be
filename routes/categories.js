const express = require("express");
const router = express.Router();
const uuid = require("uuidv1");
// const controllerAuth = require("../controllers/auth");
const categoriesModel = require("../models/categories");
const typesModel = require("../models/types");
const productRangeModel = require("../models/productRange");

router.get("/:typeId", async (req, res) => {
  const typeId = req.params.typeId;
  const type = await typesModel.getOne(typeId);

  const categoryData = await categoriesModel.getCategories();
  const productRange = await productRangeModel.getAll();

  const data = [];
  for (let i = 0; i < categoryData.length; i++) {
    if (categoryData[i].typeId === typeId) {
      for (let j = 0; j < productRange.length; j++) {
        if (productRange[j].categoryId === categoryData[i]._id.toString()) {
          const productRangeByCatID = await productRangeModel.getProductRangeBycategoryId(
            productRange[j].categoryId
          );

          categoryData[i].list = productRangeByCatID;
        }
      }
      categoryData[i].name = type.name;
      data.push(categoryData[i]);
    }
  }
  res.status(200).send(data);
});

router.post("/:typeId", async (req, res) => {
  const category = req.body;
  const typeId = req.params.typeId;
  const data = {
    typeId: typeId,
    categoryName: category.categoryName,
  };
  const insertData = await categoriesModel.insertCategory(data);

  res.status(200).send(insertData);
});

module.exports = router;
