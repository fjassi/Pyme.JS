module.exports = {
	generateTodayDateYMD: generateTodayDateYMD,
	changeDate: changeDate,
    MaysPrimera: MaysPrimera,
    Excel_Export: Excel_Export
}

function generateTodayDateYMD () {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;

    if (day < 10) { day = '0' + day }
    if (month < 10) { month = '0' + month }

    today = today.getFullYear() + '-' + month + '-' + day;
    return today;
}

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "-" + date.substring(3,5) + "-" + date.substring(0,2);
	return fechaus;
	// output: yyyy-mm-dd
}

//mayus primera letra
function MaysPrimera(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function Excel_Export(array){
    console.log("go!")
    //var cellData = "Give me something to believe";

    var conf = {};

    //este tiene una url acá pero en el server es otra....
    conf.stylesXmlFile = "D:/Proyectos/Pyme.JS/style.xml";
        // conf.stylesXmlFile = "C:/Users/Administrador/Documents/Proyectos/Maresa/style.xml";

    //iterar el array e ir agregando cada uno de los json a conf.cols
    //traer desde la base dedatos, cada uno de los nombres de los campos con mayuscula al primero
    conf.cols = [{caption:'Codigo', type:'string'},
    {caption:'Denominacion', type:'string'},
    {caption:'Imputable', type:'string'},
    {caption:'Ajustable', type:'string'},
    {caption:'Nivel', type:'string'}];

    var arrPlan = [];

    for (var x = 0 ; x < plandecuentas.length ; x++){
        //iterar adentro de este for, de nuevo, cada uno de los json e ir agregandolos a "plan"(en este ejemplo)
        
        var cuenta = plandecuentas[x].cuenta;
        var nombre = plandecuentas[x].nombre;
        var impu = plandecuentas[x].impu;
        if (impu == 'S')
            impu = 'Si';
        else
            impu = 'No';
        var ajus = plandecuentas[x].ajus;
        if (ajus == 'S')
            ajus = 'Si';
        else
            ajus = 'No';
        var nivel = plandecuentas[x].nivel;

        var plan = [];

        plan.push(cuenta);
        plan.push(nombre);
        plan.push(impu);
        plan.push(ajus);
        plan.push(nivel);

        arrPlan.push(plan);
    }

    conf.rows = arrPlan;
    var result = nodeExcel.execute(conf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=" + "PlanDeCuentas.xlsx");
    res.end(result, 'binary');
    console.log("finished")
}