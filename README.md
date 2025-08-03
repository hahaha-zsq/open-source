# Open Source 文档博客

这是一个使用 VitePress 搭建的文档博客项目。

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev

# 构建生产版本
npm run docs:build

# 预览生产版本
npm run docs:preview
```

## GitHub Pages 部署

本项目已配置自动部署到 GitHub Pages。部署步骤如下：

### 1. 仓库设置

确保您的 GitHub 仓库名为 `open-source`（与 base 路径匹配）。

### 2. 启用 GitHub Pages

1. 进入您的 GitHub 仓库
2. 点击 "Settings" 标签
3. 在左侧菜单中找到 "Pages"
4. 在 "Source" 部分选择 "GitHub Actions"

### 3. 推送代码

将代码推送到 `master` 分支：

```bash
git add .
git commit -m "Initial commit"
git push origin master
```

### 4. 使用部署脚本（推荐）

项目提供了便捷的部署脚本：

```bash
# 给脚本添加执行权限
chmod +x trigger-deploy.sh

# 运行部署脚本
./trigger-deploy.sh
```

或者使用完整版部署脚本：

```bash
chmod +x deploy.sh
./deploy.sh
```

### 5. 查看部署

- 部署完成后，您的网站将可通过 `https://[您的用户名].github.io/open-source/` 访问
- 您可以在仓库的 "Actions" 标签中查看部署进度

## 项目结构

```
.
├── .vitepress/
│   ├── config.mts          # VitePress 配置文件
│   └── theme/              # 主题文件
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions 部署配置
├── public/                 # 静态资源
├── index.md               # 首页
├── markdown-examples.md   # Markdown 示例
├── api-examples.md        # API 示例
├── deploy.sh              # 完整部署脚本
├── trigger-deploy.sh      # 快速部署脚本
└── package.json
```

## 自定义配置

### 修改网站标题和描述

编辑 `.vitepress/config.mts` 文件中的 `title` 和 `description` 字段。

### 修改导航菜单

在 `themeConfig.nav` 数组中添加或修改导航项。

### 修改侧边栏

在 `themeConfig.sidebar` 数组中配置侧边栏结构。

## 注意事项

- 确保 `base` 路径与您的仓库名称匹配
- 如果修改了仓库名称，请同时更新 `.vitepress/config.mts` 中的 `base` 配置
- 部署可能需要几分钟时间，请耐心等待
- 如果遇到 GitHub Actions 语法错误，请检查 `.github/workflows/deploy.yml` 文件的 YAML 格式 