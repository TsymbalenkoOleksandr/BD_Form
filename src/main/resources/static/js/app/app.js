/**
 * Created by Oleksandr on 06.03.2017.
 */
'use strict';

angular
    .module('crudApp', ['ui.router', 'service'])
    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('home', {
                url: '/home',
                templateUrl: 'templates/list.ftl',
                controller : 'mainController',
                controllerAs: 'ctrl'
            });

        $urlRouterProvider.otherwise('/');


    });