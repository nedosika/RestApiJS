module.exports = {
    server: {
	port: 3000,
	host: '192.168.0.200'
    },
    db: {
	host: '192.168.0.200',
        username: 'nodejs',
        password: 'lg23GrT48aClbUfW',
        database: 'nodejs',
	dialect: 'mysql',
	dialectOptions: {
	     multipleStatements: true
	},
	define: {
	    timestamps: false
	}
    },
    swaggerHost: '192.168.0.200',
}