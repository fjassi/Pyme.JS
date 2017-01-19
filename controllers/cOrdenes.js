const mOrdenes = require('../models/mOrdenes');
const mProveedores = require('../models/mProveedores');
var tools = require('../public/js/utils.js');

module.exports = {
	getConsulta: getConsulta,
	getFiltroAjax: getFiltroAjax,
	getVer: getVer,
	get_orden1: get_orden1,
	get_orden2: get_orden2,
	get_orden3: get_orden3,
	getEliminar: getEliminar
}

function getConsulta(req, res){
	mProveedores.getAll(function (proveedores){
		mOrdenes.getNumeroTalonario(function (ordenes){
			res.render('ordenes_consulta', {
				pagename: 'Ordenes de Pago - Consultas, Impresion, Bajas, Imputaciones',
				proveedores: proveedores,
				ordenes: ordenes
			});
		});
	});
}

function getFiltroAjax(req, res){
	const params = req.params;
	var desde = params.desde;
	var hasta = params.hasta;
	const proveedor = params.proveedor;
	const talonario = params.talonario;
	const tipo = params.tipo;

	query = "select CONVERT(char, o1_fecha, 103) as xfecha, o1_nume as xnume, o1_desti as xdesti, o1_total as xtotal, "+
	 			"o1_sucu as xsucu, o1_numovi as xnumovi, o1_costo as xcosto, o1_aplica as xaplica, o1_caja as xcaja, "+
	 			"o1_prov as xProv from opa1 where o1_fecha between '"+desde+"' and '"+hasta+"' "


	if(proveedor != 0){
		query += " and o1_prov = "+proveedor
	}	

 	if (talonario != 0) {
 		query += " and o1_Sucu = "+talonario;
 	}

 	if (tipo == 1) {
 		query += " and len(o1_prov) = 0 and len(o1_caja) = 0 "
 	}

 	if (tipo == 2) {
 		query += " and len(o1_prov) <> 0 "
 	}


	mOrdenes.getFiltro(query, function(ordenes){
		var objData = { "data" : ordenes };
		res.send(objData);
	});
}

function getVer(req, res){
	const params = req.params;
	const numero = params.numero;

	mOrdenes.getByNumero(numero, function(ordenes){
		mOrdenes.Ordenes_op1(numero, function(orden1){
			mOrdenes.Ordenes_op2(numero, function(orden2){
				mOrdenes.Ordenes_op3(numero, function(orden3){
					res.render("ordenes_ver", {
						ordenes: ordenes[0],
						orden1: orden1,
						orden2: orden2,
						orden3: orden3
					});
				});
			});
		});
	});		
}

function get_orden1(req, res){
	const params = req.params;
	const numero = params.numero;

	mOrdenes.Ordenes_op1(numero, function(op1){
		res.send(op1);
	});
}

function get_orden2(req, res){
	const params = req.params;
	const numero = params.numero;

	mOrdenes.Ordenes_op2(numero, function(op2){
		res.send(op2);
	});
}

function get_orden3(req, res){
	const params = req.params;
	const numero = params.numero;

	mOrdenes.Ordenes_op3(numero, function(op3){
		res.send(op3);
	});
}

function getEliminar(req, res){
	const params = req.params;
	const numero = params.numero;

	mOrdenes.delOp1(numero, function(){
		mOrdenes.delOp2(numero, function(){
			mOrdenes.delOp3(numero, function(){
				res.redirect("/ordenes/consulta");
			});
		});
	});
}