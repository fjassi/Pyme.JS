const mRecibos = require('../models/mRecibos');
const mClientes = require('../models/mClientes');
const mMediosDePago = require('../models/mMediosDePago');
var tools = require('../public/js/utils.js');

module.exports = {
	getConsulta: getConsulta,
	getFiltroAjax: getFiltroAjax
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
		query = "select Rec1.r1_fecha as Fecha, Rec1.r1_talo as Talon, Rec1.r1_nume as Numero, Rec1.r1_clie as cliente, "+
 				"clientes.Cl_apel as Apellido, rec1.r1_total as Total, Rec1.r1_movi as Movim from rec1 inner join clientes "+
 				"on rec1.r1_clie = clientes.cl_nume  where rec1.r1_fecha between '"+desde+"' and '"+hasta+"' "
	}else{
		query = "select rec2.r2_tipo, Rec1.r1_fecha as Fecha, Rec1.r1_talo as Talon, Rec1.r1_nume as Numero, Rec1.r1_clie as cliente, "+
				"clientes.Cl_apel as Apellido, rec1.r1_total as Total, Rec1.r1_movi as Movim from rec2 "+
				"left join rec1 on rec1.r1_talo = rec2.r2_talo and rec1.r1_nume = rec2.r2_nume "+
				"inner join clientes on rec1.r1_clie = clientes.cl_nume "+
				"where rec1.r1_fecha between '"+desde+"' and '"+hasta+"' and r2_tipo = "+tipo
	}
	

 	if (cliente != 0)
 		query += "and rec1.r1_clie = "+cliente;

	mRecibos.getFiltro(query, function(recibos){
		res.send(recibos)
	});
}