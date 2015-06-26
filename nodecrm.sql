# Host: 127.0.0.1  (Version: 5.6.21-log)
# Date: 2015-06-26 10:03:37
# Generator: MySQL-Front 5.3  (Build 1.27)

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE */;
/*!40101 SET SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES */;
/*!40103 SET SQL_NOTES='ON' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;

#
# Source for table "menu"
#

DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `menuId` int(11) NOT NULL AUTO_INCREMENT COMMENT '菜单编号',
  `menuName` varchar(255) DEFAULT NULL COMMENT '菜单名称',
  `parentId` int(11) DEFAULT NULL COMMENT '父级菜单编号',
  `path` varchar(255) DEFAULT NULL COMMENT '页面路径',
  `level` varchar(255) DEFAULT NULL COMMENT '菜单顺序',
  `menuIcon` varchar(255) DEFAULT NULL COMMENT '菜单图标',
  PRIMARY KEY (`menuId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='菜单属性表';

#
# Data for table "menu"
#

INSERT INTO `menu` VALUES (1,'首页',0,'#/','1','fa-home'),(2,'系统设置',0,'javascript:;','2','fa-cogs'),(3,'用户管理',2,'#/user','1','fa-user'),(4,'角色管理',2,'#/role','2','fa-group'),(5,'菜单管理',2,'#/menu','3','fa-list-alt'),(6,'系统日志',2,'#/sysLog','4','fa-info');

#
# Source for table "role"
#

DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `roleId` int(11) NOT NULL AUTO_INCREMENT COMMENT '角色编号',
  `roleName` varchar(255) DEFAULT NULL COMMENT '角色名称',
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='角色属性表';

#
# Data for table "role"
#

INSERT INTO `role` VALUES (1,'超级管理员');

#
# Source for table "rolegroup"
#

DROP TABLE IF EXISTS `rolegroup`;
CREATE TABLE `rolegroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `roleId` varchar(255) DEFAULT NULL COMMENT '角色编号',
  `menuId` varchar(255) DEFAULT NULL COMMENT '菜单编号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='角色菜单关系表';

#
# Data for table "rolegroup"
#

INSERT INTO `rolegroup` VALUES (1,'1','1'),(2,'1','2'),(3,'1','3'),(4,'1','4'),(5,'1','5'),(6,'1','6');

#
# Source for table "user"
#

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户编号',
  `userName` varchar(255) DEFAULT NULL COMMENT '用户名称',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='用户属性表';

#
# Data for table "user"
#

INSERT INTO `user` VALUES (1,'陈浩','123456','chenhao@node.com'),(2,'田伟','123456','tianwei@node.com'),(3,'陈晨','123456','chenchen@node.com'),(4,'陈浩然','123456','chenhaoran@node.com');

#
# Source for table "usergroup"
#

DROP TABLE IF EXISTS `usergroup`;
CREATE TABLE `usergroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `roleId` varchar(255) DEFAULT NULL COMMENT '角色编号',
  `userId` varchar(255) DEFAULT NULL COMMENT '用户编号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='用户角色关系表';

#
# Data for table "usergroup"
#

INSERT INTO `usergroup` VALUES (1,'1','1');

/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
