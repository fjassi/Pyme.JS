const mComprobantes = require('../models/mComprobantes');
const mClientes = require('../models/mClientes');
const mTipoCV = require('../models/mTipoCV');
var tools = require('../public/js/utils.js');

module.exports = {
	getConsulta: getConsulta,
	getFiltroAjax: getFiltroAjax
	// getVer: getVer,
	// getEliminar: getEliminar,
	// get_rec1: get_rec1,
	// get_rec2: get_rec2,
	// get_rec3: get_rec3,
}

function getConsulta(req, res) {
	mClientes.getAll(function (clientes){
		mTipoCV.getAll(function (tipocv){
			res.render('comprobantes_consulta', {
				pagename: 'Comprobantes de Ventas - Consultas, Bajas, Modificaciones',
				clientes: clientes,
				tipocv: tipocv
			});
		});
	});
}

function getFiltroAjax(req, res){
	const params = req.params;
	var desde = params.desde;
	var hasta = params.hasta;
	const fecha = params.fecha;
	const tipo = params.tipo;
	const cliente = params.cliente;
	const estado = params.estado;

	var query = "";

	if (fecha == 2){
		query = "select fa_tipo as let, fa_nume as Numero, CONVERT(char, fa_fecha, 103) as Fecha, "+
		"tipocv.nombre as T_Com, fa_razon as Cliente, fa_total as Total, fa_topa as Abonado, "+
		"CONVERT(char, fa_vence, 103) as Vence, fa_subto as Neto, fa_porret as PorRet, fa_Impret as ImpRet, "+
		"fa_remito as remito, fa_tico from fact "+
		"left join tipocv on tipocv.tipo = fact.fa_tico where tipocv.tipo = '"+tipo+"' and fa_vence between '"+desde+"' and '"+hasta+"' "
	} else {
		query = "select fa_tipo as let, fa_nume as Numero, CONVERT(char, fa_fecha, 103) as Fecha, "+
		"tipocv.nombre as T_Com, fa_razon as Cliente, fa_total as Total, fa_topa as Abonado, "+
		"CONVERT(char, fa_vence, 103) as Vence, fa_subto as Neto, fa_porret as PorRet, fa_Impret as ImpRet, "+
		"fa_remito as remito, fa_tico from fact "+
		"left join tipocv on tipocv.tipo = fact.fa_tico where tipocv.tipo = '"+tipo+"' and fa_fecha between '"+desde+"' and '"+hasta+"' "
	}

 	if (cliente != 0)
 		query += "and fa_clie = " + cliente;

 	if (estado == 2)
 		query += "and fa_topa<>fa_total";

	mComprobantes.getFiltro(query, function(comprobante){

		var objData = { "data" : comprobante };

		res.send(objData)
	});
}

function getVer(req, res){
	const params = req.params;
	const numero = params.numero;

	mRecibos.getByNumero(numero, function(recibo){
		mRecibos.Recibos_rec1(numero, function(rec1){
			mRecibos.Recibos_rec2(numero, function(rec2){
				mRecibos.Recibos_rec3(numero, function(rec3){
					res.render("recibos_ver", {
						recibo: recibo[0],
						rec1: rec1,
						rec2: rec2,
						rec3: rec3
					});
				});
			});
		});
	});		
}

function getEliminar(req, res){
	const params = req.params;
	const numero = params.numero;

	mRecibos.delRec1(numero, function(){
		mRecibos.delRec2(numero, function(){
			mRecibos.delRec3(numero, function(){
				res.redirect("/recibos/consulta");
			});
		});
	});
}

function get_rec1(req, res){
	const params = req.params;
	const numero = params.numero;

	mRecibos.Recibos_rec1(numero, function(rec1){
		res.send(rec1);
	});
}

function get_rec2(req, res){
	const params = req.params;
	const numero = params.numero;

	mRecibos.Recibos_rec2(numero, function(rec2){
		res.send(rec2);
	});
}

function get_rec3(req, res){
	const params = req.params;
	const numero = params.numero;

	mRecibos.Recibos_rec3(numero, function(rec3){
		res.send(rec3);
	});
}

function getByNumero(req, res){
	const params = req.params;
	const numero = params.numero;

	mRecibos.getByNumero(numero, function(recibo){
		res.send(recibo[0]);
	});
}