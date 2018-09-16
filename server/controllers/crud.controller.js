const express = require("express");
const router = express.Router();
const managers = require("../managers/crud.manager");
const { defaultManager, crudManager } = managers;

router.get("/", defaultManager.get());
router.post("/", crudManager.add());
router.put("/:id", crudManager.edit());
router.delete("/:id", crudManager.delete());

module.exports = router;
