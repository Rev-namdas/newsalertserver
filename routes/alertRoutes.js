const express = require("express");
const { fileUpload, alerts, generateAlerts, JSONfileUpload, clientAlerts } = require("../controllers/alertController");

const multer = require("multer");
const customStorage = multer.diskStorage({
	destination: (req, file, callBack) => {
		callBack(null, "FILES/")
	},
	filename: (req, file, callBack) => {
		callBack(null, file.originalname)
	}
})
const upload = multer({ storage: customStorage }).single('jsonfile')

const router = express.Router();
router.post('/upload', fileUpload)
router.post('/jsonupload', upload, JSONfileUpload)
router.get('/allalerts', alerts)
router.post('/clientalerts', clientAlerts)
router.post('/generatealert', generateAlerts)

module.exports = router;