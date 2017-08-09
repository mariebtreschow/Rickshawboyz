
function ajaxCall() {
	$.ajax(
		{
			url:'http://www.rickshawboyz.nl/api/challenges',
			success: function (result) {
				console.log(result);
				paintChallenges(result.tweets);
			},
			error:
				function (jqXHR, textStatus, errorThrown) {
					if(textStatus == 'error') {
						location.href='./../404.html';
					}
				}
		})
}
function paintChallenges(tweets) {

	for (let index=0; index<tweets.length; index++) {
		if(tweets[index].body.indexOf("RT ") !== 0) {
			$('#challengesContainer').after(`
				<div id="people">
	        <div id="namesUser">
	            <div id="name">${tweets[index].author}</div>
	            <div id="user">@${tweets[index].screenname}</div>
	        </div>
	        <div id="challenge">${tweets[index].body}</div>
	      </div>
			`);
		}
	}
}




window.onload = function() {
ajaxCall();
	$('#challenger').scroll(function () {
		var x = $(this).scrollTop();
		if (x > 99) {
			$('#logoRickFade').fadeOut(250);
		}
		else{
			$('#logoRickFade').fadeIn(250);
		}
	});
};