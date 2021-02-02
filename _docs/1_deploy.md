---
title: 安装部署
category: QSphere
order: 15
---

### 安装/升级

1. 下载 [配置文件](https://gitee.com/QualitySphere/qsphere-deploy/raw/master/config)
2. 下载 [安装脚本](https://gitee.com/QualitySphere/qsphere-deploy/raw/master/qsphere-deploy.sh)
3. 编辑配置文件，也可以跳过该步骤
4. 执行 `./qsphere-deploy.sh config` 进行自动化在线安装/升级部署

### 配置文件说明

KEY | VALUE
-- | --
IMG_PG | PostgresQL 容器镜像 
IMG_SVC | QSphere SVC 容器镜像 
IMG_DASHBOARD | QSphere Dashboard 容器镜像 
IMG_UI | QSphere UI 容器镜像 
PG_SERVER | 数据库服务器
PG_PORT | 数据库端口
PG_DB | 数据库名称
PG_USER | 数据库账户
PG_PASSWORD | 数据库密码
PG_VOL | 宿主机上挂载数据库数据的目录
SVC_NAME | QSphere SVC 服务名称
SVC_PORT | QSphere SVC 服务映射宿主机端口
DASHBOARD_NAME| QSphere Dashboard 服务名称
DASHBOARD_PORT| QSphere Dashboard 服务射宿主机端口
UI_NAME| QSphere UI 服务名称
UI_PORT| QSphere UI 服务射宿主机端口
