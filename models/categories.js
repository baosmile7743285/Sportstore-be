const { dbs } = require("../dbs");
const ObjectId = require("mongodb").ObjectId;
const TABLE_NAME = "Categories";

//tạo 1 loại sản phẩm
exports.insertCategory = async (data) => {
  return await dbs.production.collection(TABLE_NAME).insertOne(data);
};
//
exports.getCategories = async () => {
  return await dbs.production.collection(TABLE_NAME).find().toArray();
};
//
exports.getCategory = async (id) => {
  return await dbs.production
    .collection(TABLE_NAME)
    .findOne({ _id: ObjectId(id) });
};
exports.getCategoryByTypeId = async (typeId) => {
  return await dbs.production
    .collection(TABLE_NAME)
    .find({ typeId: typeId })
    .toArray();
};
