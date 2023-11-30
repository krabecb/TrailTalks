const multer = require("multer")
const upload = multer()

const express = require('express')
const router = express.Router()

const talksCtrl = require("../controllers/talks")
const talks = require("../controllers/talks")

router.get('/', talksCtrl.index)

router.get('/new', talksCtrl.new)

router.get('/:id', talksCtrl.show)

router.post('/', talksCtrl.create)

router.post('/:id/photos/single', upload.single("imageUpload"), talksCtrl.imageUpload)

module.exports = router