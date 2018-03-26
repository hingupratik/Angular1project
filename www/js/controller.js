angular.module('app.controller',[])

  .controller('WelcomeCtrl',['$scope', '$state',

    function($scope, $state, ) {

      $scope.doRefresh = function() {
        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      };
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
    debugger;
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
      console.log($scope.data.test);
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

}])

.controller('firstButtonCtrl',['$scope','$state',
function($scope,$state){
            var canvas = document.getElementById("signature");
          var w = window.innerWidth;
          var h = window.innerHeight;

          // As the canvas doesn't has any size, we'll specify it with JS
          // The width of the canvas will be the width of the device
          canvas.width = w;
          // The height of the canvas will be (almost) the third part of the screen height.
          canvas.height = h/2.5;

          var signaturePad = new SignaturePad(canvas,{
              dotSize: 1
          });

          document.getElementById("export").addEventListener("click",function(e){
              // Feel free to do whatever you want with the image
              // as export to a server or even save it on the device.
              var imageURI = signaturePad.toDataURL();
              document.getElementById("preview").src = imageURI;
          },false);

      document.getElementById("reset").addEventListener("click",function(e){
          // Clears the canvas
          signaturePad.clear();
      },false);

      $scope.myAccountBack = function(){
        $state.go('main.dash');
      }
}])

.controller('secondButtonCtrl',['$scope','$state',
function($scope,$state){

  function distanceBetween(point1, point2) {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
function angleBetween(point1, point2) {
  return Math.atan2( point2.x - point1.x, point2.y - point1.y );
}

var el = document.getElementById('c');
var ctx = el.getContext('2d');
ctx.fillStyle = 'red';
ctx.strokeStyle = '#333';

var isDrawing, lastPoint;

el.onmousedown = function(e) {
  isDrawing = true;
  lastPoint = { x: e.clientX, y: e.clientY };
};

el.onmousemove = function(e) {
  if (!isDrawing) return;

  var currentPoint = { x: e.clientX, y: e.clientY };
  var dist = distanceBetween(lastPoint, currentPoint);
  var angle = angleBetween(lastPoint, currentPoint);

  for (var i = 0; i < dist; i+=5) {
    x = lastPoint.x + (Math.sin(angle) * i) - 25;
    y = lastPoint.y + (Math.cos(angle) * i) - 25;
    ctx.beginPath();
    ctx.arc(x+10, y+10, 20, false, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  lastPoint = currentPoint;
};

el.onmouseup = function() {
  isDrawing = false;
};

  $scope.myAccountBack = function(){
    $state.go('main.dash');
  }
}])

.controller('thirdButtonCtrl',['$scope','$state',
function($scope,$state){
      var el = document.getElementById('c');
      var ctx = el.getContext('2d');

      ctx.lineWidth = 10;
      ctx.lineJoin = ctx.lineCap = 'round';
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgb(0, 0, 0)';

      var isDrawing, points = [ ];

      el.onmousedown = function(e) {
        isDrawing = true;
        points.push({ x: e.clientX, y: e.clientY });
      };

      el.onmousemove = function(e) {
        if (!isDrawing) return;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        points.push({ x: e.clientX, y: e.clientY });

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (var i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
      };

      el.onmouseup = function() {
        isDrawing = false;
        points.length = 0;
      };

  $scope.myAccountBack = function(){
    $state.go('main.dash');
  }
}])
