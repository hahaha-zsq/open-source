# Winter Encrypt 快速上手指南

::: tip 教程信息
- **发布日期**: 2024-01-12
- **难度等级**: 初级
- **预计时间**: 30 分钟
- **前置知识**: Spring Boot 基础
:::

## 🎯 学习目标

通过本教程，您将学会：
- 如何在 Spring Boot 项目中集成 Winter Encrypt
- 基本的字段加解密配置
- 集合类型数据的加解密
- 前后端加解密配合使用

## 📋 环境准备

确保您的开发环境满足以下要求：

- JDK 1.8+
- Spring Boot 2.6+
- Maven 3.6+ 或 Gradle 6.0+

## 🚀 第一步：添加依赖

### Maven 项目

在 `pom.xml` 中添加依赖：

```xml
<dependency>
    <groupId>io.github.hahaha-zsq</groupId>
    <artifactId>winter-encrypt-spring-boot-starter</artifactId>
    <version>0.0.32</version>
</dependency>
```

### Gradle 项目

在 `build.gradle` 中添加依赖：

```gradle
implementation 'io.github.hahaha-zsq:winter-encrypt-spring-boot-starter:0.0.32'
```

## ⚙️ 第二步：配置密钥

在 `application.yml` 中添加加密配置：

```yaml
winter-crypto:
  aes:
    key: 346a3f9f4c1988cb7a507cc177923ac7  # 32字节密钥
    iv: 1234567887654321                    # 16字节IV
    auto-adjust-iv: true
  des:
    key: 12345678                           # 8字节密钥
    iv: 87654321                            # 8字节IV
    auto-adjust-iv: true
  rsa:
    private-key: "MIIEvQIBADANBgkqhkiG9w0BAQEFAASC..." # RSA私钥
    public-key: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMI..."  # RSA公钥
  is-print: true
```

::: warning 安全提示
生产环境中请使用环境变量或配置中心管理密钥，避免在代码中硬编码！
:::

## 📝 第三步：创建数据模型

### 用户信息 VO

```java
@Data
public class UserVO {
    private String username;
    
    // AES 加密敏感字段
    @FieldEncrypt(cryptoType = CryptoType.AES, mode = Mode.CBC)
    private String password;
    
    @FieldEncrypt(cryptoType = CryptoType.AES, mode = Mode.ECB)
    private String email;
    
    // RSA 加密身份信息
    @FieldEncrypt(cryptoType = CryptoType.RSA)
    private String idCard;
    
    // 集合加密
    @FieldEncrypt(cryptoType = CryptoType.AES)
    private List<String> phoneNumbers;
    
    @FieldEncrypt(cryptoType = CryptoType.DES)
    private Map<String, String> extraInfo;
}
```

### 用户请求 DTO

```java
@Data
public class UserRequest {
    private String username;
    
    // 对应的解密注解
    @FieldDecrypt(cryptoType = CryptoType.AES, mode = Mode.CBC)
    private String password;
    
    @FieldDecrypt(cryptoType = CryptoType.AES, mode = Mode.ECB)
    private String email;
    
    @FieldDecrypt(cryptoType = CryptoType.RSA)
    private String idCard;
    
    @FieldDecrypt(cryptoType = CryptoType.AES)
    private List<String> phoneNumbers;
    
    @FieldDecrypt(cryptoType = CryptoType.DES)
    private Map<String, String> extraInfo;
}
```

## 🎮 第四步：创建控制器

