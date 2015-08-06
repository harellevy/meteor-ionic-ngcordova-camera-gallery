///**
// * Created by harel on 7/5/15.
// */
//angular.module("app").run(["$rootScope", "$state", function($rootScope, $state) {
//	$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
//		// We can catch the error thrown when the $requireUser promise is rejected
//		// and redirect the user back to the main page
//		if (error === "AUTH_REQUIRED") {
//			$state.go('parties');
//		}
//	});
//}]);

angular.module('h2a.routes', [])
.config(['$urlRouterProvider', '$stateProvider','$ionicConfigProvider',
	function($urlRouterProvider, $stateProvider,$ionicConfigProvider){
		//$ionicConfigProvider.views.maxCache(0);
		$ionicConfigProvider.tabs.position('bottom'); // other values: top
		$stateProvider
			.state('tabs', {
				url: "/home",
				abstract: true,
				templateUrl: "client/index.ng.html"
			})
			.state('explore', {
				url: "/explore",
				views: {
					'explore-tab': {
						templateUrl: "client/pages/core/explore.ng.html",
						controller: 'ExploreCtrl'
					}
				}
			})
			.state('feed', {
				url: '/feed',
				views: {
					'feed-tab': {
						templateUrl: 'client/pages/core/feed.ng.html'
						//controller: ''
					}
				}
			})
			.state('upload', {
				url : '/upload',
				views: {
					'upload-tab': {
						templateUrl: 'client/pages/core/upload.ng.html',
						controller: 'UploadCtrl'
					}
				}
			})
			.state('settings', {
				url : '/settings',
				views: {
					'settings-tab': {
						templateUrl: 'client/pages/core/settings.ng.html',
						controller: 'SettingsCtrl'
					}
				}
			})
			.state('login', {
				url: "/login",
				templateUrl: "client/pages/core/login.ng.html",
				controller: 'LoginCtrl'
			});
		$urlRouterProvider.otherwise("/explore");
	}]);