var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getByCodigo: getByCodigo,
	sp_proveedores: sp_proveedores,
	del: del,
	getNextCodigo: getNextCodigo,
	validacionMovimientos: validacionMovimientos
}

function getAll(cb){
	conn("select * from proveedores order by pr_nume", cb);
}

// sp_proveedores
// pr_nume es el campo clave.
// el codigo no es tan facil de proponer, porque es ALFANUMERICO.
// El sistema busca “codigos libres”
// primero desce “001” hasta “999”
// luego “A01”....”A00”
// “B01”....”B99” y asi hasta el infinito

function getByCodigo(codigo, cb){
	conn("select * from proveedores where pr_nume = "+codigo, cb);
}

// create procedure sp_proveedores
// @pr_nume char(3),@pr_apel char(40), @pr_fanta char(50), @pr_direc char(50) ,
// @pr_local char(25), @pr_cp char(8), @pr_prov char(15),  @pr_tele char(30),
// @pr_tele2 char(30), @pr_fax char(20), @pr_fax2 char(30), @pr_mail char(40),
// @pr_web char(50), @pr_iva smallint, @pr_cuit char(13), @pr_bco char(40),
// @pr_cuenta char(10), @pr_retega bit, @pr_reteib bit, @pr_Ig char(1), @pr_conta char(30),
// @pr_cotel1 char(20), @pr_cotel2 char(20), @pr_comail char(40), @pr_paga_adias decimal(3,0),
// @pr_pagadia char(1), @pr_por_efe decimal(3,0), @pr_por_tik decimal(3,0), @pr_por_che decimal(3,0),
// @pr_por_tar decimal(3,0), @pr_salini decimal(15,2)
function sp_proveedores(o, cb){
	conn("sp_proveedores "+o.codigo+", '"+o.nombre+"', '"+o.cuenta+"'", cb);
}

function del(codigo, cb){
	conn("DELETE FROM proveedores WHERE pr_nume = "+codigo, cb);
}

function getNextCodigo(cb){
	conn("select ISNULL(max(pr_nume), 0)+1 as proximo_codigo from proveedores", cb);
}

function validacionMovimientos(codigo, cb){
	conn("select top 1(ps_fecha), ps_coeg from pcas where ps_coeg = "+codigo+" "+
		"union "+
		"select top 1(ct_fecm), ct_coeg from corri where ct_coeg = "+codigo, cb)
}