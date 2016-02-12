// link execution order: gridColumn-> gridColumns -> withInlineEditor -> grid -> gridScreen
// domain object:col,row,editor


angular.module("app").directive("createPages",function() {
    
    return {
        restrict: "AE",
        scope: {
            numberPerPage: "@",
            pages: "=",
            pageContent: "=",
            binding: "@"
        },
        controller: "PaginationController",
        link: function(scope, elem, attrs){
            
            elem.bind(scope.binding, function(){ 
                
                var pageMax = 5;
                
                scope.pages = [];
                
                for (var i=1;i<pageMax;i++) {
                    scope.pages.push(i);
                }

                scope.setPageContent(scope.pageContent);
                
                console.log(scope.getPageContent());
                
                scope.$apply();         // apply changes
            });
              
        }
    };
    
    
});


angular.module("app").directive("ngEnter",function() {
    
   return {
    
       restrict:'A',
       link:function(scope,element,attributes) {
           
           element.bind("keydown keypress", function(e) {
               if (e.which === 13) {
                   
                   // notify Angular update
                   scope.$apply(function() {
                    // evaluate AngularJS expression for function
                      scope.$eval(attributes.ngEnter); 
                   });
                   
                   event.preventDefault();
               }
           });
       }
       
   };
});


angular.module("app").directive("noClick",function() {
    
    return {
       
        restrict:'A',
        link:function(scope,element,attributes) {
            
            $(element).bind('click',function(e) {
                e.preventDefault();
            });
        }    
    };
    
});


angular.module("app").directive("gridScreen",function($http) {
   
    return {
        restrict:'E',
        controller:function($scope) {
            // columns,editor
            this.setEditor = function(editor) {
                $scope.cols.unshift(editor);
            };
                
            this.setColumns = function(cols) {
                $scope.cols = cols;
            };
            
            console.log($scope);
        },
        link:function(scope,element,attributes) {
            $http.get(attributes.resource).success(function(response) {
                scope.rows = response.data;
                scope.$broadcast('ready-to-render',scope.rows,scope.cols);
                console.log('linked girdScreen');
                //console.log(scope);
            });
        }
    }
       
});


angular.module("app").directive("gridColumns", function() {
    
    return {
        restrict: 'E',
        require:['^gridScreen','gridColumns'],
        controller:function() {
            var columns = [];
            this.addColumn = function(col) {
                columns.push(col);
            };
            
            this.getColumns = function() {
                return columns;
            }
        },
        link:function(scope,element,attributes,controllers) {
            var gridScreenController = controllers[0];
            var gridColumnsController = controllers[1];
            
            gridScreenController.setColumns(gridColumnsController.getColumns());
            console.log('linked gridColumns');
        }
           
    };
});

angular.module("app").directive("gridColumn", function() {
    
    return {
      restrict:'E',
      require:'^gridColumns',
      link:function(scope,element,attributes,controller) {
          var gridColumnsController = controller;
          
          gridColumnsController.addColumn({
              title: attributes.title,
              field: attributes.field
          });
      }
  
    };    
});


angular.module("app").directive("grid",function() {
    
    return {
       restrict:'E',    
       templateUrl:'templates/as_table1.html',
       replace:true,
       controller: function($scope) {
           
           $scope.$on('ready-to-render',function(e,rows,cols) {
               //console.log("run first");
           });
           
       }
    };   
});


angular.module("app").directive("withInlineEditor",function() {
   
    return {
      
       restrict:'A',
       require: '^gridScreen',
       link: function(scope,element,attributes,gridScreenController) {
           gridScreenController.setEditor({
              title:'Edit',
              field:""
           });
       }
        
    };
    
});


angular.module("app").directive("editorInitializer",function($compile,$templateCache) {
    
    return {
       restrict:'E',
       templateUrl:'templates/editor_initializer.html',
       controller: function($scope) {
           
         var editState = false;   
           
         $scope.edit = function(row) {
             editState = !editState;
             $scope.$broadcast('edit',editState);
         };
       },
       link: function(scope,element,attributes) {
                   
          scope.$on('edit',function(e,editState) {
                           
              if (editState) {
                  // template-scope binding in directive, so access to scope.cols..
                  // activate directives to use scope variable or methods data.
                  // dynamic add dom element.
                  var compileFn = $compile($templateCache.get("templates/editor.html"));
                  var editor = compileFn(scope);
                  $(editor).insertAfter(element.parents("tr"));
              } else {
                  $(".editor-row").remove();
              }
              
          });
       }

    };
    
});








