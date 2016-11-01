var mCentroDeCostos = require('../models/mCentroDeCostos');
const mPlanDeCuentas = require('../models/mPlanDeCuentas');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	sp_abm_talo: sp_abm_talo,
	getModificar: getModificar,
	getEliminar: getEliminar,
	ValidarNumero: ValidarNumero
}

function getLista(req, res) {
	mCentroDeCostos.getAll(function (centrodecostos){
		res.render('centrodecostos_lista', {
			pagename: 'Centros de Costos',
			centrodecostos: centrodecostos
		});
	});
}

function getAlta(req, res){
	mPlanDeCuentas.getAllImputables(function(imputables){
		mCentroDeCostos.getNextCodigo(function(nextcodigo){
			res.render("centrodecostos_alta", {
				pagename: "Alta de Centro de Costo",
				imputables: imputables,
				nextcodigo: nextcodigo[0].proximo_codigo
			});
		});
	});
}

function sp_abm_talo(req, res){
	var oCentroDeCosto = req.body;
	console.log(oCentroDeCosto)

	if (oCentroDeCosto.cerrado == 'on'){
		oCentroDeCosto.cerrado = '1';
	}else{
		oCentroDeCosto.cerrado = '0';
	}

	oCentroDeCosto.denominacion = oCentroDeCosto.denominacion.toUpperCase();

	mCentroDeCostos.Abm_Cent(oCentroDeCosto, function(){
		res.redirect('/centrodecostos/lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const numero = params.numero;

	mCentroDeCostos.getByNumero(numero, function(centro){
		mPlanDeCuentas.getAllImputables(function(imputables){
			res.render("centrodecostos_modificar", {
				pagename: "Modificar Centro de Costo",
				centro: centro[0],
				imputables: imputables
			});
		});
	});	
}

function getEliminar(req, res){
	const params = req.params;
	const numero = params.numero;

	// verificar movimientos
	mCentroDeCostos.validacionMovimientos(numero, function(movimientos){
		if (movimientos.length > 0){
			res.render("error", {
				error: "No se puede eliminar este Centro de Costo porque tiene movimientos."
			});
		}else{
			mCentroDeCostos.del(numero, function(){
				res.redirect('/centrodecostos/lista');
			});
		}
	});
	
}

function ValidarNumero(req, res){
	const params = req.params;
	const numero = params.numero;

	mCentroDeCostos.getByNumero(numero, function(centrodecosto){
		res.send(centrodecosto);
	});
}