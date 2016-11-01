const mCodigosIngreso = require('../models/mCodigosIngreso');
const mPlanDeCuentas = require('../models/mPlanDeCuentas');
// var nodeExcel = require('excel-export');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	Sp_Abm_Coin: Sp_Abm_Coin,
	getModificar: getModificar,
	getEliminar: getEliminar,
	ValidarCodigo: ValidarCodigo
}

function getLista(req, res) {
  	mCodigosIngreso.getAll(function (codigosingreso){
  		res.render("codigosingreso_lista", {
			pagename: 'Lista de Codigos de Ingresos',
			codigosingreso: codigosingreso
		});
  	});
}

function getAlta(req, res){
	mPlanDeCuentas.getAllImputables(function(imputables){
		mCodigosIngreso.getNextCodigo(function(nextcodigo){
			res.render("codigosingreso_alta", {
				pagename: "Alta de Codigo de Ingreso",
				imputables: imputables,
				nextcodigo: nextcodigo[0].proximo_codigo
			});
		});
	});
}

function Sp_Abm_Coin(req, res){
	var oCodigoI = req.body;
	oCodigoI.nombre = oCodigoI.nombre.toUpperCase();

	mCodigosIngreso.Sp_Abm_Coin(oCodigoI, function(){
		res.redirect('/codigosingreso/lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const codigo = params.codigo;

	mCodigosIngreso.getByCodigo(codigo, function(codigoingreso){
		mPlanDeCuentas.getAllImputables(function(imputables){
			res.render("codigosingreso_modificar", {
				pagename: "Modificar Codigo de Ingreso",
				imputables: imputables,
				codigoingreso: codigoingreso[0]
			});
		});
	});
}

function getEliminar(req, res){
	const params = req.params;
	const codigo = params.codigo;

	mCodigosIngreso.validacionMovimientos(codigo, function(movimientos){
		if (movimientos.length == 0){
			mCodigosIngreso.del(codigo, function(){
				res.redirect('/codigosingreso/lista');
			});
		}else{
			res.render("error", {
				error: "Este Codigo no se puede eliminar porque posee movimientos!"
			});
		}
	});
}

function ValidarCodigo(req, res){
	const params = req.params;
	const codigo = params.codigo;

	mCodigosIngreso.getByCodigo(codigo, function(codigoingreso){
		res.send(codigoingreso);
	});
}