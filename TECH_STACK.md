# 技术栈与架构

## 技术栈

| 层级 | 技术/版本 | 用途 | 状态 |
| --- | --- | --- | --- |
| 语言 | HTML/CSS/JavaScript | 静态网页和交互逻辑 | 已采用 |
| 框架 | 无 | 轻量静态页面 | 已采用 |
| 数据存储 | `localStorage` | 保存题库、历史和步骤状态 | 已采用 |
| 测试 | 浏览器人工验证/视口指标检查 | 验证手机布局和交互 | 已采用 |
| 分享 | Python `http.server` + localhost.run 隧道 | 生成临时外网链接 | 已采用 |

## 架构概览

单页静态网页：`index.html` 承载结构，`styles.css` 控制桌面与手机布局，`script.js` 管理题库、抽卡、页面步骤和本地状态。

## 目录结构

```text
项目：婉婉的抽签机/
|-- README.md
|-- CONTEXT.md
|-- REQUIREMENTS.md
|-- TECH_STACK.md
|-- ...
`-- site/
    |-- index.html
    |-- styles.css
    |-- script.js
    |-- share-site.ps1
    |-- stop-share.ps1
    |-- 一键分享网站.bat
    `-- 停止分享.bat
```

## 环境要求

- 操作系统：Windows
- Runtime：浏览器；分享脚本使用本机 Python 和 OpenSSH
- 包管理器：无
- 外部服务：localhost.run 临时隧道

## 常用命令

| 用途 | 命令 |
| --- | --- |
| 安装依赖 | 无需安装 |
| 本地打开 | 双击 `site/index.html` |
| 本地 HTTP | 在 `site/` 运行 `python -m http.server 8765 --bind 127.0.0.1` |
| 临时分享 | 在 `site/` 运行 `powershell -NoProfile -ExecutionPolicy Bypass -File .\share-site.ps1` |
| 停止分享 | 在 `site/` 运行 `powershell -NoProfile -ExecutionPolicy Bypass -File .\stop-share.ps1` |
| 构建 | 无需构建 |
| 部署 | 使用临时分享脚本或后续静态托管 |

## 配置与密钥

- 只记录环境变量名称、用途和安全存储位置。
- 不在本文件保存真实密码、Token、私钥或 Cookie。

| 变量 | 用途 | 必需 | 存储位置 |
| --- | --- | --- | --- |
| 无 | 当前项目不需要密钥 | 否 | - |

## 技术决策

### 2026-06-16 - 使用静态网页实现

- 状态：有效
- 背景：用户需要快速通过微信发给手机打开。
- 决策：使用无构建静态网页，配合临时隧道分享。
- 替代方案：部署到 GitHub Pages、Netlify 或 Vercel。
- 理由：本地改动快、无需账号配置、适合当前快速迭代。
- 影响：临时链接依赖本机在线，不适合作为长期稳定地址。
