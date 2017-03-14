/**
 * Created by Oleksandr on 06.03.2017.
 */
angular.
module('crudApp').
controller('mainController', ['$scope', '$http', 'getRequest',
    function ($scope, $http, getRequest) {
        that = this;
        that.user = {};

        getRequest.success(function(data) {
            that.allUsers = data;
        });

        that.submit = function() {
            var url =  '/SpringBootCRUDApp/api/user/';
            var data = {
                name: that.user.name,
                age: that.user.age,
                salary: that.user.salary
            };
            var config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            $http.post(url, data, config).
                success(function (data, status) {
                    that.successMessage = 'You added to DB';
                    that.errorMessage = '';
                    that.user.id = false;
                    $http.get('/SpringBootCRUDApp/api/user/').success(function(data) {
                        that.allUsers = data;
                    });
                }).
                error(function (data, status) {
                    that.errorMessage = data.errorMessage;
                    that.successMessage = '';
                    if(status == 409)
                        that.user.id = true;
                    else if(status == 400) {
                        that.errorMessage = 'The input field should have appropriate type';
                    }
                });
        };

        that.getAllUsers = function() {
            return that.allUsers;
        };

        that.removeUser = function(user_id) {
            var url =  '/SpringBootCRUDApp/api/user/'+user_id;
            var data = {id: user_id};
            $http.delete(url, data).
            success(function (data, status) {
                $http.get('/SpringBootCRUDApp/api/user/').success(function(data) {
                    that.allUsers = data;
                });
                console.log('asdfsa', data, status);
            });
        };

        that.reset = function() {
            that.user.name = '';
            that.user.age = '';
            that.user.salary = '';
        };

        that.editUser = function(user_id) {
            var url =  '/SpringBootCRUDApp/api/user/'+user_id;
            var data = {
                id: user_id,
                name: that.user.name,
                age: that.user.age,
                salary: that.user.salary
            };
            $http.put(url, data).
            success(function (data, status) {
                $http.get('/SpringBootCRUDApp/api/user/').success(function(data) {
                    that.allUsers = data;
                });
                console.log('woav', data, status);
            });
            $http.get('/SpringBootCRUDApp/api/user/').success(function(data) {
                that.allUsers = data;
            });
        }
    }
])
