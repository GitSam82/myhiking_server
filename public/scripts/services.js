angular.module('MyHikingDashboard.services', [])
    .factory('UserService', function ($http) {
        var handleSuccess = function (data) {
            return data;
        };

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }

        var UserService = {
            create : function (user) {
                var promise = $http.post('/users/create', user).then(handleSuccess, handleError('Error creating user'));
                return promise;
            },
            update : function (user) {
                var promise = $http.post('/users/update', user).then(handleSuccess, handleError('Error creating user'));
                return promise;
            },
            login : function (userName, pass) {
                var promise = $http.get('/users/login', {params: { "userName": userName, "pass" : pass }}).then(handleSuccess, handleError('Error logging in'));

                return promise;
            },
            getAll : function () {
                var promise = $http.get('/users/all').then(handleSuccess, handleError('Error logging in'));

                return promise;
            }

        };

        return UserService;

})
    .factory('MapService', function ($http) {

        var handleSuccess = function (data) {
            return data;
        };

        function handleError (error) {
            return function () {
                return { success: false, message: error };
            };
        };

        var MapService = {
            createMap: function (mapData) {
                var promise = $http.post('/map/create', mapData).then(handleSuccess, handleError('Error creating map'));
                return promise;
            },
            createData: function (mapData) {
                var promise = $http.post('/map/createData', mapData).then(handleSuccess, handleError('Error creating data map'));
                return promise;
            },
            createCheckpoint: function (mapData) {
                var promise = $http.post('/map/createCheckpoint', mapData).then(handleSuccess, handleError('Error creating checkpoint'));
                return promise;
            },
            getAllMaps: function () {
                var promise = $http.get('/map/all').then(handleSuccess, handleError('Error retrieving maps'));
                return promise;
            },
            getMapData: function (mapId) {
                var promise = $http.get('/map/' + mapId + '/decorations').then(handleSuccess, handleError('Error retrieving maps data'));
                return promise;
            },getMapCheckpoints: function (mapId) {
                var promise = $http.get('/map/' + mapId + '/checkpoints/data').then(handleSuccess, handleError('Error retrieving checkpoints'));
                return promise;
            }
        };

        return MapService;

});
