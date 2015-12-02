app.controller('proofController', function($scope, $http, Data) {
      Data.get('respuestas').then(function(data){
          $scope.respuestas = data.respuestas;
      });
    }
);
