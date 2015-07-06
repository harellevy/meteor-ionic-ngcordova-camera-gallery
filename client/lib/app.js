var app = angular.module('app', [
	'angular-meteor',
	'ui.router',
	'ionic',
	'ngCordova',
	'ngCordova.plugins.datePicker']);

function onReady() {
	angular.bootstrap(document, ['app']);

}

if (Meteor.isCordova) {
	angular.element(document).on("deviceready", onReady);
}
else {
	angular.element(document).ready(onReady);
}

app.config(['$urlRouterProvider', '$stateProvider','$ionicConfigProvider',
	function($urlRouterProvider, $stateProvider,$ionicConfigProvider){
		$ionicConfigProvider.tabs.position('bottom'); // other values: top
		$urlRouterProvider.otherwise("/explore");
		$stateProvider
			.state('home', {
				url: "/",
				abstract: true,
				templateUrl: "client/index.ng.html",
				controller: 'HomeCtrl'
			})
			.state('login', {
				url: "/login",

				templateUrl: "client/pages/core/login.ng.html",
				controller: 'LoginCtrl'
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
						templateUrl: 'client/pages/core/feed.ng.html',
						controller: 'ExploreCtrl'
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
			});
	}]);


// subscribe to the two collections we use
Meteor.subscribe('Projects');
Meteor.subscribe('Tasks');

app.controller('HomeCtrl', ['$scope', '$ionicSideMenuDelegate', '$ionicModal',
	function($scope, $ionicSideMenuDelegate, $ionicModal){
		//console.log('i\'m here');
		//$ionicModal.fromTemplateUrl('login.html', {
		//	scope: $scope,
		//	animation: 'slide-in-up'
		//})
		//.then(function(modal) {
		//	$scope.modal = modal;
		//	$scope.modal.show();
		//});

		//if (!(Meteor.user() || Meteor.loggingIn())) {
		//	Router.go('signin');
		//	this.next();
		//}
		//$ionicPlatform.ready(function () {

			//$log.log("Application initialized", $filter('date')(new Date(), 'short'));

			// Show login page if not authenticated
			//if (!AuthService.isAuthenticated() && !appConfig.IS_DEBUG_MODE)
			//	AuthService.tryAuthorize();
		//});
	}]);
app.controller('LoginCtrl', ['$scope', '$ionicSideMenuDelegate', '$ionicModal',
	function($scope, $ionicSideMenuDelegate, $ionicModal){
		//console.log('i\'m here');
		////$ionicModal.fromTemplateUrl('login-meteor.html', {
		////	scope: $scope,
		////	animation: 'slide-in-up'
		////})
		////.then(function(modal) {
		////	$scope.modal = modal;
		////	$scope.modal.show();
		////		console.log('modal');
		////		console.log(modal);
		////});

		$ionicModal.fromTemplateUrl('login-template.html', {
			animation: 'slide-in-up',
			scope: $scope
		}).then(function (modal) {
			$scope.modal = modal;
			console.log($scope.modal);
		});

		$scope.openMenu = function () {
			$ionicSideMenuDelegate.toggleLeft();
		};

		$scope.openModal = function () {
			$scope.modal.show();
		};


		//if (!(Meteor.user() || Meteor.loggingIn())) {
		//	Router.go('signin');
		//	this.next();
		//}
		//$ionicPlatform.ready(function () {

			//$log.log("Application initialized", $filter('date')(new Date(), 'short'));

			// Show login page if not authenticated
			//if (!AuthService.isAuthenticated() && !appConfig.IS_DEBUG_MODE)
			//	AuthService.tryAuthorize();
		//});
	}]);
