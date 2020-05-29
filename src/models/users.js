'use strict';

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define('users', {
	uid: {
	    type: DataTypes.INTEGER,
	    autoIncrement: true,
	    primaryKey: true,
	    allowNull: false
	},
	username: {
    	    type: DataTypes.STRING,
    	    allowNull: false
	},
	password: {
    	    type: DataTypes.STRING,
    	    allowNull: false,
	},
	age: {
    	    type: DataTypes.INTEGER,
    	    allowNull: false
	},
	email: {
    	    type: DataTypes.STRING,
    	    allowNull: false,
	}
    });

    return users;
}
