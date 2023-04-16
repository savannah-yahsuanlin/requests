const Sequelize = require('sequelize')
const {STRING, UUID, UUIDV4} = Sequelize
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/request')	

const Requirement = conn.define('requirement', {
	id: {
		type: UUID,
		defaultValue: UUIDV4,
		primaryKey: true
	},
	name: {
		type: STRING,
		unique: true
	}
})

module.exports = {
	Requirement,
	conn
}