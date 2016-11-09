var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getByCodigo: getByCodigo,
	Sp_Abm_Ctas: Sp_Abm_Ctas,
	del: del,
	validacionMovimientos: validacionMovimientos
}

function getAll(cb){
	conn("select *, RTRIM(LTRIM(ctas.cu_nume)) as codigotxt, "+
		"RTRIM(LTRIM(ctas.cu_banco)) as nombretxt "+ 
		"from ctas order by cu_nume", cb);
}

function getByCodigo(codigo, cb){
	conn("select *, RTRIM(LTRIM(ctas.cu_nume)) as codigotxt, "+
		"RTRIM(LTRIM(ctas.cu_banco)) as nombretxt "+
		"from ctas where cu_nume = '"+codigo+"'", cb);
}

function Sp_Abm_Ctas(o, cb){
	conn("Sp_Abm_Ctas '"+o.codigo+"', '"+o.nombre+"', "+o.moneda+", "+o.acuerdo+", "+o.saldo+", '"+o.cuenta+"'", cb);
}

function del(codigo, cb){
	conn("DELETE FROM ctas WHERE cu_nume = '"+codigo+"'", cb);
}

function validacionMovimientos(codigo, cb){
	conn("select top 1(ct_nume) from corri where ct_nume = '"+codigo+"'", cb);
}