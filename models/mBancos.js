var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getByCodigo: getByCodigo,
	Sp_Abm_Bancos: Sp_Abm_Bancos,
	del: del
}

function getAll(cb){
	conn("select * from bancos order by codigo", cb);
}

function getByCodigo(codigo, cb){
	conn("select * from bancos where codigo = "+codigo, cb);
}

function Sp_Abm_Bancos(codigo, nombre, cuit, cb){
	conn("Sp_Abm_Bancos "+codigo+", '"+nombre+"', '"+cuit+"'", cb);
}

function del(codigo, cb){
	conn("DELETE FROM bancos WHERE codigo = "+codigo, cb);
}