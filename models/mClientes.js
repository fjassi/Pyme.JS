var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getByCodigo: getByCodigo,
	sp_clientes: sp_clientes,
	del: del,
	getNextNumero: getNextNumero,
	validacionMovimientos: validacionMovimientos
}

function getAll(cb){
	conn("select * from clientes order by cl_nume", cb);
}

function getByCodigo(numero, cb){
	conn("select * from clientes where cl_nume = "+numero, cb);
}

function sp_clientes(o, cb){
	conn("sp_clientes "+o.numero+", '"+o.nombre+"', '"+o.cuenta+"'", cb);
}

function del(numero, cb){
	conn("DELETE FROM clientes WHERE cl_nume = "+numero, cb);
}

function getNextNumero(cb){
	conn("select ISNULL(max(cl_nume), 0)+1 as proximo_codigo from clientes", cb);
}

function validacionMovimientos(numero, cb){
	// sp_clientes
	// @cl_nume Int, @cl_apel char(30), @cl_direc char(40), @cl_local char(20), 
	// @cl_prov char(15), @cl_cp char(8), @cl_tele char(20), @cl_cuit char(13), @cl_iva smallint ,
	// @cl_lista char(1), @cl_credito decimal(10), @cl_fena datetime, @cl_ctac char(1), @cl_habi char(1),
	// @cl_baja char(1), @cl_habi2 char(1), @cl_empe int, @cl_gara char(30), @cl_gadi char(40),
	// @cl_gate char(20), @cl_mail char(40), @cl_fax char(20), @cl_tido smallint, @cl_celu char(20),
	// @cl_legajo char(10), @cl_cuenta char(10), @cl_nupro char(10) , @cl_docu decimal(9,0)
	conn("select top 1(ps_fecha), ps_coeg from pcas where ps_coeg = "+numero+" "+
		"union "+
		"select top 1(ct_fecm), ct_coeg from corri where ct_coeg = "+numero, cb)
}