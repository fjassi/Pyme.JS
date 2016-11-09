function soloNumeros(e){
	var key = window.Event ? e.which : e.keyCode
	return (key >= 48 && key <= 57)
}//onKeyPress="return soloNumeros(event)"

function changeDate(date){
	// input: dd/mm/yyyy
	fechaus = date.substring(6,10) + "/" + date.substring(3,5) + "/" + date.substring(0,2);
	return fechaus;
	// output: yyyy/mm/dd
}

function changeDate2(date){
	// input: yyyy/mm/dd
	fechaus = date.substring(8,10) + "/" + date.substring(5,7) + "/" + date.substring(0,4);
	return fechaus;
	// output: dd/mm/yyyy
}

function Numy1Punto(e, field) {
	key = e.keyCode ? e.keyCode : e.which
	// backspace
	if (key == 8) return true
	// 0-9
	if (key > 47 && key < 58) {
	if (field.value == "") return true
	regexp = /.[0-9]{2}$/
	return !(regexp.test(field.value))
	}
	// .
	if (key == 46) {
	if (field.value == "") return false
	regexp = /^[0-9]+$/
	return regexp.test(field.value)
	}
	// other key
	return false
}//onKeyPress="return Numy1Punto(event, this)"

function checkDec(el){
	var ex = /^[0-9]+\.?[0-9]*$/;
	if(ex.test(el.value)==false){
	   	el.value = el.value.substring(0,el.value.length - 1);
	}
}//i cant remember what this does

function validate(evt) {
  var theEvent = evt || window.event;
  var key = theEvent.keyCode || theEvent.which;
  key = String.fromCharCode( key );
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}// onKeyPress='validate(event)'

function Validate5EntY2Dec(e, field) {
    key = e.keyCode ? e.keyCode : e.which
    // backspace
    if (key == 8) return true
 
    // 0-9 a partir del .decimal  
    if (field.value != "") {
        if ((field.value.indexOf(".")) > 0) {
            //si tiene un punto valida dos digitos en la parte decimal
            if (key > 47 && key < 58) {
                if (field.value == "") return true
                //regexp = /[0-9]{1,10}[\.][0-9]{1,3}$/
            	// dos decimales
                regexp = /[0-9]{2}$/
                return !(regexp.test(field.value))
            }
        }
    }
    // 0-9 
    if (key > 47 && key < 58) {
        if (field.value == "") return true
        // 10 enteros?
        regexp = /[0-9]{5}/
        return !(regexp.test(field.value))
    }
    // .
    if (key == 46) {
        if (field.value == "") return false
        regexp = /^[0-9]+$/
        return regexp.test(field.value)
    }
    // other key
    return false
}//onKeyPress="return Validate5EntY2Dec(event,this)"

function Validate3EntY3Dec(e, field) {
    key = e.keyCode ? e.keyCode : e.which
    // backspace
    if (key == 8) return true
 
    // 0-9 a partir del .decimal  
    if (field.value != "") {
        if ((field.value.indexOf(".")) > 0) {
            //si tiene un punto valida dos digitos en la parte decimal
            if (key > 47 && key < 58) {
                if (field.value == "") return true
                //regexp = /[0-9]{1,10}[\.][0-9]{1,3}$/
                // dos decimales
                regexp = /[0-9]{3}$/
                return !(regexp.test(field.value))
            }
        }
    }
    // 0-9 
    if (key > 47 && key < 58) {
        if (field.value == "") return true
        // 10 enteros?
        regexp = /[0-9]{3}/
        return !(regexp.test(field.value))
    }
    // .
    if (key == 46) {
        if (field.value == "") return false
        regexp = /^[0-9]+$/
        return regexp.test(field.value)
    }
    // other key
    return false
}//onKeyPress="return Validate3EntY3Dec(event,this)"

function Validate8EntY2Dec(e, field) {
    key = e.keyCode ? e.keyCode : e.which
    // backspace
    if (key == 8) return true 
    // 0-9 a partir del .decimal  
    if (field.value != "") {
        if ((field.value.indexOf(".")) > 0) {
            //si tiene un punto valida dos digitos en la parte decimal
            if (key > 47 && key < 58) {
                if (field.value == "") return true
                //regexp = /[0-9]{1,10}[\.][0-9]{1,3}$/
                // dos decimales
                regexp = /[0-9]{2}$/
                return !(regexp.test(field.value))
            }
        }
    }
    // 0-9 
    if (key > 47 && key < 58) {
        if (field.value == "") return true
        // 10 enteros?
        regexp = /[0-9]{8}/
        return !(regexp.test(field.value))
    }
    // .
    if (key == 46) {
        if (field.value == "") return false
        regexp = /^[0-9]+$/
        return regexp.test(field.value)
    }
    // other key
    return false
}//onKeyPress="return Validate8EntY2Dec(event,this)"

function Validate4EntY2Dec(e, field) {
    key = e.keyCode ? e.keyCode : e.which
    // backspace
    if (key == 8) return true
 
    // 0-9 a partir del .decimal  
    if (field.value != "") {
        if ((field.value.indexOf(".")) > 0) {
            //si tiene un punto valida dos digitos en la parte decimal
            if (key > 47 && key < 58) {
                if (field.value == "") return true
                //regexp = /[0-9]{1,10}[\.][0-9]{1,3}$/
                // dos decimales
                regexp = /[0-9]{2}$/
                return !(regexp.test(field.value))
            }
        }
    }
    // 0-9 
    if (key > 47 && key < 58) {
        if (field.value == "") return true
        // 10 enteros?
        regexp = /[0-9]{4}/
        return !(regexp.test(field.value))
    }
    // .
    if (key == 46) {
        if (field.value == "") return false
        regexp = /^[0-9]+$/
        return regexp.test(field.value)
    }
    // other key
    return false
}//onKeyPress="return Validate4EntY2Dec(event,this)"

function validarCuit(cuit) { 
    if(cuit.length != 11) {
        return false;
    }

    var acumulado   = 0;
    var digitos     = cuit.split("");
    var digito      = digitos.pop();

    for(var i = 0; i < digitos.length; i++) {
        acumulado += digitos[9 - i] * (2 + (i % 6));
    }

    var verif = 11 - (acumulado % 11);
    if(verif == 11) {
        verif = 0;
    } else if(verif == 10) {
        verif = 9;
    }

    return digito == verif;
}

function generateTodayDateDMY () {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;

    if (day < 10) { day = '0' + day }
    if (month < 10) { month = '0' + month }

    today = day+'-'+month+'-'+today.getFullYear();
    return today;
}

function Validate10EntY2Dec(e, field) {
    key = e.keyCode ? e.keyCode : e.which
    // backspace
    if (key == 8) return true
 
    // 0-9 a partir del .decimal  
    if (field.value != "") {
        if ((field.value.indexOf(".")) > 0) {
            //si tiene un punto valida dos digitos en la parte decimal
            if (key > 47 && key < 58) {
                if (field.value == "") return true
                //regexp = /[0-9]{1,10}[\.][0-9]{1,3}$/
                // dos decimales
                regexp = /[0-9]{2}$/
                return !(regexp.test(field.value))
            }
        }
    }
    // 0-9 
    if (key > 47 && key < 58) {
        if (field.value == "") return true
        // 10 enteros?
        regexp = /[0-9]{10}/
        return !(regexp.test(field.value))
    }
    // .
    if (key == 46) {
        if (field.value == "") return false
        regexp = /^[0-9]+$/
        return regexp.test(field.value)
    }
    // other key
    return false
}//onKeyPress="return Validate10EntY2Dec(event,this)"