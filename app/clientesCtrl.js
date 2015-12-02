app.controller('clientesCtrl', function ($scope, $modal, $filter, Data) {
    $scope.cliente = {};
    $scope.inicio = 'active';
    Data.get('clientes').then(function(data){
        $scope.clientes = data.data;
    });
    $scope.mayorE = function(edad){
      var e=edad.split("-");
      var fecha_hoy = new Date();
      var ano = fecha_hoy.getYear();
      if(ano+1900-e[0]>18)return "Active";
      else if(ano+1900-e[0]<18)return "Inactive";
      else {
        var mes = fecha_hoy.getMonth()+1;
        if(mes-e[1]>0)return "Active";
        else if(mes-e[1]<0)return "Inactive";
        else {
          var dia = fecha_hoy.getDate();
          if(dia-e[2]>=0)return "Active";
          else return "Inactive";
        }
      }
    }
    $scope.deletecliente = function(cliente){
        if(confirm("Estás seguro de que deseas eliminar este cliente? Se creará el registro de seguridad de tal acción.")){
            Data.delete("clientes/"+cliente.id).then(function(result){
                $scope.clientes = _.without($scope.clientes, _.findWhere($scope.clientes, {id:cliente.id}));
            });
        }
    };
    $scope.open = function (p,size) {
        var modalInstance = $modal.open({
          templateUrl: 'partials/clienteEdit.html',
          controller: 'clienteEditCtrl',
          size: size,
          resolve: {
            item: function () {
              return p;
            }
          }
        });
        modalInstance.result.then(function(selectedObject) {
            if(selectedObject.save == "insert"){
                $scope.clientes.push(selectedObject);
                $scope.clientes = $filter('orderBy')($scope.clientes, 'id', 'reverse');
            }else if(selectedObject.save == "update"){
                p.telefono = selectedObject.telefono;
                p.celular = selectedObject.celular;
                p.email = selectedObject.email;
                p.direccion = selectedObject.direccion;
            }
        });
    };

 $scope.columns = [
                    {text:"ID",predicate:"id",sortable:true,dataType:"number"},
                    {text:"Nombres y apellidos",predicate:"nombres",sortable:true},
                    {text:"Teléfono",predicate:"telefono",sortable:false},
                    {text:"Celular",predicate:"celular",sortable:false},
                    {text:"Correo",predicate:"email",sortable:false},
                    {text:"Dirección",predicate:"direccion",sortable:false},
                    {text:"Nacimiento",predicate:"nacimiento",reverse:true,sortable:true},
                    {text:"Acción",predicate:"",sortable:false}
                ];
});

app.controller('clienteEditCtrl', function ($scope, $modalInstance, item, Data) {
  $scope.cliente = angular.copy(item);
        $scope.cancel = function () {
            $modalInstance.dismiss('Close');
        };
        $scope.agregar = (item.id > 0);
        $scope.title = ($scope.agregar) ? 'Editar cliente - ID:' : 'Agregar cliente';
        $scope.buttonText = ($scope.agregar) ? 'Actualizar cliente' : 'Agregar nuevo cliente';
        if($scope.agregar)$scope.cliente.telefono = $scope.cliente.telefono.toString();

        $scope.savecliente = function (cliente) {
            cliente.uid = $scope.uid;
            if($scope.agregar){console.log(cliente);
                Data.put('clientes/'+cliente.id, cliente).then(function (result) {
                    if(result.status != 'error'){
                        var x = angular.copy(cliente);
                        x.save = 'update';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }else{  console.log(cliente);
                Data.post('clientes', cliente).then(function (result) {

                    if(result.status != 'error'){
                        var x = angular.copy(cliente);
                        x.save = 'insert';
                        $modalInstance.close(x);
                    }else{
                        console.log(result);
                    }
                });
            }
        };
});


app.controller('mTipoCtrl', function ($scope) {

});
