const mMediosDePago = require('../models/mMediosDePago');
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
	mMediosDePago.getAll(function(mediosdepago){
		res.render("mediosdepago_lista", {
			pagename: "Medios de Pago",
			mediosdepago: mediosdepago
		});
	});
}

function getAlta(req, res){
	mMediosDePago.getNextCodigo(function(next){
		res.render("mediosdepago_alta", {
			pagename: "Alta de Medio de Pago",
			nextcodigo: next[0].proximo_codigo
		});
	});
}

function postAlta(req, res){
	const params = req.body;
	console.log(params);
	const codigo = params.codigo;
	var nombre = params.nombre;
	nombre = nombre.toUpperCase(); 
	const cotizacion = params.cotizacion;
	var caja = params.caja;
	var usa_punto = params.usa_punto;
	const tipo = params.tipo;

	if(caja == 'on')
		caja = 'S';
	else
		caja = 'N';

	if(usa_punto == 'on')
		usa_punto = 'S';
	else
		usa_punto = 'N';

	mMediosDePago.Sp_Abm_Mpagos(codigo, nombre, 'N', cotizacion, caja, tipo, usa_punto, function(){
		res.redirect("/mediosdepago/lista");
	});
}

function getModificar(req, res){
	const params = req.params;
	const codigo = params.codigo;

	mMediosDePago.getByCodigo(codigo, function(mediodepago){
		console.log(mediodepago)
		res.render("mediosdepago_modificar", {
			pagename: "Modificar Medio de Pago",
			mediodepago: mediodepago[0]
		});
	});
}

function postModificar(req, res){
	const params = req.body;
	console.log(params);
	const codigo = params.codigo;
	var nombre = params.nombre;
	nombre = nombre.toUpperCase(); 
	const cotizacion = params.cotizacion;
	var caja = params.caja;
	var usa_punto = params.usa_punto;
	const tipo = params.tipo;

	if(caja == 'on')
		caja = 'S';
	else
		caja = 'N';

	if(usa_punto == 'on')
		usa_punto = 'S';
	else
		usa_punto = 'N';

	mMediosDePago.Sp_Abm_Mpagos(codigo, nombre, 'N', cotizacion, caja, tipo, usa_punto, function(){
		res.redirect("/mediosdepago/lista");
	});
}

function getEliminar(req, res){
	// No permitir borrar ningún medio de pago FIJO, Mpagos.Fijo=´S´
	// Si el medio de pago no es Fijo ,  Mpagos.codigo, verificar en tablas: Pcas.Ps_moneda, Rec2.r2_tipo, Opa3.o3_tipo
	const params = req.params;
	const codigo = params.codigo;

	mMediosDePago.getByCodigo(codigo, function(mediodepago){
		if(mediodepago[0].fijo != 'S'){
			mMediosDePago.validacionMovimientos(codigo, function(movimientos){
				if(movimientos.length > 0){
					res.render("error",{
						error: "No se puede eliminar este Medio de Pago porque posee movimientos."
					});
				}else{
					mMediosDePago.del(codigo, function(){
						res.redirect("/mediosdepago/lista");
					});
				}
			});
		}else{
			res.render("error", {
				error: "No se puede eliminar este Medio de Pago porque es FIJO."
			});
		}
	});
}