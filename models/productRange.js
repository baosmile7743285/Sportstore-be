const { dbs } = require("../dbs");
const ObjectId = require("mongodb").ObjectId;
const TABLE_NAME = "Product Range";

//tạo 1 loại sản phẩm
exports.insertProductRange = async (data) => {
  return await dbs.production.collection(TABLE_NAME).insertOne(data);
};
//
exports.getOne = async (categoryId) => {
  return await dbs.production.collection(TABLE_NAME).findOne({_id : ObjectId(categoryId)});
};

exports.getAll = async () => {
    return await dbs.production.collection(TABLE_NAME).find().toArray();
  };
  exports.getProductRangeBycategoryId = async (categoryId) => {
    return await dbs.production.collection(TABLE_NAME).find({categoryId : categoryId}).toArray();
  };

