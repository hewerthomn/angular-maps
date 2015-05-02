# Angular Maps

Angular module to create and handle maps.


# Install

Available via [bower](http://bower.io/)

	bower install angular-maps


# Usage

Include the `angular-maps.css` style and `angular-maps.js` script

	<script src="bower_components/angular-maps/angular-maps.js"></script>

Add `ngMaps` in your application dependencies

	app.module('app', [
		'ngMaps'
	]);

Inject `Map` in your controller

	app.controller('AppController', [$scope, Map, function($scope, Map) {

		$scope.map = Map.create({
			id: 'map',
			zoom: 10,
			center: {
				lon: 20,
				lat: 30
			}
		});

	}]);

# Source

[github.com/hewerthomn/angular-maps](http://github.com/hewerthomn/angular-maps)

# API Reference

[angular-maps.github.io/](http://angular-maps.github.io)

# License

**ngMaps** is freely distributable under the terms of the MIT license.
