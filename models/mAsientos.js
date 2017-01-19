var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getFiltroAjax: getFiltroAjax
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