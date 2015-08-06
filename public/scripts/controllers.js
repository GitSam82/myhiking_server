angular.module('MyHikingDashboard.controllers', [])
  .controller('LoginCtrl', function($scope, $location,UserService,$rootScope ) {

    $scope.submit = function() {
        var data = $scope.fields;  
        
        UserService.login(data.email,data.pass).then(function(result) {
            if(result.data.code=="OK"){
                $rootScope.currentUser = result.data.userData;
                $location.path('/dashboard');
            }else{
                $scope.show_resultko=true;
                $scope.login_error_message = result.data.message;
            }
        });
        

        return false;
    }
    
    $scope.goRegistration = function() {
        $location.path('/registration');

        return false;
    }
    

  }).controller('RegistrationCtrl', function($scope, $location, UserService) {

    $scope.submit = function() {
        var data = $scope.fields;  
        UserService.create(data).then(function(result) {
            if(result.data.code=="OK"){
                $scope.show_resultok=true;
            }else{
                $scope.show_resultko=true;
                $scope.registration_error_message = result.data.message;
            }
        });
    }
    
    $scope.goLogin = function() {
        $location.path('/login');

        return false;
    }

  }).controller('DashboardCtrl', function($rootScope, $scope, $state) {

    $scope.$state = $state;
    
    $scope.showLink = function(){
        
       return $rootScope.currentUser[0].perm_map;
    
    }
    
    
   
    

  }).controller('CheckpointCtrl', function($scope, $state,MapService) {

    $scope.$state = $state;
    $scope.checkpoints = [];
    $scope.maps = [];
    $scope.selectedMap = undefined;
    
    MapService.getAllMaps().then(function(result) {        
            $scope.maps = result.data;
    });
        
    $scope.change = function(){
        MapService.getMapCheckpoints($scope.selectedMap.mapId).then(function(result) {        
            $scope.checkpoints = result.data;            
        });
    }
    
    $scope.addCheckpoint = function () {
          $scope.checkpoints.push({ 
            mapId: "",
            routeId : "",
            checkpointId: "",
            directions : "",
            directionsImg : "",
            title : "",
            description: ""
          });
        };
    
    $scope.submitCheckpointData = function(item) {
         MapService.createCheckpoint(item).then(function(result) {
            if(result.data.code=="OK"){
                $scope.show_resultok=true;
            }else{
                $scope.show_resultko=true;
                $scope.error_message = result.data.message;
            }
        });
        return false;
        
    }

  }).controller('MapCtrl', function($scope, $state,MapService) {

    $scope.$state = $state;
    $scope.checkpoints = [];
    $scope.maps = [];
    $scope.selectedMap = undefined;
    
    MapService.getAllMaps().then(function(result) {        
            $scope.maps = result.data;
    });
    
    $scope.mapfields = {};
    
    $scope.change = function(){
        $scope.mapfields = $scope.selectedMap;
    }
    
    $scope.new = function(){
        $scope.mapfields = {};
    }
    
    $scope.submitMap = function() {
        var data = $scope.fields;  
                
        data.folderName = "myhiking_" + data.name;
        data.center = [data.centerLat, data.centerLng];
        data.southWestBound = [data.southWestBoundLat, data.southWestBoundLng];
        data.northEastBound = [data.northEastBoundLat, data.northEastBoundLng];

        delete data.centerLat;
        delete data.centerLng;
        delete data.southWestBoundLat;
        delete data.southWestBoundLng;
        delete data.northEastBoundLat;
        delete data.northEastBoundLng;
                
        MapService.createMap(data).then(function(result) {
            if(result.data.code=="OK"){
                $scope.show_resultok=true;
            }else{
                $scope.show_resultko=true;
                $scope.map_error_message = result.data.message;
            }
        });
        return false;
    }

  }).controller('MapDataCtrl', function($rootScope, $scope, $state, MapService) {
    $scope.$state = $state;
    alert($rootScope.currentUser);

    $scope.maps = [];
    $scope.selectedMap = undefined;
    $scope.geoJSON = undefined;
    
    MapService.getAllMaps().then(function(result) {        
        $scope.maps = result.data;
    });
    
    $scope.mapfields = {};
    
    $scope.change = function(){
        MapService.getMapData($scope.selectedMap.mapId).then(function(result) {        
            $scope.geoJSON = JSON.stringify(result.data[0]);
        });   
    }
    
    $scope.submitData = function() {
        var data = $scope.geoJSON;  
        
         MapService.createData(data).then(function(result) {
            if(result.data.code=="OK"){
                $scope.show_resultok=true;
            }else{
                $scope.show_resultko=true;
                $scope.map_error_message = result.data.message;
            }
        });
        return false;
        
    }
    
  });