# Open Source 文档博客

这是一个使用 VitePress 搭建的文档博客项目。

## 📚 文档目录结构

### 开源项目
- **Java**
  - [winter-encrypt-spring-boot-starter](./开源项目/Java/winter-encrypt.md) - Spring Boot 加解密工具包
  - [winter-log-spring-boot-starter](./开源项目/Java/winter-log.md) - Spring Boot 日志工具包
- **前端** - React/Vue组件库和工具库
- **其他** - 算法实现、开发工具、脚本工具

### 后端技术
- **Java基础知识** - 集合框架、并发编程、JVM调优、设计模式
- **SpringBoot** - 核心特性、自动配置、Starter开发、监控与管理
- **SpringCloud** - 服务注册与发现、配置中心、服务网关、分布式链路追踪
- **中间件**
  - **RocketMQ** - 消息队列基础、集群部署、性能优化
  - **Kafka** - 消息流处理、集群管理、监控运维
  - **Elasticsearch** - 全文搜索、数据分析、集群部署
  - **XXL-JOB** - 分布式任务调度、任务管理、监控告警
  - **Minio** - 对象存储、文件管理、集群部署

### 前端技术
- **React** - 组件开发、Hooks使用、状态管理、性能优化
- **Vue** - 组件系统、响应式原理、路由管理、状态管理

### 容器技术
- **Docker** - 容器基础、Dockerfile编写、镜像管理、容器编排

### 代理技术
- **Nginx** - 基础配置、反向代理、负载均衡、SSL配置

### 数据库技术
- **MySQL** - 基础操作、索引优化、查询优化、事务处理
- **Redis** - 数据类型、持久化、集群部署、缓存策略

### 版本控制与协作
- **Git** - 基础命令、分支管理、合并策略、工作流程

### 开发工具
- **APIFOX** - API设计、接口测试、文档生成、团队协作
- **VFOX** - 版本管理、环境切换、多语言支持

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run docs:dev

# 构建生产版本
pnpm run docs:build

# 预览生产版本
pnpm run docs:preview

# 测试构建（推荐在部署前运行）
chmod +x test-build.sh
./test-build.sh
```

## GitHub Pages 部署

本项目已配置自动部署到 GitHub Pages。部署步骤如下：

### 1. 修复依赖问题（如果遇到 npm ci 错误）

如果遇到依赖同步错误，请运行：

```bash
chmod +x fix-dependencies.sh
./fix-dependencies.sh
```

### 2. 生成 package-lock.json（首次部署需要）

如果遇到 `npm ci` 错误，请先运行：

```bash
chmod +x generate-lockfile.sh
./generate-lockfile.sh
```

### 3. 仓库设置

确保您的 GitHub 仓库名为 `open-source`（与 base 路径匹配）。

### 4. 启用 GitHub Pages

1. 进入您的 GitHub 仓库
2. 点击 "Settings" 标签
3. 在左侧菜单中找到 "Pages"
4. 在 "Source" 部分选择 "GitHub Actions"

### 5. 推送代码

将代码推送到 `master` 分支：

```bash
git add .
git commit -m "Initial commit"
git push origin master
```

### 6. 使用部署脚本（推荐）

项目提供了便捷的部署脚本：

```bash
# 给脚本添加执行权限
chmod +x trigger-deploy.sh

# 运行部署脚本
./trigger-deploy.sh
```

或者使用完整版部署脚本：

```bash
chmod +x deploy.sh
./deploy.sh
```

### 7. 查看部署

- 部署完成后，您的网站将可通过 `https://[您的用户名].github.io/open-source/` 访问
- 您可以在仓库的 "Actions" 标签中查看部署进度

## 项目结构

```
.
├── .vitepress/
│   ├── config.mts          # VitePress 配置文件
│   └── theme/              # 主题文件
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions 部署配置
├── 开源项目/               # 开源项目文档
│   ├── Java/               # Java项目
│   ├── 前端/               # 前端项目
│   └── 其他/               # 其他项目
├── 后端/                   # 后端技术文档
│   ├── Java基础知识/
│   ├── SpringBoot/
│   ├── SpringCloud/
│   └── 中间件/
├── 前端/                   # 前端技术文档
│   ├── React/
│   └── Vue/
├── 容器/                   # 容器技术文档
│   └── Docker/
├── 代理/                   # 代理技术文档
│   └── Nginx/
├── 数据库/                 # 数据库技术文档
│   ├── MySQL/
│   └── Redis/
├── 版本控制与协作/         # 版本控制文档
│   └── Git/
├── 工具/                   # 开发工具文档
│   ├── APIFOX/
│   └── VFOX/
├── public/                 # 静态资源
├── index.md               # 首页
├── deploy.sh              # 完整部署脚本
├── trigger-deploy.sh      # 快速部署脚本
├── test-build.sh          # 测试构建脚本
├── generate-lockfile.sh   # 生成 lock 文件脚本
├── fix-dependencies.sh    # 修复依赖问题脚本
└── package.json
```

## 自定义配置

### 修改网站标题和描述

编辑 `.vitepress/config.mts` 文件中的 `title` 和 `description` 字段。

### 修改导航菜单

在 `themeConfig.nav` 数组中添加或修改导航项。

### 修改侧边栏

在 `themeConfig.sidebar` 数组中配置侧边栏结构。

## 故障排除

### npm ci 错误

如果遇到 `npm ci` 错误，通常是因为：
1. `package-lock.json` 文件不存在
2. `package-lock.json` 与 `package.json` 不同步
3. 缺少依赖项

**解决方案：**
```bash
./fix-dependencies.sh
```

### 依赖同步问题

如果遇到依赖同步问题，运行：
```bash
rm -f package-lock.json
rm -rf node_modules
npm install
```

## 注意事项

- 确保 `base` 路径与您的仓库名称匹配
- 如果修改了仓库名称，请同时更新 `.vitepress/config.mts` 中的 `base` 配置
- 部署可能需要几分钟时间，请耐心等待
- 如果遇到 GitHub Actions 语法错误，请检查 `.github/workflows/deploy.yml` 文件的 YAML 格式
- 项目使用 `pnpm` 作为包管理器，但 GitHub Actions 使用 `npm` 以确保兼容性
- 首次部署前请运行 `./fix-dependencies.sh` 确保依赖正确 