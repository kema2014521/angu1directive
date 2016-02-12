// run could only inject instances and constants
// great place to put any event handlers at root level, like "main method"

var myApp = angular.module('app',['angular-paginate','ui.router','ngRoute','ngMessages']);

myApp.config(['$stateProvider', '$urlRouterProvider',
              function($stateProvider,$urlRouterProvider) {
       
    $urlRouterProvider.otherwise('/');
                  
    $stateProvider
                  
     .state('login', {
        url: '/',
        templateUrl:'pages/login.tpl.html',
        controller:'LoginCtrl'
     })   
    
     .state('googleSignUp', {
         url: '/googlesignup',
         templateUrl: 'pages/googleSignUp.html',
         controller: 'googleSignUpCtrl',
         params: { email: null, name: null, id_token: null }   
     })
                  
     .state('grid', {
        url:'/grid',
        templateUrl:'pages/home.html',
        controller:'HomeCtrl'
     })  
    
     .state('new', {
       url:'/new',
       templateUrl:'pages/view.html',
       controller:'ViewCtrl',
       resolve: {
            message: function(messageService) {
                return messageService.getMessage();
            },
            greeting: function(greetingService) {
                return greetingService.getGreeting();
            }
       }
        
      })
    
      .state('about', {
         url:'/about',
         views: {
             
             '': {templateUrl:'pages/partial-about.html'},
             
             'columnOne@about': {template: 'Look I am a column!'},
             
             'columnTwo@about': {
                templateUrl: 'pages/table-data.html',
                controller: 'ScotchCtrl'
             }  
             
         }
      })
                  
      .state('new.list', {
          url:'/list',
          templateUrl:'pages/partial-home-list.html',
          controller: function($scope) {
            $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
            console.log($scope);
         }
      })
    
      .state('new.paragraph', {
         url: '/paragraph',
         template: 'I could sure love this angular!'
    })
       
}]);


myApp.run(function($rootScope,$location,$templateRequest) {
        
    $templateRequest("templates/editor.html");
    
    $rootScope.$on('$routeChangeStart',function(event,next,current) {
         console.log($location.url());
        //console.log(next,"kema");
        //console.log(current,"joy");
    });
    
    
});