```java
@RestController
@RequestMapping("/api/user")
public class UserController {
    
    // 加密响应数据
    @Encrypt
    @GetMapping("/{id}")
    public UserVO getUserById(@PathVariable Long id) {
        UserVO user = new UserVO();
        user.setUsername("admin");
        user.setPassword("123456");           // 将被自动加密
        user.setEmail("admin@example.com");   // 将被自动加密
        user.setIdCard("110101199001011234"); // 将被自动加密
        
        // 集合数据也会被加密
        user.setPhoneNumbers(Arrays.asList("13800138000", "13900139000"));
        user.setExtraInfo(Map.of("department", "IT", "level", "senior"));
        
        return user;
    }
    
    // 解密请求数据
    @Decrypt
    @PostMapping("/update")
    public String updateUser(@RequestBody UserRequest request) {
        // 所有标记了 @FieldDecrypt 的字段都已被自动解密
        System.out.println("解密后的密码: " + request.getPassword());
        System.out.println("解密后的邮箱: " + request.getEmail());
        return "更新成功";
    }
}
```

## 🧪 第五步：测试加解密功能

### 启动应用

```bash
mvn spring-boot:run
```

### 测试加密接口

```bash
curl http://localhost:8080/api/user/1
```

响应结果（密钥和敏感数据已被加密）：

```json
{
  "username": "admin",
  "password": "a1b2c3d4e5f6789...",     // 加密后的密码
  "email": "x9y8z7w6v5u4321...",        // 加密后的邮箱
  "idCard": "m4n3b2v1c0x9z8y7...",      // 加密后的身份证
  "phoneNumbers": ["abc123...", "def456..."], // 加密后的手机号列表
  "extraInfo": {
    "department": "ghi789...",           // 加密后的部门信息
    "level": "jkl012..."                // 加密后的级别信息
  }
}
```

### 测试解密接口

```bash
curl -X POST http://localhost:8080/api/user/update \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "a1b2c3d4e5f6789...",
    "email": "x9y8z7w6v5u4321...",
    "idCard": "m4n3b2v1c0x9z8y7...",
    "phoneNumbers": ["abc123...", "def456..."],
    "extraInfo": {
      "department": "ghi789...",
      "level": "jkl012..."
    }
  }'
```

控制台将输出解密后的原始数据。

## 🔧 第六步：使用工具类

您也可以直接使用工具类进行加解密：

```java
@Service
public class CryptoService {
    
    public void demonstrateUtils() {
        // AES 加密
        String plainText = "sensitive data";
        String encrypted = CryptoUtil.winterAesEncryptHex(
            Mode.CBC, Padding.PKCS5Padding,
            "mykey".getBytes(), "myiv".getBytes(), plainText
        );
        
        // AES 解密
        String decrypted = CryptoUtil.winterAesDecryptStr(
            Mode.CBC, Padding.PKCS5Padding,
            "mykey".getBytes(), "myiv".getBytes(), encrypted
        );
        
        // 生成 RSA 密钥对
        Map<String, String> rsaKeys = CryptoUtil.winterGenerateRsAKey();
        String publicKey = rsaKeys.get("publicKey");
        String privateKey = rsaKeys.get("privateKey");
        
        // RSA 加密
        String rsaEncrypted = CryptoUtil.rsaEncryptToBase64(plainText, publicKey);
        String rsaDecrypted = CryptoUtil.rsaDecryptFromBase64(rsaEncrypted, privateKey);
    }
}
```

## 🎉 恭喜！

您已经成功完成了 Winter Encrypt 的快速上手！现在您可以：

- ✅ 自动加密 API 响应中的敏感数据
- ✅ 自动解密客户端请求中的加密数据
- ✅ 支持多种加密算法和模式
- ✅ 处理集合类型的加解密

## 📚 进阶学习

- [AES 加密算法详解与实践](/blog/technical/aes-encryption-guide)
- [前后端加解密方案实现](/blog/tutorials/frontend-backend-encryption)
- [Winter Encrypt 完整文档](/projects/winter-encrypt)

## 🤝 需要帮助？

- [GitHub Issues](https://github.com/hahaha-zsq/winter-encrypt-spring-boot-starter/issues)
- [常见问题 FAQ](/faq)
- [社区讨论](https://github.com/hahaha-zsq/winter-encrypt-spring-boot-starter/discussions) 