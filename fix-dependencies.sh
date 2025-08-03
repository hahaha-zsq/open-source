#!/bin/bash

# 修复依赖问题脚本

echo "🔧 修复依赖问题..."

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：当前目录没有 package.json 文件"
    exit 1
fi

# 清理现有的 lock 文件和 node_modules
echo "🧹 清理现有文件..."
rm -f package-lock.json
rm -f pnpm-lock.yaml
rm -rf node_modules

# 使用 npm 安装依赖并生成 package-lock.json
echo "📦 使用 npm 安装依赖..."
npm install

# 检查是否成功生成 package-lock.json
if [ -f "package-lock.json" ]; then
    echo "✅ 成功生成 package-lock.json 文件"
    echo "📄 文件大小: $(ls -lh package-lock.json | awk '{print $5}')"
    
    # 验证关键依赖是否存在
    echo "🔍 验证关键依赖..."
    if npm ls @escook/vitepress-theme > /dev/null 2>&1; then
        echo "✅ @escook/vitepress-theme 依赖正常"
    else
        echo "❌ @escook/vitepress-theme 依赖有问题"
    fi
    
    if npm ls vitepress > /dev/null 2>&1; then
        echo "✅ vitepress 依赖正常"
    else
        echo "❌ vitepress 依赖有问题"
    fi
else
    echo "❌ 生成 package-lock.json 失败"
    exit 1
fi

# 测试构建
echo "🧪 测试构建..."
if npm run docs:build; then
    echo "✅ 构建测试成功！"
else
    echo "❌ 构建测试失败"
    exit 1
fi

echo "🎉 依赖修复完成！"
echo "📋 现在可以安全地使用 npm ci 命令了" 