angular.module("app").controller('HomeCtrl',function($scope,$route) {
   
    $scope.name = 'kema';
    //$scope.gray = 'beautiful';
    console.log($scope);
    
    
    
});

angular.module("app").controller('ViewCtrl',function($scope,message,greeting) {
    $scope.message = message;
    $scope.greeting = greeting;
    $scope.event = 'click';
    
    $scope.nPage = 5;
    $scope.pages = [];
    $scope.pageContent = {
        firstname: 'ke',
        lastname: 'ma'
    };
    
    //console.log($scope);
});


angular.module("app").controller('PaginationController', function($scope) {
    
    var pageContent = {};
    
    
    // API exposed to directive
    $scope.getCurrentPage = function(){
        return 3;
    };
    
    $scope.setPageContent = function(_pageContent_) {
        pageContent = _pageContent_;
    };
    
    $scope.getPageContent = function() {
        return pageContent;
    }
    

});


angular.module("app").controller('LoginCtrl',function($state,$scope,googleService) {
   
    
    $scope.isSignIn = false;
    
    // without Google Sign-on
    $scope.login = function(user) {
        
        console.log(user);
        
    }
    
    $scope.signOut = function() {
        $scope.isSignIn = false;
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        console.log('User signed out.');
       });
    };
    
    
    // Google Sign-on
    window.renderButton = function() {
         
          function onSuccess(googleUser) {
             console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
          }
            
          function onFailure(error) {
             console.log(error);
          }
            
          gapi.signin2.render('g-button', {
                'scope': 'https://www.googleapis.com/auth/plus.login',
                'width': 250,
                'height': 50,
                'longtitle': true,
                'theme': 'dark',
                'onsuccess': onSuccess,
                'onfailure': onFailure
          });
    };
     
    
    // option2
    window.loadGAPI = function() {
        
        gapi.load('auth2',function() {
            
            var auth2 = gapi.auth2.getAuthInstance();
            if (auth2 == undefined || auth2==null) {
                auth2 = gapi.auth2.init({
                   client_id: googleService.googleSSOClientId,
                   fetch_basic_profile: true,
                   scope: 'profile'
                });
            }
           
        auth2.signIn().then(function() {
            var profile = auth2.currentUser.get().getBasicProfile();
            var response = auth2.currentUser.get().getAuthResponse();
            console.log('Name: '+ profile.getName()); 
            console.log('Email: '+ profile.getEmail());
            console.log('ID_token: '+ response.id_token);
        });
        
      });
        
    };
    
    window.startApp = function() {
        
        gapi.load('auth2', function() {
            
            auth2 = gapi.auth2.init({
               client_id: googleService.googleSSOClientId,
               fetch_basic_profile: true,
               scope: 'profile' 
            });
            
            var ele = document.getElementById('customBtn');
            
            auth2.attachClickHandler(ele,
             {},function(googleUser) {
                //console.log("hi");
                 onSignIn(googleUser);
              },function(error) {
                 console.log(error);
              });
            
        });
                
    };
    
    function onSignIn(googleUser) {
        
        var profile = googleUser.getBasicProfile();
        var response = googleUser.getAuthResponse();
        
        document.getElementById('name').innerText = "Signed in: " +
        profile.getName();
        
        // notify angular update, enable two-way binding.
        $scope.$apply(function() {
            $scope.isSignIn = true;
        });
        
        $state.go('googleSignUp', { email: profile.getEmail(), name: profile.getName(), id_token: response.id_token });
        
    }
    
    
    console.log($scope);
    
});


angular.module("app").controller('googleSignUpCtrl', 
                                 function(stateService,$scope,$state,$stateParams) {
    
      var email = $stateParams.email;
      var name = $stateParams.name;
      var id_token = $stateParams.id_token;
      var firstName = "";
      var lastName = ""; 
    
      console.log(stateService);
    
    
});


angular.module("app").controller('ScotchCtrl', function($scope) {
   
    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'cava ken',
            price: 10000
        },
        {
            name: 'Glen dio',
            price: 20000
        }
    ];
    
    
});