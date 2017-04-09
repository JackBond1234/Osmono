var index = angular.module('index', ['ngAnimate']);
index.config(function ($controllerProvider) {
    index.controller = $controllerProvider.register;
});