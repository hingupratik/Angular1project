angular.module('app.controller',[])

.controller('WelcomeCtrl',['$scope', '$state',
 function($scope, $state, ) {

  $scope.logout = function(){
    $state.go("login");
  }

  $scope.doRefresh = function() {
      //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');        
    };
}])

.controller('registerCtrl',['$scope', '$state',
 function($scope, $state, ) {

  $scope.registerBack = function(){
    $state.go("login");
  }
}])

.controller('loginCtrl',['$scope','$state', 'UserService', '$ionicLoading',
 function($scope, $state, UserService, $ionicLoading){
  // This method is executed when the user press the "Sign in with Google" button
  $scope.googleSignIn = function() {
    $ionicLoading.show({
      template: 'Logging in...'
    });
    window.plugins.googleplus.login(
      {
        'webClientId':'386187790823-24dlnae84ika610tut906noq48lip42g.apps.googleusercontent.com',
        'offline': true
      },
      function (user_data) {
        // For the purpose of this example I will store user data on local storage
        console.log(user_data);
        UserService.setUser({
          userID: user_data.userId,
          name: user_data.displayName,
          email: user_data.email,
          picture: user_data.imageUrl,
          accessToken: user_data.accessToken,
          idToken: user_data.idToken
        });

        $ionicLoading.hide();
        $state.go('app.home');
      },
      function (msg) {
        $ionicLoading.hide();
      }
    );
  };

  $scope.login = function(){
    $state.go("main.dash");
  }

  $scope.register = function(){
    $state.go("register");
  }
}])
