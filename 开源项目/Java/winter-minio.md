# 🌨️  winter-minio-spring-boot-starter

<div class="badge-container" align="center">

[![License](https://img.shields.io/badge/license-Apache%202-4EB1BA.svg)](https://www.apache.org/licenses/LICENSE-2.0.html)
[![Java support](https://img.shields.io/badge/Java-1.8+-green.svg)](https://openjdk.java.net/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-2.6+-blue.svg)](https://spring.io/projects/spring-boot)
![aws-java-sdk-s3](https://img.shields.io/badge/AWSS3-1.12.780-005571)
[![GitHub stars](https://img.shields.io/github/stars/hahaha-zsq/winter-encrypt-spring-boot-starter.svg?style=social&label=Stars)](https://github.com/hahaha-zsq/winter-minio-spring-boot-starter)

</div>

>  ✨ 基于 AWS S3 SDK 的 Spring Boot Starter，提供开箱即用的 `AmazonS3Template` 工具类：封装了存储桶管理、对象上传/下载、预签名 URL、分片上传、元数据、生命周期、版本控制、通知等常见能力。

---

### 🔥 特性
- ✅ 简单易用：`AmazonS3Template` API 设计直观，默认值友好
- 🚀 上传增强：安全上传 InputStream，避免内存缓存风险；支持分片上传
- 🔐 临时访问：便捷生成预签名 URL（GET/PUT），可设置过期时间与 Content-Type
- 🧩 对象操作：复制、重命名、删除、批量删除、获取元数据、获取大小/最后修改时间
- 🗂️ 桶管理：创建/删除/策略设置、生命周期、版本控制、通知配置
- 🌐 访问优化：支持自定义域名或 Path/VHost 风格 Endpoint 的网关访问 URL 生成

---

## 1️⃣ 安装与引入

### 编译打包
```bash
mvn clean install
```

### 在你的项目中引入（Maven）
```xml
<dependency>
  <groupId>io.github.hahaha-zsq</groupId>
  <artifactId>winter-minio-spring-boot-starter</artifactId>
  <version>xxx</version>
</dependency>
```

---

## 2️⃣ 配置
在 Spring Boot 配置文件（推荐 `application.yml`）中添加：
```yaml
winter-aws:
  access-key: your-access-key
  secret-key: your-secret-key
  endpoint: http://your-minio-or-s3-endpoint:9000
  bucket: your-default-bucket
  path-style-access: true   # MinIO 通常为 true；原生 S3 通常为 false
  region: ap-east-1
  custom-domain: https://cdn.example.com   # 可选：自定义访问域名（用于网关 URL）
```

---

## 3️⃣ 快速开始

### 注入与基础使用
```java
@RestController
@RequiredArgsConstructor
public class DemoController {
    private final AmazonS3Template amazonS3Template;

    @PostMapping("/upload")
    public String upload(@RequestParam("file") MultipartFile file) throws IOException {
        String key = "2024-05-20/img/" + UUID.randomUUID() + getSuffix(file.getOriginalFilename());
        amazonS3Template.putObject(key, file, null);
        return amazonS3Template.getGatewayUrl(key);
    }

    private static String getSuffix(String filename) {
        int i = filename.lastIndexOf('.');
        return i >= 0 ? filename.substring(i) : "";
    }
}
```

### 生成预签名 URL（下载 GET）
```java
String url = amazonS3Template.getObjectUrl("your/object/key.jpg", 15); // 15 分钟
```

### 生成预签名 URL（上传 PUT，指定 Content-Type）
```java
String url = amazonS3Template.getObjectUrl(
    "your-bucket",
    "your/object/key.jpg",
    10,
    TimeUnit.MINUTES,
    org.springframework.http.MediaType.IMAGE_JPEG_VALUE
);
```

### 安全上传 InputStream（务必提供准确 contentLength）
```java
try (InputStream in = file.getInputStream()) {
    amazonS3Template.putObject(
        "your-bucket",
        "path/to/file.bin",
        org.springframework.http.MediaType.APPLICATION_OCTET_STREAM_VALUE,
        in,
        file.getSize(),   // 必须为准确的字节长度
        5 * 1024 * 1024   // 可选：单请求最大读取，默认 5MB
    );
}
```

### 分片上传（大文件）
```java
// 1) 初始化上传
InitiateMultipartUploadResult init = amazonS3Template.initiateMultipartUpload(
    "your-bucket", "big/xxx.zip", MediaType.APPLICATION_OCTET_STREAM_VALUE);
String uploadId = init.getUploadId();

// 2) 逐片上传，建议 5MB 或以上
UploadPartResult part1 = amazonS3Template.uploadPart(
    "your-bucket", uploadId, "big/xxx.zip", 1, filePart1);
// ... 多片

// 3) 合并分片
amazonS3Template.completeMultipartUpload("your-bucket", "big/xxx.zip", uploadId);

// 失败/取消
// amazonS3Template.abortMultipartUpload("big/xxx.zip", uploadId);
```

---

## 4️⃣ 常见场景示例

- 🪣 创建存储桶并设置策略
```java
amazonS3Template.createBucket("logs");
amazonS3Template.setBucketPolicy("logs", com.zsq.winter.minio.enums.PolicyType.READ_ONLY);
```

- 📄 获取对象元数据、大小、最后修改时间
```java
ObjectMetadata md = amazonS3Template.getObjectMetadata("key");
long size = amazonS3Template.getObjectSize("key");
Date last = amazonS3Template.getObjectLastModified("key");
```

- 🔁 复制、重命名、删除、批量删除
```java
amazonS3Template.copyObject("old/key.jpg", "copy/key.jpg");
amazonS3Template.renameObject("old/name.jpg", "new/name.jpg");
amazonS3Template.removeObject("to/delete.jpg");
amazonS3Template.deleteObjects(Arrays.asList("a.jpg","b.jpg"));
```

- ⏬ 下载到文件 / ⏯️ 范围读取
```java
amazonS3Template.downloadObject("key", new File("/tmp/file.bin"));
InputStream range = amazonS3Template.getObjectInputStream("key", 0, 1024);
```

- 🌐 获取网关 URL（支持自定义域名或自动拼接 Endpoint）
```java
String publicUrl = amazonS3Template.getGatewayUrl("path/to/img.png");
```

---

## 5️⃣ API 速查（按类别）

> 以下仅列常用方法，更多请查看 `AmazonS3Template` 源码。

### 🪣 存储桶（Bucket）

| 方法 | 说明 |
|---|---|
| `boolean existBucket(String bucketName)` | 判断桶是否存在 |
| `boolean createBucket(String bucketName)` | 创建桶 |
| `boolean createBucket(String bucketName, String policyText)` | 创建桶并设置自定义策略 |
| `boolean createBucket(String bucketName, PolicyType policyType)` | 创建桶并设置内置策略（READ_ONLY/WRITE_ONLY/READ_WRITE） |
| `void setBucketPolicy(String bucketName, String policyText)` | 设置桶策略（自定义策略文本） |
| `void setBucketPolicy(String bucketName, PolicyType policyType)` | 设置桶策略（内置策略） |
| `void removeBucket(String bucketName)` | 删除桶 |
| `List<Bucket> getAllBuckets()` | 查询所有桶 |
| `Optional<Bucket> getBucket(String bucketName)` | 查询指定桶 |
| `void setBucketLifecycleConfiguration(String bucketName, BucketLifecycleConfiguration config)` | 设置生命周期配置 |
| `BucketLifecycleConfiguration getBucketLifecycleConfiguration(String bucketName)` | 获取生命周期配置 |
| `void enableBucketVersioning(String bucketName)` / `void disableBucketVersioning(String bucketName)` | 启用/禁用版本控制 |
| `VersionListing listVersions(String bucketName, String prefix)` | 列出对象版本 |
| `void setBucketNotificationConfiguration(String bucketName, BucketNotificationConfiguration config)` | 设置通知配置 |
| `BucketNotificationConfiguration getBucketNotificationConfiguration(String bucketName)` | 获取通知配置 |

### 📦 对象（Object）上传/下载

| 方法 | 说明 |
|---|---|
| `PutObjectResult putObject(String bucket, String key, String mediaType, InputStream in, long contentLength, Integer size)` | 安全上传 InputStream（必须提供准确 contentLength） |
| `PutObjectResult putObject(String key, MultipartFile file, Integer size)` | 上传文件（使用默认桶） |
| `S3Object getObjectInfo(String bucket, String key)` | 获取对象信息 |
| `void downloadObject(String bucket, String key, File file)` | 下载对象到文件 |
| `void downloadObject(String key, File file)` | 下载对象到文件（默认桶） |
| `InputStream getObjectInputStream(String bucket, String key)` | 获取对象输入流 |
| `InputStream getObjectInputStream(String bucket, String key, long start, long end)` | 范围读取输入流 |

### 🔐 预签名 URL（临时授权访问）

| 方法 | 说明 |
|---|---|
| `String getPresignedObjectPutUrl(String bucket, String key, Integer time, TimeUnit unit)` | 生成 PUT 上传预签名 URL |
| `String getObjectUrl(String bucket, String key)` | 获取对象直链（若对象公开或配合签名） |
| `String getObjectUrl(String bucket, String key, Integer expireTime)` | 生成带过期的 GET 预签名 URL（默认分钟） |
| `String getObjectUrl(String bucket, String key, Integer expireTime, TimeUnit unit)` | 生成带过期的 GET 预签名 URL |
| `String getObjectUrl(String bucket, String key, Integer expireTime, TimeUnit unit, String contentType)` | 生成带过期且指定 Content-Type 的预签名 URL |
| `GeneratePresignedUrlRequest generatePresignedUrlRequest(...)` | 自定义更多参数生成请求 |

### 🧩 对象管理

| 方法 | 说明 |
|---|---|
| `boolean doesObjectExist(String bucket, String key)` | 判断对象是否存在 |
| `CopyObjectResult copyObject(String srcBucket, String srcKey, String dstBucket, String dstKey)` | 复制对象 |
| `CopyObjectResult copyObject(String sourceKey, String destinationKey)` | 复制对象（默认桶） |
| `void renameObject(String bucket, String oldKey, String newKey)` | 重命名（底层复制+删除） |
| `void renameObject(String oldKey, String newKey)` | 重命名（默认桶） |
| `void removeObject(String bucket, String key)` | 删除对象 |
| `void removeObject(String key)` | 删除对象（默认桶） |
| `DeleteObjectsResult removeObjects(String bucket, List<String> keys)` | 批量删除对象 |
| `DeleteObjectsResult deleteObjects(List<String> keys)` | 批量删除对象（默认桶） |
| `ObjectMetadata getObjectMetadata(String bucket, String key)` | 获取对象元数据 |
| `void setObjectMetadata(String bucket, String key, ObjectMetadata metadata)` | 设置对象元数据 |
| `long getObjectSize(String bucket, String key)` | 获取对象大小（字节） |
| `Date getObjectLastModified(String bucket, String key)` | 获取对象最后修改时间 |

### 🚚 分片上传（Multipart Upload）

| 方法 | 说明 |
|---|---|
| `InitiateMultipartUploadResult initiateMultipartUpload(String bucket, String key, String contentType)` | 初始化分片上传（返回 uploadId） |
| `UploadPartResult uploadPart(String bucket, String uploadId, String key, int partNumber, MultipartFile file)` | 上传分片（自动计算 MD5） |
| `UploadPartResult uploadPart(String bucket, String uploadId, String key, String md5, Integer partNumber, long partSize, InputStream in)` | 上传分片（自传 md5Digest） |
| `PartListing listParts(String bucket, String key, String uploadId)` | 列出已上传分片 |
| `CompleteMultipartUploadResult completeMultipartUpload(String bucket, String key, String uploadId)` | 合并分片 |
| `CompleteMultipartUploadResult completeMultipartUpload(String bucket, String key, String uploadId, List<PartSummary> parts)` | 合并分片（自传已上传分块信息） |
| `void abortMultipartUpload(String bucket, String key, String uploadId)` | 中止分片上传 |
| `MultipartUploadListing listMultipartUploads(String bucket, String prefix, String delimiter)` | 列出进行中的分片上传 |
| `List<Map<String,Object>> getMultipartInfoArr(String bucket, String prefix, String delimiter)` | 获取分片上传详情（对象名、uploadId、存储级别、时间等） |

### 🌐 访问 URL

| 方法 | 说明 |
|---|---|
| `String getGatewayUrl(String bucket, String key)` | 返回可访问的网关 URL（优先使用 `custom-domain`） |
| `String getGatewayUrl(String key)` | 返回可访问的网关 URL（默认桶） |

---

## 6️⃣ 注意事项 & 最佳实践
- ⚠️ 使用 `InputStream` 上传时，必须提供准确的 `contentLength`，不要依赖 `stream.available()`（否则 SDK 可能将流缓存到内存，导致内存飙升或失败）
- ⏱️ 预签名 URL 请设置合理的过期时间，避免泄露风险
- 🧹 分片上传若失败务必调用 `abortMultipartUpload` 清理，避免占用存储
- 🪪 MinIO 通常需要开启 `path-style-access: true`；S3 一般为 `false`
- 🌍 若使用自定义域名作为静态资源分发，推荐开启 CDN 并在对象上设置正确的 `Content-Type`

---

## 7️⃣ 版本与兼容性
- 基于 AWS S3 Java SDK（与 MinIO 自适配）
- JDK 与 Spring Boot 版本依赖以实际 `pom.xml` 为准

---

## 8️⃣ 许可
本项目遵循 MIT License（若有变动以仓库 License 文件为准）。