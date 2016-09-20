angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Chats, $timeout, $cordovaNativeAudio, $cordovaVibration, $cordovaFile) {
$scope.sonar = function(sonido){

    $cordovaNativeAudio.play(sonido);
    $cordovaVibration.vibrate(100);
  };

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
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
