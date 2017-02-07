var mMayores = require('../models/mMayores');
var mMediosDePago = require('../models/mMediosDePago');

const tools = require('../public/js/utils.js');

module.exports = {
	getEgresos: getEgresos,
	getEgresosAjax: getEgresosAjax
}

function getEgresos(req, res){
	mMediosDePago.getMpagos_Caja(function(caja){
		res.render("mayoresegresos", {
			pagename: "Mayores de Egresos",
			caja: caja
		});
	});
}

function getEgresosAjax(req, res){
	const params = req.params;
	var fecha_desde = params.fecha_desde;
	var fecha_hasta = params.fecha_hasta;
	const nro_caja = params.nro_caja;

	fecha_desde = tools.changeDate(fecha_desde);
	fecha_hasta = tools.changeDate(fecha_hasta);

	var query = "select max(ps_coin) as Xcc, max(co_deno) as xDeno, sum(ps_inpes) as xTotal, CONVERT(varchar, CAST(sum(ps_inpes) as money), 1) as xTotal_f from Pcas Left Join Coin "+
		"on co_codigo = ps_coin  where ps_coin > '1' and ps_fecha between '"+fecha_desde+"' "+
		"and '"+fecha_hasta+"' "

	if (nro_caja != 0)
	 	query = query + "and ps_vende = '"+nro_caja+"' ";

	query = query + "group by ps_coin";

	mMayores.getFiltro(query, function(egresos){
		var objData = { "data" : egresos };
		res.send(objData);	
	});
}