angular.module('h2a.controllers', ['h2a.services'])
	.controller('LoginCtrl', ['$scope', '$ionicSideMenuDelegate', '$ionicModal',
	function($scope, $ionicSideMenuDelegate, $ionicModal){
		//$ionicPlatform.ready(function () {
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


		//$log.log("Application initialized", $filter('date')(new Date(), 'short'));

		// Show login page if not authenticated
		//if (!AuthService.isAuthenticated() && !appConfig.IS_DEBUG_MODE)
		//	AuthService.tryAuthorize();
		//});
	}])
	.controller('WrapperCtrl', ['$scope', '$ionicSideMenuDelegate', '$ionicModal', '$state',
	function($scope, $ionicSideMenuDelegate, $ionicModal, $state){
console.log('wrapperCtrl');
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
			//console.log(modal);
			$scope.modal = modal;
			if (!(Meteor.user() || Meteor.loggingIn())) {
				$scope.openModal();
				Accounts.onLogin(function(){
					//console.log('login modal!!');
					$scope.closeModal();
				});
			}
			else if (Meteor.user()){
				//$scope.closeModal();
				//$scope.signOutBtn = false;
			}
			else {
				console.log('weird! check this');
				$state.go('explore')
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
	}])
	.controller('UploadCtrl', ['$scope', '$http', '$ionicSideMenuDelegate','$meteorCollection', '$ionicModal', '$cordovaCamera',
	function($scope, $http, $ionicSideMenuDelegate, $meteorCollection, $ionicModal, $cordovaCamera){
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
		console.log('upload page');
		document.addEventListener("deviceready", function () {
			var options = {
				destinationType: 1,
				sourceType: 0,
				mediaType: 1
			};

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

		$scope.videos = [];
		// Create video player with selected video
		$scope.createVideoTag = function(element,src){
			if (!src) {
				src = 'https://i.vimeocdn.com/video/492352095.webp?mw=1920&mh=1080&q=70';
			}
			window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
				rootToURL = fileSystem.root.toURL();
				rootToInternalURL = fileSystem.root.toInternalURL();
				console.log('from '+ src + '\nto ' + src.replace(rootToURL,rootToInternalURL));
				src = src.replace(rootToURL,rootToInternalURL);
				$scope.videos.push({"src":src});
			});
		};
	}])
	.controller('SettingsCtrl', ['$scope', '$meteorCollection', '$ionicModal', '$rootScope', '$ionicSideMenuDelegate', '$ionicPopup', '$state',
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
	}])
	.controller('TodoCtrl', ['$scope', '$meteorCollection', '$ionicModal', '$rootScope', '$ionicSideMenuDelegate', '$ionicPopup',
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

	}])
	.controller('ExploreCtrl', ['$scope', '$guides', '$ionicModal', '$rootScope', '$ionicSideMenuDelegate', '$ionicPopup',
	function ($scope, $guides, $ionicModal, $rootScope, $ionicSideMenuDelegate, $ionicPopup) {

		$scope.guides = $guides;
		setTimeout(function(){
			console.log($scope.guides.length);
			console.log($scope.guides);
		},500);

		//console.success('here');
		// A utility function for creating a new project
		// with the given projectTitle
		var createProject = function (projectTitle) {
			var newProject = {
				title: projectTitle,
				active: false
			};
			$scope.guides.save(newProject).then(function(res) {
				if (res) {
					$scope.selectProject(newProject, $scope.guides.length - 1);
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
			var activeProject = $scope.guides[0];
			angular.forEach($scope.guides, function (v, k) {
				if (v.active) {
					activeProject = v;
				}
			});
			return activeProject;
		};

		// Called to select the given project
		$scope.selectProject = function (project, index) {
			var selectedProject = $scope.guides[index];
			angular.forEach($scope.guides, function (v, k) {
				v.active = false;
			});
			selectedProject.active = true;
			$ionicSideMenuDelegate.toggleLeft();
		};

	}]);