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

function getByCodigo(codigo, cb){
	conn("select *, RTRIM(LTRIM(tiri.ti_descri)) as descripciontxt from tiri where ti_codigo = "+codigo, cb);
}

function Sp_Abm_Tiri(o, cb){
	conn("Sp_Abm_Tiri "+o.codigo+", '"+o.descripcion+"', "+o.retencion +", "+o.percepcion, cb);
}

function del(codigo, cb){
	conn("DELETE FROM tiri WHERE ti_codigo = "+codigo, cb);
}

function getNextCodigo(cb){
	conn("SELECT ISNULL(MAX(ti_codigo), 0)+1 AS proximo_codigo FROM tiri", cb);
}