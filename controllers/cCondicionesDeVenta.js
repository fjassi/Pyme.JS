const mCondicionesDeVenta = require('../models/mCondicionesDeVenta');

// var nodeExcel = require('excel-export');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	postAlta: postAlta,
	getModificar: getModificar,
	postModificar: postModificar,
	getEliminar: getEliminar
}

function getLista(req, res){
	mCondicionesDeVenta.getAll(function(condicionesdeventa){
		res.render("condicionesdeventa_lista", {
			pagename: "Lista de Condiciones de Venta",
			condicionesdeventa: condicionesdeventa
		});
	});
}

function getAlta(req, res){
	mCondicionesDeVenta.getNextNumero(function(condicion){
		res.render("condicionesdeventa_alta", {
			pagename: "Alta de Condicion de Venta",
			nextnumero: condicion[0].proximo_numero
		});
	});
}

function postAlta(req, res){
	const params = req.body;
	console.log(params)
	const numero = params.numero;
	var denominacion = params.denominacion;
	denominacion = denominacion.toUpperCase();
	const dias = params.dias;
	const porce = params.porce;
	var cuotas = params.cuotas;

	mCondicionesDeVenta.Sp_Abm_Cove(numero, denominacion, dias, porce, cuotas, function(){
		res.redirect("/condicionesdeventa/lista");
	});
}

function getModificar(req, res){
	const params = req.params;
	const numero = params.numero

	mCondicionesDeVenta.getByNumero(numero, function(condicion){
		res.render("condicionesdeventa_modificar", {
			pagename: "Modificar Condicion de Venta",
			condicion: condicion[0]
		});
	});
}

function postModificar(req, res){
	const params = req.body;
	console.log(params)
	const numero = params.numero;
	var denominacion = params.denominacion;
	denominacion = denominacion.toUpperCase();
	const dias = params.dias;
	const porce = params.porce;
	var cuotas = params.cuotas;

	mCondicionesDeVenta.Sp_Abm_Cove(numero, denominacion, dias, porce, cuotas, function(){
		res.redirect("/condicionesdeventa/lista");
	});
}

function getEliminar(req, res){
	const params = req.params;
	const numero = params.numero;

	mCondicionesDeVenta.validacionMovimientos(numero, function(movimientos){
		if(movimientos.length > 0){
			res.render("error",{
				error: "No se puede eliminar esta Condicion de Venta porque posee movimientos."
			});
		}else{
			mCondicionesDeVenta.del(numero, function(){
				res.redirect("/condicionesdeventa/lista");
			});
		}
	});
}
