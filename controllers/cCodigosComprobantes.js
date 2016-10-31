const mCodigosComprobantes = require('../models/mCodigosComprobantes');

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
  	mCodigosComprobantes.getAll(function (codigoscomprobantes){
  		res.render("codigoscomprobantes_lista", {
			pagename: 'Lista de Codigos de Comprobantes',
			codigoscomprobantes: codigoscomprobantes
		});
  	});
}

function getAlta(req, res){
	mCodigosComprobantes.getNextNumero(function(comprobante){
		res.render("codigoscomprobantes_alta", {
			pagename: "Alta de Codigo de Comprobante",
			nextnumero: comprobante[0].proximo_numero
		});
	});
}

function postAlta(req, res){
	const params = req.body;
	console.log(params)
	const numero = params.numero;
	var denominacion = params.denominacion;
	denominacion = denominacion.toUpperCase();

	mCodigosComprobantes.Abm_Dete(numero, denominacion, function(){
		res.redirect("/codigoscomprobantes/lista");
	});
}

function getModificar(req, res){
	const params = req.params;
	const numero = params.numero;

	mCodigosComprobantes.getByCodigo(numero, function(codigo){
		res.render("codigoscomprobantes_modificar", {
			pagename: "Modificar Codigo de Comprobante",
			codigo: codigo[0]
		});
	});
}

function postModificar(req, res){
	const params = req.body;
	console.log(params)
	const numero = params.numero;
	var denominacion = params.denominacion;
	denominacion = denominacion.toUpperCase();

	mCodigosComprobantes.Abm_Dete(numero, denominacion, function(){
		res.redirect("/codigoscomprobantes/lista");
	});
}

function getEliminar(req, res){
	const params = req.params;
	const numero = params.numero;
	//Dete.de_nume Fapr.fp_dete
	mCodigosComprobantes.validacionMovimientos(numero, function(movimientos){
		if (movimientos.length > 0){
			res.render("error", {
				error: "Este Codigo no se puede eliminar porque posee movimientos."
			});
		}else{
			mCodigosComprobantes.del(numero, function(){
				res.redirect("/codigoscomprobantes/lista");
			});
		}
	});
}