angular.module("app").factory("messageService",function($q) {
    return {
        getMessage: function() {
            return $q.when("hello World!");
        }
    }
});

angular.module("app").factory("greetingService", function($q,$timeout) {
    return {
        getGreeting: function() {
            var deferred = $q.defer();
            $timeout(function() {
                deferred.resolve("Allo!");
            },2000);
            
            return deferred.promise;
        }
    }
});


angular.module("app").factory("googleService",function() {
    
   return {
       
	 'googleSSOClientId': '253613799155-f7d180690dtcroa6cm2226vo1stak3t5.apps.googleusercontent.com',
	 'clientSecret' : 'DNrSfsWKNHMNqv5Gc7cqAV9N'
        
   };
    
    
})