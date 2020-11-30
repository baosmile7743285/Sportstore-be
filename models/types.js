const { dbs } = require("../dbs");
const ObjectId = require("mongodb").ObjectId;
const TABLE_NAME = "Types";

// lấy toàn bộ type từ database
exports.getAll = async () => {
  return await dbs.production.collection(TABLE_NAME).find().toArray();
};
exports.getOne = async (id) => {
  return await dbs.production
    .collection(TABLE_NAME)
    .findOne({ _id: ObjectId(id) });
};
exports.getOneByTypeName = async (typeName) => {
  return await dbs.production
    .collection(TABLE_NAME)
    .findOne({ typeName: typeName });
};
