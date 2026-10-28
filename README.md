# 刘晓辉的个人网站

这是 [www.lxh9748.fun](https://www.lxh9748.fun) 的源码，使用 Jekyll 与 GitHub Pages 发布。

## 日常使用

- 新内容写在 `_posts/`，文件名格式为 `YYYY-MM-DD-英文短标题.md`。
- 图片放在 `assets/images/posts/文章短标题/`。
- 推送到 `master` 后，GitHub Actions 会构建并发布网站。
- 搜索、分类与排序会自动读取文章的标题、正文、`categories` 和 `tags`，无需维护额外索引。

完整的写作模板、图片与视频用法、本地预览和发布步骤见 [内容发布手册](docs/CONTENT_GUIDE.md)。

## 本地检查

```bash
bash scripts/check-site.sh
```

主题基于 [jekyll-theme-yat](https://github.com/jeffreytse/jekyll-theme-yat)，遵循仓库中的 MIT 许可证。
