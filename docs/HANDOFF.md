# 工程交接

## 交付基线

- 整理日期：2026-10-30（Asia/Shanghai）。
- 来源：当前已发布 BOOM 网站源代码提交 `164e2ef398a252af89360cd80819b47ba8d76553`。
- 现有预览站：https://boom-one-official.wyz1003226499.chatgpt.site/
- 品牌蓝：`#0F84C4`；APP 展示背景：`#F5F5F7`。

本次整理只针对工程交接：保留当前页面功能、动画、文案和实际引用素材，移除未使用文件及无关依赖，补齐通用部署配置。原预览站的访问白名单不会随代码转移；如新部署需要访问控制，由工程师在新平台单独配置。

## 常用修改位置

| 内容 | 文件 |
| --- | --- |
| 页面路由 | `src/App.tsx` |
| 产品页章节顺序 | `src/pages/ProductPage.tsx` |
| 首屏与图片 | `src/components/Hero.tsx` |
| 佩戴体验、轮播和选中按钮 | `src/components/WearExperience.tsx`、`src/pages/product-palette.css` |
| 03 精度拱形背景、遮罩、文字 | `src/pages/product-palette.css` |
| APP 展示图和文案 | `src/components/BoomApp.tsx` |
| APP 排版与背景渐隐 | `src/components/boom-app.css` |
| Why BOOM | `src/components/WithoutBoom.tsx`、`src/pages/why-boom-palette.css` |
| 关于我们 | `src/components/AboutCompany.tsx`、`src/pages/brand-palette.css` |
| 导航与页脚 | `src/components/Navbar.tsx`、`Footer.tsx`、`footer-glass.css` |
| 动态蓝色背景 | `src/components/WavesBackground.tsx`、`src/shaders/human-flow.frag.glsl` |

## 素材

39 张当前源码直接引用的图片包含在 `public/` 中，逐项信息见 `asset-manifest.json`。替换素材后应更新清单；不使用 ChatGPT 的临时附件地址，也不依赖本机绝对路径。

佩戴轮播仍保留原有 Unsplash 备用地址，仅在本地图片加载失败时使用。正常页面图片均随仓库交付。APP 图片为展示图片，页面中的 AI 教练内容不连接真实对话服务；“立即探索”打开联系信息弹窗。

## 上线验收

1. 用 `npm ci` 全新安装，并通过 `npm run typecheck`、`npm run build`。
2. 打开 `/`、`/without-boom`、`/brand`，逐页刷新确认无 404。
3. 检查桌面与手机布局、中文／英文切换、导航锚点、佩戴选项及轮播、卡片交互和联系信息弹窗。
4. 检查 APP 首页、日志、运动分析、AI 教练、团队等展示图，以及 03 拱形背景是否加载。
5. 在浏览器禁用 WebGL 或开启减少动态效果时，确认页面仍可阅读；动态背景含回退处理。
6. 配置 HTTPS 与缓存策略。发布新素材后如沿用旧文件名，应清理 CDN 缓存；推荐新文件名。

当前项目依赖较多的运动动画和较大的原始图片；首次构建出现超过 500 kB 的 bundle 提示属于体积提示。工程师可另行规划图片响应式尺寸、压缩及代码拆分，但应与视觉效果变更分开验收。
