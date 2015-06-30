/* 
 * @Author: chenhao
 * @Date:   2015-06-25 10:37:20
 * @Last Modified by:   chenhao
 * @Last Modified time: 2015-06-30 15:52:25
 */
'use strict';
var app = angular.module('app', ['ui.bootstrap', 'ngRoute', 'ngGrid']);
app.config(['$routeProvider', '$locationProvider', '$sceProvider',
    function($routeProvider, $locationProvider, $sceProvider) {
        $routeProvider.when('/', {
            templateUrl: '/templates/welcome.html',
            controller: 'WelComeCtrl'
        }).when('/about', {
            templateUrl: '/templates/about.html',
            controller: 'AboutCtrl'
        }).when('/user', {
            templateUrl: '/templates/user.html',
            controller: 'UserCtrl'
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

}).controller('AboutCtrl', function($scope) {
    
}).controller('UserCtrl', function($scope, $http) {
     $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    }; 
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [5, 50, 100],
        pageSize: 5,
        currentPage: 1
    };  
    $scope.setPagingData = function(data, page, pageSize){  
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.myData = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        $http({
            method: 'POST',
            url: '/action/user/query'
        }).success(function(largeLoad) {
            var obj = $scope.gridOptions.selectedItems;
            obj.splice(0,obj.length);
            $scope.setPagingData(largeLoad,page,pageSize);
        });
    };
    
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    
    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal || newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    
    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions,
        selectedItems: [],
        columnDefs: [
            {field:'userId', displayName:'用户编码'}, 
            {field:'userName', displayName:'用户名'},
            {field:'password', displayName:'密码'},
            {field:'email', displayName:'邮箱'}
        ]
    };

    
});