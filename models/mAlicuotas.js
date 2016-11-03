var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getByCodigo: getByCodigo,
	Sp_Abm_Tiri: Sp_Abm_Tiri,
	del: del,
	getNextCodigo: getNextCodigo
}

function getAll(cb){
	conn("select * from tiri order by ti_codigo", cb);
}

function getByCodigo(ti_codigo, cb){
	conn("select * from tiri where ti_codigo = "+ti_codigo, cb);
}

function Sp_Abm_Tiri(o, cb){
	conn("Sp_Abm_Tiri "+o.ti_codigo+", '"+o.ti_descri+"', '"+o.ti_alicuo+"', '"+o.ti_alicuo2+"'", cb);
}

function del(ti_codigo, cb){
	conn("DELETE FROM tiri WHERE ti_codigo = "+ti_codigo, cb);
}

function getNextCodigo(cb){
	conn("SELECT ISNULL(MAX(ti_codigo), 0)+1 AS proximo_codigo FROM tiri", cb);
}