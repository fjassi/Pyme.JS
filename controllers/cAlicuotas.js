var mAlicuotas = require('../models/mAlicuotas');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	Sp_Abm_Alicuotas: Sp_Abm_Alicuotas,
	getModificar: getModificar,
	getEliminar: getEliminar,
	ValidarCodigo: ValidarCodigo
}

function getLista(req, res) {
	mAlicuotas.getAll(function (alicuotas){
		res.render('alicuotas_lista', {
			pagename: 'Alícuotas de Ret. & Perc. de Ingresos Brutos',
			alicuotas: alicuotas
		});
	});
}

function getAlta(req, res){
	mAlicuotas.getNextCodigo(function(alicuotas){
			res.render("alicuotas_alta", {
			pagename: "Alta de Alícuotas",
			nextCodigo: alicuotas[0].proximo_codigo 
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