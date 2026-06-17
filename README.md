# 婉婉的抽签机

## 项目概览

- 项目名称：婉婉的抽签机
- 目录名称：`项目：婉婉的抽签机`
- 创建日期：`2026-06-16`
- 最近更新：`2026-06-16`
- 当前状态：`进行中`
- 负责人：用户 + Codex

## 一句话目标

制作一个可通过手机打开的真心话/大冒险抽卡小游戏，用于和婉婉互动。

## 当前进展

静态网页已实现首页、玩法选择、独立专区、抽卡、题库隐藏/编辑、不重复抽取和手机端紧凑布局。项目源码已整理到本目录的 `site/`。

## 关键入口

- 源代码：`site/`
- 运行入口：`site/index.html`
- 分享脚本：`site/一键分享网站.bat` 或 `site/share-site.ps1`
- 停止分享：`site/停止分享.bat` 或 `site/stop-share.ps1`
- 外部仓库：无

## 文档索引

- `REQUIREMENTS.md`：需求、范围和验收标准。
- `CONTEXT.md`：当前状态、下一步、阻塞和恢复入口。
- `TECH_STACK.md`：技术栈、架构、环境和运行方式。
- `DECISIONS.md`：稳定项目决策及其理由。
- `REFERENCES.md`：来源、附件、证据和关键路径。
- `COMMUNICATION_LOG.md`：沟通草稿、已确认事实和待跟进事项。
- `BUG_TRACKER.md`：活跃缺陷及验证状态。
- `DEVELOPMENT_LOG.md`：重要进展、决策和验证记录。
- `PITFALLS.md`：项目特有问题与解决方案。
- `SOP.md`：项目特有标准操作流程。
- `RETROSPECTIVE.md`：阶段或项目复盘。

## 当前优先事项

1. 后续所有修改默认在本项目目录的 `site/` 内进行。
2. 需要发手机时，从 `site/` 运行分享脚本生成临时链接。

## 风险与待确认

- 临时分享链接依赖本机在线和 localhost.run，可用性不保证长期稳定。
- 独立专区的前端密码门只用于小游戏氛围，不是安全认证。

## 读取顺序

1. `README.md`
2. `CONTEXT.md`
3. `REQUIREMENTS.md`
4. `TECH_STACK.md`
5. `DECISIONS.md`
6. `PITFALLS.md`
7. `SOP.md`
8. 与任务相关的日志、Bug、沟通、资料和复盘
