'use strict';

module.exports = (sequelize, DataTypes) => {
    const messages = sequelize.define('messages', {
    	mid: {
	    type: DataTypes.INTEGER,
	    autoIncrement: true,
	    primaryKey: true,
	    allowNull: false
	},
	message: {
    	    type: DataTypes.STRING,
    	    allowNull: false
	},
	uid_fk: {
    	    type: DataTypes.INTEGER,
    	    allowNull: false
	}
    });

    return messages;
};
