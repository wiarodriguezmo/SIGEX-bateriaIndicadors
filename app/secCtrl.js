app.controller('secCtrl', function ($scope, Data) {
    $scope.info = {};
    $scope.guardar = function (info) {
      console.log(info);
      Data.put('info', info).then(function (result) {});
    }
});
