#!/bin/bash

# 测试样式加载脚本

echo "🎨 测试样式加载..."

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：当前目录没有 package.json 文件"
    exit 1
fi

# 构建项目
echo "🔨 构建项目..."
if npm run docs:build; then
    echo "✅ 构建成功"
else
    echo "❌ 构建失败"
    exit 1
fi

# 检查构建输出
if [ -d ".vitepress/dist" ]; then
    echo "📁 检查构建输出..."
    
    # 检查 CSS 文件
    if [ -f ".vitepress/dist/assets/index.css" ]; then
        echo "✅ CSS 文件存在"
        echo "📄 CSS 文件大小: $(ls -lh .vitepress/dist/assets/index.css | awk '{print $5}')"
    else
        echo "❌ CSS 文件不存在"
        echo "📄 可用的 CSS 文件："
        find .vitepress/dist -name "*.css" -type f
    fi
    
    # 检查 JS 文件
    if [ -f ".vitepress/dist/assets/index.js" ]; then
        echo "✅ JS 文件存在"
        echo "📄 JS 文件大小: $(ls -lh .vitepress/dist/assets/index.js | awk '{print $5}')"
    else
        echo "❌ JS 文件不存在"
        echo "📄 可用的 JS 文件："
        find .vitepress/dist -name "*.js" -type f
    fi
    
    # 检查 HTML 文件
    if [ -f ".vitepress/dist/index.html" ]; then
        echo "✅ HTML 文件存在"
        echo "📄 HTML 文件大小: $(ls -lh .vitepress/dist/index.html | awk '{print $5}')"
        
        # 检查 HTML 中的资源引用
        echo "🔍 检查 HTML 中的资源引用..."
        if grep -q "assets/index" .vitepress/dist/index.html; then
            echo "✅ HTML 中包含资源引用"
        else
            echo "❌ HTML 中缺少资源引用"
        fi
    else
        echo "❌ HTML 文件不存在"
    fi
    
    # 列出所有构建文件
    echo "📄 构建文件列表："
    find .vitepress/dist -type f | head -20
else
    echo "❌ 构建输出目录不存在"
    exit 1
fi

echo "🎉 样式测试完成！" 