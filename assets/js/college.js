$(document).ready(function() {
	$('#sideNavBar a').click(function(){
		$('#sideNavBar').slideToggle();
	});
	
	
	$('#login-trigger').click(function(){
		$(this).next('#login-content').slideToggle();
		$(this).toggleClass('active');					
		
		if ($(this).hasClass('active')) $(this).find('span').html('&#x25B2;')
			else $(this).find('span').html('&#x25BC;')
		})
});