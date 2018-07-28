angular.module('app.controller',[])

  .controller('WelcomeCtrl',['$scope', '$state','priceService','$http',

    function($scope, $state,priceService,$http) {
      $scope.poList = [];

      $scope.data = {
       nameOfPrice : [],
       priceOfName : [],
       finalprice : '' 
      } 

      $scope.$watch('poList', function(newValue, oldValue, scope) {
        $scope.narrowed = $scope.poList;
      });


  // $scope.dataValue = [{
  //   name : "Dhaval",
  //   bio : "About Dhaval",
  // },{
  //   name : "Badal",
  //   bio : "About Badal",
  // },{
  //   name : "Amit",
  //   bio : "About Amit",
  // },{
  //   name : "Rahul",
  //   bio : "",
  // },{
  //   name : "Mahesh",
  //   bio : "",
  // },{
  //   name : "Karan",
  //   bio : "",
  // },{
  //   name : "Jainik",
  //   bio : "",
  // },{
  //   name : "Sagar",
  //   bio : "",
  // },{
  //   name : "Yagnesh",
  //   bio : "About Yagnesh",
  // },{
  //   name : "Parag",
  //   bio : "About Parag",
  // },{
  //   name : "Parth",
  //   bio : "About Parth",
  // }]

    

      $scope.doRefresh = function() {
        //Stop the ion-refresher from spinning
        priceService.price($http).then(function(res){
        // console.log(res.data.data[1].quotes.USD.price);
        // $scope.data = {
        //   bitcoin     : res.data.data[1].quotes.USD.price,
        //   Ethereum    : res.data.data[1027].quotes.USD.price,
        //   Binance     : res.data.data[1839].quotes.USD.price,
        //   Tron        : res.data.data[1958].quotes.USD.price,
        //   Ripple      : res.data.data[52].quotes.USD.price,
        //   BitcoinCash: res.data.data[1831].quotes.USD.price,
        //   EOS         : res.data.data[1765].quotes.USD.price,
        //   Litecoin    : res.data.data[2].quotes.USD.price
        // }
      })

        $scope.$broadcast('scroll.refreshComplete');
      };
      /*CAll Api */
      priceService.price($http).then(function(res){
        // $scope.dictionary  = res.data;
        // for (item in $scope.dictionary) {
        //   for (subItem in $scope.dictionary[item]) {
        //    $scope.nameOf = $scope.dictionary[item][subItem].name;
        //    $scope.data.nameOfPrice.push($scope.nameOf);
        //     $scope.price = $scope.dictionary[item][subItem].quotes.USD.price;
        //     $scope.data.priceOfName.push($scope.price);
            
        //   }
        $scope.poList = res.data.data;
        })
        // console.log($scope.nameOfPrice);
        // $scope.resvar = res.data.data;
        // // console.log(res.data.data[1].quotes.USD.price);
        // $scope.data = {
        //   bitcoin     : res.data.data[1].quotes.USD.price,
        //   Ethereum    : res.data.data[1027].quotes.USD.price,
        //   Binance     : res.data.data[1839].quotes.USD.price,
        //   Tron        : res.data.data[1958].quotes.USD.price,
        //   Ripple      : res.data.data[52].quotes.USD.price,
        //   BitcoinCash: res.data.data[1831].quotes.USD.price,
        //   EOS         : res.data.data[1765].quotes.USD.price,
        //   Litecoin    : res.data.data[2].quotes.USD.price
        // }
}])

  .controller('signupCtrl',['$scope', '$state','signupSerivce','$http',

   function($scope, $state,signupSerivce,$http ) {

    $scope.data = {
      Firstname : null,
      lastname: null,
      username: null,
      email: null,
      mobileNumber: null,
      password: null
    }


    $scope.login = function(){
      signupSerivce.signupUser($http,$scope.data.Firstname,$scope.data.lastname,$scope.data.username,$scope.data.email,$scope.data.mobileNumber,$scope.data.password,$state)
      /*$state.go("main.dash");*/
    }

    $scope.signupBack = function(){
      $state.go("login");
    }

    $scope.mandatoryProductDetailsPresent = function() {
      if ($scope.data.Firstname == null &&  $scope.data.lastname == null && $scope.data.username == null &&  $scope.data.email == null &&  $scope.data.mobileNumber == null &&  $scope.data.password == null) {
        return false;
        }
        else if($scope.data.password == null){
          return false;
        }
      return true;
    }
}])

.controller('loginCtrl',['$scope','$state', 'UserService', '$ionicLoading','loginSerivce','$ionicPopup','$http',
 function($scope, $state, UserService, $ionicLoading, loginSerivce, $ionicPopup,$http){

  // $scope.data = {};
  $scope.data = {
    username : null,
    password : null
  }
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
    // loginSerivce.loginUser($scope.data.username, $scope.data.password).success(function(data) {
    //   $state.go("main.dash");
    // }).error(function(data) {
        // var forceUpdatePopup = $ionicPopup.show({
        //       'title':'login failed',
        //       'subTitle':'retry',
        //       buttons: [
        //         { text: '<b>OK</b>',
        //           type: 'button-royal',
        //         },
        //       ]
        //    });
    // });

      loginSerivce.loginUser($http,$scope.data.username,$scope.data.password,$state,$ionicPopup);
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
    $state.go("language");
  }

  $scope.chatwithus = function(){
    $state.go("chat");
  }
  $scope.aboutapp = function(){
    var forceUpdatePopup = $ionicPopup.show({
          'title':'App is underconstruction',
          'subTitle':'ThankYou',
          buttons: [
            { text: '<b>OK</b>',
              type: 'button-royal',
            },
          ]
       });
  }

}])

.controller('languageCtrl',['$scope','$state', 'UserService', '$ionicLoading','loginSerivce','$ionicPopup','availableLanguages','userSettings',
 function($scope, $state, UserService, $ionicLoading, loginSerivce, $ionicPopup,availableLanguages,userSettings){

   $scope.language = availableLanguages || ["English"];
   $scope.myAccountBack = function(){
     $state.go("myaccount");
}
     $scope.englishlanguage = function(language){
       if(language == "en-GU"){
         userSettings.setLanguage(language);
          $state.go('myaccount');
       }
       else if(language == "en-HI"){
         userSettings.setLanguage(language);
           $state.go('myaccount');
       }
       else{
         userSettings.setLanguage(language);
         $state.go('myaccount');
       }
     }

}])

.controller('chatCtrl',['$scope','$state','$ionicPopup',
function($scope,$state,$ionicPopup){
  $scope.data = {
    test: []
  }
  //$scope.messages = Messages;
    $scope.addMessage = function() {

    $ionicPopup.prompt({
      title: 'Need to get something off your chest?',
      template: 'Let everybody know!'
    }).then(function(res) {
        $scope.data.test[$scope.data.test.length]=res;
      });
 };

  $scope.logout = function(){
    window.localStorage.removeItem("Message");
    $state.go("myaccount");
  }
}
])

.controller('publicCtrl',['$scope','$state','$ionicPopup',
function($scope,$state,$ionicPopup){
  
  console.log("")
}])



