/* 
* @Author: chenhao
* @Date:   2015-06-09 15:14:38
* @Last Modified by:   chenhao
* @Last Modified time: 2015-07-02 10:14:24
*/

var user = {
    userId : "",    //用户编号
    userName : "",  //用户名
    password : "",  //密码
    email: "",      //邮箱
    query: "SELECT * FROM user WHERE 1=1 ",
    insert: "INSERT INTO user SET ",
    delete: "DELETE FROM user WHERE userId in (?)",
}

module.exports = user;  