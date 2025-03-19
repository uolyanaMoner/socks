const express = require("express");
const router = express.Router();
const { upload } = require("../../helpers/cloudinary");
const { getPartitions, addPartition, editPartition, deletePartition } = require("../../controllers/admin/partition-controller");

router.get("/", getPartitions);
router.post("/add", upload.single("image"), addPartition);
router.put("/edit/:id", upload.single("image"), editPartition);
router.delete("/delete/:id", deletePartition);

module.exports = router;
