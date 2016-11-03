var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getByCodigo: getByCodigo,
	Sp_Abm_Bancos: Sp_Abm_Bancos,
	del: del,
	validacionMovimientos: validacionMovimientos,
	getNextCodigo: getNextCodigo
}

function getAll(cb){
	conn("select * from bancos order by codigo", cb);
}

function getByCodigo(codigo, cb){
	conn("select * from bancos where codigo = "+codigo, cb);
}

function Sp_Abm_Bancos(o, cb){
	conn("Sp_Abm_Bancos "+o.codigo+", '"+o.nombre+"', '"+o.cuit+"'", cb);
}

function del(codigo, cb){
	conn("DELETE FROM bancos WHERE codigo = "+codigo, cb);
}

function validacionMovimientos(codigo, cb){
	conn("select top 1(r2_talo) from rec2 where Left(rec2.r2_bsc,3) = "+codigo, cb);
}

function getNextCodigo(cb){
	conn("SELECT ISNULL(MAX(codigo), 0)+1 AS proximo_codigo FROM bancos", cb);
}