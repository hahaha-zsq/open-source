---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Winter 开源技术体系"
  text: "全栈技术解决方案集合"
  tagline: 涵盖后端、前端、运维、数据库、工具等全栈技术，助力开发者高效成长
  image: /Snow.svg
  actions:
    - theme: brand
      text: 探索项目
      link: /开源项目/README
    - theme: alt
      text: 快速开始
      link: /开源项目/Java/winter-encrypt

features:
  - title: 🚀 AWS S3 分片上传系统
    details: 基于 Spring Boot + Vue 3 的企业级文件上传解决方案，采用分片上传、断点续传、秒传等先进技术，支持大文件高效传输
  - title: 🌨️ Winter MinIO
    details: 企业级 S3 兼容对象存储 Spring Boot Starter，基于 AWS S3 SDK 构建，完美兼容 MinIO、阿里云 OSS、腾讯云 COS 等存储服务
  - title: 🔐 Winter Encrypt
    details: Spring Boot 加解密工具包，支持 AES/DES/RSA 算法，注解式加解密，集合类型全覆盖，生产环境验证
  - title: 📝 Winter Log
    details: 轻量级日志记录组件，基于 AOP 自动捕获操作日志和异常日志，支持自定义处理和多种输出格式
  - title: 🛠️ dadandiaoming-cli
    details: 现代化命令行脚手架工具，基于 Node.js 和 TypeScript 构建，支持项目模板生成、代码规范检查和自动化部署
  - title: 🐳 Shortcut-Script
    details: CentOS 7 自动化部署脚本，一键安装 Docker、MySQL、Redis、Nginx 等常用服务，支持离线部署
---

