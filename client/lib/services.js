/**
 * Created by harel on 8/6/15.
 */
angular.module('h2a.services',['angular-meteor'])
	.factory('$guides', ['$meteor', function($meteor) {
		return $meteor.collection(Guides).subscribe("guides");
}]);