# 🎨 dadandiaoming-cli

一个功能强大的前端项目脚手架工具，支持快速创建 Vue3 和 React 项目模板。让项目创建变得简单而优雅！ ✨

<div class="badge-container" align="center">

[![npm version](https://badge.fury.io/js/dadandiaoming-cli.svg)](https://badge.fury.io/js/dadandiaoming-cli) [![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC) [![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)

</div>

## ✨ 特性

- 🚀 **多框架支持**：支持 Vue3 和 React 项目模板
- 📦 **TypeScript 支持**：基于 TypeScript 开发，提供完整的类型支持
- 🎨 **交互式界面**：友好的命令行交互界面，操作简单直观
- ⚡️ **快速创建**：一键生成完整项目结构，提高开发效率
- 🛠️ **工具集成**：内置包管理工具安装与配置
- 🔄 **自动更新**：支持脚手架版本检查与更新
- 🎯 **零配置**：开箱即用，无需复杂配置
- 🌐 **镜像支持**：自动配置淘宝镜像，加速依赖安装

## 📋 系统要求

- Node.js >= 18.0.0
- npm >= 8.0.0 或 yarn >= 1.22.0 或 pnpm >= 7.0.0
- Git（用于克隆模板仓库）

## 📦 安装

### 全局安装（推荐）
```bash
npm install -g dadandiaoming-cli
```

## 🚀 快速开始

### 创建新项目
```bash
# 方式一：直接指定项目名称
dadandiaoming create my-project

# 方式二：交互式创建
dadandiaoming create
```

### 完整的创建流程
1. 运行创建命令
2. 输入项目名称（如果未指定）
3. 选择项目模板（Vue/React）
4. 等待模板下载和项目初始化完成

### 示例输出
```bash
$ dadandiaoming create my-vue-app
✔ 请选择模版 › vue
🎉 正在创建项目...
✨ 项目创建成功！

📁 进入项目目录：cd my-vue-app
📦 安装依赖：npm install
🚀 启动开发：npm run dev
```

## 🛠️ 命令行选项

| 命令 | 别名 | 描述 | 示例 |
|------|------|------|------|
| `create [name]` | - | 创建新项目 | `dadandiaoming create my-app` |
| `package` | `pkg` | 安装配置包管理工具 | `dadandiaoming pkg` |
| `update` | - | 更新脚手架到最新版本 | `dadandiaoming update` |
| `--version` | `-v` | 显示版本号 | `dadandiaoming -v` |
| `--help` | `-h` | 显示帮助信息 | `dadandiaoming -h` |

## 📚 可用模板

### 🟢 Vue 模板
- **名称**：`vue`
- **描述**：基于 Vue3 的现代化项目模板
- **技术栈**：
  - Vue 3.x + TypeScript
  - Vite 构建工具
  - Vue Router 路由管理
  - Pinia 状态管理
  - Element Plus / Ant Design Vue UI组件库
  - ESLint + Prettier 代码规范
- **特性**：
  - 🔥 热模块替换（HMR）
  - 📱 响应式设计
  - 🎨 CSS 预处理器支持
  - 🛡️ TypeScript 严格模式

### ⚛️ React 模板
- **名称**：`react`
- **描述**：基于 React 的现代化项目模板
- **技术栈**：
  - React 18.x + TypeScript
  - Vite 构建工具
  - React Router 路由管理
  - Redux Toolkit 状态管理
  - Ant Design / Material-UI 组件库
  - ESLint + Prettier 代码规范
- **特性**：
  - 🔥 React 18 新特性支持
  - 📱 移动端适配
  - 🎨 样式解决方案集成
  - ⚡️ 快速热重载

## 📦 包管理工具配置

使用 `package` 命令快速安装和配置包管理工具：

```bash
dadandiaoming package
# 或使用简写
dadandiaoming pkg
```

支持的包管理工具：
- **yarn**：快速、可靠、安全的依赖管理工具
- **pnpm**：快速、节省磁盘空间的包管理器

该命令会：
1. 全局安装选择的包管理工具
2. 自动配置淘宝镜像源
3. 验证安装结果

## 🚀 版本发布

项目配置了完整的自动版本管理和发布流程：

```bash
# 发布补丁版本（bug修复）
npm run version:patch

# 发布次要版本（新功能）
npm run version:minor

# 发布主要版本（重大更改）
npm run version:major
```

这些命令会自动：
- 更新package.json版本号
- 提交更改到git
- 创建版本标签
- 推送到GitHub
- 触发GitHub Actions自动发布到npm

详细使用说明请查看：[docs/VERSION_MANAGEMENT.md](docs/VERSION_MANAGEMENT.md)

## 📋 更新日志

### v0.1.5
- ✨ 新增包管理工具安装配置功能
- 🐛 修复模板克隆时的路径问题
- 📝 优化交互提示信息

### v0.1.4
- 🚀 支持自动版本检查
- 🛠️ 优化错误处理
- 📦 更新依赖版本

## ❓ 常见问题

### Q: 项目创建失败怎么办？
A: 请检查以下几点：
- 网络连接是否正常
- Node.js 版本是否符合要求
- 目标目录是否有写入权限
- Git 是否正确安装

### Q: 如何更新脚手架版本？
A: 使用以下命令：
```bash
dadandiaoming update
# 或者重新全局安装
npm install -g dadandiaoming-cli@latest
```

### Q: 可以自定义模板吗？
A: 目前版本暂不支持自定义模板，后续版本会考虑添加此功能。

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的修改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request

## 📄 许可证

本项目基于 [ISC](https://opensource.org/licenses/ISC) 许可证开源。

## 👨‍💻 作者

**dadandiaoming**

- GitHub: [@dadandiaoming-cli](https://github.com/hahaha-zsq/dadandiaoming-cli)
- Email: 2595915122@qq.com

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

---

如果这个项目对您有帮助，请考虑给它一个 ⭐️
