angular.module('app.routes', [])

.config(function($stateProvider,$urlRouterProvider){
  $stateProvider
  .state('login',{
    url:'/login',
    templateUrl:'templates/login.html',
    controller:'loginCtrl' 
  })

  $stateProvider
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

  .state('main.public',{
    url:'main/public',
    views:{
      'public-tab':{
        templateUrl:'templates/public.html'
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
  });



  
  $urlRouterProvider.otherwise('/main/dash')
});
