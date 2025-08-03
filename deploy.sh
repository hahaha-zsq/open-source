#!/bin/bash

# 部署脚本 - 触发 GitHub Actions 流水线

echo "🚀 开始部署 VitePress 文档到 GitHub Pages..."

# 检查是否在 Git 仓库中
if [ ! -d ".git" ]; then
    echo "❌ 错误：当前目录不是 Git 仓库"
    echo "请先初始化 Git 仓库："
    echo "  git init"
    echo "  git remote add origin https://github.com/[您的用户名]/open-source.git"
    exit 1
fi

# 检查是否有未提交的更改
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 检测到未提交的更改，正在提交..."
    git add .
    git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')"
fi

# 检查当前分支
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 当前分支: $CURRENT_BRANCH"

# 如果不是 main 分支，切换到 main 分支
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "🔄 切换到 main 分支..."
    git checkout main
fi

# 推送到远程仓库
echo "📤 推送到 GitHub..."
git push origin main

echo "✅ 代码已推送到 GitHub"
echo ""
echo "📋 接下来需要手动操作："
echo "1. 进入 GitHub 仓库页面"
echo "2. 点击 'Settings' 标签"
echo "3. 在左侧菜单找到 'Pages'"
echo "4. 在 'Source' 部分选择 'GitHub Actions'"
echo ""
echo "🌐 部署完成后，您的网站将可通过以下地址访问："
echo "   https://[您的用户名].github.io/open-source/"
echo ""
echo "📊 您可以在仓库的 'Actions' 标签中查看部署进度" 