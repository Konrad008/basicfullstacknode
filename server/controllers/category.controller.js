const express = require("express");
const router = express.Router();
const managers = require("../managers/category.manager");
const { defaultManager, categoryManager } = managers;

router.get("/", defaultManager.get());
router.post("/", categoryManager.add());
router.put("/:id", categoryManager.edit());
router.delete("/:id", categoryManager.delete());

module.exports = router;
