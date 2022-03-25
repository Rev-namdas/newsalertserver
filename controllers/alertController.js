const fs = require('fs');
const Alerts = require('../models/Alerts');

const fileUpload = async (req, res) => {
	const { filename, content } = req.body

	const newAlert = new Alerts({
		alertname: filename.split('.')[0]
	})
	await newAlert.save()
	
	await fs.writeFile(`./FILES/${filename}`, JSON.stringify(content), (err) => {
		console.log(err);
	})
	
	return res.send({  message: 'Upload Complete !' })
}

const JSONfileUpload = async (req, res) => {
	const newAlert = new Alerts({
		alertname: req.body.myFileName.split('.')[0]
	})
	try {
		await newAlert.save()
	} catch (error) {
		console.log(error.message);
	}
	
	return res.send({  message: 'Upload Complete !' })
}

const alerts = async (req, res) => {
	const allalerts = await Alerts.find()

	return res.json(allalerts)
}

const generateAlerts = async (req, res) => {
	const { alertname } = req.body

	await fs.readFile(`./FILES/${alertname}.json`, 'utf8', (err, data) => {
		if(err) console.log(err)
		// if(data) return res.json(data)
		if(data) return res.json(JSON.parse(data))
	})
}

module.exports = {
	fileUpload,
	JSONfileUpload,
	alerts,
	generateAlerts
}