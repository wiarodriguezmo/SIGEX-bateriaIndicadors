app.controller('initialCtrl', function ($scope, Data) {
    $scope.cotas = {
      "cinco":{"S":0.79,"I":0.6},"seis":{"S":0.79,"I":0.6},"siete":{"S":0.79,"I":0.6},"ocho":{"S":0.79,"I":0.6},
      "nueve":{"S":0.79,"I":0.6},"once":{"S":0.79,"I":0.6},"doce":{"S":0.79,"I":0.6},"trece":{"S":0.79,"I":0.6},
      "catorce":{"S":0.79,"I":0.6},"dieciseis":{"S":0.79,"I":0.6},"diecisiete":{"S":0.79,"I":0.6},"diecinueve":{"S":0.79,"I":0.6},
      "veinte":{"S":0.79,"I":0.6},"veintiuno":{"S":0.79,"I":0.6},"veintidos":{"S":0.79,"I":0.6},"veintitres":{"S":0.79,"I":0.6},
      "veinticuatro":{"S":0.79,"I":0.6},"veinticinco":{"S":0.79,"I":0.6},"veintisiete":{"S":0.79,"I":0.6},"treintayuno":{"S":0.79,"I":0.6},
      "treintaydos":{"S":0.79,"I":0.6},"treintaytres":{"S":0.79,"I":0.6},"treintaycuatro":{"S":0.79,"I":0.6},"treintayocho":{"S":0.79,"I":0.6},
      "treintaynueve":{"S":0.79,"I":0.6},"cuarenta":{"S":0.79,"I":0.6},"cuarentayuno":{"S":0.79,"I":0.6},"cuarentaydos":{"S":0.79,"I":0.6},
      "cuarentaycuatro":{"S":0.79,"I":0.6},"cuarentaycinco":{"S":0.79,"I":0.6}
    };
    $scope.indicadores = {};
    Data.post('call',$scope.cotas).then(function(data){
        $scope.indicadores = data;
    });
    Data.get('secundaria').then(function(data){
        $scope.secundaria = data.data[0];
        $scope.indicadoresS = evaluaSec($scope.secundaria);
    });
    evaluaSec = function(sec){
      var uno = sec.uno>10?"btn-success":sec.uno>4?"btn-warning":"btn-danger";
      var dos = sec.dos>0.3?"btn-success":sec.dos>=0.15?"btn-warning":"btn-danger";
      var tres = sec.tres>0.3?"btn-success":sec.tres>=0.15?"btn-warning":"btn-danger";
      var cuatro = sec.cuatro>0.3?"btn-success":sec.cuatro>=0.15?"btn-warning":"btn-danger";
      var diez = sec.diez>1?"btn-success":sec.diez=1?"btn-warning":"btn-danger";
      var quince = sec.quince>0.8?"btn-success":sec.quince>=0.6?"btn-warning":"btn-danger";
      var dieciocho = sec.dieciocho>6?"btn-success":sec.dieciocho>=4?"btn-warning":"btn-danger";
      var veintiseis = sec.veintiseis>0.8?"btn-success":sec.veintiseis>=0.6?"btn-warning":"btn-danger";
      var veintiocho = sec.veintiocho>11?"btn-success":sec.veintiocho>=6?"btn-warning":"btn-danger";
      var veintinueve = sec.veintinueve>0.8?"btn-success":sec.veintinueve>=0.6?"btn-warning":"btn-danger";
      var treinta = sec.treinta>1?"btn-success":sec.treinta=1?"btn-warning":"btn-danger";
      var treintaycinco = sec.treintaycinco>=4000000000?"btn-success":sec.treintaycinco>=2000000000?"btn-warning":"btn-danger";
      var treintayseis = sec.treintayseis>0.8?"btn-success":sec.treintayseis>=0.6?"btn-warning":"btn-danger";
      var treintaysiete = sec.treintaysiete>0.8?"btn-success":sec.treintaysiete>=0.6?"btn-warning":"btn-danger";
      var cuarentaytres = sec.cuarentaytres>0.8?"btn-success":sec.cuarentaytres>=0.6?"btn-warning":"btn-danger";

      return { "uno":uno,"dos":dos,"tres":tres,"cuatro":cuatro,"diez":diez,"quince":quince,"dieciocho":dieciocho,"veintiseis":veintiseis,"veintiocho":veintiocho,"veintinueve":veintinueve,"treinta":treinta,"treintaycinco":treintaycinco,"treintayseis":treintayseis,"treintaysiete":treintaysiete,"cuarentaytres":cuarentaytres };
    };
});
