/* 
* @Author: chenhao
* @Date:   2015-06-09 15:14:38
* @Last Modified by:   chenhao
* @Last Modified time: 2015-06-17 11:22:35
*/

var menu = {
    menuId : "",    //菜单编号
    menuName: "",   //菜单名称
    parentId: "",   //父级菜单编号
    level: "",      //菜单级别
    menuIcon : "",  //菜单图标   
    query: "SELECT t1.* FROM menu t1, roleGroup t2, userGroup t3 WHERE 1=1 and t1.menuId = t2.menuId and t2.roleId = t3.roleId "
}

module.exports = menu;