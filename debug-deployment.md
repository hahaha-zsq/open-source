# 部署后没有样式的调试指南

## 常见原因

### 1. Base 路径配置问题
最常见的原因是 `base` 路径配置不正确。

**检查方法：**
- 确保 `.vitepress/config.mts` 中有 `base: '/open-source/'`
- 确保仓库名称是 `open-source`

### 2. 资源路径问题
CSS 和 JS 文件的路径可能不正确。

**检查方法：**
1. 打开浏览器开发者工具 (F12)
2. 查看 Console 标签页是否有错误
3. 查看 Network 标签页，检查 CSS/JS 文件是否加载失败

### 3. 构建问题
构建过程中可能出现了问题。

**检查方法：**
```bash
# 本地测试构建
chmod +x test-styles.sh
./test-styles.sh
```

## 调试步骤

### 1. 检查 GitHub Actions 构建日志
1. 进入 GitHub 仓库
2. 点击 "Actions" 标签
3. 查看最新的构建日志
4. 检查是否有构建错误

### 2. 检查部署的文件
1. 在 GitHub 仓库中点击 "Settings" → "Pages"
2. 查看部署状态
3. 点击网站链接，查看是否正常

### 3. 浏览器调试
1. 打开部署的网站
2. 按 F12 打开开发者工具
3. 查看 Console 中的错误信息
4. 查看 Network 标签页，检查资源加载情况

## 常见错误和解决方案

### 错误：404 找不到 CSS/JS 文件
**原因：** Base 路径配置错误
**解决：** 确保 `base: '/open-source/'` 配置正确

### 错误：CORS 错误
**原因：** 资源路径不正确
**解决：** 检查 HTML 中的资源引用路径

### 错误：空白页面
**原因：** JavaScript 错误导致页面无法渲染
**解决：** 查看浏览器控制台的错误信息

## 测试脚本

运行以下脚本来测试本地构建：

```bash
# 测试样式加载
chmod +x test-styles.sh
./test-styles.sh

# 测试完整构建
chmod +x test-build.sh
./test-build.sh
```

## 验证清单

- [ ] `.vitepress/config.mts` 中有 `base: '/open-source/'`
- [ ] 仓库名称是 `open-source`
- [ ] GitHub Actions 构建成功
- [ ] 本地构建测试通过
- [ ] 浏览器控制台没有错误
- [ ] CSS/JS 文件能正常加载

## 重新部署

如果发现问题，重新部署：

```bash
./trigger-deploy.sh
```

## 联系支持

如果问题仍然存在，请提供：
1. GitHub Actions 构建日志
2. 浏览器控制台错误信息
3. 网站 URL 