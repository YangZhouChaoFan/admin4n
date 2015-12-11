/* 
* @Author: chenhao
* @Date:   2015-07-02 14:48:55
* @Last Modified by:   chenhao
* @Last Modified time: 2015-07-06 12:14:20
*/

'use strict';

/**
 * 角色控制
 * @param {[type]} $scope [description]
 * @param {[type]} $http  [description]
 * @param {[type]} $modal [description]
 */
function RoleCtrl($scope, $http, $modal){
    console.log("加载角色管理...");

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

    //新增
    $scope.insert = function(){
        $modal.open({
            templateUrl: "/templates/role/roleModal.html",
            controller: 'RoleInsertCtrl',
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
            templateUrl: "/templates/role/roleModal.html",
            controller: 'RoleUpdateCtrl',
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

    //角色设置
    $scope.menuSetting = function(){
        var selectedItems = $scope.gridOptions.selectedItems;
        if(selectedItems.length != 1){
            alert("请选择一条记录");
            return;
        }
        $modal.open({
            templateUrl: "/templates/role/menuSetting.html",
            controller: 'menuSettingCtrl',
            resolve:{
                grid: function(){ return $scope; }
            }
        });
    };
}

/**
 * 角色新增控制
 * @param {[type]} $scope         [description]
 * @param {[type]} $modalInstance [description]
 * @param {[type]} $http          [description]
 * @param {[type]} grid           [description]
 */
function RoleInsertCtrl($scope, $modalInstance, $http, grid){
	$scope.role = {};
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

/**
 * 角色更新控制
 * @param {[type]} $scope         [description]
 * @param {[type]} $modalInstance [description]
 * @param {[type]} $http          [description]
 * @param {[type]} grid           [description]
 */
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

/**
 * 菜单设置控制
 * @param  {[type]} $scope         [description]
 * @param  {[type]} $modalInstance [description]
 * @param  {[type]} $http          [description]
 * @param  {[type]} grid           [description]
 * @param  {[type]} $compile       [description]
 * @return {[type]}                [description]
 */
function menuSettingCtrl($scope, $modalInstance, $http, grid, $compile){

    /**
     * 初始化
     * @type {Object}
     */
    $scope.menu = {};

    $scope.$watch('menu', function (newVal, oldVal) {
        var flag = true;
        for(var key in $scope.menu){
             if(!$scope.menu[key]){
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
        for(var key in $scope.menu){
            $scope.menu[key] = !$scope.all;
        }
    }
    
    $http({
        method: 'POST',
        url: '/action/menu/query',
    }).success(function(results){
        var html = getMenuHtml(results);
        var template = angular.element(html);
        var element = $compile(template)($scope);
        angular.element(".modal-body .container").append(element);
        getRoleMenu();
    });

    //获取角色html
    function getMenuHtml(results){
        var html = "";
        for(var i = 0; i < results.length; i += 2){
            html += "<div class='row'>";
            if(i == results.length - 1){
                $scope.menu[results[i].menuId] = false;
                html += "<div class='col-md-3'>";
                html += "<input id='menu" + i + "' type='checkbox' ng-checked='menu." + results[i].menuId + "' ng-model='menu." + results[i].menuId + "'>";
                html += "<label for='menu" + i + "' style='cursor: pointer; margin-left: 5px;'>" + results[i].menuName + "</label>";
                html += "</div>";
            }else{
                $scope.menu[results[i].menuId] = false;
                $scope.menu[results[i + 1].menuId] = false;
                html += "<div class='col-md-3'>";
                html += "<input id='menu" + i + "' type='checkbox' ng-checked='menu." + results[i].menuId + "' ng-model='menu." + results[i].menuId + "'>";
                html += "<label for='menu" + i + "' style='cursor: pointer; margin-left: 5px;'>" + results[i].menuName + "</label>";
                html += "</div>";
                html += "<div class='col-md-3'>";
                html += "<input id='menu" + (i + 1) + "' type='checkbox' ng-checked='menu." + results[i + 1].menuId + "' ng-model='menu." + results[i + 1].menuId + "'>";
                html += "<label for='menu" + (i + 1) + "' style='cursor: pointer; margin-left: 5px;'>" + results[(i + 1)].menuName + "</label>";
                html += "</div>";
            }
            html += "</div>";
        }
        return html;
    }

    //获取用户角色
    function getRoleMenu(){
            $http({
            method: 'POST',
            url: '/action/menu/queryByRoleId',
            data: {roleId: grid.gridOptions.selectedItems[0].roleId}
        }).success(function(results){
            for(var i = 0; i < results.length; i++){
                $scope.menu[results[i].menuId] = true;
            }
        });
    }

    $scope.ok = function () {
        $http({
            method: 'POST',
            url: '/action/menu/updateByRoleId',
            data: {menu: $scope.menu, roleId: grid.gridOptions.selectedItems[0].roleId}
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