
var express = require('express');
var app = express();


app.get('/preguntas',function(req,res){


res.send('<!DOCTYPE html>'
	+'<html><head><title>Preguntas'
	+ '</title></head><body>'
		+ '<h2>Bienvenido/a</h2>'
		+ '<h4><em>Responda a las siguientes preguntas</em></h4><hr>'
		+ '<form name="frm_America" method="get" action="/respuesta">'
		+ '<ol><li></li></ol>'
		+ '<label for="america">¿Quién descubrió América?</label><br><br>'
		+ '<input type="text" name="resp" placeholder="Escriba aquí su respuesta"><br><br>'
		+ '<input type="hidden" name="num_pregunta" value="1">'
		+ '<input type="submit" value="Enviar"></form><hr><br><br><hr>'
		+ '<form name="frm_Portugal" method="get" action="/respuesta">'
		+ '<ol start="2"><li></li></ol>'
		+ '<label for="portugal">¿Capital de Portugal?</label><br><br>'
		+ '<input type="text" name="resp" placeholder="Escriba aquí su respuesta"><br><br>'
		+ '<input type="hidden" name="num_pregunta" value="2">'
		+ '<input type="submit" value="Enviar"></form><hr>'
		+ '</body></html>' );

});



app.get('/respuesta',function(req,res){

var text ='<p>Su respuesta a la pregunta ' + req.query.num_pregunta + ' ha sido '
	+ req.query.resp + '.</p>';

var resul = convertirSinAcentos(req.query.resp);

if (req.query.num_pregunta === '1')  {
				
				if(resul === "colon" || resul === "cristobal colon") {
						resul
					text += '<p>Ha contestado correctamente.</p>';
				
				} else { text +='<p>La respuesta correcta es Cristóbal Colón</p>.';}
			}else{

				if (req.query.num_pregunta === '2') {
				
				if(resul === "lisboa") {
				
					text = text + '<p>Ha contestado correctamente.</p>';

			    } else { text +='<p>La respuesta correcta es Lisboa.</p>';}
			}

			}

			

	res.send(text + '<a href="/preguntas">Volver a las preguntas</a>');

} );

app.get('*',function(req,res){

	var texto ="<p>La página en la que se encuentra es Desconocida.</p>";

	res.send(texto + '<a href="/preguntas">Volver a las preguntas</a>');

});


app.listen(8000);

console.log('Listening on port 8000');

function convertirSinAcentos(respuesta) {
	var r = respuesta.toLowerCase();
	r = r.replace(/[á]/g,'a');
	r = r.replace(/[é]/g,'e');
	r = r.replace(/[í]/g,'i');
	r = r.replace(/[ó]/g,'o');
	r = r.replace(/[ú]/g,'u');
	
	return r;
}