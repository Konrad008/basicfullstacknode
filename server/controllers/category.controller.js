const express = require('express');
const router = express.Router();
const managers = require('../managers/category.manager');
const { defaultManager } = managers;

router.post('/add', defaultManager.add());
router.put('/:id', defaultManager.edit());
router.get('/', defaultManager.getAll());
router.delete('/:id', defaultManager._delete());

module.exports = router;