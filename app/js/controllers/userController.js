/* 
* @Author: chenhao
* @Date:   2015-07-01 11:23:48
* @Last Modified by:   chenhao
* @Last Modified time: 2015-07-06 12:14:14
*/

'use strict';

/**
 * 用户控制
 * @param {[type]} $scope [description]
 * @param {[type]} $http  [description]
 * @param {[type]} $modal [description]
 */
function UserCtrl ($scope, $http, $modal) {
    console.log("加载用户管理...");

    /**
     * 配置ng-grid
     * @type {Object}
     */
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

    //新增
    $scope.insert = function(){
        $modal.open({
            templateUrl: "/templates/user/userModal.html",
            controller: 'UserInsertCtrl',
            resolve: {
                grid: function(){ return $scope; }
            }
        });
    };

    //更新
    $scope.update = function(){
        var selectedItems = $scope.gridOptions.selectedItems;
        if(selectedItems.length != 1){
            alert("请选择一条记录");
            return;
        }
        $modal.open({
            templateUrl: "/templates/user/userModal.html",
            controller: 'UserUpdateCtrl',
            resolve:{
                grid: function(){ return $scope; }
            }
        });
    };

    //删除
    $scope.delete = function(){
        var selectedItems = $scope.gridOptions.selectedItems;
        if(selectedItems.length == 0){
            alert("请至少选择一条记录");
            return;
        }
        if(!confirm("删除是不可恢复的，你确认要删除吗？")){
            return;
        }
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

    //角色设置
    $scope.roleSetting = function(){
        var selectedItems = $scope.gridOptions.selectedItems;
        if(selectedItems.length != 1){
            alert("请选择一条记录");
            return;
        }
        $modal.open({
            templateUrl: "/templates/user/roleSetting.html",
            controller: 'roleSettingCtrl',
            resolve:{
                grid: function(){ return $scope; }
            }
        });
    };

}

/**
 * 用户新增控制
 * @param {[type]} $scope         [description]
 * @param {[type]} $modalInstance [description]
 * @param {[type]} $http          [description]
 * @param {[type]} grid           [description]
 */
function UserInsertCtrl($scope, $modalInstance, $http, grid){
	$scope.user = {};
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

/**
 * 用户更新控制
 * @param {[type]} $scope         [description]
 * @param {[type]} $modalInstance [description]
 * @param {[type]} $http          [description]
 * @param {[type]} grid           [description]
 */
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

/**
 * 角色设置控制
 * @param  {[type]} $scope         [description]
 * @param  {[type]} $modalInstance [description]
 * @param  {[type]} $http          [description]
 * @param  {[type]} grid           [description]
 * @param  {[type]} $compile       [description]
 * @return {[type]}                [description]
 */
function roleSettingCtrl($scope, $modalInstance, $http, grid, $compile){

    /**
     * 初始化
     * @type {Object}
     */
    $scope.role = {};

    $scope.$watch('role', function (newVal, oldVal) {
        var flag = true;
        for(var key in $scope.role){
             if(!$scope.role[key]){
                flag = false;
             }
        }
        if(flag){
            $scope.all = true;
        }else{
            $scope.all = false;
        }
    }, true);

    $scope.selectAll = function(){
        for(var key in $scope.role){
            $scope.role[key] = !$scope.all;
        }
    }
    
    $http({
        method: 'POST',
        url: '/action/role/query',
    }).success(function(results){
        var html = getRoleHtml(results);
        var template = angular.element(html);
        var element = $compile(template)($scope);
        angular.element(".modal-body .container").append(element);
        getUserRole();
    });

    //获取角色html
    function getRoleHtml(results){
        var html = "";
        for(var i = 0; i < results.length; i += 2){
            html += "<div class='row'>";
            if(i == results.length - 1){
                $scope.role[results[i].roleId] = false;
                html += "<div class='col-md-3'>";
                html += "<input id='role" + i + "' type='checkbox' ng-checked='role." + results[i].roleId + "' ng-model='role." + results[i].roleId + "'>";
                html += "<label for='role" + i + "' style='cursor: pointer; margin-left: 5px;'>" + results[i].roleName + "</label>";
                html += "</div>";
            }else{
                $scope.role[results[i].roleId] = false;
                $scope.role[results[i + 1].roleId] = false;
                html += "<div class='col-md-3'>";
                html += "<input id='role" + i + "' type='checkbox' ng-checked='role." + results[i].roleId + "' ng-model='role." + results[i].roleId + "'>";
                html += "<label for='role" + i + "' style='cursor: pointer; margin-left: 5px;'>" + results[i].roleName + "</label>";
                html += "</div>";
                html += "<div class='col-md-3'>";
                html += "<input id='role" + (i + 1) + "' type='checkbox' ng-checked='role." + results[i + 1].roleId + "' ng-model='role." + results[i + 1].roleId + "'>";
                html += "<label for='role" + (i + 1) + "' style='cursor: pointer; margin-left: 5px;'>" + results[(i + 1)].roleName + "</label>";
                html += "</div>";
            }
            html += "</div>";
        }
        return html;
    }

    //获取用户角色
    function getUserRole(){
            $http({
            method: 'POST',
            url: '/action/role/queryByUserId',
            data: {userId: grid.gridOptions.selectedItems[0].userId}
        }).success(function(results){
            for(var i = 0; i < results.length; i++){
                $scope.role[results[i].roleId] = true;
            }
        });
    }

    $scope.ok = function () {
        $http({
            method: 'POST',
            url: '/action/role/updateByUserId',
            data: {role: $scope.role, userId: grid.gridOptions.selectedItems[0].userId}
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