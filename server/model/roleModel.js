/* 
* @Author: chenhao
* @Date:   2015-07-03 13:48:37
* @Last Modified by:   chenhao
* @Last Modified time: 2015-07-03 13:50:24
*/

'use strict';
var role = {
    roleId : "",    //角色编号
    roleName : "",  //角色名
    query: "SELECT * FROM role WHERE 1=1 ",
    insert: "INSERT INTO role SET ",
    update: "UPDATE role SET ",
    delete: "DELETE FROM role WHERE roleId in ",
    pk: "roleId"
}

module.exports = role;