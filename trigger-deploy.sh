#!/bin/bash

# 触发 GitHub Actions 部署脚本

echo "🚀 触发 GitHub Actions 部署..."

# 检查 Git 状态
if [ ! -d ".git" ]; then
    echo "❌ 错误：当前目录不是 Git 仓库"
    exit 1
fi

# 添加所有更改
echo "📝 添加所有更改..."
git add .

# 提交更改
echo "💾 提交更改..."
git commit -m "Trigger deployment: $(date '+%Y-%m-%d %H:%M:%S')"

# 推送到 GitHub
echo "📤 推送到 GitHub..."
git push origin main

echo "✅ 部署已触发！"
echo "📊 请在 GitHub 仓库的 'Actions' 标签中查看部署进度" 