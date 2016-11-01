var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getByNumero: getByNumero,
	Sp_Abm_Tipc: Sp_Abm_Tipc,
	del: del,
	getNextCodigo: getNextCodigo,
	validacionMovimientos: validacionMovimientos
}

function getAll(cb){
	conn("select *, RTRIM(LTRIM(tipc.ti_deno)) as denominaciontxt from tipc order by ti_nume", cb);
}

function getByNumero(numero, cb){
	conn("select *, RTRIM(LTRIM(tipc.ti_deno)) as denominaciontxt from tipc where ti_nume = "+numero, cb);
}
// Sp_Abm_Tipc  @ti_nume int, @ti_deno  char(30), @ti_cuen  char(10)
function Sp_Abm_Tipc(o, cb){
	conn("Sp_Abm_Tipc "+o.numero+", '"+o.denominacion+"', '"+o.cuenta+"'", cb);
}

function del(numero, cb){
	conn("DELETE FROM tipc WHERE ti_nume = "+numero, cb);
}

function getNextCodigo(cb){
	conn("select ISNULL(max(ti_nume), 0)+1 as proximo_codigo from tipc", cb);
}

function validacionMovimientos(numero, cb){
	conn("select top 1(f3_multi) from fac3 where fac3.f3_tipc = "+numero+" "+
		"union "+
		"select top 1(f4_multi) from fap4 where fap4.f4_tipc = "+numero+" "+
		"union "+
		"select top 1(o4_deta) from opa4 where opa4.o4_tipc = "+numero, cb)
}

