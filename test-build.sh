#!/bin/bash

# 测试构建脚本

echo "🧪 测试 VitePress 构建..."

# 检查 pnpm 是否安装
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm 未安装，正在安装..."
    npm install -g pnpm
fi

# 安装依赖
echo "📦 安装依赖..."
pnpm install

# 测试构建
echo "🔨 测试构建..."
if pnpm run docs:build; then
    echo "✅ 构建成功！"
    echo "📁 构建输出目录: .vitepress/dist"
    
    # 检查构建输出
    if [ -d ".vitepress/dist" ]; then
        echo "📄 构建文件列表："
        ls -la .vitepress/dist/
    else
        echo "❌ 构建输出目录不存在"
    fi
else
    echo "❌ 构建失败"
    exit 1
fi 