const express = require("express");
const router = express.Router();
const productModel = require("./model");

//Insert Data nhưng filter xem data có tồn tại chưa nó rồi thì k thêm còn nếu chưa thì thêm vào
router.post("/", async (req, res) => {
  const data = [
    { name: "Men" },
    { name: "Women" },
    { name: "Kid" },
    { name: "Sport" },
    { name: "Branding" },
  ];
  const insertData = await productModel.insertMany(data);
  res.status(200).send(insertData);
});
//View List All Product
router.get("/", async (req, res) => {
  const data = await productModel.getAll();
  res.send(data);
});
//View 1 Product
router.get("/:id", async (req, res) => {
  id = req.params.id;
  const data = await productModel.getOne(id);
  res.status(200).send(data);
});
//Delete Product
router.delete("/:id", async (req, res) => {
  id = req.params.id;
  const deleteData = await productModel.deleteOne(id);
  res.status(200).send(deleteData);
});
//Update Product
router.put("/:id", async (req, res) => {
  id = req.params.id;
  const newData = { $set: { name: req.body.name, address: req.body.address } };
  const UpdateData = await productModel.updateOne(id, newData);
  res.status(200).send(UpdateData);
});
module.exports = router;
