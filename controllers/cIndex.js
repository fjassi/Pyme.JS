module.exports = {
    getInicio: getInicio,
    getError: getError
}

function getInicio(req, res){
    res.render('index', {
        pagename: 'Gestion'
    });
}

function getError(req, res) {
	res.render('error',{
        pagename: 'Error',
	});
}