# 🌨️ Winter 项目集合

<div align="center">

[![License](https://img.shields.io/badge/license-Apache%202-4EB1BA.svg)](https://www.apache.org/licenses/LICENSE-2.0.html)
[![Java support](https://img.shields.io/badge/Java-1.8+-green.svg)](https://openjdk.java.net/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.6+-blue.svg)](https://spring.io/projects/spring-boot)

</div>

> 🎯 Winter 是一个专注于 Spring Boot 生态的开源项目集合，旨在为开发者提供高质量、易用性强的工具和解决方案。

## 📚 项目列表

### 🔐 [Winter Encrypt](winter-encrypt.md)

**Spring Boot 加解密工具包**

- 🚀 **零配置自动装配**，即插即用
- 🔒 支持 **AES/DES/RSA** 等主流加密算法
- 🏷️ **注解驱动**，`@Encrypt/@Decrypt/@FieldEncrypt/@FieldDecrypt` 一键加解密
- 📦 **集合类型全覆盖**，自动处理 List/Set/Map/Array 等容器
- 🔧 内置**多种加密模式**（ECB、CBC、CFB、OFB、CTR）和**填充方式**

**适用场景：**
- 敏感数据加密传输
- 数据库字段加密存储
- API 接口数据安全
- 配置文件敏感信息保护

**快速开始：**
```xml
<dependency>
    <groupId>io.github.hahaha-zsq</groupId>
    <artifactId>winter-encrypt-spring-boot-starter</artifactId>
    <version>0.0.32</version>
</dependency>
```

---

### 📝 [Winter Log](winter-log.md)

**轻量级日志记录组件**

- 🔍 基于AOP实现，自动捕获使用 `@SystemLog` 注解的方法调用
- 🚨 自动记录系统异常信息，包含详细的堆栈信息
- 📊 完整记录HTTP请求信息（参数、请求体、响应体、请求头等）
- 🔧 支持自定义日志处理实现，可轻松集成数据库或消息队列
- 🌐 自动获取客户端IP、地理位置、浏览器信息等
- 🔒 自动过滤敏感信息（如密码字段）

**适用场景：**
- 系统操作日志记录
- 用户行为分析
- 性能监控和优化
- 安全审计和追踪

**快速开始：**
```xml
<dependency>
    <groupId>io.github.hahaha-zsq</groupId>
    <artifactId>winter-log-spring-boot-starter</artifactId>
    <version>0.0.1</version>
</dependency>
```

---

## 🏗️ 技术架构

### 设计理念

Winter 项目集合遵循以下设计理念：

1. **简单易用** - 零配置，开箱即用
2. **高性能** - 基于成熟的技术栈，性能优异
3. **可扩展** - 支持自定义扩展和插件机制
4. **安全可靠** - 经过充分测试，生产环境可用
5. **文档完善** - 详细的文档和示例

### 技术栈

- **Java 8+** - 核心开发语言
- **Spring Boot 2.6+** - 应用框架
- **Spring AOP** - 面向切面编程
- **Maven/Gradle** - 构建工具
- **Apache License 2.0** - 开源协议

### 项目结构

```
winter-projects/
├── winter-encrypt-spring-boot-starter/    # 加解密工具包
│   ├── src/main/java/
│   │   ├── annotation/                    # 注解定义
│   │   ├── aspect/                        # AOP切面
│   │   ├── config/                        # 自动配置
│   │   ├── service/                       # 核心服务
│   │   ├── strategy/                      # 策略模式实现
│   │   └── util/                          # 工具类
│   └── src/main/resources/
│       └── META-INF/                      # Spring Boot自动配置
│
├── winter-log-spring-boot-starter/        # 日志记录组件
│   ├── src/main/java/
│   │   ├── annotation/                    # 注解定义
│   │   ├── aspect/                        # AOP切面
│   │   ├── config/                        # 配置类
│   │   ├── entity/                        # 实体类
│   │   ├── filter/                        # 请求过滤器
│   │   ├── service/                       # 日志服务
│   │   └── util/                          # 工具类
│   └── src/main/resources/
│       └── META-INF/                      # Spring Boot自动配置
│
└── docs/                                  # 项目文档
    ├── getting-started.md                 # 快速开始
    ├── api-reference.md                   # API参考
    ├── tutorials/                         # 教程
    └── projects/                          # 项目文档
```

## 🚀 快速集成

### 1. 选择需要的组件

根据项目需求选择合适的 Winter 组件：

```xml
<!-- 如果需要加解密功能 -->
<dependency>
    <groupId>io.github.hahaha-zsq</groupId>
    <artifactId>winter-encrypt-spring-boot-starter</artifactId>
    <version>0.0.32</version>
</dependency>

<!-- 如果需要日志记录功能 -->
<dependency>
    <groupId>io.github.hahaha-zsq</groupId>
    <artifactId>winter-log-spring-boot-starter</artifactId>
    <version>0.0.1</version>
</dependency>
```

### 2. 配置应用

在 `application.yml` 中添加相应配置：

```yaml
# Winter Encrypt 配置
winter-crypto:
  aes:
    key: your-aes-key-here
    iv: your-aes-iv-here
  rsa:
    private-key: your-rsa-private-key
    public-key: your-rsa-public-key

# Winter Log 配置
winter-log:
  run-time: 0
  result-length: 1000
  is-print: true
```

### 3. 开始使用

```java
@SpringBootApplication
@EnableWinterLog  // 启用日志功能
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

@RestController
public class DemoController {
    
    // 使用加密功能
    @Encrypt
    @GetMapping("/secure-data")
    public SecureData getSecureData() {
        SecureData data = new SecureData();
        data.setSensitiveInfo("sensitive data");
        return data;
    }
    
    // 使用日志功能
    @SystemLog(operationModule = "用户管理", operationType = OperationLogType.QUERY, operationDesc = "查询用户")
    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.findAll();
    }
}
```

## 📊 项目统计

| 项目 | 版本 | 下载量 | 星标数 | 最后更新 |
|------|------|--------|--------|----------|
| Winter Encrypt | v0.0.32 | ![Maven Central](https://img.shields.io/maven-central/v/io.github.hahaha-zsq/winter-encrypt-spring-boot-starter.svg) | ![GitHub stars](https://img.shields.io/github/stars/hahaha-zsq/winter-encrypt-spring-boot-starter.svg?style=social&label=Stars) | 2024-01-15 |
| Winter Log | v0.0.1 | 开发中 | 开发中 | 2024-01-15 |

## 🛣️ 发展路线

### 已完成 ✅

- [x] Winter Encrypt 核心功能开发
- [x] Winter Log 基础功能实现
- [x] 项目文档和示例完善
- [x] Maven 中央仓库发布

### 进行中 🔄

- [ ] Winter Log 功能优化
- [ ] 性能测试和优化
- [ ] 更多使用示例

### 计划中 📋

- [ ] Winter Cache - 缓存组件
- [ ] Winter Validation - 数据验证组件
- [ ] Winter Security - 安全组件
- [ ] Winter Monitor - 监控组件
- [ ] 更多 Spring Boot Starter

## 🤝 贡献指南

我们欢迎所有形式的贡献！无论是新功能、文档改进还是问题修复，都欢迎您的参与。

### 如何贡献

1. **Fork 项目** 到您的 GitHub 账号
2. **创建特性分支** (`git checkout -b feature/amazing-feature`)
3. **提交更改** (`git commit -m 'Add some amazing feature'`)
4. **推送到分支** (`git push origin feature/amazing-feature`)
5. **创建 Pull Request**

### 贡献类型

- 🐛 **Bug修复** - 修复现有功能中的问题
- ✨ **新功能** - 添加全新的功能特性
- 📝 **文档** - 改进文档或添加示例
- 🔧 **优化** - 改进现有功能但不添加新功能  
- 🧪 **测试** - 添加或修改测试用例
- 🔒 **安全** - 安全相关的改进

## 📞 联系我们

- 📧 **邮箱**: 2595915122@qq.com
- 💬 **GitHub Issues**: [提交问题](https://github.com/hahaha-zsq/winter-encrypt-spring-boot-starter/issues)
- 🌐 **GitHub Discussions**: [参与讨论](https://github.com/hahaha-zsq/winter-encrypt-spring-boot-starter/discussions)

## 📄 开源协议

Winter 项目集合采用 [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0) 开源协议。

---

<div align="center">

### 🌟 如果 Winter 项目对您有帮助，请给个 Star ⭐

**让我们一起构建更好的 Java 生态系统！**

---

❤️ **感谢所有贡献者和支持者！** 

</div> 