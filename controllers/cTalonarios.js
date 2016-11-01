var mTalonarios = require('../models/mTalonarios');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	sp_abm_talo: sp_abm_talo,
	getModificar: getModificar,
	getEliminar: getEliminar
}

function getLista(req, res) {
	mTalonarios.getAll(function (talonarios){
		res.render('talonarios_lista', {
			pagename: 'Talonarios',
			talonarios: talonarios
		});
	});
}

function getAlta(req, res){
	res.render("talonarios_alta", {
		pagename: "Alta de Talonario"
	});
}

function sp_abm_talo(req, res){
	var oTalonario = req.body;
	
	mTalonarios.sp_abm_talo(oTalonario, function(){
		res.redirect('/talonarios/lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const id = params.id;

	mTalonarios.getById(id, function(talonario){
		res.render("talonarios_modificar", {
			pagename: "Modificar Talonario",
			talonario: talonario[0]
		});
	});	
}

function getEliminar(req, res){
	const params = req.params;
	const id = params.id;

	// verificar movimientos
	mTalonarios.del(id, function(){
		res.redirect('/talonarios/lista');
	});
}
