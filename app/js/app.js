/* 
 * @Author: chenhao
 * @Date:   2015-06-25 10:37:20
 * @Last Modified by:   chenhao
 * @Last Modified time: 2015-06-26 08:56:37
 */
'use strict';
var app = angular.module('app', ['ui.bootstrap', 'ngRoute']);
app.config(['$routeProvider', '$locationProvider', '$sceProvider',
    function($routeProvider, $locationProvider, $sceProvider) {
        $routeProvider.when('/', {
            templateUrl: '/templates/welcome.html',
            controller: 'WelComeCtrl'
        }).when('/about', {
            templateUrl: '/templates/about.html',
            controller: 'AboutCtrl'
        }).otherwise({
            redirectTo: '/'
        });
        //$locationProvider.html5Mode(true);
    }
]);

app.controller('NavBarController', function($scope){
    $scope.logout = function(){
        console.log("退出");
    }
}).controller('MenuTreeCtrl', function($scope, $http, $compile){
    $http({
        method: 'POST',
        url: '/action/menu/query',
        data: {
            userId: window.userId
        }
    }).success(function(results) {
        var html = getMenuTreeHtml(results, 0);
        var template = angular.element(html);
        var element = $compile(template)($scope);
        angular.element(".sidebar-menu").append(element);
        $(".sidebar-menu li").each(function(){
             $(this).click(function(){
                 $(this).next().toggle() ;
             }) ;
        });
    });

    var getMenuTreeHtml = function(jsons, parentId){
         var ul = "";
        if(parentId == 0){
            ul = "<ul class='nav' >" ;
        }else{
            ul = "<ul class='nav' style='display: none;'>" ;
        }
        for(var i = 0; i < jsons.length; i++){
            if(jsons[i].parentId == parentId){
                ul += "<li><a href='" + jsons[i].path + "' ><i class='fa " + jsons[i].menuIcon + "'></i><span>" + jsons[i].menuName + "</span></a></li>" ;
                ul += getMenuTreeHtml(jsons, jsons[i].menuId) ;
            }
        }
        ul += "</ul>" ;
        return ul;
    };
}).controller('WelComeCtrl', function($scope) {
    $scope.words = '首页';
}).controller('AboutCtrl', function($scope) {
    $scope.words = '关于';
});