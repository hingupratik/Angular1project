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
        loginUser: function(username, password) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            
            if (username == 'Admin' && password == 'Admin') {
                deferred.resolve('Welcome ' + username + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})