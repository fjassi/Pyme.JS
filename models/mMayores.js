var conn = require('../config/db').conn;

module.exports = {
	getFiltro: getFiltro
}

function getFiltro(query, cb){
	conn(query, cb);
}