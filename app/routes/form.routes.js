const express = require('express');
const router = express.Router();
const FormController = require('../controllers/form');

router.post('/add', FormController.addForm);
router.get('/fetch', FormController.fetchForm);

module.exports = router;