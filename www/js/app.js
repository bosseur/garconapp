var api_key = "AIzaSyClkF7Z1RD4KDdyiQCCf9-0I_zW2yidAlI";
$('.collection-item').click(function(){

	var $badge = $('.badge', this);

	if($badge.length == 0){
		$badge = $('<span class="badge brown-text">0</span>')
		.appendTo(this);
	}

	$badge.text(parseInt($badge.text()) + 1);

});

$('#confirmar').click(function(){

	var texto = '';

	$('.badge').parent().each(function(){
		var produto = this.firstChild.textContent;
		var quantidade = this.lastChild.textContent;

		texto += produto + ': ' + quantidade + ';';
	})

	$('#resumo').empty().text(texto);
});

$('.modal-trigger').leanModal();

$('.collection').on('click', '.badge', function(){
	$(this).remove();
	return;
});

$('.acao-limpar').click(function(){
	$('#numero-mesao').val('');
	$('.badge').remove();
});

/*
$('.scan-qrcode').click(function(){
	cordova.plugins.barcodeScanner.scan(
		function (result){
	        if (result.text) {
	            Materialize.toast('Mesa ' + result.text, 2000);
	            $('#numeroMesa').val(result.text);
	        }
	    },
	    function (error) {
	        Materialize.toast('Erro: ' + error, 3000, 'red-text');
	    }
    );
});
*/
$(".acao-finalizar").click(function(){

	$.ajax({
		type:"POST",
		url:"http://cozinhapp.sergiolopes.org/novo-pedido",
		data:{
			mesa:$("#numeroMesa").val(),
			pedido:$("#resumo").text()
		},
		success: function(resposta){
			Materialize.toast(resposta, 2000);
			$("#numeroMesa").val("");
			$(".badge").remove();
		},
		error:function(error){
			 Materialize.toast(error.responseText, 2000);
		}
	})
});


$('.scan-qrcode').click(function(){
	navigator.camera.getPicture(onSuccess, onFail, { quality: 25,
	    destinationType: Camera.DestinationType.DATA_URL
	});

	function onSuccess(imageData) {
	    var image = $('#myImage');
		var json = '{' +
		    ' "requests": [' +
		    '	{ ' +
		    '	  "image": {' +
		    '	    "content":"' + imageData.replace("data:image/jpeg;base64,", "") + '"' +
		    '	  },' +
		    '	  "features": [' +
		    '	      {' +
		    '	      	"type": "TEXT_DETECTION"' +
		    '	      }' +
		    '	  ]' +
		    '	}' +
		    ']' +
		    '}';

		$.ajax({
			type:"POST",
			url: "https://vision.googleapis.com/v1/images:annotate?key=" + api_key,
			dataType:"json",
			contentType : 'application/json',
			data:json,
			headers: {
      			"Content-Type": "application/json",
    		},
    		complete:function( jqXHR, textStatus){
				Materialize.toast(jqXHR.status, 2000);
    		},
			success: function(resposta){
				$("#respostaJson").val(resposta.responses[0].textAnnotations[0].description);				
			},
			error:function(error){
				 Materialize.toast("Error message" + error.responseText);
			}
		});
		image.attr("src", "data:image/jpeg;base64," + imageData);

	}

	function onFail(message) {
	     Materialize.toast('Failed because: ' + message, 5000);
	}
});

