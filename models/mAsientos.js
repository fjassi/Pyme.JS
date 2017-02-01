var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getFiltroAjax: getFiltroAjax,
	getFiltroContenidoAjax: getFiltroContenidoAjax,
	Sp_Abm_Asti: Sp_Abm_Asti
}

// DIARIO = movimientos de los asientos (varios registros por cada asiento)
// ASTI = titulo de cada asiento (1 registro x cada asiento)
// CUEN = cuentas contables

function getAll(cb){
	conn("select * from bancos order by codigo", cb);
}

function getFiltroAjax(desde, hasta, cb){
	conn("select as_fecha, right(as_multi,6) as asiento , as_titu , as_origen, TipAst.Nombre as TipoAs, "+
		"CONVERT(varchar(13), as_fecha, 103) as fecha_f "+
		"from asti "+
		"left join TipAst on TipAst.Tipo=Asti.as_origen "+
 		"where as_fecha between '"+desde+"' and '"+hasta+"' order by 1", cb);
}

function getFiltroContenidoAjax(fecha, asiento, cb){
	conn("(select 'D' as tipo, "+
		"diario.ld_debe as cuenta, "+
		"diario.ld_impod as importe, "+
		"diario.ld_descrip as descrip, "+
		"cuen.nombre "+
		"from diario left join cuen on diario.ld_debe = cuen.cuenta "+
		"where ld_fecha = '"+fecha+"' "+
		"and ld_asiento = "+asiento+" "+
		"and ld_debe <> '') "+
		"UNION ALL "+
		"(select 'H' as tipo, "+
		"diario.ld_cred as cuenta, "+
		"diario.ld_impoc as importe, "+
		"diario.ld_descrip as descrip, "+
		"cuen.nombre "+
		"from diario left join cuen on diario.ld_cred = cuen.cuenta "+
		"where ld_fecha = '"+fecha+"' "+
		"and ld_asiento = "+asiento+" "+
		"and ld_cred <> '')", cb);
}

function Sp_Abm_Asti(multi, titulo, fecha, movimientos, cb){
	conn("Sp_Abm_Asti '"+multi+"', '"+titulo+"', 0, '"+fecha+"', "+movimientos, cb);
}
// @as_multi  char(12), @as_titu  char(40), @as_origen int, @as_fecha DateTime, @as_movis int