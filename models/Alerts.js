const mongoose = require('mongoose')

const alertSchema = new mongoose.Schema({
	alertname: { type: String, required: true, unique: true }
})

module.exports = mongoose.model('alerts', alertSchema)