angular.module('app.services', [])
.service('UserService', function() {
	// For the purpose of this example I will store user data on ionic local storage but you should save it on a database

  var setUser = function(user_data) {
    window.localStorage.starter_google_user = JSON.stringify(user_data);
  };

  var getUser = function(){
    return JSON.parse(window.localStorage.starter_google_user || '{}');
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
})
.service('loginSerivce', function($q) {
    return {
        loginUser: function($http,username,password,$state,$ionicPopup){
          var loginUser = "http://localhost:3000/checkuser";
          var req = {
            method: 'POST',
            url: loginUser,
            data:{
                username : username,
                password : password
              }
            }
            $http(req).success(function(response) {
              $state.go('main.dash');
              console.log("success response",response);
            }).error(function(response) {
              $state.go('login');
              var forceUpdatePopup = $ionicPopup.show({
                    'title':'login failed',
                    'subTitle':'retry',
                    buttons: [
                      { text: '<b>OK</b>',
                        type: 'button-royal',
                      },
                    ]
                 });
          	  console.log("response error",response)
          });

        }
     }
})
.service('signupSerivce', function($q) {
    return {
        signupUser: function($http,Firstname,lastname,username,email,mobileNumber,password,$state) {
            var signupUser = "http://localhost:3000/signup" ;
            var req= {
              method: 'POST',
              url:signupUser,
              data:{
                Firstname : Firstname,
                lastname : lastname,
                email : email,
                mobileNumber : mobileNumber,
                password: password
              }
            }
            $http(req).success(function(response) {
              $state.go("login");
              console.log("success response",response);
            }).error(function(response) {
          	  console.log("response error",response)
          });
        }
    }
})
.service('priceService',function($q){
  return {
    price : function($http){
      var deferred = $q.defer();
      var price = "https://api.coinmarketcap.com/v2/ticker/";
      var req ={
        method:'GET',
        url:price
      }
      $http(req).then(function successCallback(response) {
        debugger;
        // console.log(response.data.data[0].name);
        console.log(Object.keys(response.data.data));
        // Object.keys(dhaval.data)
          deferred.resolve(response);
      }, function errorCallback(response) {
          deferred.reject(response);
        });
     return deferred.promise;
    }
  }
})
