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
    swagger:{
	info:{
	    title: ' API Documentation',
	    version: '0.1b'
	},
	host: 'nedosika.pp.ua:3000',
    }
}