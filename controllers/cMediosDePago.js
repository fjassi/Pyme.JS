const mMediosDePago = require('../models/mMediosDePago');
// var nodeExcel = require('excel-export');

module.exports = {
	getLista: getLista,
	getAlta: getAlta,
	Sp_Abm_Mpagos: Sp_Abm_Mpagos,
	getModificar: getModificar,
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

function Sp_Abm_Mpagos(req, res){
	var oMpagos = req.body;
	console.log(oMpagos);

	oMpagos.nombre = oMpagos.nombre.toUpperCase(); 

	if(oMpagos.caja == 'on')
		oMpagos.caja = 'S';
	else
		oMpagos.caja = 'N';

	if(oMpagos.usa_punto == 'on')
		oMpagos.usa_punto = 'S';
	else
		oMpagos.usa_punto = 'N';

	mMediosDePago.Sp_Abm_Mpagos(oMpagos, function(){
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