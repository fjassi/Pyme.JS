var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getByCodigo: getByCodigo,
	Sp_Abm_Coin: Sp_Abm_Coin,
	del: del,
	getNextCodigo: getNextCodigo,
	validacionMovimientos: validacionMovimientos
}

function getAll(cb){
	conn("select * from coin order by co_codigo", cb);
}

function getByCodigo(codigo, cb){
	conn("select * from coin where co_codigo = "+codigo, cb);
}

function Sp_Abm_Coin(codigo, nombre, cuenta, cb){
	conn("Sp_Abm_Coin "+codigo+", '"+nombre+"', '"+cuenta+"'", cb);
}

function del(codigo, cb){
	conn("DELETE FROM coin WHERE co_codigo = "+codigo, cb);
}

function getNextCodigo(cb){
	conn("select ISNULL(max(co_codigo), 0)+1 as proximo_codigo from coin", cb);
}

function validacionMovimientos(codigo, cb){
	conn("select top 1(ps_fecha), ps_coin from pcas where ps_coin = "+codigo, cb)
}