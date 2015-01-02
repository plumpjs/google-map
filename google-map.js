/* exported GoogleMap */

/**
 *    PlumpJS: GoogleMaps
 *    MooTools Google Map wrapper.
 *
 *    Instantiate with the element for the map to be injected in to, which
 *    needs a height or it will collapse and the map will not display.
 */
 
'use strict';

var GoogleMap = new Class({

	Implements : Options,

	options : {
		location : { lat : 0, lng : 0 },
		zoom : 15,
		scroll : true,
		markerImage : null,
		markerShadowImage : null,
		markerShadowPosition : { x : 0, y : 0 },
		mapStyle: [
			{
				featureType : 'poi',
				stylers : [
					{visibility : 'off'}
				]
			}
		]
	},

	initialize: function(el, options) {

		this.el = $(el);
		this.setOptions(options);

		this.mapWidth = this.el.getSize().x;

		this.location = new google.maps.LatLng(this.options.location.lat, this.options.location.lng);

		this.map = new google.maps.Map(this.el, this.getMapOptions());

		this.addMarker();

		window.addEvent('resize', this.onResize.bind(this));
	},

	getMapOptions: function() {

		return {
			center: this.location,
			zoom: this.options.zoom,
			disableDefaultUI: true,
			scrollwheel: this.options.scroll,
			zoomControl: true,
			zoomControlOptions : {
				position : google.maps.ControlPosition.LEFT_TOP,
				style: google.maps.ZoomControlStyle.SMALL
			},
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			styles : this.options.mapStyle
		};
	},

	addMarker: function() {
		if (this.options.markerImage) {

			var marker = new google.maps.Marker({
				position  : this.location,
				map       : this.map,
				icon      : {
					url : this.options.markerImage,
				},
				shadow    : {
					url : this.options.markerShadowImage,
					anchor : new google.maps.Point(this.options.markerShadowPosition.x, this.options.markerShadowPosition.y)
				}
			});
		}
	},

	onResize: function() {
		if (this.el.getSize().x != this.mapWidth) {
        	this.mapWidth = this.el.getSize().x;
        	google.maps.event.trigger(this.map, 'resize');
        	this.map.setCenter(this.location);
        }
	}

});
