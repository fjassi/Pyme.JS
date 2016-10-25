module.exports = {
    getInicio: getInicio
}

function getInicio(req, res){
    res.render('index', {
        pagename: 'Gestion'
    });
}