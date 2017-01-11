const mRecibos = require('../models/mRecibos');
const mClientes = require('../models/mClientes');
const mMediosDePago = require('../models/mMediosDePago');
var tools = require('../public/js/utils.js');

module.exports = {
	getConsulta: getConsulta,
	getFiltroAjax: getFiltroAjax,
	getVer: getVer,
	getEliminar: getEliminar,
	get_rec1: get_rec1,
	get_rec2: get_rec2,
	get_rec3: get_rec3,
}

function getConsulta(req, res) {
	mClientes.getAll(function (clientes){
		mMediosDePago.getAll(function (mediosdepago){
			res.render('recibos_consulta', {
				pagename: 'Recibos - Consultas, Bajas',
				clientes: clientes,
				mediosdepago: mediosdepago
			});
		});
	});
}

function getFiltroAjax(req, res){
	const params = req.params;
	var desde = params.desde;
	var hasta = params.hasta;
	const cliente = params.cliente;
	const tipo = params.tipo;

	var query = "";

	if(tipo == 0){
		query = "select CONVERT(char, Rec1.r1_fecha, 101) as Fecha, Rec1.r1_talo as Talon, Rec1.r1_nume as Numero, Rec1.r1_clie as cliente, "+
 				"clientes.Cl_apel as Apellido, rec1.r1_total as Total, Rec1.r1_movi as Movim from rec1 inner join clientes "+
 				"on rec1.r1_clie = clientes.cl_nume  where rec1.r1_fecha between '"+desde+"' and '"+hasta+"' "
	}else{
		query = "select rec2.r2_tipo, CONVERT(char, Rec1.r1_fecha, 101) as Fecha, Rec1.r1_talo as Talon, Rec1.r1_nume as Numero, Rec1.r1_clie as cliente, "+
				"clientes.Cl_apel as Apellido, rec1.r1_total as Total, Rec1.r1_movi as Movim from rec2 "+
				"left join rec1 on rec1.r1_talo = rec2.r2_talo and rec1.r1_nume = rec2.r2_nume "+
				"inner join clientes on rec1.r1_clie = clientes.cl_nume "+
				"where rec1.r1_fecha between '"+desde+"' and '"+hasta+"' and r2_tipo = "+tipo
	}	

 	if (cliente != 0)
 		query += "and rec1.r1_clie = "+cliente;

	mRecibos.getFiltro(query, function(recibos){
		// var array = []
		// for(var key in recibos){
		// 	array.push(recibos[key])
		// }
		var objData = { "data" : recibos };

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