app.controller('polizasCtrl', function ($scope, $modal, $filter, Data) {
    $scope.poliza = {};
    Data.get('polizas').then(function(data){
        $scope.polizas = data.data;
    });
    $scope.vencido = function(vence){
      var e=vence.split("-");
      var fecha_hoy = new Date();
      var ano = fecha_hoy.getYear();
      if(e[0]-ano-1900>0)return "Active";
      else if(e[0]-ano-1900<0)return "Inactive";
      else {
        var mes = fecha_hoy.getMonth()+1;
        if(e[1]-mes>0)return "Active";
        else if(e[1]-mes<0)return "Inactive";
        else {
          var dia = fecha_hoy.getDate();
          if(dia-e[2]<0)return "Active";
          else return "Inactive";
        }
      }
    }
    $scope.deletepoliza = function(poliza){
        if(confirm("Estás seguro de que deseas eliminar este poliza? Se creará el registro de seguridad de tal acción.")){
            Data.delete("polizas/"+poliza.id).then(function(result){
                $scope.polizas = _.without($scope.polizas, _.findWhere($scope.polizas, {id:poliza.id}));
            });
        }
    };
    $scope.renew = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/polizaRenew.html',
          controller: 'polizaRenewCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
          p.vencimiento = selectedObject.vencimiento;
        });
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/polizaEdit.html',
          controller: 'polizaEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.polizas.push(selectedObject);
                $scope.polizas = $filter('orderBy')($scope.polizas, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.compania = selectedObject.compania;
                p.valor = selectedObject.valor;
                p.valorPoliza = selectedObject.valorPoliza;
                p.ramo = selectedObject.ramo;
            }
        });
    };
 $scope.columns = [
                    {text:"#",predicate:"id",sortable:true,dataType:"text"},
                    {text:"Documento",predicate:"idPersona",sortable:true},
                    {text:"Nombres y apellidos",predicate:"nombres",sortable:true},
                    {text:"Vigencia",predicate:"vigencia",sortable:false},
                    {text:"Vencimiento",predicate:"vencimiento",sortable:false},
                    {text:"Ramo",predicate:"ramo",sortable:false},
                    {text:"Valor",predicate:"valor",sortable:false},
                    {text:"Valor de Poliza",predicate:"valorPoliza",reverse:true,sortable:true},
                    {text:"Compañía",predicate:"compania",reverse:true,sortable:true},
                    {text:"Acción",predicate:"",sortable:false}
                ];
});

app.controller('polizaRenewCtrl', function ($scope, $modalInstance, item, Data) {
  $scope.poliza = angular.copy(item);

        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };

        $scope.savepoliza = function (poliza) {
          Data.put('polizas/'+poliza.id, {vencimiento: poliza.vencimiento}).then(function (result) {
              if(result.status != 'error'){
                  var x = angular.copy(poliza);
                  $modalInstance.close(x);
              }else{
                  console.log(result);
              }
          });
        };
});


app.controller('polizaEditCtrl', function ($scope, $modalInstance, item, Data) {
  $scope.poliza = angular.copy(item);
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.agregar = (item.id > 0);
        $scope.title = ($scope.agregar) ? 'Editar poliza - ID:' : 'Agregar poliza';
        $scope.buttonText = ($scope.agregar) ? 'Actualizar poliza' : 'Agregar nueva poliza';
        if($scope.agregar)$scope.poliza.id = $scope.poliza.id.toString();

        $scope.savepoliza = function (poliza) {
            poliza.uid = $scope.uid;
            if($scope.agregar){console.log(poliza);
                delete poliza.nombres;
                delete poliza.apellidos;
                console.log(poliza);
                Data.put('polizas/'+poliza.id, poliza).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(poliza);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{
                Data.post('polizas', poliza).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(poliza);
                        x.save = 'insert';
                        Data.get('clientes/'+poliza.idPersona).then(function(data){
                            x.nombres = data.data[0].nombres;
                            x.apellidos = data.data[0].apellidos;
                        });
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }
        };
});
