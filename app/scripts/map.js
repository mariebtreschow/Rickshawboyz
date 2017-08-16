
function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {

		center: {lat: 14.2966703, lng: 78.09498},
		zoom: 5,

		styles: [
			{elementType: 'geometry', stylers: [{color: '#FDDE30'}]},
			{elementType: 'labels.text.stroke', stylers: [{visibility: 'off'}]},
			{elementType: 'labels.text.fill', stylers: [{visibility: 'off'}]},
			{
				featureType: 'water',
				elementType: 'geometry',
				stylers: [{color: '#FFFFFF'}]
			},
			{
				featureType: 'administrative',
				elementType: 'labels',
				stylers: [{visibility: 'off'}]
			},
			{
				featureType: 'road',
				elementType: 'labels',
				stylers: [{visibility: 'off'}]
			},
			{
				featureType: 'transit',
				elementType: 'labels',
				stylers: [{visibility: 'off'}]
			},
			{
				featureType: 'water',
				elementType: 'labels',
				stylers: [{visibility: 'off'}]
			},
			{
				featureType: 'poi',
				elementType: 'labels',
				stylers: [
					{ visibility: 'off' }
				]
			},

		]
	});
	map.setOptions({draggable: true});
	arrivalDestination(map);
	return map
}


function ajaxCall(map) {
	var routes=[];
	$.ajax(
		{
			url:'http://www.rickshawboyz.nl/api/',
			success: function (result) {
				let tweetDict = pairsTweets(result.twitterArray);
				getLocation(map, tweetDict, routes);
			},
			error:
				function (jqXHR, textStatus, errorThrown) {
					if(textStatus == 'error') {
						location.href='./../404.html';
					}
				}
		})
}
function pairsTweets(array){
	let dict = [];
	let picTweet = [];
	for (let rt=0; rt<array.length; rt++){
		picTweet.push(array[rt]);
		if(array[rt].retweeted_status){
			for(let rp=0; rp<array.length; rp++){
				if(array[rt].retweeted_status.id === array[rp].in_reply_to_status_id){
					dict.push([array[rt], array[rp]]);
				}
			}
		}
	}
	return [dict, picTweet];
}

function getLocation(map, array, routes) {
	let finalRoutes=[];
	array[0].forEach(function (tweet, index) {
		if (tweet[1].geo){
			routes.push(paintLocation(map, tweet,index));
		}
	});
	array[1].forEach(function (tweet, index) {
		if (tweet.geo){
			routes.push(pictureTweet(map, tweet,index));
		}
	});
	routes.sort(function(a,b){
		return a[0]-b[0]
	});
	routes.forEach(function(x){
		finalRoutes.push(x.pop())
	});
	paintPolyline(map, finalRoutes);

}

function pictureTweet(map, tweet, index){
	var myLatLng = {lat: tweet.geo.coordinates[0], lng: tweet.geo.coordinates[1]};
	index===0 ? map.setCenter(myLatLng) : '';
	map.setZoom(5);

	var iconBase = './images/';


	var contentString=`
	<div class="modal fade"  id="myModalPic${index}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
          <div class="modal-content" style="background-color: black">

              <div class="modal-body">
                  <a id="container" target="_blank" href='https://twitter.com/rickshawboyz/status/${tweet.id_str}'>
                      <div id="tweetInfo">
                          <img id="profileImgTweet" class="rounded-circle" src=${tweet.user.profile_image_url_https}>
                          <div id="infoContainer">
                              <div id="tweetData">
                                  <div id="tweetName">${tweet.user.name}</div>
                                  <div id="tweetUsername">@${tweet.user.screen_name}</div>
                              </div>
                              <div id="tweetContent">${tweet.text}</div>
                          </div>
                      </div>
                      <div id="reply">
                          <div id="contentReply">`+ (tweet.extended_entities ?
			`<img id="imgContent" style="background-image: url(${tweet.extended_entities.media[0].media_url})">` :
			'<div id="filler"></div>')+
		`<div id="infoReplyContainer" style="height: 10%">
                                  
                              </div>
                          </div>
                      </div>
                  </a>
              </div>
          </div>
      </div>
  </div>`;
	$('#map').append(contentString);

	var marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: iconBase + 'marker.svg'
	});
	marker.addListener('click', function() {
		$('#logoRick').css({'display':'none'});
		$(`#myModalPic${index}`).modal('show');
		map.setCenter(myLatLng)
	});

	return [tweet.id, myLatLng]
}

function paintLocation(map, tweet, index) {
	var myLatLng = {lat: tweet[1].geo.coordinates[0], lng: tweet[1].geo.coordinates[1]};
	index===0 ? map.setCenter(myLatLng) : '';
	map.setZoom(5);

	var iconBase = '../images/';


	var contentString=`
	<div class="modal fade"  id="myModal${index}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
          <div class="modal-content" style="background-color: black">

              <div class="modal-body">
                  <a id="container" target="_blank" href='https://twitter.com/rickshawboyz/status/${tweet[0].id_str}'>
                      <div id="tweetInfo">
                          <img id="profileImgTweet" class="rounded-circle" src=${tweet[0].retweeted_status.user.profile_image_url_https}>
                          <div id="infoContainer">
                              <div id="tweetData">
                                  <div id="tweetName">${tweet[0].retweeted_status.user.name}</div>
                                  <div id="tweetUsername">@${tweet[0].retweeted_status.user.screen_name}</div>
                              </div>
                              <div id="tweetContent">${tweet[0].retweeted_status.text}</div>
                          </div>
                      </div>
                      <div id="reply">
                          <div id="contentReply">`+ (tweet[1].extended_entities ?
			`<img id="imgContent" style="background-image: url(${tweet[1].extended_entities.media[0].media_url})">` :
			'<div id="filler"></div>')+
		`
                              <div id="infoReplyContainer">
                                  <img id="profileImgReply" class="rounded-circle" src=${tweet[1].user.profile_image_url_https}>
                                  <div id="replyData">
                                      <div id="userData">
                                          <div id="replyName">${tweet[1].user.name}</div>
                                          <div id="replyUsername">@${tweet[1].user.screen_name}</div>
                                      </div>
                                      <div id="replyContent">${tweet[1].text}</div>
                                  </div>
                              </div>

                          </div>
                      </div>
                  </a>
              </div>
          </div>
      </div>
  </div>`;
	$('#map').append(contentString);

	var marker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: iconBase + 'marker.svg'
	});
	marker.addListener('click', function() {
		$('#logoRick').css({'display':'none'});
		$(`#myModal${index}`).modal('show');
		map.setCenter(myLatLng)
	});

	return [tweet[1].id, myLatLng]
}

function paintPolyline(map, routes) {
	map.setZoom(5);
	map.setCenter(routes[routes.length-1]);
	var polyline = new google.maps.Polyline({
		path: routes
		, map: map
		, strokeColor: '#8c8c8c'
		, strokeWeight: 4
		, strokeOpacity: 1
		, clickable: false
	});
}

function arrivalDestination(map){
	var position = {lat:26.9035745, lng:70.870146};

	var flag = new google.maps.Marker({
		position: position,
		map: map,
		icon: './images/flag.svg'
	});
	flag.addListener('click', function() {
		map.setCenter(position)
	});
}

window.onload = function() {
	let mapped = initMap();
	ajaxCall(mapped);
}