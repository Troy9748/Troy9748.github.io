# 内容发布手册

这份手册覆盖发帖、图片、视频、搜索、排序与 GitHub Pages 发布。站点不需要数据库：文章和媒体文件都保存在仓库里，GitHub Pages 会在每次推送后自动生成网页。

本地预览需要 Ruby 3.1（与 GitHub Actions 保持一致）和 Node.js。macOS 自带的 Ruby 2.6 不适合构建这个项目。

## 1. 新建文章

在 `_posts/` 下创建 Markdown 文件，文件名必须是：

```text
YYYY-MM-DD-英文短标题.md
```

例如：

```text
2026-10-28-first-observation-note.md
```

文件开头的 Front Matter 决定标题、分类、标签和封面：

```yaml
---
layout: post
title: "文章标题"
subtitle: "列表中显示的一句话摘要"
author: Xiaohui LIU
categories: notes
tags: [观测, 数据处理, ALMA]
excerpt_image: /assets/images/posts/first-observation-note/cover.jpg
---
```

`categories` 请固定使用以下一个值，网站的类型筛选依赖这些值：

| 值 | 网站显示 | 适合内容 |
| --- | --- | --- |
| `research` | 科研成果 | 论文、项目、报告、会议与学术活动 |
| `notes` | 科研笔记 | 文献阅读、方法、代码、实验与观测记录 |
| `essay` | 随笔 | 生活记录、思考与书影音 |
| `photography` | 摄影 | 单幅、组照、器材与拍摄手记 |
| `music` | 音乐 | 弹唱、练习与演出记录 |

`tags` 可以自由添加中文或英文关键词。建议每篇 2–5 个，使用具体主题，不要重复文章类型。

## 2. 科研成果模板

```markdown
---
layout: post
title: "论文或项目名称"
subtitle: "一句话说明最重要的结果"
categories: research
tags: [研究方向, 方法]
---

## 摘要

用自己的话说明问题、方法与结论。

## 我的贡献

- 贡献一
- 贡献二

## 相关链接

- [论文](https://example.com)
- [数据或代码](https://github.com/example)
```

## 3. 图片与摄影作品

每篇文章使用独立目录，避免重名：

```text
assets/images/posts/chongqing-river/
├── cover.jpg
├── 01.jpg
└── 02.jpg
```

普通图片：

```markdown
![重庆江面与桥梁](/assets/images/posts/chongqing-river/01.jpg)
```

点击放大：

```html
<a class="photo-swipe" href="/assets/images/posts/chongqing-river/01.jpg">
  <img src="/assets/images/posts/chongqing-river/01.jpg" alt="重庆江面与桥梁">
</a>
```

建议：相机原图先导出为 JPEG/WebP，长边约 2400–3200 px，单张尽量控制在 2 MB 内。保留原片在本地或云盘，不要把整个 RAW 库放进 Git 仓库。

## 4. 弹唱视频

优先把视频发布到 Bilibili、YouTube 等视频平台，再嵌入文章。这样不会让 Git 仓库快速膨胀，也能获得转码和移动端播放支持。

Bilibili：

```html
<div class="video-embed">
  <iframe src="//player.bilibili.com/player.html?bvid=你的BV号&page=1"
    title="视频标题" scrolling="no" frameborder="0" allowfullscreen></iframe>
</div>
```

YouTube：

```html
<div class="video-embed">
  <iframe src="https://www.youtube-nocookie.com/embed/视频ID"
    title="视频标题" frameborder="0" allowfullscreen></iframe>
</div>
```

## 5. 搜索与排序如何工作

`/explore/` 会在构建时读取所有已发布文章，并在访客浏览器中完成：

- 关键词搜索：标题、摘要、正文、分类和标签；
- 类型筛选：科研成果、科研笔记、随笔、摄影、音乐；
- 排序：最新发布、最早发布、标题 A–Z；
- 直接分类链接：例如 `/explore/?type=photography`。

新文章只要使用正确的 `categories`，就会自动进入对应入口和搜索结果，不需要手动编辑列表。

## 6. 草稿、置顶和发布时间

暂不发布的文章放在 `_drafts/`，文件名不需要日期。预览草稿时运行：

```bash
bundle exec jekyll serve --drafts
```

在 Front Matter 中加入 `top: 1` 可以置顶；数字越小越靠前。同一天需要精确排序时可以指定时间：

```yaml
date: 2026-10-28 20:30:00 +0800
```

## 7. 发布方式

### GitHub 网页端

1. 打开仓库并进入 `_posts/`。
2. 选择 **Add file → Create new file**。
3. 按日期格式命名，粘贴文章内容。
4. 选择 **Commit changes** 提交到 `master`。
5. 在仓库的 **Actions** 页面查看 `Deploy Jekyll site to Pages`，完成后网站会更新。

### 本地 Git

```bash
git add _posts assets/images
git commit -m "Add new post"
git push origin master
```

发布前运行：

```bash
bash scripts/check-site.sh
```

## 8. 修改网站固定内容

| 内容 | 文件 |
| --- | --- |
| 姓名、邮箱、域名、颜色、导航 | `_config.yml` |
| 首页介绍和五个入口 | `index.html` |
| 关于页 | `about.html` |
| 搜索与排序页面 | `explore.html` |
| 搜索与排序逻辑 | `assets/js/explore.js` |
| 个性化样式 | `assets/css/main.scss` |

修改 `_config.yml` 后，本地预览服务需要重启才会生效。

## 9. 自定义域名

站点以 `www.lxh9748.fun` 为主域名。域名服务商中建议保留：

| 主机记录 | 类型 | 值 |
| --- | --- | --- |
| `www` | `CNAME` | `troy9748.github.io` |
| `@` | `A` | `185.199.108.153` |
| `@` | `A` | `185.199.109.153` |
| `@` | `A` | `185.199.110.153` |
| `@` | `A` | `185.199.111.153` |

删除 `@` 下指向其他服务器的冲突 A/AAAA/ALIAS/ANAME 记录。DNS 生效后，在仓库 **Settings → Pages** 中确认 Custom domain 是 `www.lxh9748.fun`，并开启 **Enforce HTTPS**。正确配置后，GitHub Pages 会把裸域名自动跳转到 `www` 域名。
