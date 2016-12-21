var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	sp_proveedores: sp_proveedores,
	getNextCodigo: getNextCodigo,
	getByCodigo: getByCodigo,
	del: del,
	validacionMovimientos: validacionMovimientos
}

function getAll(cb){
	conn("select * from proveedores order by pr_nume", cb);
}

function getByCodigo(numero, cb){
	conn("select *, RTRIM(LTRIM(pr_apel)) as razonsocialtxt, "+
		"RTRIM(LTRIM(pr_fanta)) as fantasiatxt, "+
		"RTRIM(LTRIM(pr_direc)) as direcciontxt, "+
		"RTRIM(LTRIM(pr_local)) as localidadtxt, "+
		"RTRIM(LTRIM(pr_cp)) as cptxt, "+
		"RTRIM(LTRIM(pr_tele)) as telefonotxt, "+
		"RTRIM(LTRIM(pr_tele2)) as telefono2txt, "+
		"RTRIM(LTRIM(pr_fax)) as faxtxt, "+
		"RTRIM(LTRIM(pr_fax2)) as fax2txt, "+
		"RTRIM(LTRIM(pr_web)) as webtxt, "+
		"RTRIM(LTRIM(pr_bco)) as bancotxt, "+
		"RTRIM(LTRIM(pr_cuenta)) as cuentatxt, "+
		"RTRIM(LTRIM(pr_conta)) as nombretxt, "+
		"RTRIM(LTRIM(pr_cotel1)) as tel1txt, "+
		"RTRIM(LTRIM(pr_cotel2)) as tel2txt "+ 
		"from proveedores where pr_nume = "+numero, cb);
}

function sp_proveedores(o, cb){
	conn("sp_proveedores '"+o.numero+"', '"+o.razonsocial+"', '"+o.fantasia+"', '"+o.direccion+"', '"+o.localidad+"', '"+o.cpostal+"', '"+o.provincia+"', '"+o.telefono+"', '"+o.telefono2+"', '"+o.fax+"', '"+o.fax2+"', '"+o.mail+"', '"+o.web+"', "+o.iva+", '"+o.cuit+"', '"+o.banco+"', '"+o.cuentacontable+"', '"+o.retgan+"', '"+o.retib+"', '"+o.ig+"', '"+o.conombre+"', '"+o.cotel1+"', '"+o.cotel2+"', '"+o.comail+"', '"+o.pagadias+"', '"+o.pagalosdias+"', "+o.efectivo+", "+o.ticket+", "+o.cheque+", "+o.tarjeta+", "+o.saldoinicial, cb);
}

function del(numero, cb){
	conn("DELETE FROM proveedores WHERE pr_nume = "+numero, cb);
}

function getNextCodigo(cb){
	conn("select ISNULL(max(pr_nume), 0)+1 as proximo_codigo from proveedores", cb);
}

function validacionMovimientos(numero, cb){
	conn("select top 1(fp_prov) from fapr where fp_prov = "+numero+" "+
		"union "+
		"select top 1(o1_prov) from opa1 where o1_prov = "+numero, cb)
}