---
title: Allure Framework
layout: allure
category: DOC
---

**Allure 框架是一个既灵活又轻量的多语言测试报告工具，它不仅以简洁的 web 报表形式展示了所测试的内容，而且允许参与开发过程的每个人从每天执行的测试中提取最大限度的有用信息。**

站在研发/质量的视角，Allure 报告缩短了常见缺陷的生命周期：测试用例的失败得以通过产品缺陷和测试脚本缺陷来区分，再通过日志、步骤、装置、附件、时间、历史以及与测试管理系统和缺陷追踪系统集成，使得相应的开发人员和测试人员可以掌握所有信息。

而从管理视角来看，Allure 提供了一个清晰的“大图”来说明覆盖了哪些特性，缺陷集中在哪里，执行的时间轴是怎样的，以及许多其他实用信息。Allure 具有模块化和可扩展性，从而保证了您始终能够对某些东西进行微调，使其更适合您。

----

## 1. 关于

#### 1.1. 版权

Allure 参考指南以 HTML 文档的形式提供。最新版本可在 [https://docs.qameta.io/allure/](https://docs.qameta.io/allure/) 获取

本文档的副本可供自己使用或分发给他人，但不得收取任何费用，并且，无论以印刷或电子方式，每个副本均包含此版权声明。

#### 1.2. 获得帮助

可以从以下几处得到支持：
- 联系我们在 [Gitter](https://gitter.im/allure-framework/allure-core) 上的社区，我们也有 [Russian-speaking room](https://gitter.im/allure-framework/allure-ru)。
- 在 [Stack Overflow](https://stackoverflow.com/questions/ask?tags=allure) 或是 [Stack Overflow in Russian](https://ru.stackoverflow.com/questions/ask?tags=allure) 提问
- 在 [GitHub issues](https://github.com/allure-framework/allure2/issues/new?) 给我们提问

#### 1.3. 如何开始

- 打开 [demo version](http://demo.qameta.io/allure/latest/)，看看 Allure 报告的样子。
- [开始](#2-开始)为现有项目构建报告。
- 了解更多关于[报表结构和特性](#3-报告结构)的信息。
- 将 Allure 集成到您最喜欢的测试框架中。支持的框架按语言分组: [Java](#5-java)、[Python](#6-python)、[JavaScript](#7-javascript)、[Ruby](8-ruby)、[Groovy](#9-groovy)、[PHP](#10-php)、[.net](11-net) 和 [Scala](#12-scala)

----

## 2. 开始

只需要几个简单步骤就可以生成你的第一份报告：
- 下载并安装 Allure 命令行应用套件到你的环境
- 定位测试执行数据，构建一份报告

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

#### 2.2. 执行测试

如果您正在使用 IDE 在本地运行测试，它可能会在构建文件中忽略指定的 Allure 配置（就像 IntelliJ IDEA 那样）,可以使用 allure.properties 文件去配置 Allure。查看 [配置章节](#_configuration) 以获得更多信息。

在生成报告之前，您需要运行测试以获取一些基本的测试报告数据。通常它可能是一个 junit-style 的 xml 报告，这几乎是所有流行的测试框架支持的报告格式。比如，假设您有一个由 surefire maven 插件自动生成的测试报告存储在 `target/surefire-reports` 中:

![Surefire report folder](https://docs.qameta.io/allure/images/get_started_surefire-report.png)

#### 2.3. 生成报告

一条命令足以浏览 Allure 报告了：
```bash
allure serve /home/path/to/project/target/surefire-reports/
```

它以提供的路径中的数据，生成一个报告到临时目录中，然后创建一个本地 Jetty 服务器实例，加载生成的报告并在默认浏览器中打开它。它可以通过使用 **--profile** 选项，启用一些预先配置的 Allure 设置，**junit** 配置文件默认是启用的，您将在后面的[章节](#_commandline)中了解更多关于配置文件的信息。

虽然这样生成的报告只包含从 xml 数据中提取的最少信息，这些信息几乎缺乏所有高级的 Allure 特性，但可以让您那些已经执行的测试获得良好的可视化展示。

![Report generated on xml data](https://docs.qameta.io/allure/images/get_started_report_overview.png)

----

## 3. 报告结构

当你知道报告长什么样子，就可能想要获得更多数据丰富的报告。为此你得考虑为你的测试框架使用一个 Allure 适配器，它将被允许收集更多的信息。可以到集成章节，了解关于测试框架集成的更多信息。

典型的报告由“概览”选项卡、导航栏、几个针对不同类型的测试数据表示的选项卡以及针对每个单独测试的测试用例页面组成。每个 Allure 报告都有一个类似于树的数据结构支持，它表示一个测试执行过程。不同的选项卡允许在原始数据结构的视图之间切换，从而提供不同的透视图。注意所有类似树的表示，包括行为、类别、xUnit 和包，它们都支持过滤和排序。

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

#### 3.2. 类别

类别选项卡提供了创建[自定义缺陷分类](#43-分类)的方法，以应用于测试结果。

![Categories](https://docs.qameta.io/allure/images/tab_categories.png)

#### 3.3. 测试集

在测试集选项卡上，可以按套件和类分组展示已执行测试。

![Suites](https://docs.qameta.io/allure/images/tab_suites.png)

#### 3.4. 图表

图表页上可以查看从测试数据收集的不同统计信息: 状态分解或严重性和持续时间图。

![Graphs](https://docs.qameta.io/allure/images/tab_graphs.png)

#### 3.5. 时间轴

时间轴选项卡能够回顾可视化测试执行，Allure 适配器收集精确的测试时间，并且在这个选项卡上，它们根据顺序或并行时间结构进行排列。

![Timeline](https://docs.qameta.io/allure/images/tab_timeline.png)

#### 3.6. 行为

支持行为驱动测试的展示，该选项卡根据史诗、特性和故事标签对测试结果进行分组。

![Behaviors](https://docs.qameta.io/allure/images/tab_behaviors.png)

#### 3.7. 软件包

软件包选项卡根据不同的软件包来分组表示测试结果的树状布局。

![Packages](https://docs.qameta.io/allure/images/tab_packages.png)

#### 3.8. 测试用例

在概览页，可以单击单个测试，跳转到测试用例页面。这个页面通常包含许多与测试用例相关的个人数据: 测试期间执行的步骤、耗时、附件、分类标签、描述和链接。

![Test result page](https://docs.qameta.io/allure/images/testcase.png)

----

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

*environment.properties*

```text
Browser=Chrome
Browser.Version=63.0
Stand=Production
```

*environment.xml*

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

#### 4.3. 分类

默认存在两类缺陷:
- 产品缺陷（测试失败）
- 测试缺陷（测试中断）

要创建自定义的缺陷分类，可在生成报告之前，在 allure-results 目录中添加 categories.json 文件。

*categories.json*

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

----

<div id="_java"></div>

## 5. Java

<div id="_junit_4"></div>

#### 5.1. jUnit 4

##### 5.1.1. 安装

`allure-junit4` 的最新可用版本：
![Allure JUnit4](https://img.shields.io/maven-central/v/io.qameta.allure/allure-junit4.svg)

**Maven**

增加以下内容到你的 **pom.xml**：

*pom.xml*
```xml
<properties>
    <aspectj.version>1.8.10</aspectj.version>
</properties>

<dependencies>
    <dependency>
        <groupId>io.qameta.allure</groupId>
        <artifactId>allure-junit4</artifactId>
        <version>LATEST_VERSION</version>
        <scope>test</scope>
    </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>2.20</version>
            <configuration>
                <testFailureIgnore>false</testFailureIgnore>
                <argLine>
                    -javaagent:"${settings.localRepository}/org/aspectj/aspectjweaver/${aspectj.version}/aspectjweaver-${aspectj.version}.jar"
                </argLine>
                <properties>
                    <property>
                        <name>listener</name>
                        <value>io.qameta.allure.junit4.AllureJunit4</value>
                    </property>
                </properties>
            </configuration>
            <dependencies>
                <dependency>
                    <groupId>org.aspectj</groupId>
                    <artifactId>aspectjweaver</artifactId>
                    <version>${aspectj.version}</version>
                </dependency>
            </dependencies>
        </plugin>
    </plugins>
</build>
...
```

然后像往常一样运行构建:
```bash
$ mvn clean test
```

**Gradle**

对于 Gradle 用户，可以利用 allure-gradle 插件来自动配置所有需要的依赖:

*build.gradle*
```groovy
buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath "io.qameta.allure:allure-gradle:2.3"
    }
}

plugins {
    id 'io.qameta.allure'
}

allure {
    version = '2.2.1'
    autoconfigure = true
    aspectjweaver = true
    allureJavaVersion = LATEST_VERSION
}
```

然后像往常一样运行构建:
```bash
$ ./gradlew clean test
```

Allure 的结果会输出到 **build/allure-results** 文件夹中。要想生成 html 报告并在 web 浏览器中自动打开它，运行以下命令:

```bash
$ ./gradlew allureServe build/allure-results
```

##### 5.1.2. 特性

Java 的装饰器可用来使用主要的 Allure 特性。

**DisplayName**

为了给任何测试方法添加一个人类可读的名称，使用 **@DisplayName** 装饰器:

```java
package my.company.tests;

import org.junit.Test;
import io.qameta.allure.junit4.DisplayName;

public class MyTests {

    @Test
    @DisplayName("Human-readable test name")
    public void testSomething() throws Exception {
        //...
    }

}
```

**Description**

类似地，您可以为每个测试方法添加详细的描述。要添加该描述，可使用 **@Description** 装饰器:

```java
package my.company.tests;

import org.junit.Test;
import io.qameta.allure.Description;

@Test
public class MyTests {

    @Test
    @Description("Some detailed test description")
    public void testSomething() throws Exception {
        ...
    }

}
```

**Steps**

测试场景由于步骤构成，步骤可以是任意操作。在不同的测试场景中都可以使用步骤。它们可以：被参数化、进行检查、具有嵌套步骤和创建附件。每一步都有一个名字。

为了在 Java 代码中定义步骤，需要使用 **@Step** 装饰器对各自的方法进行注释。如果未指定，则步骤名称等于装饰器名称。

请注意步骤的机制已经被修改了。现在它支持字段智能分析，在 Allure 1 中用户必须指定索引来引用他们想要注入到步骤中的那些参数值，而 Allure 2 使用了映射方法，这提供了通过名称来提取解析的能力。

假设你有以下实体：

```java
public class User {

     private String name;
     private String password;
     ...
}
```

您可以通过名称直接访问这些字段的值:

```java
import io.qameta.allure.Step;

...

@Step("Type {user.name} / {user.password}.")
public void loginWith(User user) {
     ...
}
```

由于友好的支持了**数组**和**集合**，因此您不再需要为您的自定义对象重写 **toString()**。

**Attachments**

在 Java 代码中只需要用一个简单的 **@Attachment** 装饰器，就可以添加附件，它将返回一个 **String** 或 **byte[]** 添加到报告中:

```java
import io.qameta.allure.Attachment;

...

@Attachment
public String performedActions(ActionSequence actionSequence) {
    return actionSequence.toString();
}

@Attachment(value = "Page screenshot", type = "image/png")
public byte[] saveScreenshot(byte[] screenShot) {
    return screenShot;
}
```

或者你也可以使用 Allure helper 方法

```java
import io.qameta.allure.Allure;

...

Allure.addAttachment("My attachment", "My attachment content");

Path content = Paths.get("path-to-my-attachment-contnet");
try (InputStream is = Files.newInputStream(content)) {
    Allure.addAttachemnt("My attachment", is);
}
```

> **提示**：如果用 **@Attachment** 装饰器返回类型与 **String** 或 **byte[]** 不同，会在返回值上调用 **toString()** 来获取附件内容。

您可以如上所示一般，使用 **@Attachment** 装饰器的 **type** 参数为每个附加文件指定精确的 MIME 类型。但实际上，完全没有必要为所有附加文件指定附件类型，Allure 在默认情况下会分析附件内容，并能自动确定附件类型。只不过在使用纯文本文件时，通常需要指定一下附件类型。

**Links**

您可以将您的测试链接到其他服务器资源上，如 TMS（测试管理系统）或缺陷追踪系统。

```java
import io.qameta.allure.Link;
import io.qameta.allure.Issue;
import io.qameta.allure.TmsLink;

@Link("https://example.org")
@Link(name = "allure", type = "mylink")
public void testSomething() {
     ...
}

@Issue("123")
@Issue("432")
public void testSomething() {
     ...
}

@TmsLink("test-1")
@TmsLink("test-2")
public void testSomething() {
     ...
}
```

为了指定链接样式，您可以使用以下格式的系统属性: `allure.link.my-link-type.pattern=https://example.org/custom/{}/path`，Allure 将用装饰器中指定的值替换 `{}`。例如:

```java
allure.link.mylink.pattern=https://example.org/mylink/{}
allure.link.issue.pattern=https://example.org/issue/{}
allure.link.tms.pattern=https://example.org/tms/{}
```

**Severity**

**@Severity** 装饰器会根据严重程度对测试方法进行优先级排序：

```java
package org.example.tests;

import org.junit.Test;
import io.qameta.allure.Severity;
import io.qameta.allure.SeverityLevel;

public class MyTest {

    @Test
    @Severity(SeverityLevel.CRITICAL)
    public void testSomething() throws Exception {
        // ...
    }

}
```

**Behaviours Mapping**

在一些研发方法中，测试是按特性和故事分类的。要添加这样的映射，你可以使用 `Epic`、`Feature` 和 `Stories` 装饰器:

```java
package org.example.tests;

import org.junit.Test;
import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import io.qameta.allure.Story;

@Epic("Allure examples")
@Feature("Junit 4 support")
public class MyTest {

    @Test
    @Story("Base support for bdd annotations")
    @Story("Advanced support for bdd annotations")
    public void testSomething() throws Exception {
        // ...
    }

}
```

<div id="_junit_5"></div>

#### 5.2. jUnit 5

##### 5.2.1. 安装

`allure-junit5` 最新版：![Allure JUnit5](https://img.shields.io/maven-central/v/io.qameta.allure/allure-junit5.svg)

`allure-maven` 最新版：![Allure Maven](https://img.shields.io/maven-central/v/io.qameta.allure/allure-maven.svg)

`allure-gradle` 最新版：![Allure Gradle](https://img.shields.io/maven-central/v/io.qameta.allure/allure-gradle.svg)

**Maven**

添加以下内容到你的 **pom.xml**：

*pom.xml*
```xml
<properties>
    <aspectj.version>1.8.10</aspectj.version>
</properties>

<dependencies>
        <dependency>
            <groupId>io.qameta.allure</groupId>
            <artifactId>allure-junit5</artifactId>
            <version>LATEST_VERSION</version>
            <scope>test</scope>
        </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>2.21</version>
                <configuration>
                <testFailureIgnore>false</testFailureIgnore>
                        <argLine>
                            -javaagent:"${settings.localRepository}/org/aspectj/aspectjweaver/${aspectj.version}/aspectjweaver-${aspectj.version}.jar"
                        </argLine>
                    <systemProperties>
                        <property>
                            <name>junit.jupiter.extensions.autodetection.enabled</name>
                            <value>true</value>
                        </property>
                    </systemProperties>
                </configuration>
                <dependencies>
                    <dependency>
                        <groupId>org.junit.platform</groupId>
                        <artifactId>junit-platform-surefire-provider</artifactId>
                        <version>1.2.0</version>
                    </dependency>
                    <dependency>
                        <groupId>org.aspectj</groupId>
                        <artifactId>aspectjweaver</artifactId>
                        <version>${aspectj.version}</version>
                    <dependency>
                </dependencies>
            </plugin>
            <plugin>
                <groupId>io.qameta.allure</groupId>
                <artifactId>allure-maven</artifactId>
                <version>LATEST_VERSION</version>
                <configuration>
                    <reportVersion>2.4.1</reportVersion>
                </configuration>
            </plugin>
    </plugins>
</build>
...
```

然后正常进行构建：

```bash
$ mvn clean test
```

**Gradle**

对于 Gradle 用户，可以使用 allure-gradle 插件，该插件会自动配置依赖：

*build.gradle*
```groovy
plugins {
    id 'io.qameta.allure' version '2.5' // Latest Plugin Version
    id 'java'
}

allure {
    autoconfigure = true
    version = '2.7.0'  // Latest Allure Version

    useJUnit5 {
        version = '2.7.0' // Latest Allure Version
    }

}

sourceCompatibility = 1.8

repositories {
    jcenter()
    mavenCentral()
}

dependencies {
    testImplementation(
            'org.junit.jupiter:junit-jupiter-api:5.2.0'
    )
    testRuntimeOnly(
            'org.junit.jupiter:junit-jupiter-engine:5.2.0'
    )
}

test {
    useJUnitPlatform()
}
```

然后正常构建：

```bash
$ ./gradlew clean test
```

在项目根目录下会生成 allure-results 目录，要生成 html 报告并且自动打开 web 浏览器浏览报告，只需要运行一下命令：
```bash
$ ./gradlew allureServe
```

##### 5.2.2. 特性

Java 装饰器可用来使用主要的 Allure 特性。

**DisplayName**

**@DisplayName** 装饰器已被移除。

**Description**

类似地，您可以为每个测试方法添加详细的描述。要添加该描述，可使用 `@Description` 装饰器:

```java
package my.company.tests;

import org.junit.Test;
import io.qameta.allure.Description;

@Test
public class MyTests {

    @Test
    @Description("Some detailed test description")
    public void testSomething() throws Exception {
        ...
    }

}
```

**Steps**

测试场景由于步骤构成，步骤可以是任意操作。在不同的测试场景中都可以使用步骤。它们可以：被参数化、进行检查、具有嵌套步骤和创建附件。每一步都有一个名字。

为了在 Java 代码中定义步骤，需要使用 `@Step` 装饰器对各自的方法进行注释。如果未指定，则步骤名称等于装饰器名称。

请注意步骤的机制已经被修改了。现在它支持字段智能分析，在 Allure 1 中用户必须指定索引来引用他们想要注入到步骤中的那些参数值，而 Allure 2 使用了映射方法，这提供了通过名称来提取解析的能力。

假设你有以下实体：

```java
public class User {

     private String name;
     private String password;
     ...
}
```

您可以通过名称直接访问这些字段的值：
```java
import io.qameta.allure.Step;

...

@Step("Type {user.name} / {user.password}.")
public void loginWith(User user) {
     ...
}
```

由于友好的支持了**数组**和**集合**，因此您不再需要为您的自定义对象重写 **toString()**。

**Attachments**

在 Java 代码中只需要用一个简单的 **@Attachment** 装饰器，就可以添加附件，它将返回一个 **String** 或 **byte[]** 添加到报告中:

```java
import io.qameta.allure.Attachment;

...

@Attachment
public String performedActions(ActionSequence actionSequence) {
    return actionSequence.toString();
}

@Attachment(value = "Page screenshot", type = "image/png")
public byte[] saveScreenshot(byte[] screenShot) {
    return screenShot;
}
```

或者你也可以使用 Allure helper 方法

```java
import io.qameta.allure.Allure;

...

Allure.addAttachment("My attachment", "My attachment content");

Path content = Paths.get("path-to-my-attachment-contnet");
try (InputStream is = Files.newInputStream(content)) {
    Allure.addAttachemnt("My attachment", is);
}
```

> **提示**：如果用 `@Attachment` 装饰器返回类型与 **String** 或 **byte[]** 不同，会在返回值上调用 **toString()** 来获取附件内容。

您可以如上所示一般，使用 `@Attachment` 装饰器的 **type** 参数为每个附加文件指定精确的 MIME 类型。但实际上，完全没有必要为所有附加文件指定附件类型，Allure 在默认情况下会分析附件内容，并能自动确定附件类型。只不过在使用纯文本文件时，通常需要指定一下附件类型。

**Links**

您可以将您的测试链接到其他服务器资源上，如 TMS（测试管理系统）或缺陷追踪系统。

```java
import io.qameta.allure.Link;
import io.qameta.allure.Issue;
import io.qameta.allure.TmsLink;

@Link("https://example.org")
@Link(name = "allure", type = "mylink")
public void testSomething() {
     ...
}

@Issue("123")
@Issue("432")
public void testSomething() {
     ...
}

@TmsLink("test-1")
@TmsLink("test-2")
public void testSomething() {
     ...
}
```

为了指定链接样式，您可以使用以下格式的系统属性: `allure.link.my-link-type.pattern=https://example.org/custom/{}/path`，Allure 将用装饰器中指定的值替换 `{}`。例如:

```java
allure.link.mylink.pattern=https://example.org/mylink/{}
allure.link.issue.pattern=https://example.org/issue/{}
allure.link.tms.pattern=https://example.org/tms/{}
```

**Severity**

`@Severity` 装饰器会根据严重程度对测试方法进行优先级排序：

```java
package org.example.tests;

import org.junit.Test;
import io.qameta.allure.Severity;
import io.qameta.allure.SeverityLevel;

public class MyTest {

    @Test
    @Severity(SeverityLevel.CRITICAL)
    public void testSomething() throws Exception {
        // ...
    }

}
```

**Behaviours Mapping**

在一些研发方法中，测试是按特性和故事分类的。要添加这样的映射，你可以使用 `Epic`、`Feature` 和 `Stories` 装饰器:

```java
package org.example.tests;

import org.junit.Test;
import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import io.qameta.allure.Story;

@Epic("Allure examples")
@Feature("Junit 4 support")
public class MyTest {

    @Test
    @Story("Base support for bdd annotations")
    @Story("Advanced support for bdd annotations")
    public void testSomething() throws Exception {
        // ...
    }

}
```

<div id="_testng"></div>

#### 5.3. TestNG

##### 5.3.1. 安装

`allure-testng` 最新版: ![Allure TestNG](https://img.shields.io/maven-central/v/io.qameta.allure/allure-testng.svg)

**Maven**

添加以下内容到你的 **pom.xml**：

*pom.xml*
```xml
<properties>
    <aspectj.version>1.8.10</aspectj.version>
</properties>

<dependencies>
    <dependency>
        <groupId>io.qameta.allure</groupId>
        <artifactId>allure-testng</artifactId>
        <version>LAST_VERSION</version>
        <scope>test</scope>
    </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>2.20</version>
            <configuration>
                <argLine>
                    -javaagent:"${settings.localRepository}/org/aspectj/aspectjweaver/${aspectj.version}/aspectjweaver-${aspectj.version}.jar"
                </argLine>
            </configuration>
            <dependencies>
                <dependency>
                    <groupId>org.aspectj</groupId>
                    <artifactId>aspectjweaver</artifactId>
                    <version>${aspectj.version}</version>
                </dependency>
            </dependencies>
        </plugin>
    </plugins>
</build>
```

然后正常进行构建：

```bash
$ mvn clean test
```

在 **target/allure-results** 目录下生成 Allure 结果数据，要生成 html 报告并且自动打开 web 浏览器浏览报告，只需要运行一下命令：
```bash
$ allure serve target/allure-results
```

**Gradle**

对于 Gradle 用户，可以使用 allure-gradle 插件，该插件会自动配置依赖：

*build.gradle*
```groovy
buildscript {
    repositories {
        jcenter()
    }
    dependencies {
        classpath "io.qameta.allure:allure-gradle:2.3"
    }
}

plugins {
    id 'io.qameta.allure'
}

allure {
    version = '2.2.1'
    autoconfigure = true
    aspectjweaver = true
    allureJavaVersion = LATEST_VERSION
}
```

然后正常构建：
```bash
$ ./gradlew clean test
```

会生成 **build/allure-results** 目录，要生成 html 报告并且自动打开 web 浏览器浏览报告，只需要运行一下命令：
```bash
$ ./gradlew allureServe build/allure-results
```

##### 5.3.2. 特性

该适配器附带了一组 Java 装饰器，来使用主要的 Allure 特性。

**DisplayName**

使用 `@Test` 装饰器中的 `description` 属性来注释测试方法的名称，增强可读性：

```java
package my.company.tests;

import org.testng.annotations.Test;

public class MyTests {

    @BeforeMethod(description = "Configure something before test")
    public void setUp() {
        //...
    }

    @Test(description = "Human-readable test name")
    public void testSomething() throws Exception {
        //...
    }

}
```

**Description**

类似地，您可以为每个测试方法添加详细的描述。要添加该描述，可使用 `@Description` 装饰器:

```java
package my.company.tests;

import org.junit.Test;
import io.qameta.allure.Description;

@Test
public class MyTests {

    @Test
    @Description("Some detailed test description")
    public void testSomething() throws Exception {
        ...
    }

}
```

**Steps**

测试场景由于步骤构成，步骤可以是任意操作。在不同的测试场景中都可以使用步骤。它们可以：被参数化、进行检查、具有嵌套步骤和创建附件。每一步都有一个名字。

为了在 Java 代码中定义步骤，需要使用 `@Step` 装饰器对各自的方法进行注释。如果未指定，则步骤名称等于装饰器名称。

请注意步骤的机制已经被修改了。现在它支持字段智能分析，在 Allure 1 中用户必须指定索引来引用他们想要注入到步骤中的那些参数值，而 Allure 2 使用了映射方法，这提供了通过名称来提取解析的能力。

假设你有以下实体：

```java
public class User {

     private String name;
     private String password;
     ...
}
```

您可以通过名称直接访问这些字段的值：
```java
import io.qameta.allure.Step;

...

@Step("Type {user.name} / {user.password}.")
public void loginWith(User user) {
     ...
}
```

由于友好的支持了**数组**和**集合**，因此您不再需要为您的自定义对象重写 **toString()**。

**Attachments**

在 Java 代码中只需要用一个简单的 **@Attachment** 装饰器，就可以添加附件，它将返回一个 **String** 或 **byte[]** 添加到报告中:

```java
import io.qameta.allure.Attachment;

...

@Attachment
public String performedActions(ActionSequence actionSequence) {
    return actionSequence.toString();
}

@Attachment(value = "Page screenshot", type = "image/png")
public byte[] saveScreenshot(byte[] screenShot) {
    return screenShot;
}
```

或者你也可以使用 Allure helper 方法

```java
import io.qameta.allure.Allure;

...

Allure.addAttachment("My attachment", "My attachment content");

Path content = Paths.get("path-to-my-attachment-contnet");
try (InputStream is = Files.newInputStream(content)) {
    Allure.addAttachemnt("My attachment", is);
}
```

> **提示**：如果用 `@Attachment` 装饰器返回类型与 **String** 或 **byte[]** 不同，会在返回值上调用 **toString()** 来获取附件内容。

您可以如上所示一般，使用 `@Attachment` 装饰器的 **type** 参数为每个附加文件指定精确的 MIME 类型。但实际上，完全没有必要为所有附加文件指定附件类型，Allure 在默认情况下会分析附件内容，并能自动确定附件类型。只不过在使用纯文本文件时，通常需要指定一下附件类型。

**Links**

您可以将您的测试链接到其他服务器资源上，如 TMS（测试管理系统）或缺陷追踪系统。

```java
import io.qameta.allure.Link;
import io.qameta.allure.Issue;
import io.qameta.allure.TmsLink;

@Link("https://example.org")
@Link(name = "allure", type = "mylink")
public void testSomething() {
     ...
}

@Issue("123")
@Issue("432")
public void testSomething() {
     ...
}

@TmsLink("test-1")
@TmsLink("test-2")
public void testSomething() {
     ...
}
```

为了指定链接样式，您可以使用以下格式的系统属性: `allure.link.my-link-type.pattern=https://example.org/custom/{}/path`，Allure 将用装饰器中指定的值替换 `{}`。例如:

```java
allure.link.mylink.pattern=https://example.org/mylink/{}
allure.link.issue.pattern=https://example.org/issue/{}
allure.link.tms.pattern=https://example.org/tms/{}
```

**Severity**

`@Severity` 装饰器会根据严重程度对测试方法进行优先级排序：

```java
package org.example.tests;

import org.junit.Test;
import io.qameta.allure.Severity;
import io.qameta.allure.SeverityLevel;

public class MyTest {

    @Test
    @Severity(SeverityLevel.CRITICAL)
    public void testSomething() throws Exception {
        // ...
    }

}
```

**Behaviours Mapping**

在一些研发方法中，测试是按特性和故事分类的。要添加这样的映射，你可以使用 `Epic`、`Feature` 和 `Stories` 装饰器:

```java
package org.example.tests;

import org.junit.Test;
import io.qameta.allure.Epic;
import io.qameta.allure.Feature;
import io.qameta.allure.Story;

@Epic("Allure examples")
@Feature("Junit 4 support")
public class MyTest {

    @Test
    @Story("Base support for bdd annotations")
    @Story("Advanced support for bdd annotations")
    public void testSomething() throws Exception {
        // ...
    }

}
```

<div id="_cucumber_jvm"></div>

#### 5.4. Cucumber JVM

##### 5.4.1. 安装

Cucumber JVM 的每个主要版本都需要一个特定版本的 Allure Cucumber JVM 适配器。

可用的最新版本的适配器:
- Cucumber JVM 1.x - `allure-cucumber-jvm` ![Allure Cucumber JVM 1.x](https://img.shields.io/maven-central/v/io.qameta.allure/allure-cucumber-jvm.svg)
- Cucumber JVM 2.x - `allure-cucumber2-jvm` ![Allure Cucumber JVM 2.x](https://img.shields.io/maven-central/v/io.qameta.allure/allure-cucumber2-jvm.svg)
- Cucumber JVM 3.x - `allure-cucumber3-jvm` ![Allure Cucumber JVM 3.x](https://img.shields.io/maven-central/v/io.qameta.allure/allure-cucumber3-jvm.svg)
- Cucumber JVM 4.x - `allure-cucumber4-jvm` ![Allure Cucumber JVM 4.x](https://img.shields.io/maven-central/v/io.qameta.allure/allure-cucumber4-jvm.svg)

###### Maven

添加 `allure-cucumber4-jvm` 插件到你的项目中并将其添加到CucumberOptions 中：

*pom.xml*
```xml
<properties>
    <aspectj.version>1.8.10</aspectj.version>
</properties>

<dependencies>
    <dependency>
        <groupId>io.qameta.allure</groupId>
        <artifactId>allure-cucumber4-jvm</artifactId>
        <version>LATEST_VERSION</version>
    </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>2.20</version>
            <configuration>
                <argLine>
                    -javaagent:"${settings.localRepository}/org/aspectj/aspectjweaver/${aspectj.version}/aspectjweaver-${aspectj.version}.jar"
                    -Dcucumber.options="--plugin io.qameta.allure.cucumber4jvm.AllureCucumber4Jvm"
                </argLine>
            </configuration>
            <dependencies>
                <dependency>
                    <groupId>org.aspectj</groupId>
                    <artifactId>aspectjweaver</artifactId>
                    <version>${aspectj.version}</version>
                </dependency>
            </dependencies>
        </plugin>
    </plugins>
</build>
```

然后执行 `mvn clean test`，测试执行后的 allure JSON 文件会默认生成在 **allure-results** 目录下。

###### Features

此适配器提供运行时集成，允许将 Gherkin dsl 特性转换为基本的 Allure 特性。

###### Display Name

测试标题和测试集标题在运行时从 `.feature` 文件中提取。

###### Description

特性的描述会出现在每个场景中。

###### Steps

所有场景步骤自动转换成 Allure 步骤。

###### Attachments

在 Java 代码中只需要用一个简单的 **@Attachment** 装饰器，就可以添加附件，它将返回一个 **String** 或 **byte[]** 添加到报告中:

```java
import io.qameta.allure.Attachment;

...

@Attachment
public String performedActions(ActionSequence actionSequence) {
    return actionSequence.toString();
}

@Attachment(value = "Page screenshot", type = "image/png")
public byte[] saveScreenshot(byte[] screenShot) {
    return screenShot;
}
```

或者你也可以使用 Allure helper 方法

```java
import io.qameta.allure.Allure;

...

Allure.addAttachment("My attachment", "My attachment content");

Path content = Paths.get("path-to-my-attachment-contnet");
try (InputStream is = Files.newInputStream(content)) {
    Allure.addAttachemnt("My attachment", is);
}
```

> **提示**：如果用 `@Attachment` 装饰器返回类型与 **String** 或 **byte[]** 不同，会在返回值上调用 **toString()** 来获取附件内容。

您可以如上所示一般，使用 `@Attachment` 装饰器的 **type** 参数为每个附加文件指定精确的 MIME 类型。但实际上，完全没有必要为所有附加文件指定附件类型，Allure 在默认情况下会分析附件内容，并能自动确定附件类型。只不过在使用纯文本文件时，通常需要指定一下附件类型。

###### Links

要关联问题到报告上，只需在 `.feature` 文件中的场景顶部添加 `@issue=<ISSUE-NUMBER>`。

要关联 TMS 链接到报告上，只需在 `.feature` 文件中的场景顶部添加添加 `@tmsLink=<TEST-CASE-ID>`。

> **提示**：不要忘记在 Allure 属性中配置链接模式。

###### Severity

要设置 severity，可以在 `.Feature` 文件中的的场景顶部添加 `@severity=blocker`。

如果严重性有错误的值，它将被强制为正常（默认）。

支持的严重性值: `blocker`, `critical`, `normal`, `minor`, `trivial`

###### Test markers

每个特性或场景都可以通过以下标记进行装饰: `@flaky`, `@muted`, `@known`

###### Test fixtures

所有方法都由装饰器 `@import cucumber.api.java.After` 或者 `@cucumber.api.java.Before` 装饰。它们将作为带有方法名称的步骤出现在报表中。

如果 `@Before` 执行失败，该场景将被标记为跳过。
如果 `@After` 执行失败，该场景将被标记为已通过，并且仅在方法的步骤之后将被标记为失败。

###### Behaviours Mapping

Allure Cucumber JVM 集成请参考特性章节。

###### Configuration

`allure-results` 目录的位置，以及 `@TmsLink` 和 `@Issue` 链接都可以通过 `allure.properties` 文件来设置，该文件在资源目录: `src/test/resources`

*allure.properties*
```text
allure.results.directory=target/allure-results
allure.link.issue.pattern=https://example.org/browse/{}
allure.link.tms.pattern=https://example.org/browse/{}
```

或者设置系统配置 `pom.xml`

*pom.xml*
```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>2.20</version>
            <configuration>
                ...
                <systemPropertyVariables>
                    <allure.results.directory>${project.build.directory}/allure-results</allure.results.directory>
                    <allure.link.issue.pattern>https://example.org/browse/{}</allure.link.issue.pattern>
                    <allure.link.tms.pattern>https://example.org/browse/{}</allure.link.tms.pattern>
                </systemPropertyVariables>
            </configuration>
            ...
        </plugin>
    </plugins>
</build>
```

<div id="_selenide"></div>

#### 5.5 Selenide

##### 5.5.1. 安装

`allure-selenide` 最新可用版本：![Allure Maven](https://img.shields.io/maven-central/v/io.qameta.allure/allure-selenide.svg)

**Maven**

你可以添加以下内容到你的 `pom.xml`：

*pom.xml*
```xml
<dependencies>
    ...
    <dependency>
        <groupId>io.qameta.allure</groupId>
        <artifactId>allure-selenide</artifactId>
        <version>LAST_VERSION</version>
        <scope>test</scope>
    </dependency>
    ...
</dependencies>
```

**Gradle**

*build.gradle*
```groovy
...
compile group: 'io.qameta.allure', name: 'allure-selenide', version: '2.0-BETA22'
...
```

**Listener**

添加监听器到 Selenide:
```java
import io.qameta.allure.selenide.AllureSelenide;
...
SelenideLogger.addListener("AllureSelenide", new AllureSelenide().screenshots(true).savePageSource(false));
```

----

<div id="_python"></div>

## 6. Python

<div id="_pytest"></div>

#### 6.1. Pytest

##### 6.1.1. 安装

Pytest 可以从 [PyPI](https://pypi.python.org/pypi/allure-pytest) 进行安装，因此建议使用 pip 进行安装。要安装最新版本，请从命令行执行:
```bash
$ pip install allure-pytest
```

这将安装 allure-pytest 和 allure-python-commons 软件包，以生成与 Allure 2 兼容的报告数据。如果您正在使用老版本的适配器 [pytest-allure-adapter]https://pypi.python.org/pypi/pytest-allure-adaptor)，那么您将需要首先卸载它。

##### 6.1.2. 用法

要使 Allure 监听器能够在测试执行期间收集结果，只需添加 `——alluredir` 选项并提供存储结果文件夹的路径。例如:
```bash
$ pytest --alluredir=/tmp/my_allure_results
```

要在测试完成后查看实际的报告，需要使用 Allure 命令行工具从结果生成测试报告。

```bash
$ allure serve /tmp/my_allure_results
```

该命令会打开你的默认浏览器展现生成的测试报告。

##### 6.1.3. 基本的报告

您可以在 Allure 报告中看到所有默认的 pytest 状态: 只有那些由于断言错误而没有成功的测试将被标记为失败，任何其他异常将导致测试处于中断状态。

```python
import pytest

def test_success():
    """this test succeeds"""
    assert True


def test_failure():
    """this test fails"""
    assert False


def test_skip():
    """this test is skipped"""
    pytest.skip('for a reason!')


def test_broken():
    raise Exception('oops')
```

##### 6.1.4. Pytest 特性支持

Allure 报告支持的一些常见的 Pytest 特性包括 xfails, fixtures and finalizers, marks, conditional skips and parametrization。

**Xfail**

这是标记预期错误的 Pytest 方法:（[Pytest文档](https://docs.pytest.org/en/latest/skipping.html)）

```python
@pytest.mark.xfail(condition=lambda: True, reason='this test is expecting failure')
def test_xfail_expected_failure():
    """this test is an xfail that will be marked as expected failure"""
    assert False


@pytest.mark.xfail(condition=lambda: True, reason='this test is expecting failure')
def test_xfail_unexpected_pass():
    """this test is an xfail that will be marked as unexpected success"""
    assert True
```

这会在测试遇到预期错误而失败时，使用特殊的标记来标识，并且跳过。

![Expected xpass failure](https://docs.qameta.io/allure/images/pytest_xpass_expected_failure.png)

当非预期而意外通过时，使用特殊的标记标识。

![Unexpected xpass pass](https://docs.qameta.io/allure/images/pytest_xpass_unexpected_pass.png)

**Conditional mark**

在 Pytest 中，你可以标记一个在某些特定条件下不被执行的测试（[Pytest文档](https://docs.pytest.org/en/latest/skipping.html)）:

```python
@pytest.mark.skipif('2 + 2 != 5', reason='This test is skipped by a triggered condition in @pytest.mark.skipif')
def test_skip_by_triggered_condition():
    pass
```

当条件被评估为 true 时，在报告中测试将收到一个 “Skipped” 状态，装饰器会生成一个标记和一个描述。

![Conditional skip triggered](https://docs.qameta.io/allure/images/pytest_conditional_skip.png)

**Fixtures and Finalizers**

Fixtures and finalizers 是将分别在测试开始之前和结束之后由 Pytest 调用的实用函数。Allure 跟踪每个 fixture 的调用，并详细显示调用了什么方法和什么参数，保持了调用的正确顺序。（[Pytest文档](https://docs.pytest.org/en/latest/reference.html#id30)）

你不需要标记你的 fixtures 使他们在报告中可见，他们将自动检测不同的范围。

```python
@pytest.fixture(params=[True, False], ids=['param_true', 'param_false'])
def function_scope_fixture_with_finalizer(request):
    if request.param:
        print('True')
    else:
        print('False')
    def function_scope_finalizer():
        function_scope_step()
    request.addfinalizer(function_scope_finalizer)


@pytest.fixture(scope='class')
def class_scope_fixture_with_finalizer(request):
    def class_finalizer_fixture():
        class_scope_step()
    request.addfinalizer(class_finalizer_fixture)


@pytest.fixture(scope='module')
def module_scope_fixture_with_finalizer(request):
    def module_finalizer_fixture():
        module_scope_step()
    request.addfinalizer(module_finalizer_fixture)


@pytest.fixture(scope='session')
def session_scope_fixture_with_finalizer(request):
    def session_finalizer_fixture():
        session_scope_step()
    request.addfinalizer(session_finalizer_fixture)


class TestClass(object):

    def test_with_scoped_finalizers(self,
                                    function_scope_fixture_with_finalizer,
                                    class_scope_fixture_with_finalizer,
                                    module_scope_fixture_with_finalizer,
                                    session_scope_fixture_with_finalizer):
        step_inside_test_body()
```

![Test with fixtures and finalizers executed within different scopes.](https://docs.qameta.io/allure/images/pytest_skoped_finalizers.png)

根据 fixture 执行的结果，依赖于它的测试可能会收到不同的状态。异常将导致所有依赖测试中断，调用 `pytest.skip()` 将跳过所有依赖测试。

```python
import pytest

@pytest.fixture
def skip_fixture():
    pytest.skip()


@pytest.fixture
def fail_fixture():
    assert False


@pytest.fixture
def broken_fixture():
    raise Exception("Sorry, it's broken.")


def test_with_pytest_skip_in_the_fixture(skip_fixture):
    pass


def test_with_failure_in_the_fixture(fail_fixture):
    pass


def test_with_broken_fixture(broken_fixture):
    pass
```

![Fixture execution outcome resulting in different statuses.](https://docs.qameta.io/allure/images/pytest_fixture_effect.png)

**Parametrization**

您可以使用 `@pytest.mark.parametertrize` 从输入参数集中生成许多测试用例。（[Pytest文档](https://docs.pytest.org/en/latest/skipping.html)）

所有的参数名称和值都将在报告中被捕获，可选的参数名称将被 `ids` kwarg 中提供的字符串描述替换。

```python
import allure
import pytest


@allure.step
def simple_step(step_param1, step_param2 = None):
    pass


@pytest.mark.parametrize('param1', [True, False], ids=['id explaining value 1', 'id explaining value 2'])
def test_parameterize_with_id(param1):
    simple_step(param1)


@pytest.mark.parametrize('param1', [True, False])
@pytest.mark.parametrize('param2', ['value 1', 'value 2'])
def test_parametrize_with_two_parameters(param1, param2):
    simple_step(param1, param2)


@pytest.mark.parametrize('param1', [True], ids=['boolean parameter id'])
@pytest.mark.parametrize('param2', ['value 1', 'value 2'])
@pytest.mark.parametrize('param3', [1])
def test_parameterize_with_uneven_value_sets(param1, param2, param3):
    simple_step(param1, param3)
    simple_step(param2)
```

使用不同的命名和未命名参数集捕获的示例:

![Multiple invocations of tests with different parameters.](https://docs.qameta.io/allure/images/pytest_parameterized_tests.png)

带有命名参数的测试执行详情:

![Multiple invocations of tests with different parameters.](https://docs.qameta.io/allure/images/pytest_parameterized_with_id.png)


##### 6.1.5. Allure 特性

除了 environment ，Allure 目前使用 Pytest 可以支持几乎所有可用的特性。

**Steps**

Allure 报告首要并且可能最重要的是，它允许获得每个测试调用的非常详细的分步表示。这是通过 `@allure.step` 装饰器来实现的，它将注释的方法或函数的调用与提供的参数都添加到报表中。

`@step` 可以存储在测试之外，并只在需要时导入。Step 方法可以有任意深嵌套的结构。

```python
import allure
import pytest

from .steps import imported_step


@allure.step
def passing_step():
    pass


@allure.step
def step_with_nested_steps():
    nested_step()


@allure.step
def nested_step():
    nested_step_with_arguments(1, 'abc')


@allure.step
def nested_step_with_arguments(arg1, arg2):
    pass


def test_with_imported_step():
    passing_step()
    imported_step()


def test_with_nested_steps():
    passing_step()
    step_with_nested_steps()
```

每一步的状态都显示在名字右侧的一个小图标上。嵌套的步骤会组织成树状的可折叠结构。

![Nested steps and steps with arguments.](https://docs.qameta.io/allure/images/pytest_nested_steps_and_args.png)

步骤可以有一个描述行，该描述行支持传递的位置参数和关键字参数的占位符，关键字参数的默认参数也将被捕获。

```python
import allure

@allure.step('Step with placeholders in the title, positional: "{0}", keyword: "{key}"')
def step_with_title_placeholders(arg1, key=None):
    pass


def test_steps_with_placeholders():
    step_with_title_placeholders(1, key='something')
    step_with_title_placeholders(2)
    step_with_title_placeholders(3, 'anything')
```

![Nested steps and steps with arguments.](https://docs.qameta.io/allure/images/pytest_step_arguments.png)

Steps are supported in fixtures as well. Here is an example of a test using a fixture defined in conftest.py module (such fixtures will be resolved by Pytest even when not directly imported):

fixture 中也能很好的支持步骤。下面是一个使用 `conftest.py` 模块中定义的 fixture 进行测试的例子（这样的 fixture 即使没有直接导入也会由 Pytest 解析）:

*conftest.py*

```python
import allure
import pytest


@allure.step('step in conftest.py')
def conftest_step():
    pass


@pytest.fixture
def fixture_with_conftest_step():
    conftest_step()
```
```python
import allure

from .steps import imported_step


@allure.step
def passing_step():
    pass


def test_with_step_in_fixture_from_conftest(fixture_with_conftest_step):
    passing_step()
```

setup 和 teardown 将由 fixture 中的步骤显示在单独的树中。

![Step in fixture resolved from conftest.py.](https://docs.qameta.io/allure/images/pytest_step_in_fixture.png)

**Attachments**

报告可以显示许多不同类型的附件，这些附件可以作为测试、步骤或 fixture 结果的补充。附件可以通过 `allure.attach` 创建（`body`, `name`, `attachment_type`, `extension`）:

1. `body` - 要写入文件的原始内容
2. `name` - 文件名的字符串
3. `attachment_type` - 一个 `allure.attachment_type` 值
4. `extension` - 被用作文件的扩展

或者 `allure.attach.file`（`source`, `name`, `attachment_type`, `extension`）:

1. `source` - 包含文件路径的字符串

（其他参数一样）

```python
import allure
import pytest


@pytest.fixture
def attach_file_in_module_scope_fixture_with_finalizer(request):
    allure.attach('A text attacment in module scope fixture', 'blah blah blah', allure.attachment_type.TEXT)
    def finalizer_module_scope_fixture():
        allure.attach('A text attacment in module scope finalizer', 'blah blah blah blah',
                      allure.attachment_type.TEXT)
    request.addfinalizer(finalizer_module_scope_fixture)


def test_with_attacments_in_fixture_and_finalizer(attach_file_in_module_scope_finalizer):
    pass


def test_multiple_attachments():
    allure.attach.file('./data/totally_open_source_kitten.png', attachment_type=allure.attachment_type.PNG)
    allure.attach('<head></head><body> a page </body>', 'Attach with HTML type', allure.attachment_type.HTML)
```

附件显示在它们所属的测试实体的上下文中。HTML 类型的附件将呈现并显示在报告页面上，这是一种方便的方法，可以为您自己的测试结果表示提供一些定制化。

![Attachments in the test body.](https://docs.qameta.io/allure/images/pytest_attachments.png)

**Descriptions**

您可以添加测试的详细描述，以便为报表阅读提供所需的上下文。这可以通过几种方式实现:您可以添加一个 `@allure.description` 装饰器来提供一个描述字符串，或者您可以使用 `@allure.description_html` 来提供一些 HTML，以便在测试用例的 “description” 部分中呈现。或者，描述将简单地从测试方法的文档字符串中获取。

```python
import allure

@allure.description_html("""
<h1>Test with some complicated html description</h1>
<table style="width:100%">
  <tr>
    <th>Firstname</th>
    <th>Lastname</th>
    <th>Age</th>
  </tr>
  <tr align="center">
    <td>William</td>
    <td>Smith</td>
    <td>50</td>
  </tr>
  <tr align="center">
    <td>Vasya</td>
    <td>Jackson</td>
    <td>94</td>
  </tr>
</table>
""")
def test_html_description():
    assert True


@allure.description("""
Multiline test description.
That comes from the allure.description decorator.

Nothing special about it.
""")
def test_description_from_decorator():
    assert 42 == int(6 * 7)


def test_unicode_in_docstring_description():
    """Unicode in description.

    Этот тест проверяет юникод.

    你好伙计.
    """
    assert 42 == int(6 * 7)
```

Description 支持 unicode 字符串:

![Description from docstring.](https://docs.qameta.io/allure/images/pytest_unicode_description_docstr.png)

通过 `description_html` 渲染 HTML:

![Description from html.](https://docs.qameta.io/allure/images/pytest_html_description.png)

描述也可以使用 `allure.dynamic.description` 从测试体的内部动态更新。

```python
import allure

@allure.description("""
This description will be replaced at the end of the test.
""")
def test_dynamic_description():
    assert 42 == int(6 * 7)
    allure.dynamic.description('A final description.')
```

**Titles**

特殊的 `@allure.title` 装饰器可以使测试标题更具可读性。标题支持参数占位符并支持动态替换。

```python
import allure
import pytest


@allure.title("This test has a custom title")
def test_with_a_title():
    assert 2 + 2 == 4


@allure.title("This test has a custom title with unicode: Привет!")
def test_with_unicode_title():
    assert 3 + 3 == 6


@allure.title("Parameterized test title: adding {param1} with {param2}")
@pytest.mark.parametrize('param1,param2,expected', [
    (2, 2, 4),
    (1, 2, 5)
])
def test_with_parameterized_title(param1, param2, expected):
    assert param1 + param2 == expected


@allure.title("This title will be replaced in a test body")
def test_with_dynamic_title():
    assert 2 + 2 == 4
    allure.dynamic.title('After a successful test finish, the title was replaced with this line.')
```

![Description from docstring.](https://docs.qameta.io/allure/images/pytest_titles.png)

**Links**

要想将报告与缺陷跟踪或测试管理集成，可以使用：`@allure.link`, `@allure.issue` 和 `@allure.testcase`

```python
import allure

TEST_CASE_LINK = 'https://github.com/qameta/allure-integrations/issues/8#issuecomment-268313637'


@allure.link('https://www.youtube.com/watch?v=4YYzUTYZRMU')
def test_with_link():
    pass


@allure.link('https://www.youtube.com/watch?v=Su5p2TqZxKU', name='Click me')
def test_with_named_link():
    pass


@allure.issue('140', 'Pytest-flaky test retries shows like test steps')
def test_with_issue_link():
    pass


@allure.testcase(TEST_CASE_LINK, 'Test case title')
def test_with_testcase_link():
    pass
```

`@allure.link` 会在 “Links” 处提供一个可点击的链接到所提供的 URL:

![Description from docstring.](https://docs.qameta.io/allure/images/pytest_test_with_link.png)

`@allure.issue` 会提供一个带有缺陷样式小图标的链接。该描述符将测试用例 ID 作为输入参数，以便与问题链接类型提供的链接模板一起使用，链接模板是在 Pytest 的 `--allure-link-pattern` 配置选项中指定的。链接模板和类型必须使用冒号来指定:

```bash
$ pytest directory_with_tests/ --alluredir=/tmp/my_allure_report \
      --allure-link-pattern=issue:http://www.mytesttracker.com/issue/{}
```

关键字 `issue`、`link` 和 `test_case` 为相应类型的链接提供模板。

![Test with a link of issue type.](https://docs.qameta.io/allure/images/pytest_test_case_with_issue_link.png)

##### 6.1.6. Retries

Allure 可以聚合在单个测试运行期间重新执行的测试信息，以及一段时间内测试执行的历史。

对于 `Retries` ，可以使用 [Pytest rerun failures 插件](https://github.com/pytest-dev/pytest-rerunfailures) 。

例如，如果我们有一个非常不可靠的步骤方法，并且经常失败，那么在 Pytest 启动选项中指定 `--reruns=5` 之后，我们会看到在 `Retries` 选项卡上显示所有不成功的尝试。

```python
import allure
import random
import time


@allure.step
def passing_step():
    pass


@allure.step
def flaky_broken_step():
    if random.randint(1, 5) != 1:
        raise Exception('Broken!')


def test_broken_with_randomized_time():
    passing_step()
    time.sleep(random.randint(1, 3))
    flaky_broken_step()
```

![Retries tab for a test that was rerun.](https://docs.qameta.io/allure/images/pytest_retry_tab.png)

同样，这样的测试会在已执行测试列表中显示 “flaky” 炸弹图标。

![Flaky icon.](https://docs.qameta.io/allure/images/pytest_flaky_icon.png)

##### 6.1.7. Tags

有时候，您希望灵活地执行您想要执行的测试。Pytest 通过使用标记装饰器 `@pytest.mark` 来实现（[Pytest文档](https://docs.pytest.org/en/latest/example/markers.html)）。

Allure 允许用类似的方式对你的测试进行标记，有三种类型的标记装饰器允许你对报告结构化:

- BDD-style 标记来表示史诗、特征和故事
- Severity 标签
- 自定义标签

**BDD markers**

有两个装饰器可以根据项目的特性/故事分解来标记测试: `@allure.feature` 和 `@allure.story` （[背景资料请参阅Wikipedia上的BDD文章](https://en.wikipedia.org/wiki/Behavior-driven_development)）。为了表明某个特征或故事属于某个史诗，名字可以使用 `epic_` 前缀开头。

*tests.py*
```python
import allure


def test_without_any_annotations_that_wont_be_executed():
    pass


@allure.story('epic_1')
def test_with_epic_1():
    pass


@allure.story('story_1')
def test_with_story_1():
    pass

@allure.story('story_2')
def test_with_story_2():
    pass


@allure.feature('feature_2')
@allure.story('story_2')
def test_with_story_2_and_feature_2():
    pass
```

您可以使用以下命令行选项来指定不同的测试集来执行传递一列逗号分隔的值:
- `--allure-epics`
- `--allure-features`
- `--allure-stories`

例子：
```bash
$ pytest tests.py --allure-stories story_1,story_2

collected 5 items

tests.py ...                                                                    [100%]

============================== 3 passed in 0.01 seconds ==============================
```
```bash
$ pytest tests.py --allure-features feature2 --allure-stories story2

collected 5 items

tests.py ...                                                                     [100%]

=============================== 2 passed in 0.01 seconds ==============================
```

**Severity markers**

要根据测试的严重程度对测试进行评分，可以使用 `@allure.severity` 装饰器。它需要 `allure.severity_level` 枚举值作为参数。

*tests.py*
```python
import allure


def test_with_no_severity_label():
    pass


@allure.severity(allure.severity_level.TRIVIAL)
def test_with_trivial_severity():
    pass


@allure.severity(allure.severity_level.NORMAL)
def test_with_normal_severity():
    pass


@allure.severity(allure.severity_level.NORMAL)
class TestClassWithNormalSeverity(object):

    def test_inside_the_normal_severity_test_class(self):
        pass

    @allure.severity(allure.severity_level.CRITICAL)
    def test_inside_the_normal_severity_test_class_with_overriding_critical_severity(self):
        pass
```

Severity 装饰器可以应用于函数、方法或整个类。

通过使用带有逗号分隔的严重性级别列表的 `--allure-severities` 命令行选项，只有具有相应严重性的测试才会运行。

```bash
$ pytest tests.py --allure-severities normal,critical

collected 5 items

bdd_annotations_demo/test_severity_labels.py ...                                [100%]

================================ 3 passed in 0.01 seconds ============================
```

<div id="_behave"></div>

#### 6.2. Behave

Allure 与 behave 集成为一个外部格式化程序。

##### 6.2.1. 安装

```bash
$ pip install allure-behave
```

##### 6.2.2. 用法

您可以在命令行中直接指定格式化程序:

```bash
$ behave -f allure_behave.formatter:AllureFormatter -o %allure_result_folder% ./features
```

##### 6.2.3. 特性

**Severity**

与严重性名称（如 critical、trivial 等）匹配的标记将被解释为特性或场景的严重性。如果没有提供，场景将继承特性严重性，或者在另一种情况下覆盖它。如果有多个严重性定义标记，则只使用最后一个。

**Steps and Scenarious status**

带有断言异常的步骤将被标记为失败，在测试执行期间抛出的其他异常将导致状态中断。场景状态将由第一个不成功步骤状态决定。当所有步骤都通过时，则认为整个场景已经通过。

**Step Data**

步骤数据文本或表格数据在报表中表示为步骤附件。

#### 6.3. Nose

[pytest-allure-adaptor](https://github.com/allure-framework/allure-python) 是 [nose 框架](https://github.com/nose-devs/nose)的端口。

##### 6.3.1. 用法

```bash
nosetests --with-allure --logdir=/path/to/put/results
nosetests --with-allure --logdir=/path/to/put/results --not-clear-logdir
```

选项 `--not-clear-logdir` 与选项 `--processes` 一起搭配使用，可以有效防止测试结束时清理 logdir。

##### 6.3.2. Supported features

**Attachment**

在测试报告中附加一些内容:

```python
import nose

def test_foo():
    nose.allure.attach('my attach', 'Hello, World')
```

**Step**

将测试分成几个步骤:

```python
import nose

def test_foo():
    with nose.allure.step('step one'):
        # do stuff

    with nose.allure.step('step two'):
        # do more stuff
```

也可以使用装饰器，默认情况下，步骤名是由方法名生成的:
```python
import nose

@nose.allure.step
def make_test_data_foo():
    # do stuff

def test_foo():
    assert make_some_data_foo() is not None

@nose.allure.step('make_some_data_foo')
def make_some_data_bar():
    # do another stuff

def test_bar():
    assert make_some_data_bar() is not None
```

**Environment**

您可以提供测试[环境参数](https://github.com/allure-framework/allure-core/wiki/Environment)，如报表名称、浏览器或测试服务器地址来丰富 Allure 测试报告。

```python
import nose

def test_dummy():
    nose.allure.environment(report='Allure report', browser=u'Firefox')
```

**Severity**

任何测试、类或模块都可以标记不同的严重程度:

```python
import nose

class TestBar(object):

    @nose.allure.severity(nose.allure.severity_level.CRITICAL)
    def test_bar(self):
        pass

# custom severity
@nose.allure.severity("hard")
def test_bar(self):
    pass
```

运行具有优先级的测试:
```bash
nosetests my_tests/ --with-allure --logdir=tmp --severity="critical, hard"
```

**Issue**

可以为测试设置 issue。

```python
import nose

@nose.allure.issue('http://jira.lan/browse/ISSUE-1')
def test_foo():
    assert False
```

**Features & Stories**

可以为测试设置 Feature 和 Story。

```python
import nose

@nose.allure.feature('Feature1')
@nose.allure.story('Story1')
def test_minor():
    assert False

class TestBar(object):

    @nose.allure.feature('Feature2')
    @nose.allure.story('Story1')
    def test_bar(self):
        pass
```

按 Feature 或 Story 运行测试:
```bash
nosetests my_tests/ --with-allure --logdir=tmp --feature="Feature1, Feature2"
nosetests my_tests/ --with-allure --logdir=tmp --feature="Feature1, Feature2" --story="Story1, Story2"
```

----

<div id="_javascript"></div>

## 7. JavaScript

<div id="_jasmine"></div>

#### 7.1. Jasmine

插件从 Jasmine 测试生成 Allure 报告。

##### 7.1.1. 安装

**Jasmine2**

将库添加到 `package.json` 中，然后配置插件:

```javascript
// conf.js
var AllureReporter = require('jasmine-allure-reporter');
jasmine.getEnv().addReporter(new AllureReporter({
  resultsDir: 'allure-results'
}));
```

**Protractor**

将以上代码放入 `conf.js` 内的 `onPrepare` 中:

```javascript
// conf.js
exports.config = {
  framework: 'jasmine2',
  onPrepare: function() {
    var AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new AllureReporter({
      resultsDir: 'allure-results'
    }));
  }
}
```

##### 7.1.2. 生成 HTML 报告

可以使用 Maven 让 Allure 在 `resultsDir` 中生成 xml 文件，然后需要从中生成 HTML。从 `node_modules/jasmine-allure-reporter` 复制即将使用的 `pom.xml` 并运行:

```bash
mvn site -Dallure.results_pattern=allure-results
```

它会把 HTML 文件放到 `target/site/allure-maven-plugin` 文件夹中，并通过 `localhost:1324` 提供服务：

```bash
mvn jetty:run -Djetty.port=1234
```

##### 7.1.3. 特性

该适配器提供了一组可以从全局调用 `Jasmine2AllureReporter` 对象的方法。它封装了[常见的 allure JS 适配器](https://github.com/allure-framework/allure-js-commons)，并提供了访问基本 Allure 特性的能力。

**Title**

> **注意**：待定，无代码片段

**Description**

为了给测试添加详细的描述，应该调用 `setDescription(description)` 方法，其中 **description** 是字符串参数。

> **注意**：待定，无代码片段

**Severity**

您可以通过 `severity(severity)` 方法为测试指定一个 severity 属性，其中 **severity** 参数可以包含以下预定义值之一:

- BLOCKER
- CRITICAL
- NORMAL
- MINOR
- TRIVIAL

> **注意**：待定，无代码片段

**Behaviours**

在一些开发方法中，测试是按[故事](https://github.com/allure-framework/allure-core/wiki/Glossary#user-story)和[特性](https://github.com/allure-framework/allure-core/wiki/Glossary#feature)分类的。如果您正在使用该种方法，那么对于每个测试，您可以分别通过 `story(story)` 和 `feature(feature)` 方法设置 story 和 feature 属性，并提供 **story** 或 **feature** 作为字符串参数。

> **注意**：待定，无代码片段

**Steps**

测试场景的操作需要由一些步骤来构成。命名的步骤，可以创建附件，并且可以在不同的测试场景中使用。您可以通过 `createStep(name, stepFunc)` 方法添加一个步骤，其中：

- **name** 是一个包含步骤名称的字符串参数
- **stepFunc** 是一个封装好的函数，此步骤在报表中表示其逻辑。

> **注意**：待定，无代码片段

**Attachments**

您可以在其中一个步骤里通过 `createAttachment(name, content, type)` 方法添加附件

- name 是附件的说明
- content 是一个函数，返回附件对象或附件对象本身
- type 是一个字符串参数，用于为每个附加文件指定确切的 MIME 类型。然而，不需要为所有附加文件明确指定附件类型，因为 Allure 在默认情况下可以分析附件内容并自动确定附件类型。使用纯文本文件时，通常需要指定附件类型。

示例: 在每个测试的最后添加一个屏幕截图

```javascript
  onPrepare: function () {
    var AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new AllureReporter());
    jasmine.getEnv().afterEach(function(done){
      browser.takeScreenshot().then(function (png) {
        allure.createAttachment('Screenshot', function () {
          return new Buffer(png, 'base64')
        }, 'image/png')();
        done();
      })
    });
  }
```

注意最后的回调 `done`

**Issues Tracker**

> **注意**：与缺陷追踪系统的集成目前还没有实现

**Test Management System**

> **注意**：与测试管理系统的集成目前还没有实现

**Parameters**

为了添加关于测试方法[参数](https://github.com/allure-framework/allure-core/wiki/Glossary#parameter)的信息，你应该使用以下方法之一:

1. `addArgument(name, value)` - 指定一个测试参数的更多信息
2. `addEnvironment(name, value)` - 指定一个环境变量的更多信息

> **注意**：待定，无代码片段

##### 7.1.4. 待定

- 当前的附件被添加到测试用例中，而不是当前的步骤中。这需要在 allure-js-commons 中进行修复。
- 新增对特性的支持。
- 新增对 Jasmine1 的支持。现在只有 Jasmine2 可用(但我们真的需要这个吗?)
- 添加使用反射来装饰页面对象的功能，这样我们就不需要编写与所有内容相关的样板文件来将我们自己绑定到一个特定的报告器。

##### 7.1.5. 开发者

查看系统测试，以快速检查 reporter 实际中如何工作:
```bash
node_modules/protractor/bin/protractor ./test/system/conf.js
```

<div id="_cucumber_js"></div>

#### 7.2. Cucumber JS

> **注意**：Allure report 版本: 1.4.15

##### 7.2.1. 用法

在功能的软件包中添加 `reporter.js` 文件:

```javascript
var reporter = require('cucumberjs-allure-reporter');
reporter.config(
    {...}
);
module.exports = reporter;
```

支持的配置关键字：
- targetDir - Allure 保存结果 xml 文件的目录
- labels - 自定义标签

例如:
```javascript
labels : {
        feature: [/sprint-(\d*)/, /release-(\d)/, /area-(.*)/],
        issue: [/(bug-\d*)/]
    }
```

可能的标签：
- feature
- story
- severity
- language
- framework
- issue
- testId
- host
- thread

如果您想取消步骤或测试，只需抛出带有 'Step cancelled' 或者 'Test cancelled' 消息的新错误。

##### 7.2.2. 通过 Allure 生成 HTML 报告

`targetDir` 中会生成 xml 文件，然后我们需要从中生成 HTML。您可以使用 Maven。从 `node_modules/cucumberjs-allure-reporter` 复制准备使用的 `pom.xml` 并运行:

```bash
mvn site -Dallure.results_pattern=allure-results
```

它将把 HTML 文件放到 `target/site/allure-maven-plugin` 文件夹中，并通过 `localhost:1234` 访问:
```bash
mvn jetty:run -Djetty.port=1234
```

除此之外，也可以选择其他方法来生成 HTML。

##### 7.2.3. 开发者

执行测试用例：
```bash
./node_modules/.bin/cucumber.js features/<FEATURE_NAME>.feature
```

可用的测试:
- basic → 基本测试结果
- description → 场景描述测试
- label → cucumber 标签(目前在生成的报告中看不到标签…)
- exception → 测试抛出异常
- attachments → docStrings 和 dataTable 测试
- scenarioOutline → 场景大纲测试
- subSteps → 使用 allure 对象添加子步骤

或者运行所有的用例：
```bash
./node_modules/.bin/cucumber.js features/
```

要检查量角器截屏测试，请安装 `protractor` 和 `protractor-cucumber-framework`，然后运行测试: 
```bash
./node_modules/protractor/bin/protractor miscellaneous/protractorScreenshot/conf.js
```

检查基本的 logging：
```bash
./node_modules/.bin/cucumber.js miscellaneous/logging
```

检查基本的 configuration：
```bash
./node_modules/.bin/cucumber.js miscellaneous/configuration
```

检查自定义 tag：
```bash
./node_modules/.bin/cucumber.js miscellaneous/customTagNames
```

##### 7.2.4. 发布说明

01/09/2016 version 1.0.3
- 增加了取消步骤和测试的能力

11/07/2016 version 1.0.2
- 新增依赖 cucumber (>= 1.2.0) 

06/07/2016 version 1.0.1
- 依赖更新：allure-js-commons, protractor, cucumber 和 protractor-cucumber-framework
- 修复 cucumber 异常处理 - getPayload will not be available in upcoming cucumber major release
- 更新数据表和文档字符串处理

02/12/2015 version 1.0.0
- 更新插件支持 cucumber 0.9.1

01/09/2015 version 0.0.1
- 第一次发布

<div id="_karma"></div>

#### 7.3. Karma

Allure XML 格式的生成器，用以制作一份详细的报告

##### 7.3.1. karma-allure-reporter

将 karma-allure-reporter 作为开发依赖安装到项目中
```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-allure-reporter": "~1.0.0"
  }
}
```

你可以简单操作如下：
```bash
npm install karma-allure-reporter --save-dev
```

##### 7.3.2. Configuration

在 `reporters` 处增加 allure。 Allure-reporter 有一个单独的配置在 `reportDir`，默认情况下，文件保存在该目录中。
```json
// karma.conf.js
module.exports = function(config) {
  config.set({
    reporters: ['progress', 'allure'],

    // the default configuration
    allureReport: {
      reportDir: '',
    }
  });
};
```

您也可以将 reporters 列表作为 CLI 参数传递:

```bash
karma start --reporters allure,dots
```

##### 7.3.3. API

有了allure reporter，你可以得到一些功能来提供关于测试的额外信息。所有函数都可以作为全局 allure 对象的方法。

- `description(description)` 为当前测试用例指定一个描述
- `severity(severity)` 为当前测试案例指定一个严重性。枚举为属性的可能值，例如：`allure.severity.BLOCKER`。按其重要性递减: 
  - BLOCKER
  - CRITICAL
  - NORMAL
  - MINOR
  - TRIVIAL
- `createStep(name, stepFunction)` 定义测试步骤。返回包装函数，报告每一步调用。Step 函数可以相互嵌套。它是 allure 最强大的特性，因为它允许编写自我文档化的测试，报告它的每一步。 

有关这些特性及其用途的更多信息，请参阅[文档](https://github.com/allure-framework/allure/blob/master/docs/dictionary.md)。

##### 7.3.4. 举例

你可以在一个[样例项目](https://github.com/allure-examples/allure-karma-example)中看看 allure-reporter 的应用。
更多关于 Allure 的信息，请看 [Allure core](https://github.com/allure-framework/allure) 项目。
有关 Karma 的更多信息，请查看 [Karma 主页](http://karma-runner.github.com/)。

<div id="_mocha"></div>

#### 7.4. Mocha

##### 7.4.1. mocha-allure-reporter

Allure 报告的 Mocha 框架

##### 7.4.2. 安装

假设你已经安装了 mocha，可以通过 npm 安装 reporter:
```bash
npm install mocha-allure-reporter
```

然后用它来做其他的 mocha reporter：
```bash
mocha --reporter mocha-allure-reporter
```

运行测试后，您将在 `allure-results` 目录中获得原始测试结果。关于如何从原始结果生成报告，请参阅[生成器列表](https://github.com/allure-framework/allure-core/wiki#generating-a-report)。

还可以查看 [mocha-allure-example](https://github.com/allure-examples/mocha-allure-example)，看看它的实际应用。

##### 7.4.3. 支持的选项

- targetDir (string) - 存储测试结果的目录

##### 7.4.4. Runtime API

Allure是一个测试框架，它提供了比平常更多的测试数据。一旦添加 `mocha-allure-reporter` 就可以使用以下 API 创建全局 `allure` 对象:

- `allure.createStep(name, stepFn)` – 定义步骤。该函数每次调用的结果都将记录到报表中。
- `allure.createAttachement(name, content, [type])` – 保存附件到测试。如果你在 step 函数内部或在它执行的过程中调用它(例如通过承诺异步调用)，附件将被保存到 step 函数中。
  - `name` (String) - 附件的名字。注意，它不是文件的名称，而是实际的文件名。
  - `content` (Buffer,String,Function) – 附件内容。如果您传递缓冲区或字符串，它将立即保存到文件。如果您正在传递函数，您将获得修饰函数，并且您可以多次调用它来触发附件。第二种情况的一般目的是创建用于截图的应用函数。您可以只为测试框架定义一次函数，然后在每次需要截图时调用它。
  - `type` (String, optional) – 附件的 mime 类型。如果忽略了这个参数，我们将尝试通过 [file-type](https://github.com/sindresorhus/file-type) 库自动检测类型
- `allure.description(description)` – 如果测试名称不够，则设置详细的测试描述。 
- `allure.severity(severity)` – 设置测试严重程度：`blocker`, `critical`, `normal`, `minor`, `trivial`。也可以使用 `allure.SEVERITY.BLOKER`
- `allure.feature(featureName)` – 分配特征测试
- `allure.story(storyName)` – 分配用户故事进行测试。详细信息请参阅[文档](https://github.com/allure-framework/allure-core/wiki/Features-and-Stories)
- `allure.addArgument(name, value)` - 提供测试中使用的参数。与其他语言不同，javascript 测试方法通常没有特殊的参数(只有回调)，因此开发人员使用其他方法填充参数以进行测试。这种方法只是为了Allure
- `allure.addEnvironment(name, value)` - 保存环境信息。类似于 `addArgument` 方法，但是它被设计用来存储更详细的数据，比如到测试页面或使用的包版本的 HTTP 链接。

----

<div id="_ruby"></div>

## 8. Ruby

<div id="_cucumber"></div>

#### 8.1. Cucumber

这章节将介绍 Cucumber 框架下使用 Allure 的方法。 

##### 8.1.1. 安装

添加以下内容到你的 Gemfile：
```ruby
gem 'allure-cucumber'
```

然后执行：
```bash
$ bundle
```

或者自行安装：
```bash
$ gem install allure-cucumber
```

##### 8.1.2. 配置

默认情况下，Allure XML 文件存储在 `gen/allure-results` 中。要自定义存储位置，请在 `features/support/env.rb` 中添加以下内容:

```ruby
AllureCucumber.configure do |c|
   c.output_dir = "/output/dir"
end
```

默认情况下，在新运行开始时会删除以前运行的 Allure XML 文件。可以通过以下方式禁用:
```ruby
AllureCucumber.configure do |c|
  c.clean_dir  = false
end
```

默认情况下，allure-cucumber 会分析 cucumber 标签来设置与测试管理、缺陷管理和严重程度的钩子。这些钩子将会显示在生成的 Allure 报告中(更多信息请参见 allure-core)。

```ruby
    DEFAULT_TMS_PREFIX      = '@TMS:'
    DEFAULT_ISSUE_PREFIX    = '@ISSUE:'
    DEFAULT_SEVERITY_PREFIX = '@SEVERITY:'
```

举个例子：
```ruby
  @SEVERITY:trivial @ISSUE:YZZ-100 @TMS:9901
  Scenario: Leave First Name Blank
    When I register an account without a first name
    Then exactly (1) [validation_error] should be visible
```

您可以通过进行以下更改来配置 allure-cucumber：

```ruby
AllureCucumber.configure do |c|
  c.clean_dir  = false
  c.tms_prefix      = '@HIPTEST--'
  c.issue_prefix    = '@JIRA++'
  c.severity_prefix = '@URGENCY:'
end
```

举个例子：
```ruby
  @URGENCY:critical @JIRA++YZZ-100 @HIPTEST--9901
  Scenario: Leave First Name Blank
    When I register an account without a first name
    Then exactly (1) [validation_error] should be visible
```

##### 8.1.3. 用法

将以下内容放在您的 `features/support/env.rb` 文件:
```ruby
require 'allure-cucumber'
```

执行 cucumber 时使用 `--format AllureCucumber::Formatter --out where/you-want-results` 或者将其增加到 cucumber.yml

您还可以将屏幕截图、日志或测试数据作为[附件](https://github.com/allure-framework/allure-core/wiki/Glossary#attachment)附加到[步骤](https://github.com/allure-framework/allure-core/wiki/Glossary#test-step)中。

```ruby
 #file: features/support/env.rb
 include AllureCucumber::DSL
 attach_file(title, file)
```

##### 8.1.4. 如何生成报告

此适配器只生成包含测试信息的 XML 文件。关于如何生成报告，请参阅[wiki部分](https://github.com/allure-framework/allure-core/wiki#generating-report)。

<div id="_rspec"></div>

#### 8.2. RSpec

适配器使用 Allure 框架 和 RSpec。可以参阅[示例项目](https://github.com/allure-examples/allure-rspec-example)以进行快速浏览。

##### 8.2.1. 新功能

参阅 [releases](https://github.com/allure-framework/allure-rspec/releases) 列表。

##### 8.2.2. 设置

将依赖项添加到您的 Gemfile 中。仔细选择版本:

- 0.5.x - for RSpec2.
- ⇐ 0.6.7 - for RSpec < 3.2.
- &nbsp;>= 0.6.9 - for RSpec >= 3.2.

```ruby
gem 'allure-rspec'
```

然后把它包含在你的 spec_helper.rb 中:

```ruby
    RSpec.configure do |c|
      c.include AllureRSpec::Adaptor
    end
```

##### 8.2.3. 高级选项

您可以指定 Allure 测试结果的目录。默认目录是在当前目录下的 `gen/allure-results` 。

```ruby
    AllureRSpec.configure do |c|
      c.output_dir = "/whatever/you/like" # default: gen/allure-results
      c.clean_dir = false # clean the output directory first? (default: true)
      c.logging_level = Logger::DEBUG # logging level (default: DEBUG)
    end
```

##### 8.2.4. 用法示例

```ruby
describe MySpec, :feature => "Some feature", :severity => :normal do

  before(:step) do |s|
    puts "Before step #{s.current_step}"
  end

  it "should be critical", :story => "First story", :severity => :critical, :testId => 99 do
    "string".should == "string"
  end

  it "should be steps enabled", :story => ["First story", "Second story"], :testId => 31 do |e|

    e.step "step1" do |s|
      s.attach_file "screenshot1", take_screenshot_as_file
    end

    e.step "step2" do
      5.should be > 0
    end

    e.step "step3" do
      0.should == 0
    end

    e.attach_file "screenshot2", take_screenshot_as_file
  end
end
```

----

<div id="_groovy"></div>

## 9. Groovy

<div id="_spock"></div>

#### 9.1. Spock

Spock 框架源码 [https://github.com/spockframework/spock](https://github.com/spockframework/spock)

##### 9.1.1. Spock 框架兼容性

- spock-0.7 - [0.7-groovy-2.0](http://repo1.maven.org/maven2/org/spockframework/spock-core/0.7-groovy-2.0/)
- spock-1.0 - [1.0-groovy-2.0-SNAPSHOT](https://oss.sonatype.org/content/repositories/snapshots/org/spockframework/spock-core/1.0-groovy-2.0-SNAPSHOT/)

----

<div id="_php"></div>

## 10. PHP

<div id="_phpunit"></div>

#### 10.1. PHPUnit

这是 Allure 框架的官方 PHPUnit 适配器，Allure 框架是一个灵活的、轻量级的、多语言的框架，用于编写自编文档的测试。

##### 10.1.1. 作用

此适配器的主要目的是收集有关测试的信息，并将其写入一组 XML 文件: 一个测试类一个 XML 文件。然后，您可以使用独立的命令行工具或流行的持续集成系统的插件来生成一个 HTML 页面，以良好的形式显示您的测试。

##### 10.1.2. 示例项目

示例项目地址：[https://github.com/allure-framework/allure-phpunit-example](https://github.com/allure-framework/allure-phpunit-example)

##### 10.1.3. 如何生成报告

此适配器仅生成包含测试信息的 XML 文件。有关如何生成报告，请参阅 [wiki 部分](https://github.com/allure-framework/allure-core/wiki#generating-report)。

##### 10.1.4. 安装和使用

> **提示**：此适配器只支持 Allure 1.4.x。为了使用此适配器，您需要向 **composer.json** 中添加一个新的依赖项:

```json
{
    "require": {
        "php": ">=5.4.0",
        "allure-framework/allure-phpunit": "~1.2.0"
    }
}
```

然后在 **phpunit.xml** 文件中添加 Allure 测试监听器:

```xml
<listeners>
    <listener class="Yandex\Allure\Adapter\AllureAdapter" file="vendor/allure-framework/allure-phpunit/src/Yandex/Allure/Adapter/AllureAdapter.php">
        <arguments>
            <string>build/allure-results</string> <!-- XML files output directory -->
            <boolean>true</boolean> <!-- Whether to delete previous results on rerun -->
            <array> <!-- A list of custom annotations to ignore (optional) -->
                <element key="0">
                    <string>someCustomAnnotation</string>
                </element>
            </array>
        </arguments>
    </listener>
</listeners>
```

在运行 PHPUnit 测试之后，会创建一个新文件夹(上面示例中是 **build/allure-results**)。这个文件夹将包含生成的 XML 文件。有关如何从 XML 文件生成报告的详细信息，请参见[框架帮助](https://github.com/allure-framework/allure-core/wiki)。默认情况下，生成的报告将只显示有限的一组信息，但是您可以通过增加比较的代码改动来使用炫酷的 Allure 功能。详情请阅读下一节。

##### 10.1.5. 主要特性

这个适配器附带了一组 PHP 注释和特性，允许使用主要的 Allure 特性。

**可读的测试类或测试方法标题**

为了给任何测试类或[测试用例](https://github.com/allure-framework/allure-core/wiki/Glossary#test-case)方法添加这样的标题，你需要用 `@Title` 注释:

```php
namespace Example\Tests;

use PHPUnit_Framework_TestCase;
use Yandex\Allure\Adapter\Annotation\Title;

/**
 * @Title("Human-readable test class title")
 */
class SomeTest extends PHPUnit_Framework_TestCase
{
    /**
     * @Title("Human-readable test method title")
     */
    public function testCase()
    {
        //Some implementation here...
    }
}
```

**扩展测试类或测试方法描述**

类似地，您可以为每个测试类和测试方法添加详细的描述。要添加这样的描述，只需使用 `@Description` 注释:

```php
namespace Example\Tests;

use PHPUnit_Framework_TestCase;
use Yandex\Allure\Adapter\Annotation\Description;
use Yandex\Allure\Adapter\Model\DescriptionType;

/**
 * @Description("Detailed description for test class")
 */
class SomeTest extends PHPUnit_Framework_TestCase
{
    /**
     * @Description(value = "Detailed description for <b>test class</b>.", type = DescriptionType::HTML)
     */
    public function testCase()
    {
        //Some implementation here...
    }
}
```

描述可以以纯文本、HTML 或 Markdown 格式添加 — 只需分配不同的 `type` 值。

**设置测试严重性**

`@Severity` 用于根据严重程度对测试方法进行优先级排序: 

```php
namespace Example\Tests;

use PHPUnit_Framework_TestCase;
use Yandex\Allure\Adapter\Annotation\Severity;
use Yandex\Allure\Adapter\Model\SeverityLevel;

class SomeTest extends PHPUnit_Framework_TestCase
{
    /**
     * @Severity(level = SeverityLevel::MINOR)
     */
    public function testCase()
    {
        //Some implementation here...
    }
}
```

**指定测试参数信息**

为了添加关于测试方法[参数](https://github.com/allure-framework/allure-core/wiki/Glossary#parameter)的信息，你应该使用 `@Parameter` 注释:

```php
namespace Example\Tests;

use PHPUnit_Framework_TestCase;
use Yandex\Allure\Adapter\Annotation\Parameter;
use Yandex\Allure\Adapter\Model\ParameterKind;

class SomeTest extends PHPUnit_Framework_TestCase
{
    /**
     * @Parameter(name = "param1", value = "value1")
     * @Parameter(name = "param2", value = "value2", kind = ParameterKind::SYSTEM_PROPERTY)
     */
    public function testCase()
    {
        //Some implementation here...
    }
}
```

**映射测试类和测试方法到特性和故事**

在一些开发方法中，测试是按故事和特性分类的。如果你正在使用这个，那么你可以用 `@Stories` 和 `@Features` 注释你的测试:

```php
namespace Example\Tests;

use PHPUnit_Framework_TestCase;
use Yandex\Allure\Adapter\Annotation\Features;
use Yandex\Allure\Adapter\Annotation\Stories;

/**
 * @Stories({"story1", "story2"})
 * @Features({"feature1", "feature2", "feature3"})
 */
class SomeTest extends PHPUnit_Framework_TestCase
{
    /**
     * @Features({"feature2"})
     * @Stories({"story1"})
     */
    public function testCase()
    {
        //Some implementation here...
    }
}
```

然后您将能够在生成的 Allure 报告中通过特定的功能和故事过滤测试。

**报告添加附件**

如果你想[附加](https://github.com/allure-framework/allure-core/wiki/Glossary#attachment)一些在 PHPUnit 运行期间生成的文件(屏幕快照，日志文件，转储文件等等)到报告上，那么你需要在你的测试类中使用 **AttachmentSupport** :

```php
namespace Example\Tests;

use PHPUnit_Framework_TestCase;
use Yandex\Allure\Adapter\Support\AttachmentSupport;

class SomeTest extends PHPUnit_Framework_TestCase
{

    use AttachmentSupport;

    public function testCase()
    {
        //Some implementation here...
        $filePath = $this->outputSomeContentToTemporaryFile();
        $this->addAttachment($filePath, 'Attachment human-readable name', 'text/plain');
        //Some implementation here...
    }

    private function outputSomeContentToTemporaryFile()
    {
        $tmpPath = tempnam(sys_get_temp_dir(), 'test');
        file_put_contents($tmpPath, 'Some content to be outputted to temporary file.');
        return $tmpPath;
    }

}
```

为了创建一个[附件](https://github.com/allure-framework/allure-core/wiki/Glossary#attachment)，只需调用 `AttachmentSupport::addAttachment()` 方法。此方法接受附件类型、可读的名称和一个字符串，该字符串存储我们需要附加的文件或文件内容的完整路径。

**将测试方法划分为步骤**

Allure 框架还支持一种叫做 steps 的实用特性。考虑以下，一个内部具有复杂逻辑和多个断言的测试，当抛出一个异常或一个断言失败时，有时很难确定是哪个断言导致了失败。Allure 步骤允许将测试方法逻辑划分为几个独立的部分，具有独立的运行状态，比如 **passed** 或 **failed** 。这样可以更清楚地了解到底发生了什么。为了使用步骤，只需在你的测试类中导入 **StepSupport** :

```php
namespace Example\Tests;

use PHPUnit_Framework_TestCase;
use Yandex\Allure\Adapter\Support\StepSupport;

class SomeTest extends PHPUnit_Framework_TestCase
{

    use StepSupport;

    public function testCase()
    {
        //Some implementation here...
        $this->executeStep("This is step one", function () {
            $this->stepOne();
        });

        $this->executeStep("This is step two", function () {
            $this-stepTwo();
        });

        $this->executeStep("This is step three", function () {
            $this->stepThree('someArgument');
        });
        //Some implementation here...
    }

    private function stepOne()
    {
        //Some implementation here...
    }

    private function stepTwo()
    {
        //Some implementation here...
    }

    private function stepThree($argument)
    {
        //Some implementation here...
    }

}
```

整个测试方法的执行状态将依赖于每一个步骤，但是关于步骤状态的信息将被单独存储。

<div id="_allurecodeception"></div>

#### 10.2. ALLURECodeception

这是 Allure 框架的 [Codeception](http://codeception.com/) 官方合作适配器。

##### 10.2.1. 作用

此适配器的主要目的是积累有关测试的信息，并将其写入一组 XML 文件: 一个测试类是一个 XML 文件。此适配器仅生成包含测试信息的 XML 文件。有关如何生成报告，请参阅 [wiki 部分](https://github.com/allure-framework/allure-core/wiki#generating-report)。

##### 10.2.2. 示例项目

示例项目地址：[https://github.com/allure-examples/allure-codeception-example](https://github.com/allure-examples/allure-codeception-example)

##### 10.2.3. 安装和用法

为了使用此适配器，您需要添加一个新的依赖项到你的 **composer.json** 文件:

```json
{
    "require": {
        "php": ">=5.4.0",
        "allure-framework/allure-codeception": "~1.1.0"
    }
}
```

要在 Codeception 测试中启用此适配器，只需将其放入 **codeception.yml** 的 “enabled” 扩展部分:

```yaml
extensions:
    enabled:
        - Yandex\Allure\Adapter\AllureAdapter
    config:
        Yandex\Allure\Adapter\AllureAdapter:
            deletePreviousResults: false
            outputDirectory: allure-results
```

`deletePreviousResults` 将清除输出目录中的所有 .xml 文件(这将对完成后的清除工作造成影响)。默认情况下它被设置为 `false`。

`outputDirectory` 用于存储 Allure 结果，并且会相对于 Codeception 的输出目录灵活生成(即 codeception.yml 中的 `paths: log`)，除非你指定了一个绝对路径。您也可以使用 `..` 这样的路径，`outputDirectory` 默认为 `allure-results`。

通过你最喜欢的终端生成报告，可以[安装](https://github.com/allure-framework/allure-cli#installation) allure-cli 并运行以下命令(假设您在项目根目录下并使用默认配置)

```bash
allure generate --report-version 1.4.5 --report-path tests/_output/allure-report -- tests/_output/allure-results
```

报告生成在 `tests/_output/allure-report`

##### 10.2.4. 主要功能

请参阅 [PHPUnit](https://github.com/allure-framework/allure-phpunit#advanced-features) 部分。

----

<div id="__net"></div>

## 11. .NET

<div id="_specflow"></div>

#### 11.1. SpecFlow

##### 11.1.1. 安装

1. 下载 [SpecFlow.Allure](https://www.nuget.org/packages/SpecFlow.Allure/) NuGet 软件包
2. 配置 App.config 使用插件
3. 配置 AllureConfig.json
4. 使用任意测试执行器运行测试
  - [Allure SpecFlow](https://github.com/allure-framework/allure-csharp/wiki/SpecFlow-Adapter) wiki

<div id="_nunit_3"></div>

#### 11.2. NUnit 3

##### 11.2.1. 安装和使用

1. 下载 [NUnit.Allure](https://www.nuget.org/packages/NUnit.Allure/) NuGet 软件包
2. 配置 AllureConfig.json
3. 添加 [AllureNUnit] 属性在你想使用 Allure 的测试类，如果有需要，可以添加更多的属性
4. 使用任意测试执行器运行测试，Allure 报告会生成在 AllureConfig.json 配置的目录中

##### 11.2.2. 配置示例

allureConfig.json 示例

```json
{
  "allure": {
    "directory": "allure-results",
    "links": [
      "{link}",
      "https://testrail.com/browse/{tms}",
      "https://jira.com/browse/{issue}"
    ]
  },
  "specflow": {
    "stepArguments": {
      "convertToParameters": "true",
      "paramNameRegex": "",
      "paramValueRegex": ""
    },
    "grouping": {
      "suites": {
        "parentSuite": "^parentSuite:?(.+)",
        "suite": "^suite:?(.+)",
        "subSuite": "^subSuite:?(.+)"
      },
      "behaviors": {
        "epic": "^epic:?(.+)",
        "story": "^story:(.+)"
      }
    },
    "labels": {
      "owner": "^author:?(.+)",
      "severity": "^(normal|blocker|critical|minor|trivial)"
    },
    "links": {
      "tms": "^story:(.+)",
      "issue": "^issue:(.+)",
      "link": "^link:(.+)",
    }
  }
}
```

##### 11.2.3. 测试示例

```csharp
[TestFixture]
[AllureNUnit]
[AllureDisplayIgnored]
class TestClass
{
    [Test(Description = "XXX")]
    [AllureTag("Regression")]
    [AllureSeverity(SeverityLevel.critical)]
    [AllureIssue("ISSUE-1")]
    [AllureTms("TMS-12")]
    [AllureOwner("User")]
    [AllureSuite("PassedSuite")]
    [AllureSubSuite("NoAssert")]
    public void TestSample()
    {
        Console.WriteLine(DateTime.Now);
    }
}
```

##### 11.2.4. 链接

- [Allure CSharp](https://github.com/allure-framework/allure-csharp/wiki/Allure.Commons)
- [Allure SpecFlow](https://github.com/allure-framework/allure-csharp/wiki/SpecFlow-Adapter)
- [Allure NUnit 3](https://github.com/unickq/allure-nunit/wiki)

<div id="_nunit_2"></div>

#### 11.3. NUnit 2

##### 11.3.1. 安装和使用

1. 从[官网](http://www.nunit.org/)下载 NUnit **2.6.3** 或 **2.6.4**;
2. 下载 [allure-nunit2](https://github.com/allure-framework/allure-nunit/releases) 最新版本(版本在括号中指定);
3. 将二进制文件解压到 **%NUnit_installation_directory%\bin\addins**;
4. **注意**: 插件在 **Tools → Addins..** 中将不可见。因为它是基于 **.NET 4.0** 构建的;
5. 在 **%NUnit_installation_directory%\bin\addins\config.xml** 中指定生成 **xml** 文件的任何文件夹(此文件夹将自动创建)的绝对路径(例如: `<results-path>C:\test-results\AllureResults</results-path>` or `<results-path>/home/user/test-results/AllureResults</results-path>`)
6. 您还可以在配置中指定是否希望在测试失败后进行截屏，以及是否希望将测试输出写入附件;
7. 使用 **NUnit GUI** 或使用 **.NET 4.0** 的 nunit-console 运行测试(例如: nunit-console YourAssembly.dll /framework=net-4.0);
8. 在所有测试完成后，您将看到在步骤 5 中指定的带有生成的 **xml** 文件的新文件夹。

##### 11.3.2. 如何生成报告

此适配器仅生成包含测试信息的 XML 文件。有关如何生成报告，请参阅 [wiki 部分](https://github.com/allure-framework/allure-core/wiki#generating-report)。

##### 11.3.3. 更多内容

- [关于适配器配置](http://ilya-murzinov.github.io/articles/allure-csharp/))
- [Allure NUnit Wiki](https://github.com/allure-framework/allure-csharp-commons/wiki)
- [Allure CSharp New](https://github.com/allure-framework/allure-csharp/wiki/Allure.Commons)
- [Allure SpecFlow](https://github.com/allure-framework/allure-csharp/wiki/SpecFlow-Adapter)
- [Allure NUnit 3](https://github.com/unickq/allure-nunit/wiki)

<div id="_mstest"></div>

#### 11.4. MSTest

**MSTestAllureAdapter** 允许您将 MSTest trx 文件转换为可以生成 Allure 报告的 xml 文件。

因为 MSTest 没有扩展或钩子机制，所以此适配器不能作为 MSTest 的一部分运行，而是将生成的 trx 文件转换为 allure 所期望的 xml 格式。

它是一个基于 .NET/Mono 的控制台应用程序。

##### 11.4.1. 用法

```bash
MSTestAllureAdapter.Console.exe <TRX file> [output target dir]
```

如果缺少 `[output target dir]`，那么结果将保存在当前目录的一个名为 `results` 的文件夹中。

```bash
$ mono MSTestAllureAdapter.Console.exe sample.trx
```

把 'sample.trx' 文件生成 allure 报告所需要的 xml 文件。

```bash
$ mono MSTestAllureAdapter.Console.exe sample.trx output-xmls
```

把 `output-xmls` 转换成 Allure 报告，如果目标目录不存在，则会自动创建它，使用 [allure-cli](https://github.com/allure-framework/allure-cli/releases/tag/allure-cli-2.1) 生成报告:


```bash
$ allure generate output-xmls -v 1.4.0
```

----

<div id="_scala"></div>

## 12. Scala

<div id="_scalatest"></div>

#### 12.1. ScalaTest

这个适配器允许从 [ScalaTest](http://www.scalatest.org/) 框架检索测试执行数据，并将其转换为适合[生成 Allure 报告](https://github.com/allure-framework/allure-core/wiki#generating-report)的形式。


##### 12.1.1. 示例项目

示例项目地址：[https://github.com/allure-framework/allure-scalatest-examp](https://github.com/allure-framework/allure-scalatest-examp)

##### 12.1.2. 安装、配置和使用

这个适配器需要安装 **JDK 1.7+** 环境，然后只需在 build.sbt 中添加以下依赖项:

```scala
libraryDependencies += "ru.yandex.qatools.allure" % "allure-scalatest_2.10" % "1.4.0-SNAPSHOT"
```

在 build.sbt 中添加 **AllureReporter**:

```scala
testOptions in Test ++= Seq(
    Tests.Argument(TestFrameworks.ScalaTest, "-oD"),
    Tests.Argument(TestFrameworks.ScalaTest, "-C", "ru.yandex.qatools.allure.scalatest.AllureReporter")
)
```

在使用此适配器时，您可能会遇到以下警告:

```text
[ScalaTest-dispatcher] WARN ru.yandex.qatools.allure.utils.AllureResultsUtils - Can't set "com.sun.xml.bind.marshaller.CharacterEscapeHandler" property to given marshaller
javax.xml.bind.PropertyException: name: com.sun.xml.bind.marshaller.CharacterEscapeHandler value: ru.yandex.qatools.allure.utils.BadXmlCharacterEscapeHandler@5e652b7b
    at javax.xml.bind.helpers.AbstractMarshallerImpl.setProperty(AbstractMarshallerImpl.java:358)
    at com.sun.xml.internal.bind.v2.runtime.MarshallerImpl.setProperty(MarshallerImpl.java:527)
    at ru.yandex.qatools.allure.utils.AllureResultsUtils.setPropertySafely(AllureResultsUtils.java:199)
    at ru.yandex.qatools.allure.utils.AllureResultsUtils.marshaller(AllureResultsUtils.java:171)
    at ru.yandex.qatools.allure.utils.AllureResultsUtils.writeTestSuiteResult(AllureResultsUtils.java:148)
    at ru.yandex.qatools.allure.Allure.fire(Allure.java:180)
    at ru.yandex.qatools.allure.scalatest.AllureReporter.testSuiteFinished(AllureReporter.scala:74)
    at ru.yandex.qatools.allure.scalatest.AllureReporter.apply(AllureReporter.scala:46)
    at org.scalatest.DispatchReporter$Propagator$$anonfun$run$1.apply(DispatchReporter.scala:240)
    at org.scalatest.DispatchReporter$Propagator$$anonfun$run$1.apply(DispatchReporter.scala:239)
    at scala.collection.immutable.List.foreach(List.scala:318)
    at org.scalatest.DispatchReporter$Propagator.run(DispatchReporter.scala:239)
    at java.lang.Thread.run(Thread.java:744)
```

这与 Allure 和 Scalatest 中使用的 JAXB 版本不兼容有关，所以您可以放心地忽略它。

##### 12.1.3. 如何生成报告

此适配器仅生成包含测试信息的 XML 文件。关于如何生成报告，请参阅 [wiki 部分](https://github.com/all-framework/all-core/wiki #generating-report)。

##### 12.1.4. 发布到 Sonatype (适配器开发)

默认的 GPG 密匙环中应该有一个公共可用的(在公共 keyserver 上) GPG 密匙。您需要在 `~/.sbt/<sbt-version>/` 下创建 **sonatype.sbt** 文件：

```scala
credentials += Credentials("Sonatype Nexus Repository Manager",
                           "oss.sonatype.org",
                           "login",
                           "password")
```

简单运行一下即可发布:

```bash
$ sbt publish-signed
```
<div id="_specs"></div>

#### 12.2. Specs

这个适配器允许从 Specs 框架检索测试执行数据，并将其转换为适合生成 Allure 报告的形式。

##### 12.2.1. 示例项目

示例项目地址：[https://github.com/allure-framework/allure-specs-example](https://github.com/allure-framework/allure-specs-example)

##### 12.2.2. 用法

适配器需要安装 **JDK 1.7+** ，然后只需在 build.sbt 中添加以下依赖项:

```scala
libraryDependencies += "ru.yandex.qatools.allure" % "allure-specs2_2.10" % "1.4.0-SNAPSHOT"
```

然后添加 AllureReporter 到 build.sbt：

```scala
testOptions in Test ++= Seq(
  Tests.Argument(TestFrameworks.Specs2, "notifier", "ru.yandex.qatools.allure.specs2.AllureNotifier")
)
```

----

## 13. 报告

适配器创建 XML 文件后，可以使用以下工具之一生成 Allure 报告

#### 13.1. 命令行

使用 Allure 命令行工具，您可以从现有的 Allure 结果生成报告。

##### 13.1.1. 安装

Allure CLI 是一个Java应用程序，所以它适用于所有平台。在使用 Allure CLI 之前，您必须手动安装 Java 1.8

**Mac OS**

你可以通过 [Homebrew](http://brew.sh/) 安装 Allure CLI

```bash
$ brew tap qameta/allure
$ brew install allure
```

安装后，您将有 allure 命令可用。了解更多关于 [Allure Homebrew Formula](https://formulae.brew.sh/formula/allure) 。

**Debian**

对于基于 Debian 的源，我们提供了一个 PPA，所以安装很简单:

```bash
$ sudo apt-add-repository ppa:yandex-qatools/allure-framework
$ sudo apt-get update
$ sudo apt-get install allure-commandline
```

支持的发行版是: [Trusty](http://releases.ubuntu.com/14.04) 和 [Precise](http://releases.ubuntu.com/12.04)。安装后，您将有 allure 命令可用。了解更多关于 [Allure Debian 软件包](https://github.com/allure-framework/allure-debian)。

**Windows 和 其他 Unix**

- 从 [Maven Central](http://repo.maven.apache.org/maven2/io/qameta/allure/allure-commandline/) 下载最新版本的 zip 文件。
- (老版本,⇐2.8.0) 从 [bintray](https://bintray.com/qameta/generic/allure2) 下载所需版本的 zip 包。
- 解压到 **allure-commandline** 目录。
- 软链接到 **bin** 目录。
- Windows 使用 **allure.bat** ，其他 Unix 系统使用 **allure**
- 添加 **allure** 到系统 PATH。

##### 13.1.2. 配置

**命令行选项**

命令行可以使用一些选项，执行以下命令来查看它们：

```bash
$ allure help
```

**用法**

可用的命令并不多

**生成报告**

要从现有的 Allure 结果生成报告，你可以使用以下命令:

```bash
$ allure generate <directory-with-results>
```

报告将生成到 **allure-report** 文件夹下。当然，你可以使用 **-o** 来改变目标文件夹:

```bash
$ allure generate <directory-with-results> -o <directory-with-report>
```

有关更多信息，请使用 `allure help` 命令。

**打开报告**

生成报表后，可以在默认的系统浏览器中打开它。只要运行

```bash
$ allure open <directory-with-report>
```

> **提示**：还可以使用 `allure serve` 命令，将报表生成到临时文件夹并打开它。

**清理报告**

如果要删除生成的报表数据，请使用 `allure report clean` 命令。

默认情况下，报表命令将在 **allure-results** 文件夹中查找报表。如果您想从不同的位置使用报表，您可以使用 **-o** 选项。

#### 13.2. Jenkins

##### 13.2.1. 安装

安装指南的第一部分是关于 Allure 插件及其命令行工具的全局安装。注意，与之前的版本不同，Jenkins Allure 插件 2.11 不需要配置 Jenkins 内容安全策略属性。

1. 在插件管理页安装最新版的 [Allure Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Allure+Plugin)
2. 打开插件的高级设置（在 **<your_jenkins_host>/pluginManager/advanced**)
3. 点击右上角 "Check Updates" 按钮
4. 在 “Global Tools Configuration” 配置 Allure 命令行

**Build agents have connection to Maven repository with Allure distribution**

1. 打开 "Global Tool Configuration"
2. 找到 "Allure Commandline" 配置部分
![Find Allure Commandline](https://docs.qameta.io/allure/images/jenkins_plugin_find_cmd.jpeg)
3. 点击 "Add Allure Commandline" 按钮
![Install Allure Commandline](https://docs.qameta.io/allure/images/jenkins_plugin_install.jpeg)
4. 填写名称并从 “From Maven Central” 下拉框选择版本

同样的效果可以使用系统 groovy 脚本：
```groovy
import ru.yandex.qatools.allure.jenkins.tools.*
import hudson.tools.InstallSourceProperty
import hudson.tools.ToolProperty
import hudson.tools.ToolPropertyDescriptor
import hudson.util.DescribableList

def isp = new InstallSourceProperty()
def autoInstaller = new AllureCommandlineInstaller("2.6.0")
isp.installers.add(autoInstaller)

def proplist = new DescribableList<ToolProperty<?>, ToolPropertyDescriptor>()
proplist.add(isp)

def installation = new AllureCommandlineInstallation("allure260", "", proplist)

def allureDesc = jenkins.model.Jenkins.instance.getExtensionList(AllureCommandlineInstallation.DescriptorImpl.class)[0]

allureDesc.setInstallations(installation)
allureDesc.save()
```

**Downloading and installing Allure from archive**

1. 到 [Maven Central 页面](http://repo.maven.apache.org/maven2/io/qameta/allure/allure-commandline/)，单击最新发布的版本，并下载 allure-commandline-[version].zip 文件。
2. (老版本,⇐2.8.0) 去 [Bintray 页面](https://bintray.com/qameta/generic/allure2),单击所需的版本,下载 allure-[version].zip  文件。
3. 上传下载好的文件到任何文件服务器。构建代理节点必须能够通过 url 访问文件。
4. 打开 “Global Tool Configuration”。并找到 “Allure Commandline” 配置部分。
5. 点击“Add Allure Commandline”按钮。
![Install Allure Commandline](https://docs.qameta.io/allure/images/jenkins_plugin_install_cmd.jpeg)
6. 点击“Add Installer”并选择“Extract **.zip**/.tar.gz”。
![Install Allure Commandline](https://docs.qameta.io/allure/images/jenkins_plugin_add_installer.jpeg)
7. 填写名称和下载 url 。注意，Jenkins 会立即检查所提供的 url，如果url不可用，则会显示一个警告。
![Install Allure Commanline](https://docs.qameta.io/allure/images/jenkins_plugin_fill_name_and_url.jpeg)

##### 13.2.2. 配置

**Job 配置**

1. 打开 job 配置页面
2. 确保您构建生成的数据是 Allure 命令行工具能够理解的其中一种格式
3. 添加 **Allure Report**
![Select](https://docs.qameta.io/allure/images/jenkins_plugin_add_allure_report.jpeg)
4. 配置 Allure Report.
![install allure commanline](https://docs.qameta.io/allure/images/jenkins_plugin_configure_allure_report.jpeg)

**测试管理和缺陷追踪系统集成**

目前所有版本的 Allure 都支持设置 url 模式，以使直接链接到你的 TMS 或 缺陷追踪报告中。可以通过设置特殊的系统属性来完成:

1. allure.tests.management.pattern:

![Filling TMS link property](https://docs.qameta.io/allure/images/jenkins_plugin_setup_tms.jpeg)

2. allure.issues.tracker.pattern:

![Filling bug-tracker link property](https://docs.qameta.io/allure/images/jenkins_plugin_setup_tracker.jpeg)

在这两种模式中，%s 将被替换为从添加到测试用例的标签中获得的字符串值。

**高级选项**

"Advanced…​" 按钮提供几个额外设置:

- 使用 jdk
- 构建策略
- 包含环境标签 - 目前还没有实施
- 报告路径 - 您可以指定报表输出文件夹。目前，不建议修改该值。更改此值时，将丢失以前的历史信息。

![Allure build step advanced options](https://docs.qameta.io/allure/images/jenkins_plugin_advanced_options.jpeg)

##### 13.2.3. 用法

当构建完成后，Allure 报告的链接将出现在构建页面和构建历史记录中:

![Install Allure Commanline](https://docs.qameta.io/allure/images/jenkins_plugin_allure_sidebar.png)

生成的 Allure 报告存储在 build 的 artifacts 文件夹中，可以像处理所有其他工件一样进行处理，或者作为.zip 归档文件下载。

![install allure commanline](https://docs.qameta.io/allure/images/jenkins_plugin_allure_report.png)

##### 13.2.4. 历史文件

从 Allure 2 开始，支持历史测试报告。在每次生成报告时，Jenkins 插件会尝试访问前一个构建的工作目录，并将 `allure-report\history` 文件夹中的内容复制到当前的报告内容中。此时，测试用例的历史记录条目存储了最多 5 个以前结果的信息。

##### 13.2.5. 扩展

**Job DSL Plugin**

[job-dsl-plugin](https://github.com/jenkinsci/job-dsl-plugin/wiki) 允许使用 DSL 创建项目。
```groovy
// default
publishers {
    allure(['allure-results'])
}

// advanced
publishers {
    allure(['first-results', 'second-results']) {
        jdk('java7')
        commandline('1.4.18')

        buildFor('UNSTABLE')
        includeProperties(true)
        property('allure.issues.tracker.pattern', 'http://tracker.company.com/%s')
        property('allure.tests.management.pattern', 'http://tms.company.com/%s')
    }
}
```

**Pipeline Plugin**

可以使用 Pipeline Syntax builder 生成 Allure 步骤代码，使得可以在流水线步骤中生成 Allure 报告。注意，命令行参数最好明确 Allure Commanline 的安装名，否则，插件将自动选择找到的第一个合适的安装。

![Pipeline step generation](https://docs.qameta.io/allure/images/jenkins_plugin_pipeline_step_builder.png)

流水线脚本:
```groovy
node {
// script body

allure([
         includeProperties: false,
         jdk: '',
         properties: [[key: 'allure.issues.tracker.pattern', value: 'http://tracker.company.com/%s']],
         reportBuildPolicy: 'ALWAYS',
         results: [[path: 'target/allure-results'], [path: 'other_target/allure-results']]
         ])
}
```

要从流水线中使用 Allure 报告，可以调用 Allure DSL 方法作为脚本:

```groovy
stage('reports') {
    steps {
    script {
            allure([
                    includeProperties: false,
                    jdk: '',
                    properties: [],
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'target/allure-results']]
            ])
    }
    }
}
```

#### 13.3. TeamCity

##### 13.3.1. 安装

1. [安装 Allure TeamCity 插件](https://confluence.jetbrains.com/display/TCD18/Installing+Additional+Plugins)
2. 从 [latest release](http://repo.maven.apache.org/maven2/io/qameta/allure/allure-commandline/) 下载最新的 **allure-commandline-x.x.zip**
3. 将下载的文件复制到 `<TeamCity Data Directory>/plugins/.tools/allure-commandline.zip`。此步骤不需要重新启动服务器。

> **提示**：如果代理没有收到命令行，我们可以为每个代理手动执行。在 /opt/TeamCity/buildAgent/tools 中创建命令行文件夹。将存档解压到命令行文件夹。授予所有文件夹权限 755 和 teamCity:teamcity。重启代理。

##### 13.3.2. 配置

1. 打开生成配置。
2. 确保您的构建[生成 Allure XML 文件](https://github.com/allure-framework/allure-core/wiki#gathering-information-about-tests))。
3. 进入构建步骤并添加 Allure 报告构建步骤。
4. (可选)在执行步骤中: 选择 `Even if some of the previous steps failed` 去为失败的测试生成报告
![TeamCity plugin add step](https://docs.qameta.io/allure/images/teamcity_plugin_add_build_step.png)
5. 配置步骤
![TeamCity plugin install](https://docs.qameta.io/allure/images/teamcity_plugin_configure_build_step.png)

如果你升级 Allure TeamCity 插件，你需要移除旧的 Allure 报告生成功能。

##### 13.3.3. 使用

构建完成后，您将获得 Allure 报告作为构建工件的一部分 — 只需打开 index.html
![TeamCity plugin usage](https://docs.qameta.io/allure/images/teamcity_plugin_usage.png)

#### 13.4. Bamboo

##### 13.4.1. 安装

1. 在 “Plugin Manager” 页安装 [Allure 插件](https://confluence.atlassian.com/upm/finding-new-marketplace-apps-302812383.html)。
2. 你可以：
  a. 从 github 下载最新版本的 allure-commandline.zip，并将其解压缩到您的 Bamboo 服务器上
  b. 或者允许 Bamboo 插件自动下载 Allure
3. Allure Bamboo 插件将在安装时添加新的可执行服务器功能。不过，您可以决定更改 Allure 版本或拥有多个版本的 Allure 可执行文件。
要使用提取目录[定义一个新的可执行功能](https://confluence.atlassian.com/bamboo/defining-a-new-executable-capability-289277164.html)，您需要打开“Executables”管理菜单项，然后在描述中选择“add an executable as a server capability”链接。您需要选择“Allure Report”作为功能类型。
![Add capability](https://docs.qameta.io/allure/images/bamboo_add_capability.png)

可执行标签定义了 Allure 可执行文件的版本，它将被自动下载。版本应设置在标签名称的末尾(如:“Allure 2.3.1”或“Allure 2.4-BETA1”)。

##### 13.4.2. 配置

1. 在 "PLANS" 组下打开 "Allure Report" 管理员菜单选项
![Allure Report Config](https://docs.qameta.io/allure/images/bamboo_admin_allure_report.png)
2. 如果有必要，可以配置 "Allure local storage"，它定义了一个目录，用于存储构建的 Allure 报告

**请注意**，Allure Bamboo 插件将报告存储在与 Bamboo 服务器运行的同一文件系统上，而且它不会自动清理目录。因此，您可能需要手动配置旧报表的删除。

3. 你可以决定在你所有的构建中启用 Allure Bamboo 插件。在这种默认情况下，它将尝试为 Bamboo 实例中每一次失败的构建构建一个报告。你可以随时为每个特定的计划关闭/打开它:
![Plan configuration](https://docs.qameta.io/allure/images/bamboo_plan_configuration.png)
4. 您可以选择不同版本的诱惑可执行的每个计划的基础上。您可以决定仅为失败的构建构建报告(通过选中相应的复选框)
5. 如果您的构建计划生成许多不同类型的制品，您可能想要选择 Allure 结果中制品的特定名称，这是 Allure Bamboo 插件要使用的(通过在“Artifact name to use”文本框中输入)，最常见的名称是“allure-results”
6. 确保你的构建[产生 Allure 结果文件](https://github.com/allure-framework/allure-core/wiki#gathering-information-about-tests)
7. 另外，您应该配置 Allure artifacts，以便每个 job 都能收集到它。只需向 job 中添加以下定义:
![Allure Artifacts Definition](https://docs.qameta.io/allure/images/bamboo_artifacts_definition.png)
8. 对于每个正确配置的计划，你应该能够看到“Allure Report”标签的结果:
![Allure Report Tab](https://docs.qameta.io/allure/images/bamboo_allure_tab.png)

##### 13.4.3. 在 AWS S3 中存储 Allure 报告

您可以决定将您的制品和 Allure 报告存储在 Amazon S3 中，而在默认情况下，Bamboo 是不提供这种存储的。但是你可以通过添加 "-Dbamboo.darkfeature.artifacthandlers=true" 来启用 Bamboo 实例。这将使您能够使用 "Artifact handlers" 管理菜单项配置制品处理程序，并允许将 AWS S3 配置为所有制品的主存储(包括构建的 Allure 报告)。

> **注意**："Artifact handlers" 特性不被 Atlassian 官方支持，所以使用它的风险由你自己承担。

##### 13.4.4. 故障排除

**未配置制品**

如果你没有正确配置 Allure 制品或构建没有产生 Allure 结果，你应该看到以下错误:
![Allure no artifacts](https://docs.qameta.io/allure/images/bamboo_no_artifacts.png)

**Empty report 选项卡**

如果成功生成了报表，但后来删除了，您应该会看到 empty report 选项卡。

**未知错误**

如果在 Allure 报告生成过程中出现了问题，您应该会在 Allure 选项卡中看到异常。如果你决定在 allure-bamboo 提一个 issue，可以提供以下类似信息:
![Allure unknown error](https://docs.qameta.io/allure/images/bamboo_unknown_error.png)

#### 13.5. Codefresh

##### 13.5.1. 配置

Codefresh 将所有 Allure 报告存储在云存储中。目前已有针对 Google Cloud 和AWS 的集成。

首先，通过单击左侧侧边栏上的 Account Settings，进入帐户配置。在名为 Integrations 的第一部分中，向下滚动到 Cloud Storage:
![Setup Test report location](https://docs.qameta.io/allure/images/codefresh_cloud_storage.png)

单击 configure 按钮，并在下面的屏幕中根据云提供商输入您的云设置。请确保记下 bucket 名，因为它将在稍后的流水线定义中使用。

##### 13.5.2. 用法

Codefresh 提供了一个可以创建报表的插件。该[插件](https://codefresh.io/docs/docs/codefresh-yaml/steps/freestyle/)只是插入到任何 [Codefresh 流水线](https://codefresh.io/docs/docs/codefresh-yaml/what-is-the-codefresh-yaml/)中，默认情况下在 allure-results 中查找测试结果。
```yaml
 my_unit_test_reporting_step:
   title: Generate test reporting
   image: codefresh/cf-docker-test-reporting
   environment:
     - BUCKET_NAME=my-bucket-name
     - CF_STORAGE_INTEGRATION=google
```

如果使用另一个目录来保存 Allure 结果，则必须使用 `ALLURE_DIR` 环境变量来指定它。
```yaml
 my_unit_test_reporting_step:
   title: Generate test reporting
   image: codefresh/cf-docker-test-reporting
   working_directory: './my-git-project'
   environment:
     - BUCKET_NAME=my-bucket-name
     - ALLURE_DIR=my-custom-allure-results-folder
     - CF_STORAGE_INTEGRATION=google
```

一旦您运行了流水线，一个新的 **Test Report** 按钮将出现在每个构建的旁边。点击它，你会看到你的 Allure 报告。
![Viewing test results for a build](https://docs.qameta.io/allure/images/codefresh_view_results.png)

更多详情请浏览[文档](https://codefresh.io/docs/docs/testing/test-reports/)

##### 13.5.3. 历史测试数据

Codefresh 会自动将以前构建的结果保存在云存储中,此行为不需要配置。当你运行更多的构建时，你会在你的 Allure 结果中看到历史趋势。

#### 13.6. Gradle

用于 Gradle 的 Allure 插件允许将 Allure 监听器集成到基于 Gradle 的项目中的 TestNG、Junit4、Cucumber JVM 和 Spock框架中，还提供了一些用于构建单个项目或多项目报告的任务。

##### 13.6.1. 自动配置 Junit4 和 TestNG

插件能够使用 Junit4 和 TestNG 的 Gradle 集成，所以如果你正在使用其中一个框架，配置看起来非常简单:

```groovy
buildscript {

    repositories {
        jcenter()
    }

    dependencies {
        classpath "io.qameta.allure:allure-gradle:2.3"
    }
}

    plugins {
        id 'io.qameta.allure'
    }

    allure {
        version = '2.2.1'
        autoconfigure = true
     }
```

这里你只需要两个参数: `autoconfigure` - 这是一个允许框架检测的标志。如果您启用了它，插件将自动添加正确的侦听器和 aspectjweaver runtime agent 的依赖项以及 `version` - 该参数指定用于下载和构建报告的 Allure 命令行。

应用自动配置后，`test` 任务执行后获得的 Allure 结果将存储在 `build/allure-results` 中。

建立报告执行 `allure` Gradle 任务:

```bash
./gradlew clean build allure
```

注意，如果您没有指定版本，那么插件将不会创建任何与 Allure-related 任务。因此，如果您只想创建用于进一步处理的结果，请省略 `version` 参数。

##### 13.6.2. 为特定的测试框架进行配置

插件为 4 个不同的框架提供了一个配置闭包参数: Junit4、TestNG、Cucumber JVM 和 Spock。

让我们看看基于 Spock 的构建脚本是什么样的:
```groovy
buildscript {

    repositories {
        jcenter()
    }

    dependencies {
        classpath "io.qameta.allure:allure-gradle:2.3"
    }
}

plugins {
        id 'io.qameta.allure'
}

allure {
    version = '2.2.1'
    aspectjweaver = true

    useSpock {
        version = '2.0-BETA12'
    }
}
```

这里使用 `aspectjweaver` 标志为您的项目添加运行时代理需要的相应依赖项，并 `useSpock` 为 Allure Spock 适配器依赖项配置一个版本。

##### 13.6.3. 完整的配置
```groovy
allure {
    version = '2.2.1'

    autoconfigure = false

    String allureJavaVersion = '2.0-BETA9'

    aspectjweaver = true

    boolean clean = true

    resultsDir = file('/path/to/project/module/build/allure-results')

    reportDir = file('build/reports/allure-report')

    String configuration = 'testCompile'

    useJunit4 {
       version = '2.0-BETA12'
    }

    useTestNG {
       version = '2.0-BETA12'
       spi-off = false
    }

    useCucumberJVM {
       version = '2.0-BETA12'
    }

    useSpock {
       version = '2.0-BETA12'
    }

    downloadLink = 'https://dl.bintray.com/qameta/generic/io/qameta/allure/allure/2.2.1/allure-2.2.1.zip'
    // Allure >= 2.8.0 is no longer available on Bintray
    // downloadLink = 'http://repo.maven.apache.org/maven2/io/qameta/allure/allure-commandline/2.8.1/allure-commandline-2.8.1.zip'
}
```

- **boolean** `autoconfigure` (`default = false`) - 指定自动配置用法，插件将尝试找到 Gradle 提供的测试平台集成(目前仅适用于 Junit4 和 TestNG )
- **boolean** `aspectjveaver` - 指定 aspectjweaver 运行时代理的 inclusion/exclusion
- **boolean** `clean` (`default = true`) - 启用 Allure 命令行工具的 `--clean`，默认为 `true`
- **String** `version` - 指定报告生成器的版本，注意，该属性是启用 `allure` 和 `aggregatedAllureReport` 任务的必备属性
- **String** `configuration` (`default = 'testCompile'`) - 绑定插件依赖关系的配置名
- **File** `resultsDir` - 当前项目的 Allure 结果目录，默认在 `build\allure-results`
- **File** `reportDir` - 当前项目的 Allure 报告目录，默认在 `build\reports\allure-report`
- **String** `allureJavaVersion` (`default = '2.0-BETA9'`) - 用于自动配置的 allure java 发行版
- **String** `downloadLink` - 自定义的 Allure 分布下载的位置，默认从 bintray 下载指定的版本，并安装到项目根目录的 `.allure` 目录。由于 Allure 在Bintray 上不再维护，因此若想使用 Allure >= 2.8.0，必须配置为其在 Maven Central 的下载地址

##### 13.6.4. 任务

为了方便自己，您可以使用插件中定义的一些任务。

**allure**

为给定的输入目录列表创建 Allure 报告

参数:
- **File** `reportDir` - Allure 报告的目录
- **boolean** `clean` - 启用 Allure 命令行工具的 `--clean` 选项
- **String** `version` - Allure 命令行版本，将尝试在您项目根目录的 .allure 文件夹中尝试该版本的命令行工具
- **List<File>** `resultsDirs` - Allure 结果目录的列表

因此，若一个多模块项目生成 Allure 报告，你将不得不定义自己的 `allureAggregatedReport` 任务，例如:

```groovy
plugins {
    id 'io.qameta.allure'
}

allprojects { project ->

    apply plugin: 'io.qameta.allure'

    allure {
        version = '2.1.0'
    }
}

import io.qameta.allure.gradle.task.AllureReport

task allureAggregatedReport(type: AllureReport) {
    resultsDirs = subprojects.allure.resultsDir
}
```

然后像这样调用它: `./gradlew clean build allureAggregatedReport`

**downloadAllure**

从提供的 url 下载 Allure 命令行，并将其保存到项目根目录的 `.allure` 文件夹中。

- **String** `src` - 指定 Allure Comandline 下载位置的 url
- **String** `version` - 指定要下载的 Allure Comandline 的版本
- **File** `dest` - 安装 Allure Comandline 的目标文件夹

`allure` 任务依赖于 `downloadAllure`，所以在默认情况下不需要手动调用它，无论何时 `allure` 任务被调用，它都会首先调用 `downloadAllure`。

**serve**

可用于在生成后在默认浏览器中生成和打开报表。

- **String** `version` - 在 .allure/version 中发现 Allure Commandline 的安装
- **List<File>** `resultsDirs` - 结果文件的目录列表

默认情况下，`serve` 任务是由插件配置好的，当执行时，将在默认的浏览器中打开一个单一模块的报告。

示例: `./gradlew clean build serve`

#### 13.7. Maven

这个插件在 Maven 构建过程中通过[现有的 XML 文件](https://github.com/allure-framework/allure-core/wiki#gathering-information-about-tests)生成 Allure 报告。

##### 13.7.1. 安装

将 allure-maven-plugin 添加到 pom.xml 文件中的构建部分。

*pom.xml*
```xml
<project>
    ...
    <plugin>
        <groupId>io.qameta.allure</groupId>
        <artifactId>allure-maven</artifactId>
        <version>2.8</version>
    </plugin>
    ...
</project>
```

##### 13.7.2. 配置

**属性处理**

从 2.5 版本开始，报告生成可做配置。有以下几种方法：

**直接从源代码**

把 **allure.properties** (Allure 1.5 以上是 **report.properties**) 放到 classpath。支持 class 路径和 test class 路径同时编译。

**或在配置中指定 properties**

*pom.xml*
```xml
<plugin>
    <groupId>io.qameta.allure</groupId>
    <artifactId>allure-maven</artifactId>
    <configuration>
       <properties>
           <allure.issues.tracker.pattern>http://example.com/%s</allure.issues.tracker.pattern>
       </properties>
    </configuration>
</plugin>
```

**或指定 propertiesFilePath**

*pom.xml*
```xml
<configuration>
   <propertiesFilePath>path/to/your/allure.properties</propertiesFilePath>
</configuration>
```

**报告版本**

从 2.6 开始，这个插件从默认的 [url](https://dl.bintray.com/qameta/generic/io/qameta/allure/allure) 下载使用 Allure 构建一个报告，Allure 会被提取并放入在项目的 `.allure` 目录中。

Allure 的默认版本是 **2.7.0**

*pom.xml*
```xml
<configuration>
    <reportVersion>2.7.0</reportVersion>
</configuration>
```

如果您同时配置了 `reportVersion` 和 `allureDownloadUrl` (见上文)，您可以使用 Allure >= 2.8.0。

您可以指定自己的下载 url，也可以使用系统属性 `allure.download.url` 指定文件路径。(%s替换为 `reportVersion` 的配置)

*pom.xml*
```xml
<configuration>
    <!-- Allure < 2.7.0 (default value): download from Bintray -->
    <allureDownloadUrl>https://dl.bintray.com/qameta/generic/io/qameta/allure/allure/%s/allure-%s.zip</allureDownloadUrl>
    <!-- Allure >= 2.8.0: download from Maven Central -->
    <!-- <allureDownloadUrl>http://repo.maven.apache.org/maven2/io/qameta/allure/allure-commandline/%s/allure-commandline-%s.zip</allureDownloadUrl> -->
    <!-- Custom URL -->
    <!-- <allureDownloadUrl>https://example.com/allure/allure-2.0.1.zip</allureDownloadUrl> -->
</configuration>
```

**结果目录**

一般来说，Allure results 目录是由 allure 适配器创建的目录，包含 allure 文件和附件。此路径可以是相对于构建目录(对于 maven 来说就是目标目录)或绝对路径。

默认值是 "**allure-results**"

系统属性 **allure.results.directory**

*pom.xml*
```xml
<configuration>
    <reportDirectory>allure-report</reportDirectory>
</configuration>
```

##### 13.7.3. 用法

您可以使用以下命令生成报告:

- `mvn allure:serve`

报表将生成到临时文件夹中，由 Web 服务器启动。您还可以配置服务器超时。默认值是 “**3600**”(一小时)。

系统属性 **allure.serve.timeout**

- `mvn allure:report`

报告会生成到目录：**target/site/allure-maven/index.html**

----

## 14. Allure 插件系统

#### 14.1. Java 插件 API
#### 14.2. JS 插件 API
#### 14.3. 写一个新插件
#### 14.4. 已有的插件

----