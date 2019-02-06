var upozorenje = {
	poruka: "Grad mora biti velikim slovima"
}

function proveraForme(forma) {
	
	let ime = forma.ime.value;
	let prezime = forma.prezime.value;
	let jmbg = forma.jmbg.value;
	let grad = forma.grad.value;

	if(ime == ''){
		return false;
	}

	if(prezime == ''){
		return false
	}

	if(jmbg == '' || jmbg.length != 13 || isNaN(jmbg)){
		return false;
	}

	if(grad == '' || grad.toUpperCase() != grad){
		callAlertFunction(upozorenje, ispisiPoruku);
		return false;
	}
}

function callAlertFunction(parametar, callback){
	callback(parametar);
}
 
function ispisiPoruku(parametar){
	alert(parametar.poruka);
}

function proveraJmbg(input){
	if(input.value == '' || input.value.length != 13 || isNaN(input.value)){
		document.getElementById('jmbg_label').classList.add('redText');
		document.getElementById('submitBtn').disabled = true
	}else{
		document.getElementById('jmbg_label').classList.remove('redText');
		document.getElementById('submitBtn').disabled = false;
	}
}

function proveraGrad(input){
	if(input.value == '' || input.value.toUpperCase() != input.value){
		document.getElementById('grad_label').classList.add('redText');
	}else{
		document.getElementById('grad_label').classList.remove('redText');
	}
}