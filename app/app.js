var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      title: 'SYSTEM INFORMATION PRIAC',
      templateUrl: 'partials/inicio.html'
    })
    .when('/indicadores', {
      title: 'Bases de datos PJA',
      templateUrl: 'partials/indicadores.html',
      controller: 'initialCtrl'
    })
    .when('/inscribirSec', {
      title: 'Bases de datos PJA',
      templateUrl: 'partials/inscribirSec.html',
      controller: 'secCtrl'
    })
    .when('/falta', {
      title: 'Temas faltantes',
      templateUrl: 'partials/faltante.html'
    })
    .otherwise({
      redirectTo: '/'
    });;
}]);
