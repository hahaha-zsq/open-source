# 启用 GitHub Pages 的步骤

如果遇到 "Get Pages site failed" 错误，请按照以下步骤手动启用 GitHub Pages：

## 方法一：通过 GitHub 网页界面启用

### 1. 进入仓库设置
1. 打开您的 GitHub 仓库页面
2. 点击 "Settings" 标签

### 2. 找到 Pages 设置
1. 在左侧菜单中滚动找到 "Pages"
2. 点击 "Pages"

### 3. 配置 Pages
1. 在 "Source" 部分，选择 "GitHub Actions"
2. 点击 "Save" 按钮

## 方法二：通过 GitHub CLI 启用

如果您安装了 GitHub CLI，可以使用以下命令：

```bash
# 安装 GitHub CLI（如果还没有安装）
# macOS: brew install gh
# Windows: winget install GitHub.cli
# Linux: 参考 https://github.com/cli/cli#installation

# 登录 GitHub
gh auth login

# 启用 Pages
gh repo edit --enable-pages
```

## 验证 Pages 是否已启用

启用后，您应该能看到：
- 仓库设置中的 "Pages" 选项显示为已配置
- 在仓库主页面的 "Settings" 标签下可以看到 Pages 配置

## 重新触发部署

启用 Pages 后，重新推送代码或手动触发工作流：

```bash
# 使用部署脚本
./trigger-deploy.sh

# 或者手动推送
git add .
git commit -m "Enable Pages deployment"
git push origin master
```

## 常见问题

### Q: 为什么需要手动启用 Pages？
A: GitHub Pages 需要仓库所有者手动启用，这是一个安全措施。

### Q: 启用后多久能看到网站？
A: 通常需要 1-5 分钟，您可以在仓库的 "Actions" 标签中查看部署进度。

### Q: 网站地址是什么？
A: 启用后，您的网站地址将是：`https://[您的用户名].github.io/open-source/` 