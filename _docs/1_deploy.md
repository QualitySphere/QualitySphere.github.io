---
title: 安装部署
category: QSphere
order: 15
---

### v2.x

#### 安装/升级

1. 下载 [qsctl](https://gitee.com/QualitySphere/qsphere-deploy/raw/v2/qsctl)
   ```bash
   mkdir qsphere
   cd qsphere
   curl https://gitee.com/QualitySphere/qsphere-deploy/raw/v2/qsctl -o qsctl
   chmod +x ./qsctl
   ```
2. 配置
   ```bash
   ./qsctl config
   ```
3. 安装部署
   ```bash
   ./qsctl start
   ```
4. 升级
   ```bash
   ./qsctl upgrade
   ```

#### 配置说明

变量名 | 说明 | 默认值
---- | ---- | ----
DB_IMG | QSphere DB 容器镜像 | postgres:10
DB_VOL | QSphere DB 数据目录 | ./qsphere-db/data
PG_NAME | QSphere DB 数据库名 | qsphere
PG_HOST | QSphere DB 主机名 | qsphere-db
PG_PORT | QSphere DB 端口 | 5432
PG_USER | QSphere DB 用户名 | postgres
PG_PASS | QSphere DB 密码 | password
SVC_IMG | QSphere Service 容器镜像 | bxwill/qsphere:svc-latest
BOARD_IMG | QSphere Board 容器镜像 | bxwill/qsphere:board-latest
UI_IMG | QSphere UI 容器镜像 | bxwill/qsphere:ui-latest
UI_PORT | QSphere UI 服务端口 | 80
LOG_DEBUG | Debug 日志模式 | false
AUTO_SYNC | 自动同步数据开关 | true

### v1.x

#### 安装/升级

1. 下载 [配置文件](https://gitee.com/QualitySphere/qsphere-deploy/raw/v1/config)
2. 下载 [安装脚本](https://gitee.com/QualitySphere/qsphere-deploy/raw/v1/qsphere-deploy.sh)
3. 编辑配置文件，也可以跳过该步骤
4. 执行 `./qsphere-deploy.sh config` 进行自动化在线安装/升级部署

#### 配置文件说明

KEY | VALUE
---- | ----
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
