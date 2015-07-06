/* 
 * @Author: chenhao
 * @Date:   2015-06-25 10:37:20
 * @Last Modified by:   chenhao
 * @Last Modified time: 2015-07-06 13:13:16
 */
'use strict';
angular.module('app', ['ngRoute', 'ngGrid', 'ui.bootstrap'])
.config(['$routeProvider', '$locationProvider', '$sceProvider',
    function($routeProvider, $locationProvider, $sceProvider) {
        $routeProvider.when('/', {
            templateUrl: '/templates/welcome.html',
            controller: 'WelComeCtrl'
        }).when('/about', {
            templateUrl: '/templates/about.html',
            controller: 'AboutCtrl'
        }).when('/user', {
            templateUrl: '/templates/user/user.html',
            controller: 'UserCtrl'
        }).when('/role', {
            templateUrl: '/templates/role/role.html',
            controller: 'RoleCtrl'
        }).when('/menu', {
            templateUrl: '/templates/menu/menu.html',
            controller: 'MenuCtrl'
        }).when('/log', {
            templateUrl: '/templates/log/log.html',
            controller: 'LogCtrl'
        }).otherwise({
            redirectTo: '/'
        });
        //$locationProvider.html5Mode(true);
    }
])
.factory('flag', function() {
    return false;
})
.controller('NavBarController', function($scope, $http){

    //退出按钮
    $scope.logout = function(){
        console.log("退出");
        $http({
            method: 'POST',
            url: '/action/logout'
        }).success(function(results) {
            console.log(results);
            window.location.reload();
        });
    }

}).controller('MenuTreeCtrl', function($scope, $http, $compile){

    //加载菜单树
    console.log("加载菜单树");
    $http({
        method: 'POST',
        url: '/action/menu/queryByUserId',
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

    //转换html
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
    console.log("加载首页...");
}).controller('AboutCtrl', function($scope) {
    console.log("加载关于...");
});