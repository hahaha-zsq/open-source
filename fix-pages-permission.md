# 解决 GitHub Pages 权限问题

## 错误说明
`Error: Create Pages site failed` 和 `Error: HttpError: Resource not accessible by integration` 表示 GitHub Actions 没有权限创建 Pages 站点。

## 解决步骤

### 1. 手动启用 GitHub Pages

**这是最重要的步骤，必须手动完成：**

1. **进入您的 GitHub 仓库页面**
2. **点击 "Settings" 标签**
3. **在左侧菜单中找到 "Pages"**
4. **在 "Source" 部分选择 "GitHub Actions"**
5. **点击 "Save"**

### 2. 检查仓库权限设置

1. **进入仓库 "Settings"**
2. **点击左侧菜单中的 "Actions" → "General"**
3. **确保以下设置：**
   - "Workflow permissions" 选择 "Read and write permissions"
   - "Allow GitHub Actions to create and approve pull requests" 勾选

### 3. 检查 Actions 权限

1. **在仓库 "Settings" 中**
2. **点击 "Actions" → "General"**
3. **确保 "Actions permissions" 设置为 "Allow all actions and reusable workflows"**

### 4. 检查分支保护规则

1. **在仓库 "Settings" 中**
2. **点击 "Branches"**
3. **确保 master 分支没有阻止 Actions 的规则**

## 验证步骤

### 检查 Pages 是否已启用

启用后，您应该能看到：
- 仓库设置中的 "Pages" 显示为已配置
- 在仓库主页面的 "Settings" → "Pages" 中可以看到配置

### 重新触发部署

启用 Pages 后，运行以下命令：

```bash
# 使用部署脚本
./trigger-deploy.sh

# 或者手动推送
git add .
git commit -m "Fix Pages permissions"
git push origin master
```

## 常见问题

### Q: 为什么需要手动启用？
A: GitHub Pages 需要仓库所有者手动启用，这是 GitHub 的安全策略。

### Q: 启用后还是失败怎么办？
A: 请检查仓库的 Actions 权限设置，确保 Actions 有足够的权限。

### Q: 如何检查权限是否正确？
A: 在仓库的 "Settings" → "Actions" → "General" 中检查权限设置。

## 替代方案

如果上述方法都不行，可以尝试：

1. **使用 GitHub CLI 启用 Pages：**
   ```bash
   gh auth login
   gh repo edit --enable-pages
   ```

2. **联系 GitHub 支持**（如果是企业账户）

## 成功标志

当一切配置正确时，您应该看到：
- GitHub Actions 成功运行
- 在 "Actions" 标签中看到绿色的成功标记
- 网站可以通过 `https://[用户名].github.io/open-source/` 访问 