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

**Maven**

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

**Features**

此适配器提供运行时集成，允许将 Gherkin dsl 特性转换为基本的 Allure 特性。

**Display Name**

测试标题和测试集标题在运行时从 `.feature` 文件中提取。

**Description**

特性的描述会出现在每个场景中。

**Steps**

所有场景步骤自动转换成 Allure 步骤。

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

要关联问题到报告上，只需在 `.feature` 文件中的场景顶部添加 `@issue=<ISSUE-NUMBER>`。

要关联 TMS 链接到报告上，只需在 `.feature` 文件中的场景顶部添加添加 `@tmsLink=<TEST-CASE-ID>`。

> **提示**：不要忘记在 Allure 属性中配置链接模式。

**Severity**

要设置 severity，可以在 `.Feature` 文件中的的场景顶部添加 `@severity=blocker`。

如果严重性有错误的值，它将被强制为正常（默认）。

支持的严重性值: `blocker`, `critical`, `normal`, `minor`, `trivial`

**Test markers**

每个特性或场景都可以通过以下标记进行装饰: `@flaky`, `@muted`, `@known`

**Test fixtures**

所有方法都由装饰器 `@import cucumber.api.java.After` 或者 `@cucumber.api.java.Before` 装饰。它们将作为带有方法名称的步骤出现在报表中。

如果 `@Before` 执行失败，该场景将被标记为跳过。
如果 `@After` 执行失败，该场景将被标记为已通过，并且仅在方法的步骤之后将被标记为失败。

**Behaviours Mapping**

Allure Cucumber JVM 集成请参考特性章节。

**Configuration**

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

<div id="_python"></div>

## 6. Python

<div id="_python"></div>

## 7. JavaScript

<div id="_ruby"></div>

## 8. Ruby

<div id="_groovy"></div>

## 9. Groovy

<div id="_php"></div>

## 10. PHP

<div id="__net"></div>

## 11. .NET

<div id="_scala"></div>

## 12. Scala

<div id="_reporting"></div>

## 13. 报告

<div id="_allure_plugins_system"></div>

## 14. Allure 插件系统