$(document).ready(function() {
	$('#sideNavBar a').click(function(){
	});
	
	$('#login-trigger').click(function(){
		$(this).next('#login-content').slideToggle();
		$(this).toggleClass('active');					
		
		if ($(this).hasClass('active')) $(this).find('span').html('&#x25B2;')
			else $(this).find('span').html('&#x25BC;')
	});
	
	//var data = $.ajax('url');
	var data = {
			'result': true,
			'summary': "University of California--Berkeley is a public institution that was founded in 1868. It has a total undergraduate enrollment of 25,885, its setting is urban, and the campus size is 1,232 acres. It utilizes a semester-based academic calendar. University of California--Berkeley's ranking in the 2013 edition of Best Colleges is National Universities, 21.",
			'deadlines': [{"year":2013,"month":5,"day":26,"title":"Early Application Deadline","time":"4 pm"},{"year":2013,"month":6,"day":05,"title":"Application Deadline","time":"4 pm"}], 
			'tuition': 'Its in-state tuition and fees are $11,767 (2011-12); out-of-state tuition and fees are $34,645 (2011-12).',
			'map': 'https://maps.google.com/maps?f=q&amp;source=embed&amp;hl=en&amp;geocode=&amp;q=uc+berkeley&amp;aq=&amp;sll=37.870775,-122.30098&amp;sspn=0.070058,0.134411&amp;t=h&amp;ie=UTF8&amp;hq=uc+berkeley&amp;ll=37.872905,-122.248072&amp;spn=0.021128,0.036214'
				
	};
	
	function populateCollege(info) {
		var contentParentDiv = $("#collegecontent div.tab-content");
		function findTabDiv(parentDiv, type, prefix) {
			var findPrefix = prefix
			if(!findPrefix) {
				findPrefix = 'tab';
			}
			return parentDiv.find('#' + findPrefix + '-' + type);
		};
		function createDeadlineNode(deadlineInfo) {
			var liNode = $('<li>');
			var html = '';
			html += deadlineInfo.day + '-' + deadlineInfo.month + '-' + deadlineInfo.year + " at " + deadlineInfo.time;
			html += " " + deadlineInfo.title;
			liNode.html(html);
			return liNode;
		};
		for(var i in data) {
			var key = i;
			var obj = data[key];
			var tab = findTabDiv(contentParentDiv, key);
			var mapNode = findTabDiv(contentParentDiv, 'map', 'section').html('');
			if(tab.length) {
				if(key === 'deadlines') {
					if(obj && obj.length > 0) {
						var ulNode = $("<ul>");
						for(var deadlineInfo in obj) {
							ulNode.append(createDeadlineNode(deadlineInfo));
						}
						tab.html('').append(ulNode);
					}
				} else if(key === 'map') {
					var iframeNode = $("<iframe>").prop("src", obj);
					mapNode.append(iframeNode);
				} else {
					tab.html(obj);
				}
			}
			
		}
	};
	
	populateCollege(data);
});