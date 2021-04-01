---
title: 缺陷管理
category: 规范
order: 21
---

### 缺陷管理

缺陷的管理都在缺陷管理平台中完成，对于缺陷的发布，应该遵循严谨的格式。

除了填入 Sprint 信息供相关人员追踪外，还额外要求填入一些必要的标签，以标注缺陷发现的迭代周期、缺陷的类型、缺陷的功能模块，作为经验教训总结时的数据分析。

开发工程师领取到属于自己的缺陷后，将其标识为 `处理中` ，修复自测后再标识为 `修复待验证` 交由测试工程师做最后的验证，并留下关于该缺陷的备注，如根本原因、解决方案等。

测试工程师验证时会填写详细的验证环境和步骤，有利于若问题重现，可找到历史记录进行分析。

最终在交付前，所有的缺陷问题应该都在 `已验证` 的状态。

![](/images/issue_flow.svg)

除了利用缺陷管理平台自身的一些看板，还可以利用 QSphere 增强在当前冲刺期内的多样趋势图，以便于所有人都对一个周期内的进度有个直观感知，并且针对每个新需求新功能也展现缺陷状态，这些数据都将作为本轮迭代软件质量的评估数据源之一。

对于缺陷的追踪，我们更关注在产品发布后，如何利用这些历史数据来提升未来的软件质量。

每轮迭代有一些正常规律，比如缺陷数量通常在前两个发布候选版本较多，相对复杂的新功能产生的缺陷数量会相对较多。

若出现后期某个候选版本缺陷数量突然增多，则要考虑产生该现象的原因，在发布前，就要考虑重新评估该原因带来的影响。

而对于没有产生任何缺陷记录的代码改动，同样要引起注意，需要评估测试的覆盖程度和深度。

所有缺陷的来源通常有：

- 测试发现
- 开发发现
- 客户现场

每种来源都将作为软件质量不同的改进方向。

而对于缺陷的类别，比如：回归、新功能、偶发、概率等等。

也是我们分析的一个方向。

其中回归问题是我们特别关注的，同时也是最影响软件质量信心的一种。

以上种种数据分析能力，均将在 QSphere 中一一实现。

### 报告新缺陷必填信息

- 项目
- 问题类型
- 主题
- 模块
- 描述
- Sprint/迭代
- 优先级
- 影响程度
- 标签

### 修复缺陷必填信息

- 经办人
- 解决版本
- 解决RC
- 备注

### 验证缺陷必填信息

- 验收通过
- 问题重现
