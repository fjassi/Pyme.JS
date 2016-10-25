var mBancos = require('../models/mBancos');

module.exports = {
	getLista: getLista
}

function getLista(req, res) {
  	mBancos.getAll(function (bancos){
  		console.log(bancos);
  		res.render('bancos_lista', {
			pagename: 'Bancos'
		});
  	});
}