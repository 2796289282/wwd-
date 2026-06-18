# 云端同步部署说明

## Supabase SQL

在 Supabase SQL Editor 执行：

```sql
create table if not exists app_state (
  id text primary key,
  data jsonb not null default '{}',
  updated_at timestamptz default now()
);

insert into app_state (id, data)
values (
  'main',
  '{
    "customCards": [],
    "drawnCards": [],
    "remainingCards": {},
    "letter": "",
    "history": [],
    "updatedAt": ""
  }'::jsonb
)
on conflict (id) do nothing;
```

## Cloudflare Pages 环境变量

在 Cloudflare Pages 项目的 Settings -> Environment variables 添加：

```text
SUPABASE_URL=https://你的项目引用.supabase.co
SUPABASE_SERVICE_ROLE_KEY=你的 Supabase service_role key
```

`SUPABASE_SERVICE_ROLE_KEY` 只放在 Cloudflare 环境变量里，不要写到前端文件。前端默认调用：

```text
/api/load-state
/api/save-state
```

## Cloudflare Pages 部署步骤

1. 把整个项目根目录提交到 GitHub，根目录需要包含 `wrangler.toml`。
2. Cloudflare Pages 连接这个 GitHub 仓库，或者在本机运行 `npx wrangler pages deploy site --project-name peiwanjie`。
3. Build command 可以留空或使用 `npm run build`。
4. Build output directory 使用 `site`。
5. 配置上面的 Supabase 环境变量。
6. 重新部署 Cloudflare Pages。

## Netlify 环境变量

在 Netlify 后台的 Site configuration -> Environment variables 添加：

```text
SUPABASE_URL=https://你的项目引用.supabase.co
SUPABASE_SERVICE_ROLE_KEY=你的 Supabase service_role key
```

`SUPABASE_SERVICE_ROLE_KEY` 只放在 Netlify 环境变量里，不要写到前端文件。前端只会调用：

```text
/.netlify/functions/load-state
/.netlify/functions/save-state
```

## 部署步骤

1. 把整个项目根目录提交到 GitHub，根目录需要包含 `netlify.toml`。
2. Netlify 连接这个 GitHub 仓库。
3. Build settings 保持空构建即可，Publish directory 使用 `site`。
4. Functions directory 使用 `netlify/functions`，`netlify.toml` 已经配置好。
5. 配置上面的 Supabase 环境变量。
6. 重新部署 Netlify。

## 测试步骤

1. 打开线上地址，例如 Cloudflare Pages 或 Netlify 的正式网址。
2. 添加一条自定义题目，看到“已同步”。
3. 保存一段小纸条，看到“已同步”。
4. 抽一张卡，刷新页面后确认剩余题数和历史记录还在。
5. 换浏览器或手机打开同一个网址，确认能读到同一份题库、信件和历史记录。

## 如果同步失败

优先检查：

1. Cloudflare Pages Functions 是否部署成功，访问 `/api/load-state` 是否返回 JSON。
2. Cloudflare 或 Netlify 环境变量名是否完全一致：`SUPABASE_URL`、`SUPABASE_SERVICE_ROLE_KEY`。
3. Supabase 的 `app_state` 表是否已经创建，并且有 `id = 'main'` 这一行。
4. Supabase Project URL 是否包含 `https://`。
5. 浏览器控制台是否出现 `Cloud load failed` 或 `Cloud save failed`。
