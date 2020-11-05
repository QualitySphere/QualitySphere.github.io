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
- 联系我们在 [Gitter](https://gitter.im/allure-framework/allure-core) 上的社区，我们也有 [Russian-speaking room](https://gitter.im/allure-framework/allure-ru)。
- 在 [Stack Overflow](https://stackoverflow.com/questions/ask?tags=allure) 或是 [Stack Overflow in Russian](https://ru.stackoverflow.com/questions/ask?tags=allure) 提问
- 在 [GitHub issues](https://github.com/allure-framework/allure2/issues/new?) 给我们提问

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

> **注意**：命令行应用程序需要 Java 运行环境的支持

> **提示**：老版本(⇐2.8.0) 可从 [bintray](https://bintray.com/qameta/generic/allure2) 获取

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

虽然这样生成的报告只包含从 xml 数据中提取的最少信息，这些信息几乎缺乏所有高级的 Allure 特性，但可以让您那些已经执行的测试获得良好的可视化展示。

![Report generated on xml data](https://docs.qameta.io/allure/images/get_started_report_overview.png)

<div id="_report_structure"></div>

## 3. 报告结构

当你知道报告长什么样子，就可能想要获得更多数据丰富的报告。为此你得考虑为你的测试框架使用一个 Allure 适配器，它将被允许收集更多的信息。可以到集成章节，了解关于测试框架集成的更多信息。

典型的报告由“概览”选项卡、导航栏、几个针对不同类型的测试数据表示的选项卡以及针对每个单独测试的测试用例页面组成。每个 Allure 报告都有一个类似于树的数据结构支持，它表示一个测试执行过程。不同的选项卡允许在原始数据结构的视图之间切换，从而提供不同的透视图。注意所有类似树的表示，包括行为、类别、xUnit 和包，它们都支持过滤和排序。

<div id="_overview_page"></div>

#### 3.1. 概览

每个报告的入口点都是带有仪表板和小控件的“概览”页面:
![Overview](https://docs.qameta.io/allure/images/tab_overview.png)

概览页面展现了一些默认小控件，来表示项目和测试环境的基本特征。

- 统计数字 - 整体报告统计数字。
- 执行 - 如果此报告表示几次测试执行，这里将显示每次执行的统计数据。
- 行为 - 根据故事和特性聚合的结果信息。
- 执行器 - 用于运行测试的测试执行器的信息。
- 历史趋势 - 如果测试积累了一些历史数据，它的趋势将被计算并显示在图表中。
- 环境 - 关于测试环境的信息(参见[如何定义环境](#_environment))。

主页小控件是可拖动并且可配置的。此外，Allure 提供自身的插件系统，所以它可以提供完全不同的控件布局。

导航栏可折叠，使您能够切换到几种基本的结果概览模式。

<div id="_categories"></div>

#### 3.2. 类别

类别选项卡提供了创建[自定义缺陷分类](#_categories_2)的方法，以应用于测试结果。

![Categories](https://docs.qameta.io/allure/images/tab_categories.png)

<div id="_suites"></div>

#### 3.3. 测试集

在测试集选项卡上，可以按套件和类分组展示已执行测试。

![Suites](https://docs.qameta.io/allure/images/tab_suites.png)

<div id="_graphs"></div>

#### 3.4. 图表

图表页上可以查看从测试数据收集的不同统计信息: 状态分解或严重性和持续时间图。

![Graphs](https://docs.qameta.io/allure/images/tab_graphs.png)

<div id="_timeline"></div>

#### 3.5. 时间轴

时间轴选项卡能够回顾可视化测试执行，Allure 适配器收集精确的测试时间，并且在这个选项卡上，它们根据顺序或并行时间结构进行排列。

![Timeline](https://docs.qameta.io/allure/images/tab_timeline.png)

<div id="_behaviors"></div>

#### 3.6. 行为

支持行为驱动测试的展示，该选项卡根据史诗、特性和故事标签对测试结果进行分组。

![Behaviors](https://docs.qameta.io/allure/images/tab_behaviors.png)

<div id="_packages"></div>

#### 3.7. 包

包选项卡根据不同的包来分组表示测试结果的树状布局。

![Packages](https://docs.qameta.io/allure/images/tab_packages.png)

<div id="_test_case_page"></div>

#### 3.8. 测试用例

在概览页，可以单击单个测试，跳转到测试用例页面。这个页面通常包含许多与测试用例相关的个人数据: 测试期间执行的步骤、耗时、附件、分类标签、描述和链接。

![Test result page](https://docs.qameta.io/allure/images/testcase.png)

<div id="_features"></div>

## 4. 特性

这一节介绍 Allure 的主要特点。例如，您可以根据故事或特性对测试进行分组，添加附件，并通过一组自定义的步骤分发断言。由于 Java 测试框架支持所有特性，因此我们在这里只提供 Java 示例。有关特定适配器如何与您选择的测试框架一起工作的详细信息，请参考适配器指南。

<div id="_flaky_tests"></div>

#### 4.1. Flaky 测试

在实际场景中，不是所有的测试都很稳定，并且也不可能总是成功或总是失败。一个测试可能会开始“眨眼”，也就是说，它会在没有明显原因的情况下时不时的失败。您可以禁用这样的测试，这是一个简单的解决方案。但是，如果您不想这样做呢? 如果你想知道更多关于可能原因的细节，或者这个测试非常重要，即使是不靠谱的也能提供有用的信息? 你现在可以选择用特殊的方式标记这些测试，这样结果报告就会清楚地显示它们是不稳定的:

```java
@Flaky
public void aTestWhichFailsFromTimeToTime {
     ...
}
```

如果测试失败，你会在报告中看到:
![被标记为 flaky 失败的测试](https://docs.qameta.io/allure/images/flaky_failed.png)

> **提示**：您也可以将整个测试类标记为 flaky。

<div id="_environment"></div>

#### 4.2. 环境

要向环境小控件添加信息，只需在生成报告之前，在 allure-results 目录中创建 environment.properties （或 environment.xml）文件。

##### environment.properties

```text
Browser=Chrome
Browser.Version=63.0
Stand=Production
```

##### environment.xml

```xml
<environment>
    <parameter>
        <key>Browser</key>
        <value>Chrome</value>
    </parameter>
    <parameter>
        <key>Browser.Version</key>
        <value>63.0</value>
    </parameter>
    <parameter>
        <key>Stand</key>
        <value>Production</value>
    </parameter>
</environment>
```

<div id="_categories_2"></div>

#### 4.3. 类别

默认存在两类缺陷:
- 产品缺陷（测试失败）
- 测试缺陷（测试中断）

要创建自定义的缺陷分类，可在生成报告之前，在 allure-results 目录中添加 categories.json 文件。

##### categories.json

```json
[
  {
    "name": "Ignored tests",    # 1
    "matchedStatuses": ["skipped"]    # 2
  },
  {
    "name": "Infrastructure problems",
    "matchedStatuses": ["broken", "failed"],
    "messageRegex": ".*bye-bye.*"     # 3
  },
  {
    "name": "Outdated tests",
    "matchedStatuses": ["broken"],
    "traceRegex": ".*FileNotFoundException.*"     # 4
  },
  {
    "name": "Product defects",
    "matchedStatuses": ["failed"]
  },
  {
    "name": "Test defects",
    "matchedStatuses": ["broken"]
  }
]
```

1. （必须）类别名称
2. （可选）测试状态列表。默认为 `["failed", "broken", "passed", "skipped", "unknown"]`
3. （可选）用正则表达式检查测试错误消息。默认为 `".*"`
4. （可选）用正则表达式检查堆栈跟踪。默认为 `".*"`

如果测试结果的状态在列表中，并且错误消息和堆栈跟踪都与正则匹配，那么它就属于这个类别。

> **提示**：如果用 [allure-maven](#_maven_5) 插件或者 [allure-gradle](#_gradle_4) 插件可以把 categories.json 文件可以存放在测试资源目录中。

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