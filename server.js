require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoute = require('./routes/userRoutes')
const alertRoutes = require('./routes/alertRoutes')

const app = express()

//allowed all for development purpose only
app.use(cors({
	origin: "*"
}))
app.use(express.json())
app.use("/user", userRoute)
app.use("/api", alertRoutes)

mongoose.connect(process.env.MONGODBURL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(
		app.listen(process.env.PORT, () => {
			console.log(`Server is running on http://localhost:${process.env.PORT}/`)
		})
	)
	.catch((error) => console.log(error.message))