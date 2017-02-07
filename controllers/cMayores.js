var mMayores = require('../models/mMayores');
var mMediosDePago = require('../models/mMediosDePago');

const tools = require('../public/js/utils.js');

module.exports = {
	getIngreso: getIngreso,
	getIngresosAjax: getIngresosAjax
}

function getIngreso(req, res) {
	mMediosDePago.getMpagos_Caja(function(caja){
		res.render('mayoresingresos_lista', {
			pagename: 'Mayor de Ingreso por Caja/s',
			caja: caja
		});
	});
}

function getIngresosAjax(req, res){
	const params = req.params;
	var fecha_desde = params.fecha_desde;
	var fecha_hasta = params.fecha_hasta;
	var nro_caja = params.nro_caja;

	fecha_desde = tools.changeDate(fecha_desde);
	fecha_hasta = tools.changeDate(fecha_hasta);

	var query = "select max(ps_coin) as Xcc, max(co_deno) as xDeno, CONVERT(varchar, CAST(sum(ps_inpes) as money), 1) as xTotal "+
				"from Pcas "+
				"left Join Coin on co_codigo = ps_coin where ps_coin > '0' and "+
				"ps_fecha between '"+fecha_desde+"' and '"+fecha_hasta+"'"

	if (nro_caja != 0)
		query += " and ps_vende = "+nro_caja;

	query += " group by ps_coin "

	mMayores.getFiltro(query, function(mayores){
		var objData = { "data" : mayores };
		console.log(objData);
		res.send(objData);	
	});
}

// function getSaldoAnterior(req, res){
// 	const params = req.params;
// 	var fecha_desde = params.fecha_desde;
// 	var nro_caja = params.nro_caja;
// 	var moneda = params.moneda;

// 	query = "select sum(ps_inpes*ps_cotiza) - sum(ps_outpes*ps_cotiza) as saldo_anterior from Pcas where ps_fecha< '"+fecha_desde+"'";

// 	if (nro_caja != '' && nro_caja != 0)
// 		query += " and ps_vende = "+nro_caja;
	
// 	if(moneda != 0)
// 		query += " and ps_moneda = "+moneda

// 	mMovimientosCaja.getFiltro(query, function(saldoanterior){
// 		res.send(saldoanterior);
// 	});
// }