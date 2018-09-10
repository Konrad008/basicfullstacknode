const express = require("express");
const router = express.Router();
const managers = require("../managers/crud.manager");
const { defaultManager } = managers;

router.post("/insert", defaultManager.insert());
router.get("/view", defaultManager.view());
router.delete("/delete", defaultManager._delete());
router.put("/edit", defaultManager.edit());

module.exports = router;
