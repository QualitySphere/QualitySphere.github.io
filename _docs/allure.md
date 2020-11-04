---
title: Allure Framework
layout: allure
category: DOC
---

**Allure 框架是一个既灵活又轻量的多语言测试报告工具，它不仅以简洁的 web 报表形式展示了所测试的内容，而且允许参与开发过程的每个人从每天执行的测试中提取最大限度的有用信息。**

站在研发/质量的视角，Allure 报告缩短了常见缺陷的生命周期：测试用例的失败得以通过产品缺陷和测试脚本缺陷来区分，再通过日志、步骤、装置、附件、时间、历史以及与测试管理系统和缺陷追踪系统集成，使得相应的开发人员和测试人员可以掌握所有信息。

而从管理视角来看，Allure 提供了一个清晰的“大图”来说明覆盖了哪些特性，缺陷集中在哪里，执行的时间轴是怎样的，以及许多其他实用信息。Allure 具有模块化和可扩展性，从而保证了您始终能够对某些东西进行微调，使其更适合您。

<div id='_about'></div>

## 1. 关于

<div id='_copyright'></div>

#### 1.1. 版权

Allure 参考指南以 HTML 文档的形式提供。最新版本可在 [https://docs.qameta.io/allure/](https://docs.qameta.io/allure/) 获取

本文档的副本可供自己使用或分发给他人，但不得收取任何费用，并且，无论以印刷或电子方式，每个副本均包含此版权声明。

<div id='_get_help'></div>

#### 1.2. 获得帮助

可以从以下几处得到支持：
- 联系我们再 [Gitter](https://gitter.im/allure-framework/allure-core) 上的社区，我们也有 [Russian-speaking room](https://gitter.im/allure-framework/allure-ru)。
- 在 [Stack Overflow](https://stackoverflow.com/questions/ask?tags=allure) 或是 [Stack Overflow in Russian](https://ru.stackoverflow.com/questions/ask?tags=allure) 提问
- 在 [GitHub issues](https://github.com/allure-framework/allure2/issues/new?) 给我们报告

<div id='_how_to_proceed'></div>

#### 1.3. 如何开始

- 打开 [demo version](http://demo.qameta.io/allure/latest/)，看看 Allure 报告的样子。
- [开始](#_get_started)为现有项目构建报告。
- 了解更多关于[报表结构和特性](#_report_structure)的信息。
- 将 Allure 集成到您最喜欢的测试框架中。支持的框架按语言分组: [Java](#_java)、[Python](#_python)、[JavaScript](#_javascript)、[Ruby](_ruby)、[Groovy](#_groovy)、[PHP](#_php)、[.net](__net) 和 [Scala](#_scale)

<div id='_get_started'></div>

## 2. 开始

只需要几个简单步骤就可以生成你的第一份报告：
- 下载并安装 Allure 命令行应用套件到你的环境
- 定位测试执行数据，构建一份报告

<div id='_installing_a_commandline'></div>

#### 2.1. 安装

关于 Allure 安装目前所支持的几个方法：

##### 2.1.1. Linux

支持 Debian 源：
```bash
sudo apt-add-repository ppa:qameta/allure
sudo apt-get update 
sudo apt-get install allure
```

##### 2.1.2. Mac OS X

MacOS 可以通过 [Homebrew](https://brew.sh/) 自动化安装
```bash
brew install allure
```

##### 2.1.3. Windows

在 Windows 上可以使用 [Scoop](http://scoop.sh/) 命令行安装器来安装 Allure。

下载并安装 Scoop 然后在 Powershell 中执行：
```powershell
scoop install allure
```

此外，Scoop 还可以更新 Allure，在 Scoop 的安装目录下执行：
```powershell
\bin\checkver.ps1 allure -u
```

该命令会检查 Allure 的新版本，并且更新其清单文件。然后执行：
```powershell
scoop update allure
```

这将完成 Allure 的升级。 ([文档](https://github.com/lukesampson/scoop/wiki/App-Manifest-Autoupdate))

##### 2.1.4. 手动安装

1. 从 [Maven Central](http://repo.maven.apache.org/maven2/io/qameta/allure/allure-commandline/) 下载最新版本的 zip 归档文件。
2. 解压到 allure-commandline 目录。
3. 进入 bin 目录。
4. 在 Windows 上使用 allure.bat，在其他 Unix 平台上使用 allure。
5. 添加 allure 到系统 PATH。

> 注意：命令行应用程序需要 Java 运行环境的支持
> 信息：老版本(⇐2.8.0) 可从 [bintray](https://bintray.com/qameta/generic/allure2) 获取

##### 2.1.5. 检查安装结果

在终端执行 `allure --version` 确认 allure 已成功安装：
```text
$ allure --version
2.0.1
```

<div id='_test_execution'></div>

#### 2.2. 执行测试

如果您正在使用 IDE 在本地运行测试，它可能会在构建文件中忽略指定的 Allure 配置（就像 IntelliJ IDEA 那样）,可以使用 allure.properties 文件去配置 Allure。查看 [configuration 章节](#_configuration) 以获得更多信息。

在生成报告之前，您需要运行测试以获取一些基本的测试报告数据。通常它可能是一个 junit-style 的 xml 报告，这几乎是所有流行的测试框架支持的报告格式。比如，假设您有一个由 surefire maven 插件自动生成的测试报告存储在 `target/surefire-reports` 中:

![Surefire report folder](https://docs.qameta.io/allure/images/get_started_surefire-report.png)

<div id='_report_generation'></div>

#### 2.3. 生成报告

一条命令足以浏览 Allure 报告了：
```bash
allure serve /home/path/to/project/target/surefire-reports/
```

它以提供的路径中的数据，生成一个报告到临时目录中，然后创建一个本地 Jetty 服务器实例，加载生成的报告并在默认浏览器中打开它。它可以通过使用 **--profile** 选项，启用一些预先配置的 Allure 设置，**junit** 配置文件默认是启用的，您将在后面的[章节](#_commandline)中了解更多关于配置文件的信息。

This would produce a report with a minimum of information extracted from the xml data that will lack nearly all of the advanced allure features but will allow you to get a nice visual representation of executed tests.

虽然这样生成的报告只包含从 xml 数据中提取的最少信息，这些信息几乎缺乏所有高级的 Allure 特性，但可以让您那些已经执行的测试获得良好的可视化展示。

![Report generated on xml data](https://docs.qameta.io/allure/images/get_started_report_overview.png)

## 3. 

## 4. 

## 5. 

## 6. 

## 7. 

## 8. 

## 9. 

## 10.

## 11. 

## 12. 

## 13. 

## 14. 