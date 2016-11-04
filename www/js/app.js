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

$(".acao-finalizar").click(function(){
	$.ajax({
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

/*
$('.scan-qrcode').click(function(){
	navigator.camera.getPicture(onSuccess, onFail, { quality: 25,
	    destinationType: Camera.DestinationType.DATA_URL
	});

	function onSuccess(imageData) {
	    var image = $('#myImage');
	    image.attr("src", "data:image/jpeg;base64," + imageData);
	}

	function onFail(message) {
	    alert('Failed because: ' + message);
	}
});
*/
