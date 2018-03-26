
app.service('userSettings', ['$q','$translate',function($q,$translate){
	return{
		setLanguage : function(language){
			window.localStorage.setItem("currentLanguage", language);
			$translate.use(language);
		},
		getLanguage  : function(){
			return window.localStorage.getItem("currentLanguage");
		}
	}
}]);
