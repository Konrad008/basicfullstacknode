const express = require('express');
const router = express.Router();
const managers = require('../managers/auth.manager');
const { authManager, defaultManager } = managers;

router.post('/authenticate', authManager.authenticate());
router.post('/register', authManager.register());
router.get('/', defaultManager.getAll());

module.exports = router;