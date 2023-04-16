const express = require('express')
const app = express()
const path = require('path')
const {conn, Requirement} = require('./db')


app.use('/dist', express.static('dist'))
app.use('/assets', express.static('assets'))
app.use(express.json())
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/api/requirements', async(req, res, next) => {
	try {
		const requirements = await Requirement.findAll()
		res.send(requirements)
	} catch (error) {
		next(error)
	}
})

app.post('/api/requirements', async(req, res, next) => {
	try {
		res.status(201).send(await Requirement.create(req.body))
	} catch (error) {
		next(error)
	}
})

const port = process.env.PORT || 8082

app.listen(port, async() => {
	try {
		console.log(`Listening on port: ${port}`)
		await conn.sync({force: true})
		await Promise.all(
			['react', 'node.js', 'html', 'scss'].map(name => Requirement.create(name))
		)
		console.log('seeded')
	} catch (error) {
		console.log(error)
	}
})