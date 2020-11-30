const express = require("express");
const router = express.Router();
// const controllerAuth = require("../controllers/auth");
const productsModel = require("../models/products");
const productRangeModel = require("../models/productRange");
const typeModel = require("../models/types");
const categoryModel = require("../models/categories");
//get danh sách theo type
router.get("/type/:typeName", async (req, res) => {
  const typeName = req.params.typeName;
  const productByTypeName = await productsModel.getProducts(typeName);
  res.status(200).send(productByTypeName);
});
//get danh sách theo type và category
router.get("/type/:typeName/category/:categoryName", async (req, res) => {
  const typeName = req.params.typeName;
  const categoryName = req.params.categoryName;

  const productsByTypeAndCategory = await productsModel.getProductsByTypeAndCategory(
    typeName,
    categoryName
  );

  res.status(200).send(productsByTypeAndCategory);
});
//get danh sách theo type và category và product range
router.get(
  "/type/:typeName/category/:categoryName/productlist/:productRange",
  async (req, res) => {
    const { typeName, categoryName, productRange } = req.params;
    const productsByTypeAndCategory = await productsModel.getProductsByTypeAndCategory(
      typeName,
      categoryName,
      productRange
    );

    res.status(200).send(productsByTypeAndCategory);
  }
);
//
router.get("/", async (req, res) => {
  const products = await productsModel.getAllProducts();
  const types = await typeModel.getAll();

  for (let j = 0; j < types.length; j++) {
    const type = types[j];
    let processedData = [];
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      if (product.typeId === type._id.toString()) {
        processedData.push(product);
      }
    }
    type.listProduct = processedData;
  }
  res.status(200).send(types);
});
//
router.post("/:productRangeId", async (req, res) => {
  const body = req.body;
  const productRangeId = req.params.productRangeId;

  const productRange = await productRangeModel.getOne(productRangeId);
  const { typeId, categoryId, productRangeName } = productRange;

  const type = await typeModel.getOne(typeId);
  const category = await categoryModel.getCategory(categoryId);
  const { categoryName } = category;
  const { typeName } = type;
  const data = {
    ...body,
    typeId: typeId,
    categoryId: categoryId,
    typeName: typeName,
    categoryName: categoryName,
    productRangeId: productRangeId,
    productRangeName: productRangeName,
  };
  const insertData = await productsModel.insertProduct(data);
  res.status(200).send(insertData);
});

module.exports = router;
