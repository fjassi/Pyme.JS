var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getByCodigo: getByCodigo,
	Sp_Abm_Ctas: Sp_Abm_Ctas,
	del: del,
	validacionMovimientos: validacionMovimientos
}

function getAll(cb){
	conn("select * from ctas order by cu_nume", cb);
}

function getByCodigo(codigo, cb){
	conn("select * from ctas where cu_nume = '"+codigo+"'", cb);
}

function Sp_Abm_Ctas(o, cb){
	conn("Sp_Abm_Ctas "+o.codigo+", '"+o.nombre+"', '"+o.moneda+"', '"+o.acuerdo+"', '"+o.saldo+"', '"+o.cuenta+"'", cb);
}

function del(cu_nume, cb){
	conn("DELETE FROM ctas WHERE cu_nume = '"+cu_nume+"'", cb);
}

function validacionMovimientos(cu_nume, cb){
	conn("select top 1(ct_nume) from corri where ct_nume = '"+cu_nume+"'", cb);
}