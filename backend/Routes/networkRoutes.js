const express = require('express');
const { getNetworkUsers } = require('../Controllers/NetworkController');

const router = express.Router();

router.get('/', getNetworkUsers);

module.exports = router;
