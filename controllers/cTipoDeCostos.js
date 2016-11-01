const mTipoDeCostos = require('../models/mTipoDeCostos');
const mPlanDeCuentas = require('../models/mPlanDeCuentas');
// var nodeExcel = require('excel-export');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	Sp_Abm_Tipc: Sp_Abm_Tipc,
	getModificar: getModificar,
	getEliminar: getEliminar,
	ValidarNumero: ValidarNumero
}

function getLista(req, res) {
  	mTipoDeCostos.getAll(function (tipodecostos){
  		res.render("tipodecostos_lista", {
			pagename: 'Lista de Tipo de Costos',
			tipodecostos: tipodecostos
		});
  	});
}

function getAlta(req, res){
	mPlanDeCuentas.getAllImputables(function(imputables){
		mTipoDeCostos.getNextCodigo(function(nextcodigo){
			res.render("tipodecostos_alta", {
				pagename: "Alta de Tipo de Costo",
				imputables: imputables,
				nextcodigo: nextcodigo[0].proximo_codigo
			});
		});
	});
}

function Sp_Abm_Tipc(req, res){
	const oTipoDeCosto = req.body;
	console.log(oTipoDeCosto);

	oTipoDeCosto.denominacion = oTipoDeCosto.denominacion.toUpperCase();

	mTipoDeCostos.Sp_Abm_Tipc(oTipoDeCosto, function(){
		res.redirect('/tipodecostos/lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const numero = params.numero;

	mTipoDeCostos.getByNumero(numero, function(tipodecosto){
		mPlanDeCuentas.getAllImputables(function(imputables){
			res.render("tipodecostos_modificar", {
				pagename: "Modificar Tipo de Costo",
				imputables: imputables,
				tipodecosto: tipodecosto[0]
			});
		});
	});
}

function getEliminar(req, res){
	const params = req.params;
	const numero = params.numero;
	// Tipc.ti_nume Verificar en 3 tablas
	// Fac3.f3_tipc Fap4.f4_tipc Opa4.o4_tipc
	mTipoDeCostos.validacionMovimientos(numero, function(movimientos){
		if (movimientos.length == 0){
			mTipoDeCostos.del(numero, function(){
				res.redirect('/tipodecostos/lista');
			});
		}else{
			res.render("error", {
				error: "Este Tipo de Costo no se puede eliminar porque posee movimientos!"
			});
		}
	});
}

function ValidarNumero(req, res){
	const params = req.params;
	const numero = params.numero;

	mTipoDeCostos.getByNumero(numero, function(tipocosto){
		res.send(tipocosto);
	});
}