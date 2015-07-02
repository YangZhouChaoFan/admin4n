/* 
* @Author: chenhao
* @Date:   2015-07-01 11:23:48
* @Last Modified by:   chenhao
* @Last Modified time: 2015-07-02 13:31:10
*/

'use strict';

function UserCtrl ($scope, $http, $modal) {
    console.log("加载用户管理...");

    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    }; 
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [10, 50, 100],
        pageSize: 10,
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
            $scope.setPagingData(largeLoad, page, pageSize);
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
        i18n:'zh-cn',
        enablePaging: true,
        showFooter: true,
        showSelectionCheckbox: true,
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

    $scope.insert = function(){
        $modal.open({
            templateUrl: "/templates/user/userModal.html",
            controller: 'UserInsertCtrl',
            resolve: {
                grid: function(){ return $scope; }
            }
        });
    };

    $scope.update = function(){
        var selectedItems = $scope.gridOptions.selectedItems;
        if(selectedItems.length != 1){
            alert(请选择一条记录);
        }
        $modal.open({
            templateUrl: "/templates/user/userModal.html",
            controller: 'UserUpdateCtrl',
            resolve:{
                grid: function(){ return $scope; }
            }
        });
    };

    $scope.delete = function(){
        var selectedItems = $scope.gridOptions.selectedItems;
        var ids = [];
        for(var i = 0; i < selectedItems.length; i++){
            ids.push(selectedItems[i]["userId"]);
        }
        $http({
            method: 'POST',
            url: '/action/user/delete',
            data: ids
        }).success(function(results){
            //刷新列表
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        });
    };
}

function UserInsertCtrl($scope, $modalInstance, $http, grid){
    $scope.ok = function () {
        $http({
            method: 'POST',
            url: '/action/user/insert',
            data: $scope.user
        }).success(function(results){
            //刷新列表
            grid.getPagedDataAsync(grid.pagingOptions.pageSize, grid.pagingOptions.currentPage);
            $modalInstance.close();
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}

function UserUpdateCtrl($scope, $modalInstance, $http, grid){

    $http({
        method: 'POST',
        url: '/action/user/query',
        data: {userId: grid.gridOptions.selectedItems[0].userId}
    }).success(function(results){
        $scope.user = {};
        for(var key in results[0]){
            $scope.user[key] = results[0][key];
        }
    });

    $scope.ok = function () {
        $http({
            method: 'POST',
            url: '/action/user/update',
            data: $scope.user
        }).success(function(results){
            //刷新列表
            grid.getPagedDataAsync(grid.pagingOptions.pageSize, grid.pagingOptions.currentPage);
            $modalInstance.close();
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}