angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $timeout, $cordovaNativeAudio, $cordovaVibration, $cordovaFile) {

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

var i;
$scope.grabar = true;

$scope.sonar = function(sonido){
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

  $scope.grabar = function(){
    $scope.parar = true;
    $scope.grabar = false;
    $scope.melodia = [];
    i=0;
  }

  $scope.parar = function(){
    alert("llegue");
    $scope.parar = false;
    $scope.reproducir = true;
    $scope.guardar = true;
    }

  $scope.reproducir = function(){
    $scope.reproducir = false;
        angular.forEach($scope.melodia, function(value, key) 
        {
            $cordovaNativeAudio.play(value);
            for (var i = 0; i <= 100000000; i++) {
            };              
        });  
    }

    $scope.borrar = function(){
        $scope.melodia = [];
        i=0;
        $scope.grabar = true;
        $scope.parar = false;
        $scope.reproducir = false;
        $scope.guardar = false;
    }

    $scope.guardar = function(){
      var nombre = prompt("Ingrese el titulo de la cancion");
      var melodiastring = '"' + $scope.melodia.join('","') + '"';
        var melodiaAGuardar = ',{autor:"'+nombre+'", nombre:"'+nombre+'", melodia:['+melodiastring+']}';
        $cordovaFile.writeExistingFile(cordova.file.dataDirectory, "melodias.txt", melodiaAGuardar)
          .then(function (success) {
            }, function (error) {
              alert(error);
            alert("WriteFileEx Mal");
        });
          $scope.grabar = true;
    };


})

.controller('ChatsCtrl', function($scope, Chats, $timeout, $cordovaNativeAudio) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.sonar = function(sonido){
    $cordovaNativeAudio.play(sonido);
  };

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
