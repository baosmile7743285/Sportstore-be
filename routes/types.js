const express = require("express");
const router = express.Router();
// const controllerAuth = require("../controllers/auth");
const typesModel = require("../models/types");

router.get("/", async (req, res, next) => {
  const data = await typesModel.getAll();
  res.send(data);
});
module.exports = router;
