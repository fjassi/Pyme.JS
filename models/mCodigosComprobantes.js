var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getByCodigo: getByCodigo,
	Abm_Dete: Abm_Dete,
	del: del,
	getNextNumero: getNextNumero,
	validacionMovimientos: validacionMovimientos
}

function getAll(cb){
	conn("select *, RTRIM(LTRIM(de_deno)) as denotxt from dete order by de_nume", cb);
}

function getByCodigo(codigo, cb){
	conn("select *, RTRIM(LTRIM(de_deno)) as denotxt from dete where de_nume = "+codigo, cb);
}

function Abm_Dete(numero, denominacion, cb){
	conn("Abm_Dete "+numero+", '"+denominacion+"'", cb);
}

function del(codigo, cb){
	conn("DELETE FROM dete WHERE de_nume = "+codigo, cb);
}

function getNextNumero(cb){
	conn("select ISNULL(max(de_nume), 0)+1 as proximo_numero from dete", cb);
}

function validacionMovimientos(numero, cb){	
	conn("select top 1 (fp_nume) from fapr where fapr.fp_dete = "+numero, cb)
}