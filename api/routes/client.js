const express = require('express')
const router = express.Router()
const ClientController = require('../controllers/Client/ClientController')

router.get('/doctors', ClientController.DoctorsIndex)
router.get('/doctors/:city/:special', ClientController.DoctorsIndex)

module.exports = router