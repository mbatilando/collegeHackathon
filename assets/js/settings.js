$(document).ready(function() {
	$('a').click(function(e) {
		var ulElm = $(this).parent().find('ul').toggle();
		if(ulElm.is(":visible")) {
			$(this).find('span').html('&#x25B2;');
		} else {
			$(this).find('span').html('&#x25BC;');
		}
	});
});