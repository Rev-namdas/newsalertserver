const express = require("express");
const multer = require("multer");
const { fileUpload, alerts, generateAlerts, JSONfileUpload } = require("../controllers/alertController");
const router = express.Router();

const customStorage = multer.diskStorage({
	destination: (req, file, callBack) => {
		callBack(null, "FILES/")
	},
	filename: (req, file, callBack) => {
		callBack(null, file.originalname)
	}
})
const upload = multer({ storage: customStorage }).single('jsonfile')

router.post('/upload', fileUpload)
router.post('/jsonupload', upload, JSONfileUpload)
router.get('/allalerts', alerts)
router.post('/generatealert', generateAlerts)

module.exports = router;