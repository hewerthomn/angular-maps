(function(angular, OpenLayers, undefined) {
	'use strict';

	angular
		.module('ngMaps.factories')
		.factory('Map', MapFactory);

	/**
	 * @class
	 * @alias Map
	 * @type {Map}
	 * @memberOf ngMaps.factories
	 * @description Create a map instance
	 */
	function MapFactory (Maps) {

		/**
		 * Default options
		 *
		 * @var
		 * @type {Object}
		 * @private
		 */
		var _defaultOpts = {
			id: 'map',
			center: {
				lon: 0,
				lat: 0
			},
			zoom: 1,
			baselayers: {
				googleMaps: {
					numZoomLevels: 22,
					minZoomLevel: 0,
					maxZoomLevel: 21
				},
				googleMapsHybrid: {
					numZoomLevels: 22,
					minZoomLevel: 0,
					maxZoomLevel: 21
				},
				googleMapsNight: {
					numZoomLevels: 22,
					minZoomLevel: 0,
					maxZoomLevel: 21
				}
			},
			layers: {
				points: {
					title: 'Points'
				}
			},
			defaultControls: {
				mousePosition: {
					prefix: '',
					suffix: '',
					separator: '',
					numDigits: 5,
					emptyString: '',
					displayProjection: 'EPSG:4326'
				},
				navigation: {
					documentDrag: true,
					dragPanOptions: { enableKinetic: true },
					zoomWheelEnabled: true,
					handleRightClicks: false
				},
				geolocate: {
					bind: false,
					geolocationOption: {
						maximumAge: 0,
						timeout: 10000,
						enableHighAccuracy: true
					}
				},
				zoom: {},
			}
		};

		return {

			/**
			 * Map object
			 *
			 * @memberOf ngMaps.factories.Map
			 * @instance
			 * @private
			 * @type {OpenLayers.Map}
			 */
			 _map: null,

			/**
			 * Create a new map
			 *
			 * @memberOf ngMaps.factories.Map
			 * @function
			 * @instance
			 * @param  {Object} opts Map options
			 * @return {Map}
			 */
			create: function(opts) {

				OpenLayers.Util.applyDefaults(opts, _defaultOpts);

				this._map = new OpenLayers.Map(opts.id, {
					theme: null,
					projection: 'EPSG:4326',
					displayProjection: 'EPSG:4326',
					controls: []
				});

				Maps.addBaseLayers(this._map, opts.baselayers);
				Maps.addLayers(this._map, opts.layers);

				Maps.addControls(this._map, opts.defaultControls);

				if(opts.hasOwnProperty('center'))
				{
					Maps.setCenter(this._map, opts.center, opts.zoom);
				}

				return angular.extend(opts, this);
			},

			/**
		   * Change the base layer
		   *
		   * @memberOf ngMaps.factories.Map
			 * @function
			 * @instance
		   * @param {Integer} Index of base layer. Options: default|hybrid|night
		   */
		  setBaseLayer: function(name) {
		    Maps.setBaseLayer(this._map, name);
		  },

			/**
			 * Set center of the map
			 *
			 * @memberOf ngMaps.factories.Map
			 * @function
			 * @instance
			 * @param {Object} lonlat LonLat object
			 * @param {Integer} [zoom] Zoom level
			 */
			setCenter: function(lonlat, zoom) {
				Maps.setCenter(this._map, lonlat, zoom);
			},

			/**
			 * Get center of the map
			 *
			 * @memberOf ngMaps.factories.Map
			 * @function
			 * @instance
			 * @return {Object} LonLat object
			 */
			getCenter: function() {
				return Maps.getCenter(this._map);
			},

			/**
			 * Get the max zoom level of the selected base layer
			 *
			 * @memberOf ngMaps.factories.Map
			 * @function
			 * @instance
			 * @return {Integer} Zoom level
			 */
			getMaxZoomLevel: function() {
				return Maps.getMaxZoomLevel(this._map);
			},

			/**
			 * Get the zoom levels of the selected base layer
			 *
			 * @memberOf ngMaps.factories.Map
			 * @function
			 * @instance
			 * @return {Array<Integer>} Array with zoom levels
			 */
			getZoomLevels: function() {
				return Maps.getZoomLevels(this._map);
			},

			/**
			 * Set zoom
			 *
			 * @memberOf ngMaps.factories.Map
			 * @function
			 * @instance
			 * @param {Integer} zoom Zoom level
			 */
			setZoom: function(zoom) {
				Maps.setZoom(this._map, zoom);
			},

			/**
			 * Get zoom
			 *
			 * @memberOf ngMaps.factories.Map
			 * @function
			 * @instance
			 * @return {Integer} Actual zoom level
			 */
			getZoom: function() {
				return Maps.getZoom(this._map);
			},

			/**
			 * Event of zoom change
			 *
			 * @memberOf ngMaps.factories.Map
			 * @function
			 * @instance
			 * @return {Promise} Promise object
			 */
			onZoomChange: function(callback) {
				return Maps.onZoomChange(this._map, callback);
			},

			/**
			 * Use Geolocate to get position
			 *
			 * @memberOf ngMaps.factories.Map
			 * @function
			 * @instance
			 * @param {Object} [opts] Geolocate options
			 * @return {Promise} Promise object
			 */
			getPosition: function(opts) {
				return Maps.getPosition(this._map, opts);
			},

			/**
			* Transform latlon object from projection to another
			*
			* @memberOf ngMaps.factories.Map
			* @function
			* @instance
			* @param {Object} lonlat LonLat object
			* @param {String} from From projection
			* @param {String} to To projection
			*
			* @return {Object} lonlat
			*/
			transform: function(lonlat, from, to) {
				return Maps.transform(lonlat, from, to);
			},

			/**
			 * Check if lonlat is in bounds
			 *
			 * @memberOf ngMaps.factories.Map
			 * @function
			 * @instance
			 * @param {Object} lonlat LonLat object
			 * @param {Array(Number)} bounds Array with bounds [left, bottom, right, top]
			 *
			 * @return {Boolean}
			 */
			contains: function(lonlat, bounds) {
				return Maps.contains(lonlat, bounds);
			}

		};
	}

})(window.angular, OpenLayers);
