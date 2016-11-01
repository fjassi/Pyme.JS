var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getByCodigo: getByCodigo,
	Sp_Abm_Mpagos: Sp_Abm_Mpagos,
	del: del,
	getNextCodigo: getNextCodigo,
	validacionMovimientos: validacionMovimientos
}

function getAll(cb){
	conn("select *, "+
		"RTRIM(LTRIM(mpagos.nombre)) as nombretxt, "+
		"CASE WHEN mpagos.fijo = 'S' THEN 'Si' WHEN mpagos.fijo = 'N' THEN 'No' END as fijotxt, "+
		"CASE WHEN mpagos.caja = 'S' THEN 'Si' WHEN mpagos.caja = 'N' THEN 'No' END as cajatxt, "+
		"CASE WHEN mpagos.tipo = 'M' THEN 'Moneda' WHEN mpagos.tipo = 'R' THEN 'Retencion' WHEN mpagos.tipo = 'C' THEN 'Cheque' END as tipotxt, "+
		"CASE WHEN mpagos.usa_punto = 'S' THEN 'Si' WHEN mpagos.usa_punto = 'N' THEN 'No' END as usa_puntotxt "+
		"from mpagos order by codigo", cb);
}

function getByCodigo(codigo, cb){
	conn("select *, RTRIM(LTRIM(mpagos.nombre)) as nombretxt from mpagos where codigo = "+codigo, cb);
}

function Sp_Abm_Mpagos(o, cb){
	conn("Sp_Abm_Mpagos "+o.codigo+", '"+o.nombre+"', "+o.fijo+", '"+o.cotiza+"', '"+o.caja+"', '"+o.tipo+"', '"+o.usa_punto+"'", cb);
}

function del(codigo, cb){
	conn("DELETE FROM mpagos WHERE codigo = "+codigo, cb);
}

function getNextCodigo(cb){
	conn("select ISNULL(max(codigo), 0)+1 as proximo_codigo from mpagos", cb);
}

function validacionMovimientos(codigo, cb){
	conn("select top 1(ps_fecha) from pcas where pcas.ps_moneda = "+codigo+" "+
		"union "+
		"select top 1(r2_talo) from rec2 where rec2.r2_tipo = "+codigo+" "+
		"union "+
		"select top 1(o3_nume) from opa3 where opa3.o3_tipo = "+codigo+"", cb)
}