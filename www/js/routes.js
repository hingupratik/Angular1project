angular.module('app.routes', [])

.config(function($stateProvider,$urlRouterProvider,$ionicConfigProvider){

  $ionicConfigProvider.tabs.position('top');

  $stateProvider
  .state('login',{
    url:'/login',
    templateUrl:'templates/login.html',
    controller:'loginCtrl'
  })
  .state('signup',{
    url:'/signup',
    templateUrl:'templates/signup.html',
    controller:'signupCtrl'
  })
  .state('main',{
    url:'/',
    abstract : true,
    templateUrl:'templates/main.html',
  })
  .state('main.dash',{
    url:'main/dash',
    views:{
      'dash-tab':{
        templateUrl:'templates/dashboard.html',
        controller:'WelcomeCtrl'
      }
    }
  })
  .state('main.fav',{
    url:'main/fav',
    views:{
      'fav-tab':{
        templateUrl:'templates/favorite.html'
      }
    }
  })
  .state('main.public',{
    url:'main/public',
    views:{
      'public-tab':{
        templateUrl:'templates/public.html',
        controller:'publicCtrl'
      }
    }
  })
  .state('main.admin',{
    url:'main/admin',
    views:{
      'admin-tab':{
        templateUrl:'templates/admin.html'
      }
    },
  })

  .state('myaccount',{
    url:'main/myaccount',
    templateUrl:'templates/myaccount.html',
    controller:'myAccountCtrl'
  })
  .state('language',{
    url:'main/myaccount/language',
    templateUrl:'templates/languageSelector.html',
    controller:'languageCtrl'
  })
  .state('chat',{
    url:'main/myaccount/chat',
    templateUrl:'templates/chat.html',
    controller:'chatCtrl'
  })
  $urlRouterProvider.otherwise('/main/dash')
});
