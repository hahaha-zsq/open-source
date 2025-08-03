#!/bin/bash

# 触发 GitHub Actions 部署脚本

echo "🚀 触发 GitHub Actions 部署..."

# 检查 Git 状态
if [ ! -d ".git" ]; then
    echo "❌ 错误：当前目录不是 Git 仓库"
    exit 1
fi

# 检查远程仓库是否已设置
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ 错误：未设置远程仓库"
    echo "请先设置远程仓库："
    echo "  git remote add origin https://github.com/[您的用户名]/open-source.git"
    exit 1
fi

# 检查是否存在 master 分支
if ! git show-ref --verify --quiet refs/heads/master; then
    echo "🔄 master 分支不存在，正在创建..."
    git checkout -b master
fi

# 检查当前分支
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "master" ]; then
    echo "🔄 切换到 master 分支..."
    git checkout master
fi

# 添加所有更改
echo "📝 添加所有更改..."
git add .

# 提交更改
echo "💾 提交更改..."
git commit -m "Trigger deployment: $(date '+%Y-%m-%d %H:%M:%S')"

# 推送到 GitHub
echo "📤 推送到 GitHub..."
if git push -u origin master; then
    echo "✅ 部署已成功触发！"
    echo "📊 请在 GitHub 仓库的 'Actions' 标签中查看部署进度"
else
    echo "❌ 推送失败，请检查远程仓库设置和权限"
    exit 1
fi 