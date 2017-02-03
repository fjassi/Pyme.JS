var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getFiltro: getFiltro
}

function getAll(cb){
	conn("select * from bancos order by codigo", cb);
}

function getFiltro(query, cb){
	conn(query, cb);
}