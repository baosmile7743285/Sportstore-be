const { dbs } = require("../dbs");
const ObjectId = require("mongodb").ObjectId;
const TABLE_NAME = "Products";

//tạo 1 loại sản phẩm
exports.insertProduct = async (data) => {
  return await dbs.production.collection(TABLE_NAME).insertOne(data);
};
//get list product by typeName
exports.getProducts = async (typeName) => {
  return await dbs.production
    .collection(TABLE_NAME)
    .find({ typeName: typeName })
    .toArray();
};
//get list product by typeName and catelogyName
exports.getProductsByTypeAndCategory = async (
  typeName,
  categoryName,
  productRange
) => {
  return await dbs.production
    .collection(TABLE_NAME)
    .find({
      typeName: typeName,
      categoryName: categoryName,
      productRangeName: productRange,
    })
    .toArray();
};
//
exports.getAllProducts = async () => {
  return await dbs.production.collection(TABLE_NAME).find().toArray();
};
