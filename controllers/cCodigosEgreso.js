const mCodigosEgreso = require('../models/mCodigosEgreso');
const mPlanDeCuentas = require('../models/mPlanDeCuentas');
// var nodeExcel = require('excel-export');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getEliminar: getEliminar
}

function getLista(req, res) {
  	mCodigosEgreso.getAll(function (codigosegreso){
  		res.render("codigosegreso_lista", {
			pagename: 'Lista de Codigos de Egresos',
			codigosegreso: codigosegreso
		});
  	});
}

function getAlta(req, res){
	mPlanDeCuentas.getAllImputables(function(imputables){
		mCodigosEgreso.getNextCodigo(function(nextcodigo){
			res.render("codigosegreso_alta", {
				pagename: "Alta de Codigo de Egreso",
				imputables: imputables,
				nextcodigo: nextcodigo[0].proximo_codigo
			});
		});
	});
}

function postAlta(req, res){
	const params = req.body;
	console.log(params);
	const codigo = params.codigo;
	var nombre = params.nombre;
	nombre = nombre.toUpperCase();
	const cuenta = params.cuenta;

	mCodigosEgreso.Sp_Abm_Coeg(codigo, nombre, cuenta, function(){
		res.redirect('/codigosegreso/lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const codigo = params.codigo;

	mCodigosEgreso.getByCodigo(codigo, function(codigoegreso){
		console.log(codigoegreso)
		mPlanDeCuentas.getAllImputables(function(imputables){
			res.render("codigosegreso_modificar", {
				pagename: "Modificar Codigo de Egreso",
				imputables: imputables,
				codigoegreso: codigoegreso[0]
			});
		});
	});
}

function postModificar(req, res){
	const params = req.body;
	console.log(params);
	const codigo = params.codigo;
	var nombre = params.nombre;
	nombre = nombre.toUpperCase();
	const cuenta = params.cuenta;

	mCodigosEgreso.Sp_Abm_Coeg(codigo, nombre, cuenta, function(){
		res.redirect('/codigosegreso/lista');
	});
}

function getEliminar(req, res){
	const params = req.params;
	const codigo = params.codigo;
	// 	Coeg.co_codigo
	// Verificar en 2 tablas
	// Pcas.ps_coeg
	// Corri.ct_coeg
	mCodigosEgreso.validacionMovimientos(codigo, function(movimientos){
		if (movimientos.length == 0){
			mCodigosEgreso.del(codigo, function(){
				res.redirect('/codigosegreso/lista');
			});
		}else{
			res.render("error", {
				error: "Este Codigo no se puede eliminar porque posee movimientos!"
			});
		}
	});
}