---
title: Winter MinIO Spring Boot Starter
description: 企业级 S3 兼容对象存储 Spring Boot Starter，基于 AWS S3 SDK 构建
layout: doc
---

# 🌨️ Winter MinIO Spring Boot Starter

<div class="badge-container" align="center">

<a href="https://www.apache.org/licenses/LICENSE-2.0.html">
  <img src="https://img.shields.io/badge/license-Apache%202-4EB1BA.svg?style=for-the-badge&logo=apache&logoColor=D22128" alt="License">
</a>
<a href="https://openjdk.java.net/">
  <img src="https://img.shields.io/badge/Java-1.8+-green.svg?style=for-the-badge&logo=openjdk&logoColor=437291" alt="Java support">
</a>
<a href="https://spring.io/projects/spring-boot">
  <img src="https://img.shields.io/badge/Spring%20Boot-2.6+-blue.svg?style=for-the-badge&logo=springboot&logoColor=6DB33F" alt="Spring Boot">
</a>
<a href="https://aws.amazon.com/sdk-for-java/">
  <img src="https://img.shields.io/badge/AWS%20SDK%20S3-1.12.709-FF9900.svg?style=for-the-badge&logo=minio&logoColor=C72E49" alt="AWS SDK S3">
</a>
<a href="https://search.maven.org/artifact/io.github.hahaha-zsq/winter-minio-spring-boot-starter">
  <img src="https://img.shields.io/maven-central/v/io.github.hahaha-zsq/winter-minio-spring-boot-starter.svg?style=for-the-badge&logo=apachemaven&logoColor=C71A36" alt="Maven Central">
</a>
<a href="https://github.com/hahaha-zsq/winter-minio-spring-boot-starter">
  <img src="https://img.shields.io/github/stars/hahaha-zsq/winter-minio-spring-boot-starter.svg?style=for-the-badge&logo=github&logoColor=181717" alt="GitHub stars">
</a>

</div>

::: info 项目简介
**企业级 S3 兼容对象存储 Spring Boot Starter**

基于 AWS S3 SDK 构建，完美兼容 MinIO、阿里云 OSS、腾讯云 COS 等 S3 协议存储服务
:::

