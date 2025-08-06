# Winter Encrypt v0.0.32 发布说明

::: info 发布信息
- **版本号**: v0.0.32
- **发布日期**: 2024-01-10
- **发布类型**: 功能更新
- **兼容性**: 向下兼容
:::

我们很高兴地宣布 Winter Encrypt v0.0.32 正式发布！这个版本带来了重要的安全改进和功能增强。

## 🎉 新特性

### 🔐 RSA 密钥安全配置方案

新增了更加安全的 RSA 密钥配置方式，支持：

- **Base64 格式密钥**: 纯 Base64 编码，移除了 PEM 格式的复杂性
- **密钥长度验证**: 强制要求 2048 位以上的密钥长度
- **自动格式检测**: 自动检测并验证密钥格式的正确性

```yaml
winter-crypto:
  rsa:
    private-key: "MIIEvQIBADANBgkqhkiG9w0BAQEFAASC..."
    public-key: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMI..."
```

### 📚 全面的文档改进

- **新增安全配置指南**: 详细的生产环境安全配置建议
- **最佳实践文档**: 涵盖密钥管理、性能优化等方面
- **错误排查指南**: 常见问题的解决方案

### 🔧 异常处理机制优化

- **更清晰的错误信息**: 提供具体的错误原因和解决建议
- **启动时密钥验证**: 在应用启动时验证密钥配置的正确性
- **优雅的降级处理**: 当配置错误时提供友好的错误提示

## 🛠️ 改进优化

### 性能提升

- **减少内存占用**: 优化了加密算法的内存使用
- **提升加密速度**: 对 AES 加密性能进行了优化
- **批量操作优化**: 改进了集合类型数据的处理效率

### 代码质量

- **增强测试覆盖**: 新增了 50+ 个单元测试
- **代码重构**: 提升了代码的可读性和可维护性
- **文档注释**: 完善了 API 文档和代码注释

## 🐛 问题修复

### 关键修复

- **修复集合加密问题**: 解决了在某些情况下 Map 类型数据加密失败的问题
- **修复 IV 长度问题**: 解决了自动调整 IV 长度功能的边界条件问题
- **修复并发安全问题**: 提升了在高并发环境下的稳定性

### 兼容性修复

- **Spring Boot 2.7+ 兼容**: 确保与最新版本 Spring Boot 的兼容性
- **JDK 17+ 支持**: 官方支持 JDK 17 和更高版本
- **Maven 依赖优化**: 解决了一些依赖冲突问题

## 📈 统计数据

本版本的开发数据：

- **开发周期**: 4 周
- **提交次数**: 127 次
- **参与开发者**: 3 人
- **测试用例**: 新增 52 个
- **文档更新**: 15 个文件

## 🚀 升级指南

### 从 v0.0.31 升级

1. **更新依赖版本**:

```xml
<dependency>
    <groupId>io.github.hahaha-zsq</groupId>
    <artifactId>winter-encrypt-spring-boot-starter</artifactId>
    <version>0.0.32</version>
</dependency>
```

2. **检查 RSA 密钥配置**:

如果您使用 RSA 加密，请确保密钥是 Base64 格式：

```yaml
# ❌ 旧格式 (仍然支持，但建议更新)
winter-crypto:
  rsa:
    private-key: |
      -----BEGIN PRIVATE KEY-----
      MIIEvQIBADANBgkqhkiG9w0BAQEFAASC...
      -----END PRIVATE KEY-----

# ✅ 新格式 (推荐)
winter-crypto:
  rsa:
    private-key: "MIIEvQIBADANBgkqhkiG9w0BAQEFAASC..."
```

3. **运行测试**:

升级后建议运行完整的测试套件确保功能正常。

### 破坏性变更

::: warning 重要提醒
本版本没有破坏性变更，完全向下兼容 v0.0.31。
:::

## 🔮 下一版本预告

v0.0.33 版本计划包含：

- **国密算法支持**: SM2/SM3/SM4 等国产密码算法
- **性能监控**: 加密操作的性能指标收集
- **配置热更新**: 支持运行时更新加密配置
- **Spring Boot 3.0 支持**: 完整支持 Spring Boot 3.x

## 🙏 致谢

感谢以下贡献者为本版本做出的贡献：

- [@hahaha-zsq](https://github.com/hahaha-zsq) - 主要开发
- [@contributor1](https://github.com/contributor1) - 文档完善
- [@contributor2](https://github.com/contributor2) - 测试用例

同时感谢所有提交 Issue 和建议的用户！

## 📞 反馈渠道

如果您在使用过程中遇到任何问题，请通过以下方式联系我们：

- [GitHub Issues](https://github.com/hahaha-zsq/winter-encrypt-spring-boot-starter/issues)
- [GitHub Discussions](https://github.com/hahaha-zsq/winter-encrypt-spring-boot-starter/discussions)
- [项目文档](/projects/winter-encrypt)

---

**下载链接**: [Maven Central](https://search.maven.org/artifact/io.github.hahaha-zsq/winter-encrypt-spring-boot-starter/0.0.32/jar) 