$(document).ready(function() {
	$('a').click(function(e) {
		var ulElm = $(this).parent().find('ul').toggle();
		if(ulElm.is(":visible")) {
			$(this).find('span').html('&#x25B2;');
		} else {
			$(this).find('span').html('&#x25BC;');
		}
	});
	var toggleFunction = function(item) {
		var parent = item.parents('li').first();
		if(parent.hasClass('header') == false) {
			parent.toggleClass('selected');
		}
	};
	$('label').click(function(e) {
		toggleFunction($(this));
		
	});
	$('a').click(function(e) {
		toggleFunction($(this));
		
	});
});