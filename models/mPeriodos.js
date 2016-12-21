var conn = require('../config/db').conn;

module.exports = {
	getAll: getAll,
	getByFecha: getByFecha,
	Sp_Abm_Peri: Sp_Abm_Peri,
	validacionMovimientos: validacionMovimientos,
	del: del 
}

function getAll(cb){
	conn("select *, CONVERT(varchar(13), peri.pe_desde, 103) as desde, CONVERT(varchar(13), peri.pe_hasta, 103) as hasta, CONVERT(varchar(13), peri.pe_cerro, 103) as cerrado from peri", cb);
}

function getByFecha(fecha_desde, cb){
	conn("select *, CONVERT(varchar(13), peri.pe_desde, 103) as desde, "+
 "CONVERT(varchar(13), peri.pe_hasta, 103) as hasta, "+
 "CONVERT(varchar(13), peri.pe_cerro, 103) as cerrado "+
 "from peri "+
 "where pe_desde = '"+fecha_desde+"'", cb);
}

function Sp_Abm_Peri(o, cb){
	conn("sp_abm_peri '"+o.desde+"', '"+o.hasta+"', '"+o.mes1+"', '"+o.mes2+"', '"+o.mes3+"', '"+o.mes4+"', '"+o.mes5+"', '"+o.mes6+"', '"+o.mes7+"', '"+o.mes8+"', '"+o.mes9+"', '"+o.mes10+"', '"+o.mes11+"', '"+o.mes12+"', '"+o.cerrado+"', "+o.inmes1+", "+o.inmes2+", "+o.inmes3+", "+o.inmes4+", "+o.inmes5+", "+o.inmes6+", "+o.inmes7+", "+o.inmes8+", "+o.inmes9+", "+o.inmes10+", "+o.inmes11+", "+o.inmes12+"", cb);
}

function del(fecha_desde, cb){
	conn("delete from peri where pe_desde = '"+fecha_desde+"'", cb);
}

function validacionMovimientos(fecha_desde, cb){
	conn("select top 1(ld_fecha) from diario where ld_fecha = '"+fecha_desde+"'", cb)
}