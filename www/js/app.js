$('.collection-item').click(function(){

	var $badge = $('.badge', this);

	if($badge.length == 0){
		$badge = $('<span class="badge brown-text">0</span>')
		.appendTo(this);
	}

	$badge.text(parseInt($badge.text()) + 1);

})

$('#confirmar').click(function(){

	var texto = '';

	$('.badge').parent().each(function(){
		var produto = this.firstChild.textContent;
		var quantidade = this.lastChild.textContent;

		texto += produto + ': ' + quantidade + ';';
	})

	$('#resumo').empty().text(texto);
})

$('.modal-trigger').leanModal();

$('.collection').on('click', '.badge', function(){
	$(this).remove();
	return;
})

$('.acao-limpar').click(function(){
	$('#numero-mesao').val('');
	$('.badge').remove();
})