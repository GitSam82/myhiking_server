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
        
        data.maps = [];
        data.perm_map = false;
        
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

}).controller('AuthorizationCtrl', function($scope, $location, UserService, MapService) {

    $scope.users = [];
    $scope.selectedUser = undefined;
    $scope.selectedUserMaps = [];
    $scope.maps = [];

    UserService.getAll().then(function(result) {        
        $scope.users = result.data;
    });

    MapService.getAllMaps().then(function(result) {        
        $scope.maps = result.data;
    });

    $scope.change = function(){
        $scope.selectedUserMaps = $scope.selectedUser.maps;
    }

    $scope.toggleSelection = function toggleSelection(mapId) {
        var idx = $scope.selectedUserMaps.indexOf(mapId);

        // is currently selected
        if (idx > -1) {
            $scope.selectedUserMaps.splice(idx, 1);
        }

        // is newly selected
        else {
            $scope.selectedUserMaps.push(mapId);
        }
    }
    
    $scope.submit = function(){
         UserService.update({"email":$scope.selectedUser.email,"maps":$scope.selectedUserMaps}).then(function(result) {
            if(result.data.code=="OK"){
                $scope.show_resultok=true;
            }else{
                $scope.show_resultko=true;
                $scope.error_message = result.data.message;
            }
        });
    }

}).controller('DashboardCtrl', function($rootScope, $scope, $state) {

    $scope.$state = $state;

    $scope.showLink = function(){
        return $rootScope.currentUser[0].perm_map;
    }

}).controller('CheckpointCtrl', function($scope, $state, MapService, $rootScope) {

    $scope.$state = $state;
    $scope.checkpoints = [];
    $scope.maps = [];
    $scope.selectedMap = undefined;

    MapService.getAllMaps().then(function(result) {
        for(var i=0;i<result.data.length;i++){
            if($rootScope.currentUser[0].maps.indexOf(result.data[i].mapId) > -1){
                $scope.maps.push(result.data[i]);
            }   
        }
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
            description: "",
            latitude: "",
            longitude: ""
        });
    };

    $scope.submitCheckpointData = function(item,index) {
        
        
        MapService.createCheckpoint(item).then(function(result) {
            if(result.data.code=="OK"){
                $scope.show_resultok=true;
                
                
                var tmpItem = item;
                var obj = {mId: item.mapId,rId : item.routeId,cId: item.checkpointId ,lat:item.latitude,lng:item.longitude};
                var jsonObj = JSON.stringify(obj);
               
                var qrcode = new QRCode(document.getElementById('qrcodeArea_'+index), {
                    width: 490,
                    height: 490,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel : QRCode.CorrectLevel.H
                });
                
                qrcode.makeCode(jsonObj);
                 $('#qrcodeArea_'+index).addClass("qrcode");
                
            }else{
                $scope.show_resultko=true;
                $scope.error_message = result.data.message;
            }
        });
        return false;

    }

}).controller('MapCtrl', function($scope, $state,MapService) {

    $scope.$state = $state;
    $scope.maps = [];
    $scope.selectedMap = undefined;

    MapService.getAllMaps().then(function(result) {        
        $scope.maps = result.data;
    });

    $scope.mapfields = {};

    $scope.change = function(){
        $scope.mapfields = $scope.selectedMap;

        $scope.mapfields.centerLat = parseFloat($scope.selectedMap.center[0],10);
        $scope.mapfields.centerLng = parseFloat($scope.selectedMap.center[1],10);

        $scope.mapfields.southWestBoundLat = parseFloat($scope.selectedMap.southWestBound[0],10);
        $scope.mapfields.southWestBoundLng = parseFloat($scope.selectedMap.southWestBound[1],10);

        $scope.mapfields.northEastBoundLat = parseFloat($scope.selectedMap.northEastBound[0],10);
        $scope.mapfields.northEastBoundLng = parseFloat($scope.selectedMap.northEastBound[1],10);
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
    $scope.maps = [];
    $scope.selectedMap = undefined;

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