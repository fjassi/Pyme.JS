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
}//onkeypress="return Numy1Punto(event, this)"

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
}// onkeypress='validate(event)'

// //VALIDATE EMAIL:
// function checkemail(this){
// 	var testresults;

// 	var str=this.value;
// 	var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
// 	if (filter.test(str))
// 		testresults=true;
// 	else{
// 		alert("Please input a valid email address!");
// 		testresults=false;
// 	return (testresults);
// }
