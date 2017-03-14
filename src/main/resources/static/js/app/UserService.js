/**
 * Created by Oleksandr on 06.03.2017.
 */
angular.
    module('service', []).
    factory('getRequest', [
        '$http', function ($http) {
            return $http.get('/SpringBootCRUDApp/api/user/')
        }
    ]);