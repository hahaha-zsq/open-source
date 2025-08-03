#!/bin/bash

# 生成 package-lock.json 文件脚本

echo "🔧 生成 package-lock.json 文件..."

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：当前目录没有 package.json 文件"
    exit 1
fi

# 删除现有的 lock 文件
echo "🧹 清理现有的 lock 文件..."
rm -f package-lock.json
rm -f pnpm-lock.yaml

# 使用 npm 安装依赖并生成 package-lock.json
echo "📦 使用 npm 安装依赖..."
npm install

# 检查是否成功生成 package-lock.json
if [ -f "package-lock.json" ]; then
    echo "✅ 成功生成 package-lock.json 文件"
    echo "📄 文件大小: $(ls -lh package-lock.json | awk '{print $5}')"
else
    echo "❌ 生成 package-lock.json 失败"
    exit 1
fi

echo "🎉 完成！现在可以使用 npm ci 命令了" 