app.controller('WrapperCtrl', ['$scope', '$ionicSideMenuDelegate', '$ionicModal', '$state',
	function($scope, $ionicSideMenuDelegate, $ionicModal, $state){

		// collections
		//$scope.Guides = $meteorCollection(Guides);
		//$scope.Tasks = $meteorCollection(Tasks);

		// menus
		$scope.toggleMenu = function(menu) {
			if (menu == 'left')
				$ionicSideMenuDelegate.toggleLeft();
			else if (menu == 'right')
				$ionicSideMenuDelegate.toggleRight();
		};

		$scope.isMenuOpen = function(){
			return $ionicSideMenuDelegate.isOpen(true) ? true : false;
		};


		// categories
		$scope.Categories = [
			{
				title: 'Art',
				icon: 'ion-ios-upload-outline'
			}, {
				title: 'Tech',
				icon: 'ion-ios-upload-outline'
			}, {
				title: 'Health & beauty',
				icon: 'ion-ios-upload-outline'
			}, {
				title: 'Lifestyle',
				icon: 'ion-ios-upload-outline'
			}, {
				title: 'Home & Gardening',
				icon: 'ion-ios-upload-outline'
			}, {
				title: 'Art',
				icon: 'ion-ios-upload-outline'
			}, {
				title: 'Art',
				icon: 'ion-ios-upload-outline'
			}
		];

		// upload modal
		$ionicModal.fromTemplateUrl('login-template.ng.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			console.log(modal);
			$scope.modal = modal;
			if (!(Meteor.user() || Meteor.loggingIn())) {
				$scope.openModal();
				Accounts.onLogin(function(){
					$scope.closeModal();
				});
			}
			else if (Meteor.user()){
				//$scope.closeModal();
				//$scope.signOutBtn = false;
			}
			else {
				console.log('weird! check this');
				$state.go('/explore')
			}
		});




		$scope.openModal = function() {
			$scope.modal.show();
		};
		$scope.closeModal = function() {
			$scope.modal.hide();
		};
		//Cleanup the modal when we're done with it!
		$scope.$on('$destroy', function() {
			$scope.modal.remove();
		});
		// Execute action on hide modal
		$scope.$on('modal.hidden', function() {
			// Execute action
		});
		// Execute action on remove modal
		$scope.$on('modal.removed', function() {
			// Execute action
		});



}]);

app.controller('UploadCtrl', ['$scope', '$ionicSideMenuDelegate','$meteorCollection', '$ionicModal', '$cordovaCamera',
	function($scope, $ionicSideMenuDelegate, $meteorCollection, $ionicModal, $cordovaCamera){
		//document.addEventListener('deviceready', function () {
		//	$cordovaFileTransfer.upload(server, filePath, options)
		//		.then(function(result) {
		//			// Success!
		//		}, function(err) {
		//			// Error
		//		}, function (progress) {
		//			// constant progress updates
		//		});
		//}, false);
		document.addEventListener("deviceready", function () {
				var options = {
					destinationType: 1,
					sourceType: 0,
					mediaType: 1
				};



			/*
			 function postVideo(accessToken, fileURI) {
			 var metadata = {
			 snippet: {
			 title: "test",
			 description: "test",
			 tags: ["youtube-cors-upload"],
			 categoryId: 21
			 },
			 status: {
			 privacyStatus: "unlisted"
			 }
			 }
			 */

//
//var accessToken = "";
//			var options = new FileUploadOptions();
//			options.fileKey = "file";
//			options.fileName = 'test';
//			options.mimeType = "video/mp4";
//			options.chunkedMode = false;
//
//			options.headers = {
//				Authorization: "Bearer "+ accessToken,
//				"Access-Control-Allow-Origin": "http://meteor.local"
//			};
//
//			var params = new Object();
//			//params.part = Object.keys(metadata).join(',')
//
//			options.params = params;
//			console.log(options);
//			var ft = new FileTransfer();
//			ft.upload(fileURI, "10.0.0.3:3009/s", win, fail, options, true);
//
//			ft.onprogress = function(progressEvent) {
//				if (progressEvent.lengthComputable) {
//					// console.log(progressEvent)
//					// loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
//				} else {
//					console.log('something not loading');
//					// loadingStatus.increment();
//				}
//				console.log(progressEvent.loaded / progressEvent.total);
//			};
//
//
//		function win(r) {
//			console.log(r)
//			console.log("Code = " + r.responseCode);
//			console.log("Response = " + r.response);
//			console.log("Sent = " + r.bytesSent);
//		}
//
//		function fail(error) {
//			console.log(error)
//			// alert("An error has occurred: Code = " + error.code);
//			console.log("upload error source " + error.source);
//			console.log("upload error target " + error.target);
//		}

				$scope.takeVideo = function(){
					console.log('takevideo');
					$cordovaCamera.getPicture(options).then(function (videoURI) {
						console.dir(videoURI);
						$scope.playingVideo = videoURI;
						$cordovaCamera.cleanup().then();
					}, function (err) {
						// error
					});
				};

		}, false);

		// Create video player with selected video
		$scope.createVideoTag = function(element,src){
			if (!src) {
				src = 'file://media/external/documents/document/video:11457';
			}

			console.log(src);

			$(element).append('<video src="'+ src +'" controls></video>');
			//console.dir($(element).html());
		};
			//$cordovaCamera.cleanup().then(); // only for FILE_URI


}]);

