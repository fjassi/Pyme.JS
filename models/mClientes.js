var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getByNumero: getByNumero,
	sp_clientes: sp_clientes,
	del: del,
	getNextNumero: getNextNumero,
	validacionMovimientos: validacionMovimientos
}

function getAll(cb){
	conn("select *, "+
		"CASE WHEN clientes.cl_ctac = 'S' THEN 'Si' WHEN clientes.cl_ctac = 'N' THEN 'No' END as cuentacorrientatxt, "+
		"CASE WHEN clientes.cl_habi = 'S' THEN 'Si' WHEN clientes.cl_habi = 'N' THEN 'No' END as habilitadotxt "+
		"from clientes order by cl_nume", cb);
}

function getByNumero(numero, cb){
	conn("select *, RTRIM(LTRIM(cl_prov)) as provinciatxt, "+
		"RTRIM(LTRIM(cl_apel)) as razonsocialtxt, "+
		"RTRIM(LTRIM(cl_direc)) as direcciontxt, "+
		"RTRIM(LTRIM(cl_local)) as localidadtxt, "+
		"RTRIM(LTRIM(cl_cp)) as codigopostaltxt, "+
		"RTRIM(LTRIM(cl_tele)) as teletxt, "+
		"RTRIM(LTRIM(cl_celu)) as celutxt, "+
		"RTRIM(LTRIM(cl_fax)) as faxtxt, "+
		"RTRIM(LTRIM(cl_mail)) as mailtxt, "+
		"RTRIM(LTRIM(cl_gara)) as garantiatxt, "+
		"RTRIM(LTRIM(cl_gate)) as garantiatelefonotxt, "+
		"RTRIM(LTRIM(cl_gadi)) as garantiadomiciliotxt, "+
		"RTRIM(LTRIM(cl_cuenta)) as cuentatxt, "+
		"RTRIM(LTRIM(cl_nupro)) as nroproveedortxt, "+
		"RTRIM(LTRIM(cl_empe)) as vendedortxt, "+
		"CONVERT(varchar(13), cl_fena, 103) as fechaaltaf, "+
		"CASE WHEN clientes.cl_ctac = 'S' THEN 'Si' WHEN clientes.cl_ctac = 'N' THEN 'No' END as cuentacorrientatxt, "+
		"CASE WHEN clientes.cl_habi = 'S' THEN 'Si' WHEN clientes.cl_habi = 'N' THEN 'No' END as habilitadotxt "+
		"from clientes where cl_nume = "+numero, cb);
}

function sp_clientes(o, cb){
	conn("sp_clientes "+o.numero+", '"+o.razonsocial+"', '"+o.direccion+"', '"+o.localidad+"', '"+o.provincia+"', '"+o.codigopostal+"', "+
		"'"+o.telefono+"', '"+o.cuit+"', '"+o.categoria+"', '"+o.listadeprecios+"', "+o.credlimite+", '"+o.fecha_alta+"', "+
		"'"+o.posee+"', '"+o.habilitada+"', '"+o.baja+"', '"+o.saldopositivo+"', '"+o.vendedor+"', '"+o.garantia+"', '"+
		o.domicilio+"', '"+o.te+"', '"+o.email+"', '"+o.fax+"', "+o.tipodoc+", '"+o.celular+"', '', '"+o.cuentacontable+"', "+
		"'"+o.nro_proveedor+"', "+o.nrodoc, cb);
}

function del(numero, cb){
	conn("DELETE FROM clientes WHERE cl_nume = "+numero, cb);
}

function getNextNumero(cb){
	conn("select ISNULL(max(cl_nume), 0)+1 as proximo_codigo from clientes", cb);
}

function validacionMovimientos(numero, cb){	
	conn("select top 1(ps_fecha), ps_coeg from pcas where ps_coeg = "+numero+" "+
		"union "+
		"select top 1(ct_fecm), ct_coeg from corri where ct_coeg = "+numero, cb)
}