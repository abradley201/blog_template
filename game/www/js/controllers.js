angular.module('app.controllers', [])

.controller('homeCtrl',  function ($scope, $state, $stateParams, $ionicModal, homeData, devData, $ionicSideMenuDelegate, $window, $http) {

	  $ionicSideMenuDelegate.canDragContent(false);
		var test_data = JSON.parse(window.localStorage.getItem('test_data'));


})

.controller('setupCtrl', ['$scope', '$stateParams', 'setupData', 'okbutton', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, setupData, okbutton, $cordovaDevice, $ionicPlatform) {

            function isLocalStorageNameSupported() {
          var testKey = 'test', storage = window.localStorage;
          try {
            storage.setItem(testKey, '1');
            storage.removeItem(testKey);
            return true;
          } catch (error) {
            return false;
          }
        };
            if ( isLocalStorageNameSupported() == false ) { alert("using private browsing will prevent the app from functioning properly."); };



	var test_already = JSON.parse(window.localStorage.getItem('test_data'));
	if ( test_already != null ) { okbutton.go() };

  setupData.toggleData();


  document.getElementById("go_button").addEventListener("click", okbutton.go);




}])


.controller('setupCtrl_c', ['$scope', '$stateParams', 'setupData_c', 'okbutton_c', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, setupData_c, okbutton_c, $cordovaDevice, $ionicPlatform) {

                function isLocalStorageNameSupported() {
              var testKey = 'test', storage = window.localStorage;
              try {
                storage.setItem(testKey, '1');
                storage.removeItem(testKey);
                return true;
              } catch (error) {
                return false;
              }
            };
                if ( isLocalStorageNameSupported() == false ) { alert("using private browsing will prevent the app from functioning properly."); };



	var test_already = JSON.parse(window.localStorage.getItem('test_data'));
	if ( test_already != null ) { okbutton_c.go() };

  setupData_c.toggleData();


  document.getElementById("go_button_c").addEventListener("click", okbutton_c.go);





}])

.controller('menuCtrl', ['$scope', '$stateParams', 'setupData', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {




}])


.controller('devsCtrl', ['$scope', '$stateParams', 'setupData', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {




}])




.controller('circlesCtrl',
	function($scope, $stateParams, $state, $ionicPopup, Readyset_circles, mtcheck){

		if ( mtcheck.go() == false ) { alert("This app only works on mobile devices.") };

		function lets_start_the_game() { Readyset_circles.go(); };

	document.getElementById("start_test").addEventListener("click", lets_start_the_game);



})

.controller('horizontalCtrl',
	function($scope, $stateParams, $state, $ionicPopup, Readyset_rectangles, mtcheck){

		if ( mtcheck.go() == false ) { alert("This app only works on mobile devices.") };

			function lets_start_the_game() { Readyset_rectangles.go(); };

		document.getElementById("start_test").addEventListener("click", lets_start_the_game);


	})