app.controller('SettingsCtrl', ['$scope', '$meteorCollection', '$ionicModal', '$rootScope', '$ionicSideMenuDelegate', '$ionicPopup', '$state',
	function ($scope, $meteorCollection, $ionicModal, $rootScope, $ionicSideMenuDelegate, $ionicPopup, $state) {
		console.log('settings controller');
		$scope.signOutBtn = true;
		$scope.logout = function(){
			AccountsTemplates.logout(function(err){
				$scope.loginBtn = true;
				console.dir(err);
				$state.go('/explore');
			});
			//$state.go('/');
		};
	}]);
app.controller('TodoCtrl', ['$scope', '$meteorCollection', '$ionicModal', '$rootScope', '$ionicSideMenuDelegate', '$ionicPopup',
	function ($scope, $meteorCollection, $ionicModal, $rootScope, $ionicSideMenuDelegate, $ionicPopup) {

		// Create our modal

		$ionicModal.fromTemplateUrl('login.ng.html', function (modal) {
			$scope.taskModal = modal;
		}, {
			scope: $scope,
			animation: 'slide-in-up'
		});

		//Cleanup the modal when we are done with it!

		$scope.createTask = function (task) {
			var activeProject = $scope.activeProject();
			if (!activeProject || !task.title) {
				return;
			}

			$scope.Tasks.save({
				project: activeProject._id,
				title: task.title
			});

			$scope.taskModal.hide();

			task.title = "";
		};

		$scope.deleteTask = function (task) {
			$scope.Tasks.delete(task);
		};

		$scope.newTask = function () {
			$scope.task = {};
			$scope.taskModal.show();
		};

		$scope.closeNewTask = function () {
			$scope.taskModal.hide();
		};

		$scope.toggleProjects = function () {
			$ionicSideMenuDelegate.toggleLeft();
		};

	}
]);
app.controller('ExploreCtrl', ['$scope', '$meteor', '$ionicModal', '$rootScope', '$ionicSideMenuDelegate', '$ionicPopup',
	function ($scope, $meteor, $ionicModal, $rootScope, $ionicSideMenuDelegate, $ionicPopup) {

		$scope.Guides = $meteor.collection(Guides,false).subscribe("guides");
		// A utility function for creating a new project
		// with the given projectTitle
		var createProject = function (projectTitle) {
			var newProject = {
				title: projectTitle,
				active: false
			};
			$scope.Guides.save(newProject).then(function(res) {
				if (res) {
					$scope.selectProject(newProject, $scope.Guides.length - 1);
				}
			});
		};

		// Called to create a new project
		$scope.newProject = function () {
			$ionicPopup.prompt({
				title: 'Upload how to guide',
				subTitle: 'Name:'
			}).then(function(res) {
				if (res) {
					createProject(res);
				}
			});
		};

		// Grab the last active, or the first project
		$scope.activeProject = function () {
			var activeProject = $scope.Guides[0];
			angular.forEach($scope.Guides, function (v, k) {
				if (v.active) {
					activeProject = v;f
				}
			});
			return activeProject;
		};

		// Called to select the given project
		$scope.selectProject = function (project, index) {
			var selectedProject = $scope.Guides[index];
			angular.forEach($scope.Guides, function (v, k) {
				v.active = false;
			});
			selectedProject.active = true;
			$ionicSideMenuDelegate.toggleLeft();
		};

		//$scope.guides = [
		//	{"_id":"45vC6hxZCh2zxGNs9","difficulty":"0","free":true,"fullDescription":"lkdjfslkdfjsl;kdfja;skdjf;skdfj;asdfasd","mainTag":"FREE TIME AND FUN","owner":"wghzyRzKDLrwLCN8w","public":true,"rating":{"ratingAvg":"3"},"requirements":["ertewgdsfg","sdfg"],"skills":["erterter","tert"],"tags":["tterte","dfs"],"title":"jhkjhjkhlkjhkj"},
		//	{"_id":"5LkzFsdzPizx3Ssmp","difficulty":"0","free":true,"fullDescription":"ow to cut string or rope if you haven't got a knife or a pair of scissors. Great life hack trick to help you in an emergency. Cut rope with string!","mainTag":"TIPS","owner":"wghzyRzKDLrwLCN8w","public":true,"rating":{"ratingAvg":"1.5"},"requirements":[],"skills":[],"tags":["Cut","Rope","Emergency","string"],"title":"How to Cut Rope in an Emergency"},
		//	{"_id":"NGmyMMoceZoELzHzP","difficulty":"1","free":true,"fullDescription":"How to prepare and serve a pineapple. With just a few cuts your pineapple will impress your friends and be perfect for serving at a party. Fun and simple food trick.\naviram h'a gever!","mainTag":"KITCHEN AND RECEPIES","owner":"wghzyRzKDLrwLCN8w","public":true,"rating":{"ratingAvg":"3.5"},"requirements":["A sharp knife","Cutting board"],"skills":["No special skills are required"],"tags":["Serve","Pineapple"],"title":"How to Serve Pineapple"},
		//	{"_id":"dCw8ikoE4RuNLmuSc","fullDescription":"oijiopi[oiuy8ui9opoyuiopl;[oiuuijokpl;['ojhjikol;","mainTag":"MUSIC AND INSTRUMENT","owner":"wghzyRzKDLrwLCN8w","public":true,"requirements":[],"skills":[],"tags":["okpok","ii-p[","ij0okp["],"title":"0oi0o"},
		//	{"_id":"fuECamCWqwNWLs6Qw","difficulty":"2","free":true,"fullDescription":"Draw 3D objects using lines on paper. Make objects appear to be coming out of the page using this simple technique. Great fun to do with children. Draw a three dimensional hand, spoon and Bart Simpson!","mainTag":"ART","owner":"wghzyRzKDLrwLCN8w","public":true,"rating":{"ratingAvg":"3"},"requirements":["Pencil","Blank page"],"skills":["Basic drawing skills"],"tags":["draw","3D"],"title":"how to draw"},
		//	{"_id":"45vC6hxZCh2zxGNs9","difficulty":"0","free":true,"fullDescription":"lkdjfslkdfjsl;kdfja;skdjf;skdfj;asdfasd","mainTag":"FREE TIME AND FUN","owner":"wghzyRzKDLrwLCN8w","public":true,"rating":{"ratingAvg":"3"},"requirements":["ertewgdsfg","sdfg"],"skills":["erterter","tert"],"tags":["tterte","dfs"],"title":"jhkjhjkhlkjhkj"},
		//	{"_id":"5LkzFsdzPizx3Ssmp","difficulty":"0","free":true,"fullDescription":"ow to cut string or rope if you haven't got a knife or a pair of scissors. Great life hack trick to help you in an emergency. Cut rope with string!","mainTag":"TIPS","owner":"wghzyRzKDLrwLCN8w","public":true,"rating":{"ratingAvg":"1.5"},"requirements":[],"skills":[],"tags":["Cut","Rope","Emergency","string"],"title":"How to Cut Rope in an Emergency"},
		//	{"_id":"NGmyMMoceZoELzHzP","difficulty":"1","free":true,"fullDescription":"How to prepare and serve a pineapple. With just a few cuts your pineapple will impress your friends and be perfect for serving at a party. Fun and simple food trick.\naviram h'a gever!","mainTag":"KITCHEN AND RECEPIES","owner":"wghzyRzKDLrwLCN8w","public":true,"rating":{"ratingAvg":"3.5"},"requirements":["A sharp knife","Cutting board"],"skills":["No special skills are required"],"tags":["Serve","Pineapple"],"title":"How to Serve Pineapple"},
		//	{"_id":"dCw8ikoE4RuNLmuSc","fullDescription":"oijiopi[oiuy8ui9opoyuiopl;[oiuuijokpl;['ojhjikol;","mainTag":"MUSIC AND INSTRUMENT","owner":"wghzyRzKDLrwLCN8w","public":true,"requirements":[],"skills":[],"tags":["okpok","ii-p[","ij0okp["],"title":"0oi0o"},
		//	{"_id":"fuECamCWqwNWLs6Qw","difficulty":"2","free":true,"fullDescription":"Draw 3D objects using lines on paper. Make objects appear to be coming out of the page using this simple technique. Great fun to do with children. Draw a three dimensional hand, spoon and Bart Simpson!","mainTag":"ART","owner":"wghzyRzKDLrwLCN8w","public":true,"rating":{"ratingAvg":"3"},"requirements":["Pencil","Blank page"],"skills":["Basic drawing skills"],"tags":["draw","3D"],"title":"how to draw"},
		//	{"_id":"45vC6hxZCh2zxGNs9","difficulty":"0","free":true,"fullDescription":"lkdjfslkdfjsl;kdfja;skdjf;skdfj;asdfasd","mainTag":"FREE TIME AND FUN","owner":"wghzyRzKDLrwLCN8w","public":true,"rating":{"ratingAvg":"3"},"requirements":["ertewgdsfg","sdfg"],"skills":["erterter","tert"],"tags":["tterte","dfs"],"title":"jhkjhjkhlkjhkj"},
		//	{"_id":"5LkzFsdzPizx3Ssmp","difficulty":"0","free":true,"fullDescription":"ow to cut string or rope if you haven't got a knife or a pair of scissors. Great life hack trick to help you in an emergency. Cut rope with string!","mainTag":"TIPS","owner":"wghzyRzKDLrwLCN8w","public":true,"rating":{"ratingAvg":"1.5"},"requirements":[],"skills":[],"tags":["Cut","Rope","Emergency","string"],"title":"How to Cut Rope in an Emergency"},
		//	{"_id":"NGmyMMoceZoELzHzP","difficulty":"1","free":true,"fullDescription":"How to prepare and serve a pineapple. With just a few cuts your pineapple will impress your friends and be perfect for serving at a party. Fun and simple food trick.\naviram h'a gever!","mainTag":"KITCHEN AND RECEPIES","owner":"wghzyRzKDLrwLCN8w","public":true,"rating":{"ratingAvg":"3.5"},"requirements":["A sharp knife","Cutting board"],"skills":["No special skills are required"],"tags":["Serve","Pineapple"],"title":"How to Serve Pineapple"},
		//	{"_id":"dCw8ikoE4RuNLmuSc","fullDescription":"oijiopi[oiuy8ui9opoyuiopl;[oiuuijokpl;['ojhjikol;","mainTag":"MUSIC AND INSTRUMENT","owner":"wghzyRzKDLrwLCN8w","public":true,"requirements":[],"skills":[],"tags":["okpok","ii-p[","ij0okp["],"title":"0oi0o"},
		//	{"_id":"fuECamCWqwNWLs6Qw","difficulty":"2","free":true,"fullDescription":"Draw 3D objects using lines on paper. Make objects appear to be coming out of the page using this simple technique. Great fun to do with children. Draw a three dimensional hand, spoon and Bart Simpson!","mainTag":"ART","owner":"wghzyRzKDLrwLCN8w","public":true,"rating":{"ratingAvg":"3"},"requirements":["Pencil","Blank page"],"skills":["Basic drawing skills"],"tags":["draw","3D"],"title":"how to draw"},
		//	{"_id":"45vC6hxZCh2zxGNs9","difficulty":"0","free":true,"fullDescription":"lkdjfslkdfjsl;kdfja;skdjf;skdfj;asdfasd","mainTag":"FREE TIME AND FUN","owner":"wghzyRzKDLrwLCN8w","public":true,"rating":{"ratingAvg":"3"},"requirements":["ertewgdsfg","sdfg"],"skills":["erterter","tert"],"tags":["tterte","dfs"],"title":"jhkjhjkhlkjhkj"},
		//	{"_id":"5LkzFsdzPizx3Ssmp","difficulty":"0","free":true,"fullDescription":"ow to cut string or rope if you haven't got a knife or a pair of scissors. Great life hack trick to help you in an emergency. Cut rope with string!","mainTag":"TIPS","owner":"wghzyRzKDLrwLCN8w","public":true,"rating":{"ratingAvg":"1.5"},"requirements":[],"skills":[],"tags":["Cut","Rope","Emergency","string"],"title":"How to Cut Rope in an Emergency"},
		//	{"_id":"NGmyMMoceZoELzHzP","difficulty":"1","free":true,"fullDescription":"How to prepare and serve a pineapple. With just a few cuts your pineapple will impress your friends and be perfect for serving at a party. Fun and simple food trick.\naviram h'a gever!","mainTag":"KITCHEN AND RECEPIES","owner":"wghzyRzKDLrwLCN8w","public":true,"rating":{"ratingAvg":"3.5"},"requirements":["A sharp knife","Cutting board"],"skills":["No special skills are required"],"tags":["Serve","Pineapple"],"title":"How to Serve Pineapple"},
		//	{"_id":"dCw8ikoE4RuNLmuSc","fullDescription":"oijiopi[oiuy8ui9opoyuiopl;[oiuuijokpl;['ojhjikol;","mainTag":"MUSIC AND INSTRUMENT","owner":"wghzyRzKDLrwLCN8w","public":true,"requirements":[],"skills":[],"tags":["okpok","ii-p[","ij0okp["],"title":"0oi0o"},
		//	{"_id":"fuECamCWqwNWLs6Qw","difficulty":"2","free":true,"fullDescription":"Draw 3D objects using lines on paper. Make objects appear to be coming out of the page using this simple technique. Great fun to do with children. Draw a three dimensional hand, spoon and Bart Simpson!","mainTag":"ART","owner":"wghzyRzKDLrwLCN8w","public":true,"rating":{"ratingAvg":"3"},"requirements":["Pencil","Blank page"],"skills":["Basic drawing skills"],"tags":["draw","3D"],"title":"how to draw"},
		//	{"_id":"45vC6hxZCh2zxGNs9","difficulty":"0","free":true,"fullDescription":"lkdjfslkdfjsl;kdfja;skdjf;skdfj;asdfasd","mainTag":"FREE TIME AND FUN","owner":"wghzyRzKDLrwLCN8w","public":true,"rating":{"ratingAvg":"3"},"requirements":["ertewgdsfg","sdfg"],"skills":["erterter","tert"],"tags":["tterte","dfs"],"title":"jhkjhjkhlkjhkj"},
		//	{"_id":"5LkzFsdzPizx3Ssmp","difficulty":"0","free":true,"fullDescription":"ow to cut string or rope if you haven't got a knife or a pair of scissors. Great life hack trick to help you in an emergency. Cut rope with string!","mainTag":"TIPS","owner":"wghzyRzKDLrwLCN8w","public":true,"rating":{"ratingAvg":"1.5"},"requirements":[],"skills":[],"tags":["Cut","Rope","Emergency","string"],"title":"How to Cut Rope in an Emergency"},
		//	{"_id":"NGmyMMoceZoELzHzP","difficulty":"1","free":true,"fullDescription":"How to prepare and serve a pineapple. With just a few cuts your pineapple will impress your friends and be perfect for serving at a party. Fun and simple food trick.\naviram h'a gever!","mainTag":"KITCHEN AND RECEPIES","owner":"wghzyRzKDLrwLCN8w","public":true,"rating":{"ratingAvg":"3.5"},"requirements":["A sharp knife","Cutting board"],"skills":["No special skills are required"],"tags":["Serve","Pineapple"],"title":"How to Serve Pineapple"},
		//	{"_id":"dCw8ikoE4RuNLmuSc","fullDescription":"oijiopi[oiuy8ui9opoyuiopl;[oiuuijokpl;['ojhjikol;","mainTag":"MUSIC AND INSTRUMENT","owner":"wghzyRzKDLrwLCN8w","public":true,"requirements":[],"skills":[],"tags":["okpok","ii-p[","ij0okp["],"title":"0oi0o"},
		//	{"_id":"fuECamCWqwNWLs6Qw","difficulty":"2","free":true,"fullDescription":"Draw 3D objects using lines on paper. Make objects appear to be coming out of the page using this simple technique. Great fun to do with children. Draw a three dimensional hand, spoon and Bart Simpson!","mainTag":"ART","owner":"wghzyRzKDLrwLCN8w","public":true,"rating":{"ratingAvg":"3"},"requirements":["Pencil","Blank page"],"skills":["Basic drawing skills"],"tags":["draw","3D"],"title":"how to draw"},
		//	{"_id":"45vC6hxZCh2zxGNs9","difficulty":"0","free":true,"fullDescription":"lkdjfslkdfjsl;kdfja;skdjf;skdfj;asdfasd","mainTag":"FREE TIME AND FUN","owner":"wghzyRzKDLrwLCN8w","public":true,"rating":{"ratingAvg":"3"},"requirements":["ertewgdsfg","sdfg"],"skills":["erterter","tert"],"tags":["tterte","dfs"],"title":"jhkjhjkhlkjhkj"},
		//	{"_id":"5LkzFsdzPizx3Ssmp","difficulty":"0","free":true,"fullDescription":"ow to cut string or rope if you haven't got a knife or a pair of scissors. Great life hack trick to help you in an emergency. Cut rope with string!","mainTag":"TIPS","owner":"wghzyRzKDLrwLCN8w","public":true,"rating":{"ratingAvg":"1.5"},"requirements":[],"skills":[],"tags":["Cut","Rope","Emergency","string"],"title":"How to Cut Rope in an Emergency"},
		//	{"_id":"NGmyMMoceZoELzHzP","difficulty":"1","free":true,"fullDescription":"How to prepare and serve a pineapple. With just a few cuts your pineapple will impress your friends and be perfect for serving at a party. Fun and simple food trick.\naviram h'a gever!","mainTag":"KITCHEN AND RECEPIES","owner":"wghzyRzKDLrwLCN8w","public":true,"rating":{"ratingAvg":"3.5"},"requirements":["A sharp knife","Cutting board"],"skills":["No special skills are required"],"tags":["Serve","Pineapple"],"title":"How to Serve Pineapple"},
		//	{"_id":"dCw8ikoE4RuNLmuSc","fullDescription":"oijiopi[oiuy8ui9opoyuiopl;[oiuuijokpl;['ojhjikol;","mainTag":"MUSIC AND INSTRUMENT","owner":"wghzyRzKDLrwLCN8w","public":true,"requirements":[],"skills":[],"tags":["okpok","ii-p[","ij0okp["],"title":"0oi0o"},
		//	{"_id":"fuECamCWqwNWLs6Qw","difficulty":"2","free":true,"fullDescription":"Draw 3D objects using lines on paper. Make objects appear to be coming out of the page using this simple technique. Great fun to do with children. Draw a three dimensional hand, spoon and Bart Simpson!","mainTag":"ART","owner":"wghzyRzKDLrwLCN8w","public":true,"rating":{"ratingAvg":"3"},"requirements":["Pencil","Blank page"],"skills":["Basic drawing skills"],"tags":["draw","3D"],"title":"how to draw"}
		//];
	}]);