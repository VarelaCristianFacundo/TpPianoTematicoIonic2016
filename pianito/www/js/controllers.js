angular.module('starter.controllers', [])

.controller('login', function($scope, $state) {

  $('#login').on('click', function(){
    var username = "";
    username = $("#nombre").val();
    var flag = 0;
  //alert ("Bienvenido "+username);
       
        if (username == "Cristian")
        {
            alert ("Bienvenido " + username);
            $state.go('tab.dash');
        }
        else
        {
            alert ("Usted no es usuario");
        }

  })
})

.controller('DashCtrl', function($scope, $timeout, $state,$cordovaNativeAudio, $cordovaVibration, $cordovaFile) {

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  $cordovaFile.writeFile(cordova.file.dataDirectory, "melodias.txt", '{autor:"Facu", nombre:"varela", melodia:[]', true)
  .then(function (success) {
            console.log(success);
        }, function (error) {
            console.log(error);
            alert("Error: writeFile");
        });
  }

  

$scope.Sonar = function(sonido){
    try{
      $cordovaNativeAudio.play(sonido);
      $cordovaVibration.vibrate(100);
    }
    catch (err){
      console.log("error");
    }
    if($scope.parar == true && $scope.grabar == false){
       $scope.melodia[i] = sonido;
       i++;
    }
  }

  $scope.Grabar = function(){
    $scope.parar = true;
    $scope.grabar = false;
    $scope.melodia = [];
    i=0;
//    console.log ($scope.parar);
//    console.log ($scope.grabar);
  }

  $scope.Parar = function(){
//    alert ("llegue");
    $scope.parar = false;
    $scope.reproducir = true;
    $scope.guardar = true;
    $scope.borrar = true;
    }

  $scope.Reproducir = function(){
    $scope.reproducir = false;
        angular.forEach($scope.melodia, function(value, key) 
        {
            $cordovaNativeAudio.play(value);
            for (var i = 0; i <= 100000000; i++) {
            };              
        });  
    }

    $scope.Borrar = function(){
        $scope.melodia = [];
        i=0;
        $scope.grabar = true;
        $scope.parar = false;
        $scope.reproducir = false;
        $scope.guardar = false;
    }

    $scope.Guardar = function(){
      $scope.grabar = true;
      $scope.parar = false;
      $scope.reproducir = false;
      $scope.guardar = false;
      var nombre = prompt("Ingrese el titulo");
      var melo = '"' + $scope.melodia.join('","') + '"';
      var meloGuardada = ',{autor:"'+nombre+'", nombre:"'+nombre+'", melodia:['+melo+']}';

        $cordovaFile.writeExistingFile(cordova.file.dataDirectory, "melodias.txt", meloGuardada)
          .then(function (success) {
            }, function (error) {
              alert(error);
            alert("WriteFileEx Mal");
        });
          

    };

    

var i;
$scope.grabar = true;
$scope.LeerTxt = function(){
        $cordovaFile.readAsText(cordova.file.dataDirectory, "melodias.txt").then(function (success) {
            // success
             alert(success);
        }, function (error) {
            // error
            alert(error);
            alert("Read Mal");
        });
    };

})

.controller('ChatsCtrl', function($scope, Chats, $timeout, $cordovaNativeAudio, $cordovaFile) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        $cordovaFile.readAsText(cordova.file.dataDirectory, "melodias.txt").then(function (success) {
            $scope.melodias = (new Function("return [" + success+ "];")());
        }, function (error) {
            alert("Error: "+error);
            alert("Read Mal");
        });
    }
    $scope.LeerTxt = function(){
        $cordovaFile.readAsText(cordova.file.dataDirectory, "melodias.txt").then(function (success) {
            // success
             alert(success);
        }, function (error) {
            // error
            alert(error);
            alert("Read Mal");
        });
    };


    $scope.$on('$ionicView.enter', function(e) {
        console.log(e); 
        $cordovaFile.readAsText(cordova.file.dataDirectory, "melodias.txt").then(function (success) {
            $scope.melodias = (new Function("return [" + success+ "];")());
        }, function (error) {
            alert("Error: "+error);
            alert("Read Mal");
        });
    });
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
