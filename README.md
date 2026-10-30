# BOOM 官方网站

BOOM ONE 品牌展示网站。React 19 + TypeScript + Vite 6 + Tailwind CSS 4，构建后是可独立托管的静态站点。

## 本地运行

要求 Node.js 22.12 或以上版本，推荐 Node.js 22 LTS。

```bash
git clone https://github.com/YANZI-01/202610-BOOMWEB.git
cd 202610-BOOMWEB
npm ci
npm run dev
```

开发地址：`http://localhost:3000`。网站不需要数据库、后端服务、ChatGPT 账号或 API 密钥。

## 检查与构建

```bash
npm run typecheck
npm run build
npm run preview
```

将 `dist/` 中的全部内容发布到静态服务器即可。`npm run preview` 仅用于本地验收，不作为生产服务器。

## 页面与路由

| 页面 | 路径 |
| --- | --- |
| 产品概览 | `/` |
| Why BOOM | `/without-boom` |
| 关于我们 | `/brand` |

站点使用 BrowserRouter，服务器必须为页面路由返回 `index.html`，否则直接访问或刷新 `/brand`、`/without-boom` 会出现 404。此版本按域名根目录部署；子目录部署需要同时修改 Vite `base`、BrowserRouter `basename` 和以 `/` 开头的素材路径。

## 部署方式

- **Nginx / 自有服务器**：构建后上传 `dist/`，参考 [Nginx 配置](deploy/nginx.conf.example)。替换域名、目录并配置 HTTPS。
- **Vercel**：导入此仓库，构建命令 `npm run build`，输出目录 `dist`。仓库内 `vercel.json` 配置页面路由回退。
- **Netlify / Cloudflare Pages**：构建命令 `npm run build`，输出目录 `dist`。`public/_redirects` 会随构建复制，用于 SPA 路由回退。

工程交接、素材清单和上线检查见 [交接说明](docs/HANDOFF.md)。

## 目录

```text
src/                 当前网站源码、样式和 WebGL shader
public/              当前源码实际引用的图片
docs/asset-manifest.json  素材路径、引用位置、大小和 SHA-256
deploy/              静态服务器配置示例
```

素材保留用户提供的原始文件，不做二次压缩或调色；画面裁切、透明蒙版等由页面 CSS 控制。历史替换图、未启用的 UI 试验组件、未使用字体、本机缓存和密钥不包含在本仓库中。

本仓库上传不会自动修改已有 ChatGPT Sites 发布地址；后续工程部署与已有预览站为独立发布流程。

网站图片、品牌和文案的权利归相应权利人所有。本次交付不另行授予开源素材许可；第三方 npm 依赖遵循各自许可证。
