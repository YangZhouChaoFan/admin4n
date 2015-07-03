/* 
* @Author: chenhao
* @Date:   2015-07-02 14:48:55
* @Last Modified by:   chenhao
* @Last Modified time: 2015-07-03 13:57:18
*/

'use strict';

function RoleCtrl($scope, $http, $modal){
    console.log("加载角色管理...");

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
            url: '/action/role/query'
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
            {field:'roleId', displayName:'角色编码'}, 
            {field:'roleName', displayName:'角色名称'}
        ]
    };

    $scope.insert = function(){
        $modal.open({
            templateUrl: "/templates/role/roleModal.html",
            controller: 'RoleInsertCtrl',
            resolve: {
                grid: function(){ return $scope; }
            }
        });
    };

    $scope.update = function(){
        var selectedItems = $scope.gridOptions.selectedItems;
        if(selectedItems.length != 1){
            alert("请选择一条记录");
            return;
        }
        $modal.open({
            templateUrl: "/templates/role/roleModal.html",
            controller: 'RoleUpdateCtrl',
            resolve:{
                grid: function(){ return $scope; }
            }
        });
    };

    $scope.delete = function(){
        var selectedItems = $scope.gridOptions.selectedItems;
        if(selectedItems.length == 0){
            alert("请至少选择一条记录");
            return;
        }
        var selectedItems = $scope.gridOptions.selectedItems;
        var ids = [];
        for(var i = 0; i < selectedItems.length; i++){
            ids.push(selectedItems[i]["roleId"]);
        }
        $http({
            method: 'POST',
            url: '/action/role/delete',
            data: ids
        }).success(function(results){
            //刷新列表
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        });
    };
}

function RoleInsertCtrl($scope, $modalInstance, $http, grid){
    $scope.ok = function () {
        $http({
            method: 'POST',
            url: '/action/role/insert',
            data: $scope.role
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

function RoleUpdateCtrl($scope, $modalInstance, $http, grid){

    $http({
        method: 'POST',
        url: '/action/role/query',
        data: {roleId: grid.gridOptions.selectedItems[0].roleId}
    }).success(function(results){
        $scope.role = {};
        for(var key in results[0]){
            $scope.role[key] = results[0][key];
        }
    });

    $scope.ok = function () {
        $http({
            method: 'POST',
            url: '/action/role/update',
            data: $scope.role
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