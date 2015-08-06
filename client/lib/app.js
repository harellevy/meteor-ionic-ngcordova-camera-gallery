var app = angular.module('app', [
	'angular-meteor',
	'ui.router',
	'ionic',
	'ngCordova',
	'h2a.routes',
	'h2a.controllers'
]);

function onReady() {
	angular.bootstrap(document, ['app']);
}

if (Meteor.isCordova) {
	angular.element(document).on("deviceready", onReady);
}
else {
	angular.element(document).ready(onReady);
}


// subscribe to the two collections we use
Meteor.subscribe('Projects');
Meteor.subscribe('Tasks');