::: tip 演示视频
📺 **项目演示视频**: [aws-s3分片、断点，秒传](https://www.bilibili.com/video/BV1qkY3zFEzt/?share_source=copy_web&vd_source=c447f1819318b0fe977ae468afb3faf6)
:::

---

## 🚀 项目简介

Winter MinIO Spring Boot Starter 是一个企业级的 S3 兼容对象存储解决方案，提供开箱即用的 `AmazonS3Template` 工具类，封装了存储桶管理、对象上传/下载、预签名 URL、分片上传、断点续传、进度监控、元数据管理等企业级功能。

### 🎯 为什么选择 Winter MinIO Starter？

::: tip 核心优势
- **🔧 开箱即用** - 零配置启动，自动装配 S3 客户端和模板类
- **🌐 广泛兼容** - 支持 MinIO、AWS S3、阿里云 OSS、腾讯云 COS 等 S3 协议存储
- **⚡ 性能优化** - 内置连接池、超时配置、重试机制，支持大文件分块上传
- **🔒 安全可靠** - 预签名 URL、访问策略管理、SSL/TLS 支持
- **📊 功能完整** - 涵盖存储桶管理、对象操作、元数据、生命周期、版本控制等全场景
:::

## ✨ 功能特性

### 核心功能

| 功能模块 | 描述 | 支持状态 |
|---------|------|----------|
| 🗂️ **存储桶管理** | 创建、删除、检查存在性、列举所有桶 | ✅ |
| 📄 **对象操作** | 上传、下载、删除、复制、移动、重命名 | ✅ |
| 🔗 **预签名 URL** | 生成临时访问链接，支持 GET/PUT 操作 | ✅ |
| 🧩 **分片上传** | 大文件自动分片，支持并发和断点续传 | ✅ |
| 🏷️ **元数据管理** | 完整的对象元数据设置和获取 | ✅ |
| 🔄 **批量操作** | 批量删除、复制、移动对象 | ✅ |
| 🛡️ **访问策略** | 内置只读、只写、读写策略，支持自定义 | ✅ |
| 📋 **生命周期** | 自动化对象存储策略配置 | ✅ |
| 🔢 **版本控制** | 启用/禁用对象版本管理 | ✅ |

### 企业级特性

::: tip 高级功能
- **智能分片上传** - 自动处理大文件分片，支持并发上传和断点续传
- **实时进度监控** - 上传/下载进度实时回调，支持进度条显示
- **批量操作支持** - 批量删除、复制、移动对象操作
- **元数据管理** - 完整的对象元数据设置和获取能力
- **生命周期管理** - 自动化对象存储策略配置
- **安全访问控制** - 预签名 URL、访问策略、SSL/TLS 支持
:::

## 📦 快速开始

### 1. 添加依赖

**Maven**
```xml
<dependency>
    <groupId>io.github.hahaha-zsq</groupId>
    <artifactId>winter-minio-spring-boot-starter</artifactId>
    <version>xxx</version>
</dependency>
```

**Gradle**
```gradle
implementation 'io.github.hahaha-zsq:winter-minio-spring-boot-starter:xxx'
```

### 2. 配置文件

**application.yml**
```yaml
winter-aws:
  # 必填配置
  access-key: minioadmin              # 访问密钥
  secret-key: minioadmin              # 秘密密钥
  endpoint: http://localhost:9000     # 服务端点
  bucket: default-bucket              # 默认存储桶
  
  # 可选配置
  region: us-east-1                   # 区域设置
  path-style-access: true             # 路径风格访问（MinIO推荐true）
  custom-domain: https://cdn.example.com  # 自定义域名
  enabled: true                       # 是否启用（默认true）
```

**application.properties**
```properties
# 必填配置
winter-aws.access-key=minioadmin
winter-aws.secret-key=minioadmin
winter-aws.endpoint=http://localhost:9000
winter-aws.bucket=default-bucket

# 可选配置
winter-aws.region=us-east-1
winter-aws.path-style-access=true
winter-aws.custom-domain=https://cdn.example.com
winter-aws.enabled=true
```

### 3. 基本使用

```java
@RestController
@RequiredArgsConstructor
public class FileController {
    
    private final AmazonS3Template s3Template;
    
    /**
     * 文件上传
     */
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String objectKey = "uploads/" + System.currentTimeMillis() + "/" + file.getOriginalFilename();
            s3Template.putObject(objectKey, file, null);
            String fileUrl = s3Template.getGatewayUrl(objectKey);
            return ResponseEntity.ok(fileUrl);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("上传失败: " + e.getMessage());
        }
    }
    
    /**
     * 生成下载链接
     */
    @GetMapping("/download/{objectKey}")
    public ResponseEntity<String> getDownloadUrl(@PathVariable String objectKey) {
        // 生成15分钟有效期的下载链接
        String downloadUrl = s3Template.getObjectUrl(objectKey, 15);
        return ResponseEntity.ok(downloadUrl);
    }
    
    /**
     * 检查文件是否存在
     */
    @GetMapping("/exists/{objectKey}")
    public ResponseEntity<Boolean> checkFileExists(@PathVariable String objectKey) {
        boolean exists = s3Template.objectExists(objectKey);
        return ResponseEntity.ok(exists);
    }
}
```
::: info 配置说明
⚙️ **完整配置参数**
:::

### 配置参数详情

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `access-key` | String | ✅ | - | S3 访问密钥 ID |
| `secret-key` | String | ✅ | - | S3 秘密访问密钥 |
| `endpoint` | String | ✅ | - | S3 服务端点 URL |
| `bucket` | String | ✅ | - | 默认存储桶名称 |
| `region` | String | ❌ | `ap-east-1` | AWS 区域代码 |
| `path-style-access` | Boolean | ❌ | `true` | 是否使用路径风格访问。true 时使用 path-style 模式（如 http://endpoint/bucketname/object-key），适用于 nginx 反向代理和 S3 默认配置；false 时使用 virtual-hosted-style 模式（如 http://bucketname.endpoint/object-key），适用于阿里云等服务 |
| `custom-domain` | String | ❌ | - | 自定义访问域名 |
| `enabled` | Boolean | ❌ | `true` | 是否启用自动配置 |

### 不同环境配置示例

<details>
<summary>点击展开环境配置示例</summary>

**开发环境 (application-dev.yml)**
```yaml
winter-aws:
  access-key: minioadmin
  secret-key: minioadmin
  endpoint: http://localhost:9000
  bucket: dev-bucket
  path-style-access: true
```

**生产环境 (application-prod.yml)**
```yaml
winter-aws:
  access-key: ${AWS_ACCESS_KEY}
  secret-key: ${AWS_SECRET_KEY}
  endpoint: https://s3.amazonaws.com
  bucket: prod-bucket
  region: us-east-1
  path-style-access: false
  custom-domain: https://cdn.yourdomain.com
  max-connections: 100
  connection-timeout: 60000
```

</details>

::: info API 文档
📖 **核心 API 概览**
:::

### API 接口详情

#### 🗂️ 存储桶管理

| 方法 | 描述 | 返回值 |
|------|------|--------|
| `createBucket(String bucketName)` | 创建存储桶 | `Bucket` |
| `deleteBucket(String bucketName)` | 删除存储桶 | `void` |
| `bucketExists(String bucketName)` | 检查存储桶是否存在 | `boolean` |
| `listBuckets()` | 列举所有存储桶 | `List<Bucket>` |
| `setBucketPolicy(String bucketName, PolicyType policyType)` | 设置存储桶策略 | `void` |

#### 📄 对象操作

| 方法 | 描述 | 返回值 |
|------|------|--------|
| `putObject(String objectKey, MultipartFile file, Map<String, String> metadata)` | 上传文件 | `PutObjectResult` |
| `getObject(String objectKey)` | 获取对象 | `S3Object` |
| `downloadObject(String objectKey, File localFile)` | 下载文件到本地 | `void` |
| `deleteObject(String objectKey)` | 删除对象 | `void` |
| `deleteObjects(List<String> objectKeys)` | 批量删除对象 | `DeleteObjectsResult` |
| `copyObject(String sourceKey, String destinationKey)` | 复制对象 | `CopyObjectResult` |
| `objectExists(String objectKey)` | 检查对象是否存在 | `boolean` |

#### 🔗 预签名 URL

| 方法 | 描述 | 返回值 |
|------|------|--------|
| `getObjectUrl(String objectKey, int expires)` | 生成下载 URL | `String` |
| `getPresignedObjectPutUrl(String objectKey, int expires, TimeUnit timeUnit, String contentType)` | 生成上传 URL | `String` |
| `getGatewayUrl(String objectKey)` | 获取公共访问 URL | `String` |

#### 🧩 分片上传

| 方法 | 描述 | 返回值 |
|------|------|--------|
| `initiateMultipartUpload(String objectKey, String contentType)` | 初始化分片上传 | `InitiateMultipartUploadResult` |
| `uploadPart(String uploadId, String objectKey, String bucketName, int partNumber, long partSize, InputStream inputStream)` | 上传分片 | `UploadPartResult` |
| `completeMultipartUpload(String objectKey, String uploadId, List<PartSummary> parts)` | 完成分片上传 | `CompleteMultipartUploadResult` |
| `abortMultipartUpload(String objectKey, String uploadId)` | 中止分片上传 | `void` |

## ❓ 常见问题

<details>
<summary><strong>Q: 如何解决 "Connection refused" 错误？</strong></summary>

**A**: 检查 MinIO 服务是否正常启动，确认 endpoint 配置正确。

```bash
# 检查 MinIO 服务状态
docker ps | grep minio

# 测试连接
curl http://localhost:9000/minio/health/live
```
</details>

<details>
<summary><strong>Q: 上传大文件时内存占用过高？</strong></summary>

**A**: 使用分片上传功能，避免一次性加载大文件到内存。

```java
// 使用 InputStream 而不是 byte[]
InputStream inputStream = new FileInputStream(largeFile);
s3Template.putObject(objectKey, inputStream, file.length(), "application/octet-stream");
```
</details>

<details>
<summary><strong>Q: 如何设置自定义域名？</strong></summary>

**A**: 在配置中设置 `custom-domain` 参数，并确保 DNS 解析正确。

```yaml
winter-aws:
  custom-domain: https://cdn.yourdomain.com
  # 其他配置...
```
</details>

<details>
<summary><strong>Q: 支持哪些 S3 兼容服务？</strong></summary>

**A**: 支持所有兼容 S3 API 的对象存储服务：
- ✅ MinIO
- ✅ AWS S3
- ✅ 阿里云 OSS
- ✅ 腾讯云 COS
- ✅ 华为云 OBS
- ✅ 七牛云 Kodo
</details>

::: info 贡献指南
🤝 **欢迎贡献**

我们欢迎所有形式的贡献！请查看 [贡献指南](CONTRIBUTING.md) 了解如何参与项目开发。
:::

### 快速贡献

::: tip 贡献步骤
1. 🍴 Fork 本仓库
2. 🔧 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 📝 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 📤 推送到分支 (`git push origin feature/AmazingFeature`)
5. 🔄 开启 Pull Request
:::

### 问题反馈

::: details 反馈渠道
- 🐛 [提交 Bug 报告](../../issues/new?template=bug_report.md)
- 💡 [提交功能建议](../../issues/new?template=feature_request.md)
- 📖 [文档改进建议](../../issues/new?template=documentation.md)
:::

## 📄 许可证

本项目采用 [Apache License 2.0](LICENSE) 开源协议。

::: info 致谢
🙏 **感谢以下开源项目和贡献者**

- [AWS SDK for Java](https://github.com/aws/aws-sdk-java) - 提供 S3 客户端支持
- [Spring Boot](https://github.com/spring-projects/spring-boot) - 自动配置框架
- [MinIO](https://github.com/minio/minio) - 高性能对象存储服务
- 所有为这个项目做出贡献的开发者 ❤️
:::

---

::: tip 支持项目
**如果这个项目对您有帮助，请给我们一个 ⭐️**

[⬆ 回到顶部](#-winter-minio-spring-boot-starter)
:::