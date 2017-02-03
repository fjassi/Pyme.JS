const mReporteCheques = require('../models/mReporteCheques');
const mBancosPropios = require('../models/mBancosPropios');

const tools = require('../public/js/utils.js');

module.exports = {
	getLista: getLista,
	getFiltroAjax: getFiltroAjax
}

function getLista(req, res) {
	mBancosPropios.getAll(function(bancospropios){
		res.render('reportecheques_lista', {
			pagename: 'Reporte de Cheques',
			bancospropios: bancospropios
		});
	});	
}

function getFiltroAjax(req, res){
	const params = req.params;
	var fecha_desde = params.fecha_desde;
	fecha_desde = tools.changeDate(fecha_desde);
    var fecha_hasta = params.fecha_hasta;
    fecha_hasta = tools.changeDate(fecha_hasta);
    var tipo_estado = params.tipo_estado;
    var cuenta = params.cuenta;
    var ver_destino = params.ver_destino;
    var opago_hasta = params.opago_hasta;



    var query = "select ch_fecha as xfecha, "+
				"CONVERT(varchar(13), ch_fecha, 103) as fecha_f, "+
				"ch_numero as xnumero, ch_valor as xvalor, ch_clien as xclien, "+
				"ch_banco as xbanco, ch_bsc as xbsc, ch_cta as xcta, ch_cuenta3 as xcuenta3, "+
				"ch_como as xcomo, ch_movi as xmovi, ch_movi2 as xmovi2, "+
				"ch_fecha as xFop, CONVERT(varchar(13), ch_fecha, 103) as fecha_ordenpago_f, "+
				"ch_fecha as xFdep , CONVERT(varchar(13), ch_fecha, 103) as fecha_deposito_f, "+
				"ch_fecha as xFing, CONVERT(varchar(13), ch_fecha, 103) as fecha_ingreso_f, "+
				"space(60) as Destino "+
				"from Cheques where ch_fecha between '"+fecha_desde+"' and '"+fecha_hasta+"'"
	console.log("tipo estado: "+tipo_estado)
	switch(tipo_estado){
		case "1"://todos			
			break;
		case "2"://en cartera
			query += " and ch_como = 'E'";
			break;
		case "3"://salidos de 3ro
			query += " and ch_como = 'S' and len(ch_cta) = '0'";
			break;
		case "4"://salidos propios
			query += " and ch_como = 'S' and len(ch_cta) <> '0'";
			break;
		case "5"://postdatados
			
			break;
		default:
			break;
	}

	//add cuenta
	console.log("cuenta: "+cuenta)
	if(cuenta != "0"){
		query += " and ch_cta = '"+cuenta+"'";
	}

    mReporteCheques.FiltroAjax(query, function(reportecheques){
    	// console.log(reportecheques)
    	console.log(reportecheques.length)
    	var objData = { "data" : reportecheques };
		res.send(objData);
    });
}