# 开发记录

记录重要进展、关键决策、验证结果和下一步。避免记录没有复用价值的逐分钟流水账。

## 记录格式

```markdown
## YYYY-MM-DD - 主题

- 目标：
- 完成：
- 关键决策：
- 修改范围：
- 验证：
- 遗留问题：
- 下一步：
- 关联文档：
```

稳定决策必须同步到 `DECISIONS.md`；当前状态必须同步到 `CONTEXT.md`；活跃缺陷必须同步到 `BUG_TRACKER.md`。

## 2026-06-16 - 项目迁入 Workspace

- 目标：按用户要求为“婉婉的抽签机”建立桌面 Workspace 专属项目目录。
- 完成：创建 `projects/项目：婉婉的抽签机/`，复制项目模板文档，并将当前网页项目文件复制到 `site/`。
- 关键决策：使用全角冒号 `：` 替代 Windows 不支持的半角冒号 `:`；源码放入 `site/`，项目文档留在项目根目录。
- 修改范围：项目标准文档、项目索引、项目文件归档。
- 验证：确认 `site/` 已包含当前项目文件，`projects/README.md` 已登记项目。
- 遗留问题：是否清理原始目录 `D:\Documents\New project` 待用户确认。
- 下一步：后续修改默认在 `site/` 内进行。
- 关联文档：`README.md`、`CONTEXT.md`、`REQUIREMENTS.md`、`TECH_STACK.md`、`REFERENCES.md`
