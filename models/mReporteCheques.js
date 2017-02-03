var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	FiltroAjax: FiltroAjax
}

function getAll(cb){
	conn("select * from bancos order by codigo", cb);
}

function FiltroAjax(query, cb){
	conn(query, cb);
}