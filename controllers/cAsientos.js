var mAsientos = require('../models/mAsientos');

module.exports = {
	getLista: getLista,
	getFiltroAjax: getFiltroAjax
}

function getLista(req, res){
	res.render("asientos_lista", {
		pagename: "Lista de Asientos Contables"
	});
}

function getFiltroAjax(req, res){
	const params = req.params;
	var desde = params.desde;
	var hasta = params.hasta;

	mAsientos.getFiltroAjax(desde, hasta, function(asientos){
		var objData = { "data" : asientos };
		res.send(objData);
	});
}