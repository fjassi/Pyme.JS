var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getByNumero: getByNumero,
	Sp_Abm_Cove: Sp_Abm_Cove,
	del: del,
	getNextNumero: getNextNumero,
	validacionMovimientos: validacionMovimientos
}

function getAll(cb){
	conn("select *, "+
		"RTRIM(LTRIM(cove.co_deno)) as denominaciontxt "+
		"from cove order by co_nume", cb);
}

function getByNumero(numero, cb){
	conn("select *, RTRIM(LTRIM(cove.co_deno)) as denominaciontxt from cove where co_nume = "+numero, cb);
}

function Sp_Abm_Cove(numero, denominacion, dias, porcentaje, cuotas, cb){
	conn("Sp_Abm_Cove "+numero+", '"+denominacion+"', "+dias+", '"+porcentaje+"', "+cuotas, cb);
}

function del(numero, cb){
	conn("DELETE FROM cove WHERE co_nume = "+numero, cb);
}

function getNextNumero(cb){
	conn("select ISNULL(max(co_nume), 0)+1 as proximo_numero from cove", cb);
}

// Cove.co_nume Fact.fa_condi
function validacionMovimientos(numero, cb){
	conn("select top 1(fa_tipo) from fact where fact.fa_condi = "+numero, cb);
}