/* 
* @Author: chenhao
* @Date:   2015-06-17 16:07:19
* @Last Modified by:   chenhao
* @Last Modified time: 2015-06-17 16:10:40
*/

'use strict';
exports.getMenuTree = function(a, idStr, pidStr, chindrenStr){
    var r = [], hash = {}, id = idStr, pid = pidStr, children = chindrenStr, i = 0, j = 0, len = a.length;
    for(; i < len; i++){
        hash[a[i][id]] = a[i];
    }
    for(; j < len; j++){
        var aVal = a[j], hashVP = hash[aVal[pid]];
        if(hashVP){
            !hashVP[children] && (hashVP[children] = []);
            hashVP[children].push(aVal);
        }else{
            r.push(aVal);
        }
    }
    return r;
}

