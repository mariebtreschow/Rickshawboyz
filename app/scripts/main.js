
function initMap(map) {
	map = new google.maps.Map(document.getElementById('map'), {

		center: {lat: 14.2966703, lng: 78.09498},
		zoom: 6,
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
				featureType: 'administrative.locality',
				elementType: 'labels.text.fill',
				stylers: [{visibility: 'off'}]
			},
			{
				featureType: 'poi',
				elementType: 'labels.text.fill',
				stylers: [{visibility: 'off'}]
			},
			{
				featureType: 'poi.park',
				elementType: 'labels.text.fill',
				stylers: [{visibility: 'off'}]
			},
			{
				featureType: 'road',
				elementType: 'labels.text.fill',
				stylers: [{visibility: 'off'}]
			},
			{
				featureType: 'road.highway',
				elementType: 'labels.text.fill',
				stylers: [{visibility: 'off'}]
			},
			{
				featureType: 'transit.station',
				elementType: 'labels.text.fill',
				stylers: [{visibility: 'off'}]
			},
			{
				featureType: 'water',
				elementType: 'labels.text.fill',
				stylers: [{visibility: 'off'}]
			},
			{
				featureType: 'water',
				elementType: 'labels.text.stroke',
				stylers: [{visibility: 'off'}]
			}

		]
	});
	google.maps.event.addDomListener(window, 'load', initMap);
	google.maps.event.addDomListener(window, 'resize', function() {
		var center = map.getCenter();
		google.maps.event.trigger(map, 'resize');
		map.setCenter(center);
		map.setZoom(5);
	});
	map.setOptions({draggable: false});
	console.log(map.getCenter())
}

function buttonContainer(){


}

window.onload = function() {
	var map;
	initMap(map);
	buttonContainer()
}