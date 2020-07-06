const { db } = require("../../config/db");
const ObjectId = require("mongodb").ObjectId;
const TABLE_NAME = "Types";
//tạo nhiều sản phẩm
exports.insertMany = async (data) => {
  try {
    return await db.production.collection(TABLE_NAME).insertMany(data);
  } catch {
    return false;
  }
};
// lấy toàn bộ sản phẩm từ database
exports.getAll = async () => {
  return await db.production.collection(TABLE_NAME).find().toArray();
};
// lấy 1 sản phẩm từ database
exports.getOne = async (id) => {
  return await db.production
    .collection(TABLE_NAME)
    .findOne({ _id: ObjectId(id) });
};

//xóa 1 sản  phẩm
exports.deleteOne = async (id) => {
  return await db.production
    .collection(TABLE_NAME)
    .deleteOne({ _id: ObjectId(id) });
};

//Update 1 sản phẩm
exports.updateOne = async (id, newData) => {
  return await db.production
    .collection(TABLE_NAME)
    .updateOne({ _id: ObjectId(id) }, newData);
};
