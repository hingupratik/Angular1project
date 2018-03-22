angular.module('app.controller',[])

  .controller('WelcomeCtrl',['$scope', '$state',

    function($scope, $state, ) {

      $scope.doRefresh = function() {
        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      };
}])

  .controller('signupCtrl',['$scope', '$state','signupSerivce',

   function($scope, $state,signupSerivce ) {

    $scope.data = {
      Firstname : null,
      lastname: null,
      email: null,
      mobileNumber: null,
      password: null
    }


    $scope.login = function(){
      debugger;
      signupSerivce.signupUser($scope.data.Firstname,$scope.data.lastname,$scope.data.email,$scope.data.mobileNumber,$scope.data.password)
      /*$state.go("main.dash");*/
    }

    $scope.signupBack = function(){
      $state.go("login");
    }

    $scope.mandatoryProductDetailsPresent = function() {
      debugger;
      if ($scope.data.Firstname == null &&  $scope.data.lastname == null &&  $scope.data.email == null &&  $scope.data.mobileNumber == null &&  $scope.data.password == null) {
        return false;

      }
      return true;
    }
}])

.controller('loginCtrl',['$scope','$state', 'UserService', '$ionicLoading','loginSerivce','$ionicPopup',
 function($scope, $state, UserService, $ionicLoading, loginSerivce, $ionicPopup){

  $scope.data = {};
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
    /*console.log("Login user:" + $scope.data.username +"Password"+ $scope.data.password );*/
    loginSerivce.loginUser($scope.data.username, $scope.data.password).success(function(data) {
      $state.go("main.dash");
    }).error(function(data) {
        var forceUpdatePopup = $ionicPopup.show({
              'title':'login failed',
              'subTitle':'retry',
              buttons: [
                { text: '<b>OK</b>',
                  type: 'button-royal',
                },
              ]
           });
    });
  }

  $scope.signup = function(){
    $state.go("signup");
  }
}])

.controller('myAccountCtrl',['$scope','$state', 'UserService', '$ionicLoading','loginSerivce','$ionicPopup',
 function($scope, $state, UserService, $ionicLoading, loginSerivce, $ionicPopup){

  $scope.logout = function(){
    $state.go("login");
  }

  $scope.myAccountBack = function(){
    $state.go("main.dash");
  }

  $scope.selectlanguage = function(){
    debugger;
    $state.go("language");
  }

}])

.controller('languageCtrl',['$scope','$state', 'UserService', '$ionicLoading','loginSerivce','$ionicPopup',
 function($scope, $state, UserService, $ionicLoading, loginSerivce, $ionicPopup){

   $scope.myAccountBack = function(){
     $state.go("myaccount");
   }
}])
