var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getByNumero: getByNumero,
	Abm_Cent: Abm_Cent,
	del: del,
	getNextCodigo: getNextCodigo,
	validacionMovimientos: validacionMovimientos
}

function getAll(cb){
	conn("select *, CASE WHEN cent.ce_cerro = '1' THEN 'Si' WHEN cent.ce_cerro = '0' THEN 'No' END as cerradotxt "+
		"from cent order by ce_nume", cb);
}

function getByNumero(id, cb){
	conn("select *, RTRIM(LTRIM(cent.ce_deno)) as denominaciontxt, "+
		"CASE WHEN cent.ce_cerro = '1' THEN 'Si' WHEN cent.ce_cerro = '0' THEN 'No' END as cerradotxt "+
		"from cent where ce_nume = "+id, cb);
}
// Abm_Cent @ce_nume int, @ce_deno  char(45), @ce_cuen  char(10), @ce_cerro smallint
function Abm_Cent(o, cb){
	conn("Abm_Cent "+o.numero+", '"+o.denominacion+"', '"+o.cuenta+"', "+o.cerrado, cb);
}

function del(id, cb){
	conn("DELETE FROM cent WHERE ce_nume = "+id, cb);
}

function getNextCodigo(cb){
	conn("select ISNULL(max(ce_nume), 0)+1 as proximo_codigo from cent", cb)
}

// Cent.ce_nume Verificar en 3 tablas - Fac3.f3_cent, Fap4.f4_cent, Opa4.o4_cent

function validacionMovimientos(numero, cb){
	conn("select top 1(f3_multi) from fac3 where fac3.f3_cent = "+numero+" "+
		"union "+
		"select top 1(f4_multi) from fap4 where fap4.f4_cent = "+numero+" "+
		"union "+
		"select top 1(o4_deta) from opa4 where opa4.o4_cent = "+numero, cb)
}