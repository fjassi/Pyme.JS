var mMovimientosCaja = require('../models/mMovimientosCaja');
var mMediosDePago = require('../models/mMediosDePago');

const tools = require('../public/js/utils.js');

module.exports = {
	getLista: getLista,
	getFiltroAjax: getFiltroAjax,
	getSaldoAnterior: getSaldoAnterior
}

function getLista(req, res) {
	mMediosDePago.getMpagos_Caja(function(caja){
		res.render('movimientoscaja_lista', {
			pagename: 'Reporte de Movimientos de Caja',
			caja: caja
		});
	});
}

function getFiltroAjax(req, res){
	const params = req.params;
	var fecha_desde = params.fecha_desde;
	var fecha_hasta = params.fecha_hasta;
	var nro_caja = params.nro_caja;
	var moneda = params.moneda;

	fecha_desde = tools.changeDate(fecha_desde);
	fecha_hasta = tools.changeDate(fecha_hasta);

	var query = "select ps_vende as NuCaja, ps_fecha as Fecha, CONVERT(varchar(13), ps_fecha, 103) as fecha_f, ps_conce as detalle, ps_inpes as Ingreso, ps_outpes as Egreso, "+
				"mpagos.nombre as Moneda, ps_cotiza as Coti, "+
				"ps_cotiza*(pcas.ps_inpes+pcas.ps_outpes) as Total, "+
				"convert( decimal(12,2) , '0' ) as Saldo, ps_Numovi as Numto, space(20) as TipoMto, tipmcaja.nombre as Origen "+
				"From pcas "+
				"Left Join mpagos on mpagos.codigo = pcas.ps_moneda "+
				"left join tipmcaja on tipmcaja.codigo = ps_timov "+
				"where ps_fecha>= '"+fecha_desde+"' and ps_fecha<= '"+fecha_hasta+"'"

	if (nro_caja != '' && nro_caja != 0)
		query += " and ps_vende = "+nro_caja;
	
	if(moneda != 0)
		query += " and ps_moneda = "+moneda

	query += " order by ps_fecha asc";

	mMovimientosCaja.getFiltro(query, function(movimientos){
		var objData = { "data" : movimientos };
		res.send(objData);
	});
}

function getSaldoAnterior(req, res){
	const params = req.params;
	var fecha_desde = params.fecha_desde;
	var nro_caja = params.nro_caja;
	var moneda = params.moneda;

	query = "select sum(ps_inpes*ps_cotiza) - sum(ps_outpes*ps_cotiza) as saldo_anterior from Pcas where ps_fecha< '"+fecha_desde+"'";

	if (nro_caja != '' && nro_caja != 0)
		query += " and ps_vende = "+nro_caja;
	
	if(moneda != 0)
		query += " and ps_moneda = "+moneda

	mMovimientosCaja.getFiltro(query, function(saldoanterior){
		res.send(saldoanterior);
	});
}