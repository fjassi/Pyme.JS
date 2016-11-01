var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getByCodigo: getByCodigo,
	Sp_Abm_Coeg: Sp_Abm_Coeg,
	del: del,
	getNextCodigo: getNextCodigo,
	validacionMovimientos: validacionMovimientos
}

function getAll(cb){
	conn("select * from coeg order by co_codigo", cb);
}

function getByCodigo(codigo, cb){
	conn("select * from coeg where co_codigo = "+codigo, cb);
}

function Sp_Abm_Coeg(o, cb){
	conn("Sp_Abm_Coeg "+o.codigo+", '"+o.nombre+"', '"+o.cuenta+"'", cb);
}

function del(codigo, cb){
	conn("DELETE FROM coeg WHERE co_codigo = "+codigo, cb);
}

function getNextCodigo(cb){
	conn("select ISNULL(max(co_codigo), 0)+1 as proximo_codigo from coeg", cb);
}

function validacionMovimientos(codigo, cb){
	conn("select top 1(ps_fecha), ps_coeg from pcas where ps_coeg = "+codigo+" "+
		"union "+
		"select top 1(ct_fecm), ct_coeg from corri where ct_coeg = "+codigo, cb)
}