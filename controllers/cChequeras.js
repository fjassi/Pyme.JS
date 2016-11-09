var mChequeras = require('../models/mChequeras');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	Sp_Abm_Chequeras: Sp_Abm_Chequeras,
	getModificar: getModificar,
	getEliminar: getEliminar,
	ValidarCodigo: ValidarCodigo
}

function getLista(req, res) {
	mChequeras.getAll(function (chequeras){
		res.render('alicuotas_lista', {
			pagename: 'Chequeras',
			chequeras: chequeras
		});
	});
}

function getAlta(req, res){
	mChequeras.getNextCodigo(function(chequeras){
			res.render("chequeras_alta", {
			pagename: "Alta de Chequeras",
			nextCodigo: chequeras[0].proximo_codigo 
		});
	});
}

function Sp_Abm_Alicuotas(req, res){
	var oAlicuotas = req.body;
	oAlicuotas.descripcion = oAlicuotas.descripcion.toUpperCase();
	
	mAlicuotas.Sp_Abm_Tiri(oAlicuotas, function(){
		res.redirect('/alicuotas/lista');
	});
}

function getModificar(req, res){
	const params = req.params;
	const codigo = params.codigo;

	mAlicuotas.getByCodigo(codigo, function(alicuotas){
		res.render('alicuotas_modificar', {
			pagename: 'Modificar Informacion de Alícuotas',
			alicuotas: alicuotas[0]
		});
	});
}

function getEliminar(req, res){
	const params = req.params;
	const codigo = params.codigo;

	mAlicuotas.del(codigo, function(){
		res.redirect('/alicuotas/lista');
	});
}

function ValidarCodigo(req, res){
	const params = req.params;
	const codigo = params.codigo;

	mAlicuotas.getByCodigo(codigo, function(alicuotas){
		res.send(alicuotas);
	});
}