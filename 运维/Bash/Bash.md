---
title: Bash 运维指南
description: 专业的 Linux 系统运维与 Bash 编程完整指南
head:
  - - meta
    - name: keywords
      content: bash, linux, 运维, shell编程, systemd, 服务管理
  - - meta
    - name: author
      content: 运维专家团队
---

# 🚀 Bash 运维指南

::: info 📖 指南简介
**专业的 Linux 系统运维与 Bash 编程完整指南**

本指南涵盖现代 Linux 运维的核心技术栈：
- 🔧 **服务管理** - systemd、SysV Init、crontab 等
- 🎨 **Shell 编程** - ANSI 颜色、脚本最佳实践
- 📦 **包管理** - RPM、YUM、DNF 详解
- 🔗 **系统管理** - 软连接、文件操作、权限控制
- 📄 **文本处理** - AWK、find 命令高级用法
- 🔧 **函数编程** - 模块化开发与最佳实践
:::

::: tip 🎯 适用人群
- Linux 系统管理员
- DevOps 工程师
- 后端开发工程师
- 运维自动化工程师
:::

## 🔧 服务管理 <Badge type="warning" text="核心技能" />

::: warning ⚡ 重要提醒
服务管理是 Linux 运维的核心技能，直接影响系统稳定性和可用性。
掌握现代服务管理工具是每个运维工程师的必备技能。
:::

现代 Linux 系统的服务管理经历了从传统 SysV Init 到 systemd 的重大变革。本章将全面介绍各种服务管理方法、最佳实践和故障排查技巧。

### 🎯 服务自启动管理

#### ⭐ systemd 服务管理（推荐方案）

**systemd** 是现代 Linux 系统的标准服务管理器，提供了强大的服务控制和依赖管理功能。

::: tip 为什么选择 systemd？
- 🚀 **并行启动**：显著提升系统启动速度
- 🔗 **依赖管理**：智能处理服务间依赖关系
- 📊 **资源控制**：精确控制服务资源使用
- 🔍 **日志集成**：统一的日志管理系统
:::

##### 📋 基本命令速查 <Badge type="info" text="必备" />

::: details 🔍 点击展开完整命令表

| 操作类型 | 命令 | 说明 | 示例 |
|---------|------|------|------|
| **启动控制** | `systemctl start <service>` | 启动服务 | `systemctl start nginx` |
| | `systemctl stop <service>` | 停止服务 | `systemctl stop nginx` |
| | `systemctl restart <service>` | 重启服务 | `systemctl restart nginx` |
| | `systemctl reload <service>` | 重载配置 | `systemctl reload nginx` |
| **状态查询** | `systemctl status <service>` | 查看状态 | `systemctl status nginx` |
| | `systemctl is-active <service>` | 检查运行状态 | `systemctl is-active nginx` |
| | `systemctl is-enabled <service>` | 检查自启状态 | `systemctl is-enabled nginx` |
| **自启管理** | `systemctl enable <service>` | 启用自启动 | `systemctl enable nginx` |
| | `systemctl disable <service>` | 禁用自启动 | `systemctl disable nginx` |
| **系统查询** | `systemctl list-units --type=service` | 列出所有服务 | - |
| | `systemctl list-unit-files --state=enabled` | 列出已启用服务 | - |

:::

::: code-group

```bash [基础操作]
# 🚀 启动服务
sudo systemctl start nginx

# 🛑 停止服务
sudo systemctl stop nginx

# 🔄 重启服务
sudo systemctl restart nginx

# 📊 查看状态
sudo systemctl status nginx
```

```bash [自启动管理]
# ✅ 启用自启动
sudo systemctl enable nginx

# ❌ 禁用自启动
sudo systemctl disable nginx

# 🔍 检查自启状态
sudo systemctl is-enabled nginx

# 📋 列出所有自启服务
sudo systemctl list-unit-files --state=enabled
```

```bash [状态查询]
# 🔍 详细状态信息
sudo systemctl status nginx -l

# ⚡ 检查运行状态
sudo systemctl is-active nginx

# 📊 查看所有服务
sudo systemctl list-units --type=service

# ❌ 查看失败的服务
sudo systemctl --failed
```

:::

```bash
# 🔍 常用服务管理命令示例

# 启动并启用 Nginx 服务
sudo systemctl start nginx
sudo systemctl enable nginx

# 查看服务详细状态
sudo systemctl status nginx -l

# 重新加载 systemd 配置
sudo systemctl daemon-reload

# 查看服务启动失败原因
sudo systemctl --failed
```

##### 🛠️ 创建自定义 systemd 服务 <Badge type="tip" text="实战" />

::: warning 📋 操作步骤
创建自定义服务需要 root 权限，请确保操作前备份重要数据。
:::

::: code-group

```bash [步骤1: 创建服务文件]
# 创建服务配置文件
sudo nano /etc/systemd/system/myapp.service

# 或使用 vim 编辑器
sudo vim /etc/systemd/system/myapp.service

# 设置正确的文件权限
sudo chmod 644 /etc/systemd/system/myapp.service
```

```ini [步骤2: 服务配置详解]
[Unit]
# 📝 服务基本信息
Description=My Application Service
Documentation=https://example.com/docs
# 🔗 依赖关系配置
After=network.target
Requires=network.target
Wants=network-online.target

[Service]
# ⚙️ 服务运行配置
Type=simple
User=myuser
Group=mygroup
WorkingDirectory=/opt/myapp
# 🚀 执行命令
ExecStart=/opt/myapp/bin/myapp
ExecStop=/bin/kill -TERM $MAINPID
ExecReload=/bin/kill -HUP $MAINPID
# 🔄 重启策略
Restart=always
RestartSec=10
# ⏱️ 超时设置
TimeoutStartSec=30
TimeoutStopSec=30
# 🌍 环境变量
Environment=NODE_ENV=production
Environment=PORT=3000
EnvironmentFile=/opt/myapp/.env

[Install]
# 🎯 安装目标
WantedBy=multi-user.target
```

```bash [步骤3: 启用服务]
# 重新加载 systemd 配置
sudo systemctl daemon-reload

# 启用服务
sudo systemctl enable myapp.service

# 启动服务
sudo systemctl start myapp.service

# 检查服务状态
sudo systemctl status myapp.service
```

:::

##### 📊 配置文件属性详解 <Badge type="info" text="参考" />

::: details 📚 [Unit] 部分配置详解

| 属性名 | 作用说明 | 示例值 | 使用场景 |
|--------|----------|--------|----------|
| `Description` | 服务描述信息 | `My Web Application` | 服务标识和文档 |
| `Documentation` | 相关文档链接 | `https://example.com/docs` | 运维文档参考 |
| `After` | 启动顺序依赖 | `network.target` | 确保网络先启动 |
| `Before` | 被依赖启动顺序 | `nginx.service` | 数据库先于应用启动 |
| `Requires` | 强制依赖关系 | `postgresql.service` | 硬依赖，失败则停止 |
| `Wants` | 弱依赖关系 | `network-online.target` | 软依赖，失败不影响 |
| `Conflicts` | 冲突服务 | `apache2.service` | 不能同时运行 |

:::

::: details ⚙️ [Service] 部分配置详解

**服务类型 (Type)：**
- `simple` - 默认类型，ExecStart 进程为主进程
- `forking` - ExecStart 进程会 fork 子进程，父进程退出
- `oneshot` - 执行一次性任务，进程退出后服务仍被认为是活跃的
- `notify` - 服务启动完成后会发送通知给 systemd
- `idle` - 延迟执行，直到其他任务完成

**重启策略 (Restart)：**
- `no` - 不自动重启（默认）
- `always` - 总是重启
- `on-success` - 仅在成功退出时重启
- `on-failure` - 仅在失败时重启
- `on-abnormal` - 仅在异常退出时重启

**环境变量配置：**
- `Environment` - 直接设置环境变量
- `EnvironmentFile` - 从文件加载环境变量

:::

::: details 🎯 [Install] 部分配置详解

| 属性名 | 作用说明 | 常用值 | 说明 |
|--------|----------|--------|------|
| `WantedBy` | 被哪个目标需要 | `multi-user.target` | 多用户模式启动 |
| | | `graphical.target` | 图形界面模式启动 |
| `RequiredBy` | 被哪个目标强依赖 | `network.target` | 网络服务强依赖 |
| `Also` | 同时启用的服务 | `related.service` | 关联服务 |

:::

::: tip 💡 最佳实践建议
- 🔐 **安全原则**：始终使用专用用户运行服务，避免 root 权限
- 📝 **路径规范**：使用绝对路径，确保服务启动的可靠性
- 🔄 **重启策略**：生产环境推荐使用 `on-failure` 或 `always`
- 📊 **监控集成**：配置适当的健康检查和日志记录
:::

##### 🎯 Type 类型选择指南 <Badge type="warning" text="重要" />

::: details 📋 服务类型对比表

| Type 值 | 适用场景 | 特点 | 示例应用 |
|---------|----------|------|----------|
| `simple` | 前台运行程序 | 🟢 默认类型，进程不会 fork | Node.js, Python 应用 |
| `forking` | 传统守护进程 | 🔄 进程会 fork 子进程 | Apache, 传统服务 |
| `oneshot` | 一次性任务 | ⚡ 执行完即退出 | 初始化脚本, 备份任务 |
| `notify` | 现代守护进程 | 📡 支持状态通知 | 支持 sd_notify 的应用 |
| `idle` | 低优先级服务 | ⏳ 等待其他服务完成 | 清理任务, 监控服务 |

:::

::: code-group

```ini [Simple 类型示例]
[Service]
Type=simple
ExecStart=/usr/bin/node /opt/app/server.js
Restart=always
User=nodejs
```

```ini [Forking 类型示例]
[Service]
Type=forking
ExecStart=/usr/sbin/nginx
PIDFile=/var/run/nginx.pid
ExecReload=/bin/kill -HUP $MAINPID
```

```ini [Oneshot 类型示例]
[Service]
Type=oneshot
ExecStart=/usr/local/bin/backup-script.sh
RemainAfterExit=yes
```

:::

##### 🔄 Restart 策略详解 <Badge type="tip" text="策略" />

::: details 🎯 重启策略对比表

| 策略值 | 重启条件 | 适用场景 | 风险评估 |
|--------|----------|----------|----------|
| `no` | 从不重启 | 🔵 测试环境, 一次性任务 | 低风险 |
| `always` | 总是重启 | 🔴 关键业务服务 | 需要监控 |
| `on-success` | 成功退出时重启 | 🟡 周期性任务 | 中等风险 |
| `on-failure` | 失败时重启 | 🟢 **推荐**：大多数应用 | 平衡选择 |
| `on-abnormal` | 异常退出时重启 | 🟠 稳定长期服务 | 较低风险 |

:::

::: tip 🎯 策略选择建议
- **Web 应用**: 使用 `on-failure`，避免正常关闭时重启
- **数据库服务**: 使用 `always`，确保高可用性
- **批处理任务**: 使用 `no` 或 `on-failure`
- **监控服务**: 使用 `always`，保持持续监控
:::

##### 🚀 服务激活和管理 <Badge type="success" text="实操" />

::: code-group

```bash [服务激活流程]
# 🔄 重新加载 systemd 配置
sudo systemctl daemon-reload

# 🚀 启动服务
sudo systemctl start myapp

# ✅ 设置开机自启动
sudo systemctl enable myapp

# 📊 查看服务状态
sudo systemctl status myapp
```

```bash [日志查看]
# 📋 查看服务日志（实时）
sudo journalctl -u myapp -f

# 📄 查看最近日志
sudo journalctl -u myapp --since "1 hour ago"

# 🔍 查看启动日志
sudo journalctl -u myapp --since today

# 📊 查看日志统计
sudo journalctl -u myapp --since "1 day ago" | wc -l
```

```bash [故障排查]
# ❌ 查看失败的服务
sudo systemctl --failed

# 🔍 查看服务依赖
sudo systemctl list-dependencies myapp

# 📋 查看服务配置
sudo systemctl cat myapp

# 🔄 重置失败状态
sudo systemctl reset-failed myapp
```

:::

#### 🔧 传统 SysV Init 服务管理 <Badge type="warning" text="兼容" />

::: info 📚 适用场景
- 🏛️ **遗留系统**：CentOS 6 及更早版本
- 🔧 **特殊需求**：需要自定义启动逻辑
- 🔄 **兼容性**：与旧版本系统保持兼容
- 📦 **嵌入式系统**：资源受限的环境
:::

##### 📋 SysV Init 命令对照 <Badge type="info" text="对照表" />

::: details 🔄 命令迁移对照表

| 功能 | SysV Init 命令 | systemd 等效命令 | 说明 |
|------|----------------|------------------|------|
| 启动服务 | `service nginx start` | `systemctl start nginx` | 立即启动 |
| 停止服务 | `service nginx stop` | `systemctl stop nginx` | 立即停止 |
| 重启服务 | `service nginx restart` | `systemctl restart nginx` | 重新启动 |
| 查看状态 | `service nginx status` | `systemctl status nginx` | 运行状态 |
| 启用自启 | `chkconfig nginx on` | `systemctl enable nginx` | 开机启动 |
| 禁用自启 | `chkconfig nginx off` | `systemctl disable nginx` | 禁用启动 |
| 列出服务 | `chkconfig --list` | `systemctl list-unit-files` | 服务列表 |
| 查看运行级别 | `runlevel` | `systemctl get-default` | 当前目标 |

:::

::: code-group

```bash [RedHat/CentOS 系统]
# 传统 chkconfig 管理
sudo chkconfig nginx on          # 启用自启动
sudo chkconfig nginx off         # 禁用自启动
sudo chkconfig --list nginx     # 查看服务状态
sudo chkconfig --add nginx      # 添加服务
sudo chkconfig --del nginx      # 删除服务
```

```bash [Ubuntu/Debian 系统]
# update-rc.d 管理
sudo update-rc.d nginx enable    # 启用自启动
sudo update-rc.d nginx disable   # 禁用自启动
sudo update-rc.d nginx defaults  # 默认运行级别
sudo update-rc.d nginx remove    # 移除服务链接
```

```bash [通用 service 命令]
# 服务基本操作
sudo service nginx start        # 启动服务
sudo service nginx stop         # 停止服务
sudo service nginx restart      # 重启服务
sudo service nginx reload       # 重载配置
sudo service nginx status       # 查看状态
sudo service --status-all       # 查看所有服务状态
```

:::

# CentOS/RHEL 系统
sudo chkconfig nginx on          # 启用自启动
sudo chkconfig nginx off         # 禁用自启动
sudo chkconfig --list           # 查看所有服务状态
```

#### ⏰ 使用 crontab 实现开机自启动

对于简单脚本或特殊需求，crontab 提供了灵活的自启动方案。

::: tip 适用场景
- 🔧 **简单脚本**：不需要复杂服务管理
- 👤 **用户级服务**：以特定用户身份运行
- 🕐 **延迟启动**：需要在系统完全启动后执行
:::

```bash
# 📝 编辑 crontab
crontab -e

# 🚀 添加开机自启动任务
@reboot /path/to/your/script.sh

# 👤 指定用户运行
@reboot /usr/bin/sudo -u username /path/to/script.sh

# ⏰ 延迟启动（等待 60 秒）
@reboot sleep 60 && /path/to/script.sh

# 📋 查看当前用户的 crontab
crontab -l

# 🗑️ 删除 crontab
crontab -r
```

##### 🛠️ crontab 自启动最佳实践

```bash
#!/bin/bash
# 📄 /opt/scripts/startup.sh - 开机启动脚本示例

# 📝 日志配置
LOG_FILE="/var/log/startup.log"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

# 📊 记录启动信息
echo "[$DATE] 系统启动脚本开始执行" >> $LOG_FILE

# ⏳ 等待网络就绪
while ! ping -c 1 8.8.8.8 &> /dev/null; do
    echo "[$DATE] 等待网络连接..." >> $LOG_FILE
    sleep 5
done

# 🚀 启动应用服务
/opt/myapp/start.sh >> $LOG_FILE 2>&1

echo "[$DATE] 启动脚本执行完成" >> $LOG_FILE
```

#### 📄 使用 rc.local 实现开机自启动 <Badge type="warning" text="传统方式" />

::: info 📚 rc.local 简介
`rc.local` 是传统的系统启动脚本，在系统启动的最后阶段执行，适用于简单的启动任务。
:::

::: warning ⚠️ 注意事项
- 🚫 **现代系统**：某些发行版默认不启用 rc.local
- 🔧 **手动启用**：可能需要手动创建和启用服务
- ⚡ **执行时机**：在所有系统服务启动后执行
- 📝 **推荐替代**：优先使用 systemd 服务
:::

::: code-group

```bash [创建 rc.local]
# 📝 编辑 rc.local 文件
sudo nano /etc/rc.local

# 🔧 确保文件有执行权限
sudo chmod +x /etc/rc.local
```

```bash [rc.local 内容示例]
#!/bin/bash
# 🚀 系统启动时执行的命令

# 📊 记录启动时间
echo "$(date): 系统启动完成" >> /var/log/startup.log

# 🔧 启动自定义服务
/opt/myapp/start.sh &

# 🌐 配置网络（如果需要）
/usr/local/bin/setup-network.sh

# ✅ 必须以 exit 0 结尾
exit 0
```

```bash [启用 rc.local 服务]
# 🚀 在 systemd 系统中启用 rc.local
sudo systemctl enable rc-local
sudo systemctl start rc-local

# 📊 查看 rc.local 服务状态
sudo systemctl status rc-local

# 🔍 查看执行日志
sudo journalctl -u rc-local
```

:::

### 🎯 服务管理最佳实践 <Badge type="tip" text="专业技巧" />

#### 📊 日志管理策略 <Badge type="info" text="监控" />

::: tip 💡 日志管理重要性
现代服务管理的核心是有效的日志监控和分析，良好的日志策略能够：
- 🔍 **快速定位问题**：通过日志快速识别故障原因
- 📈 **性能监控**：分析服务运行状态和性能指标
- 🔒 **安全审计**：记录系统访问和操作历史
- 📊 **容量规划**：基于历史数据进行资源规划
:::

::: code-group

```bash [基础日志查询]
# 🔍 systemd 日志查询技巧

# 📋 查看服务日志（最新50行）
sudo journalctl -u nginx -n 50

# 📄 实时跟踪日志
sudo journalctl -u nginx -f

# 🕐 查看指定时间范围日志
sudo journalctl -u nginx --since "2024-01-01" --until "2024-01-02"

# 🔍 按优先级过滤
sudo journalctl -u nginx -p err
```

```bash [高级日志分析]
# 📊 日志统计分析

# 统计错误日志数量
sudo journalctl -u nginx -p err --since today | wc -l

# 查看最频繁的错误
sudo journalctl -u nginx -p err --since "1 week ago" | \
  grep -o 'error.*' | sort | uniq -c | sort -nr | head -10

# 分析服务重启次数
sudo journalctl -u nginx | grep -c "Started\|Stopped"

# 导出日志到文件
sudo journalctl -u nginx --since "1 day ago" > /tmp/nginx.log
```

```bash [日志轮转配置]
# 📁 配置 journald 日志轮转
sudo nano /etc/systemd/journald.conf

# 示例配置：
# SystemMaxUse=1G        # 最大占用空间
# SystemMaxFileSize=100M # 单个文件最大大小
# MaxRetentionSec=1month # 日志保留时间
# MaxFileSec=1week       # 单个文件保留时间

# 重启 journald 服务
sudo systemctl restart systemd-journald
```

:::

##### 🔧 日志轮转配置 <Badge type="warning" text="重要" />

::: details 📁 logrotate 配置详解

```bash
# 📄 创建日志轮转配置
sudo nano /etc/logrotate.d/myapp

# 📋 配置内容示例
/var/log/myapp/*.log {
    daily                    # 📅 每日轮转
    missingok               # 🔍 文件不存在不报错
    rotate 30               # 📚 保留 30 个历史文件
    compress                # 🗜️ 压缩旧日志
    delaycompress          # ⏰ 延迟压缩
    notifempty             # 📭 空文件不轮转
    create 0644 myuser mygroup  # 🔐 新文件权限
    postrotate             # 🔄 轮转后执行
        systemctl reload myapp
    endscript
}
```

**轮转频率选项：**
- `daily` - 每日轮转
- `weekly` - 每周轮转
- `monthly` - 每月轮转
- `yearly` - 每年轮转

**测试配置：**
```bash
# 🧪 测试轮转配置
sudo logrotate -d /etc/logrotate.d/myapp

# 🚀 强制执行轮转
sudo logrotate -f /etc/logrotate.d/myapp
```

:::
```

#### 🔗 服务依赖管理原则 <Badge type="tip" text="架构" />

::: tip 💡 依赖管理最佳实践
1. **优先使用 Wants**：除非确实需要强依赖，否则使用 `Wants` 而非 `Requires`
2. **合理设置顺序**：使用 `After` 和 `Before` 控制启动顺序
3. **避免循环依赖**：检查服务间的依赖关系，避免形成环路
4. **分层设计**：将服务按层次组织，基础服务在下层
:::

::: code-group

```bash [依赖关系分析]
# 🔍 依赖关系分析工具

# 📊 查看服务依赖树
systemctl list-dependencies nginx

# 🔄 查看反向依赖
systemctl list-dependencies nginx --reverse

# 🔍 查看特定目标的依赖
systemctl list-dependencies multi-user.target
```

```bash [启动性能分析]
# 📋 分析启动顺序
systemd-analyze plot > boot-analysis.svg

# ⏱️ 查看启动时间
systemd-analyze blame

# 🔍 查看关键路径
systemd-analyze critical-chain

# 📊 查看启动统计
systemd-analyze time
```

```bash [依赖故障排查]
# 🔍 检查依赖问题
systemctl list-dependencies --failed

# 📋 查看服务状态
systemctl status nginx --no-pager -l

# 🔄 重新分析依赖
systemctl daemon-reload
systemctl reset-failed
```

:::

#### 🔒 安全配置指南 <Badge type="danger" text="安全" />

::: danger ⚠️ 安全重要性
服务安全配置是系统防护的第一道防线，不当的配置可能导致：
- 🔓 **权限提升攻击**：恶意代码获取系统权限
- 📁 **文件系统泄露**：敏感数据被非法访问
- 🌐 **网络攻击面扩大**：不必要的网络暴露
- 💾 **资源滥用**：系统资源被恶意占用
:::

##### 👤 用户和权限管理 <Badge type="warning" text="核心" />

::: code-group

```bash [创建服务用户]
# 🔧 创建专用服务用户
sudo useradd --system --no-create-home --shell /bin/false myapp

# 📋 查看用户信息
id myapp
getent passwd myapp

# 🔐 设置用户组
sudo usermod -a -G myapp-data myapp
```

```bash [目录权限设置]
# 📁 设置目录权限
sudo chown -R myapp:myapp /opt/myapp
sudo chmod 755 /opt/myapp
sudo chmod 644 /opt/myapp/config/*
sudo chmod 600 /opt/myapp/config/secrets.conf

# 🔍 验证权限设置
ls -la /opt/myapp/
ls -la /opt/myapp/config/
```

```ini [systemd 安全配置]
[Service]
User=myapp
Group=myapp

# 🚫 安全限制
NoNewPrivileges=true        # 禁止权限提升
PrivateTmp=true            # 私有临时目录
ProtectSystem=strict       # 保护系统目录
ProtectHome=true           # 保护用户目录
ReadWritePaths=/var/log/myapp  # 允许写入的路径

# 🌐 网络限制
RestrictAddressFamilies=AF_INET AF_INET6
IPAddressDeny=any
IPAddressAllow=localhost

# 💾 资源限制
MemoryMax=512M
TasksMax=100
```

:::

##### 🛡️ 资源限制配置

```bash
# ⚙️ systemd 资源限制
[Service]
# 💾 内存限制
MemoryLimit=512M
MemoryHigh=400M

# 🖥️ CPU 限制
CPUQuota=50%
CPUWeight=100

# 📁 文件描述符限制
LimitNOFILE=1024

# ⏱️ 进程数限制
LimitNPROC=100

# 🔄 重启限制
StartLimitBurst=3
StartLimitIntervalSec=60
```

#### 📊 监控和维护策略

##### 🔍 服务健康检查脚本

```bash
#!/bin/bash
# 📄 /opt/scripts/service-health-check.sh

# 🎨 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 📋 要检查的服务列表
SERVICES=("nginx" "mysql" "redis" "myapp")

echo -e "${GREEN}========== 服务健康检查报告 ==========${NC}"
echo "检查时间: $(date)"
echo

for service in "${SERVICES[@]}"; do
    if systemctl is-active --quiet "$service"; then
        status="${GREEN}✅ 运行中${NC}"
        uptime=$(systemctl show "$service" --property=ActiveEnterTimestamp --value)
    else
        status="${RED}❌ 已停止${NC}"
        uptime="N/A"
    fi
    
    enabled=$(systemctl is-enabled "$service" 2>/dev/null || echo "disabled")
    
    printf "%-15s %s (自启: %s)\n" "$service" "$status" "$enabled"
done

echo
echo -e "${YELLOW}========== 系统资源使用情况 ==========${NC}"
echo "CPU 使用率: $(top -bn1 | grep 'Cpu(s)' | awk '{print $2}' | cut -d'%' -f1)%"
echo "内存使用率: $(free | grep Mem | awk '{printf "%.1f%%", $3/$2 * 100.0}')" 
echo "磁盘使用率: $(df -h / | awk 'NR==2{print $5}')"
```

##### 📈 自动化监控配置

```bash
# 📄 /etc/cron.d/service-monitor
# 🕐 每 5 分钟检查一次服务状态
*/5 * * * * root /opt/scripts/service-health-check.sh >> /var/log/service-monitor.log 2>&1

# 📧 服务异常时发送邮件通知
*/1 * * * * root /opt/scripts/check-critical-services.sh
```

### 🚨 常见问题排查指南

#### ❌ 服务启动失败诊断

当服务无法启动时，按以下步骤进行诊断：

```bash
# 🔍 步骤 1: 查看服务状态
sudo systemctl status service_name -l

# 📋 步骤 2: 查看详细日志
sudo journalctl -u service_name --no-pager

# 🔧 步骤 3: 检查配置文件语法
sudo systemd-analyze verify /etc/systemd/system/service_name.service

# 📁 步骤 4: 检查文件权限
ls -la /etc/systemd/system/service_name.service
ls -la /path/to/executable

# 🔄 步骤 5: 重新加载配置
sudo systemctl daemon-reload
```

##### 🔧 常见启动失败原因及解决方案

| 错误类型 | 常见原因 | 解决方案 | 检查命令 |
|----------|----------|----------|----------|
| **权限错误** | 用户无执行权限 | 修改文件权限或用户 | `ls -la /path/to/file` |
| **路径错误** | 可执行文件不存在 | 检查路径是否正确 | `which command` |
| **依赖缺失** | 依赖服务未启动 | 启动依赖服务 | `systemctl list-dependencies` |
| **端口占用** | 端口被其他进程占用 | 更改端口或停止冲突进程 | `netstat -tlnp \| grep :port` |
| **配置错误** | 配置文件语法错误 | 检查配置文件语法 | `nginx -t`, `apache2ctl configtest` |

#### 🔄 服务无法自启动问题

```bash
# 🔍 诊断自启动问题

# 检查服务是否已启用
sudo systemctl is-enabled service_name

# 查看启用状态详情
sudo systemctl list-unit-files | grep service_name

# 检查 target 依赖
sudo systemctl get-default
sudo systemctl list-dependencies multi-user.target

# 强制启用服务
sudo systemctl enable service_name --force

# 查看启动日志
sudo journalctl -b | grep service_name
```

#### 🐛 性能问题诊断

```bash
# 📊 服务性能分析

# 查看服务资源使用
sudo systemctl show service_name --property=MainPID --value | xargs ps -p

# 监控服务资源使用
top -p $(systemctl show service_name --property=MainPID --value)

# 查看服务 cgroup 资源
sudo systemd-cgtop

# 分析启动时间
sudo systemd-analyze blame | grep service_name
```

---

## 🎨 Shell 编程

Shell 编程是运维工作的重要技能，本章将深入介绍 Bash 编程的各个方面。

### 🌈 ANSI 颜色代码

在 shell 脚本中使用彩色输出可以显著提高可读性，便于区分不同类型的信息。

::: tip 彩色输出的价值
- 🎯 **信息分类**：错误、警告、成功信息一目了然
- 👀 **视觉友好**：提升脚本的专业度和用户体验
- 🚀 **调试效率**：快速定位问题和关键信息
- 📊 **状态展示**：直观显示系统状态和进度
:::

#### 📚 ANSI 转义序列语法详解

ANSI 转义序列的完整语法格式：

```
\033[样式1;样式2;...;颜色代码m文本内容\033[0m
```

##### 🔧 语法组成部分

| 部分 | 说明 | 示例 | 备注 |
|------|------|------|------|
| `\033[` | 转义序列开始 | `\033[` | 也可写作 `\e[` 或 `\x1b[` |
| `样式代码` | 文本样式（可选） | `0;1;4` | 用分号分隔多个样式 |
| `颜色代码` | 前景色或背景色 | `31;42` | 前景色;背景色 |
| `m` | 转义序列结束 | `m` | 必需的结束标识符 |
| `\033[0m` | 重置所有样式 | `\033[0m` | 建议在文本结尾使用 |

##### 🎨 基本颜色代码表

| 颜色 | 前景色 | 背景色 | 示例效果 | 使用场景 |
|------|--------|--------|----------|----------|
| 🖤 黑色 | `30` | `40` | `\033[30m黑色\033[0m` | 普通文本 |
| 🔴 红色 | `31` | `41` | `\033[31m红色\033[0m` | 错误信息 |
| 🟢 绿色 | `32` | `42` | `\033[32m绿色\033[0m` | 成功信息 |
| 🟡 黄色 | `33` | `43` | `\033[33m黄色\033[0m` | 警告信息 |
| 🔵 蓝色 | `34` | `44` | `\033[34m蓝色\033[0m` | 普通信息 |
| 🟣 紫色 | `35` | `45` | `\033[35m紫色\033[0m` | 调试信息 |
| 🔵 青色 | `36` | `46` | `\033[36m青色\033[0m` | 提示信息 |
| ⚪ 白色 | `37` | `47` | `\033[37m白色\033[0m` | 高亮文本 |

##### ✨ 文本样式代码表

| 样式 | 代码 | 效果 | 示例 | 适用场景 |
|------|------|------|------|----------|
| 🔄 重置 | `0` | 重置所有样式 | `\033[0m` | 样式结束 |
| **粗体** | `1` | 加粗文本 | `\033[1m粗体\033[0m` | 重要信息 |
| 🌫️ 暗淡 | `2` | 暗淡显示 | `\033[2m暗淡\033[0m` | 次要信息 |
| *斜体* | `3` | 斜体文本 | `\033[3m斜体\033[0m` | 引用文本 |
| <u>下划线</u> | `4` | 下划线 | `\033[4m下划线\033[0m` | 链接或强调 |
| ✨ 闪烁 | `5` | 闪烁效果 | `\033[5m闪烁\033[0m` | 紧急提醒 |
| 🔄 反转 | `7` | 前景背景反转 | `\033[7m反转\033[0m` | 高亮显示 |
| ~~删除线~~ | `9` | 删除线 | `\033[9m删除\033[0m` | 废弃内容 |

#### 🚀 基本使用方法

##### 1️⃣ 直接使用 ANSI 代码

```bash
#!/bin/bash

# 🔴 红色错误信息
echo -e "\033[31m❌ 错误：连接数据库失败\033[0m"

# 🟢 绿色成功信息
echo -e "\033[32m✅ 成功：服务启动完成\033[0m"

# 🟡 黄色警告信息
echo -e "\033[33m⚠️  警告：磁盘空间不足\033[0m"

# 🔵 蓝色普通信息
echo -e "\033[34mℹ️  信息：正在处理数据\033[0m"

# ✨ 组合样式：粗体红色背景白字
echo -e "\033[1;37;41m🚨 紧急：系统即将重启\033[0m"
```

##### 2️⃣ 使用变量定义颜色

```bash
#!/bin/bash

# 🎨 颜色变量定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# 🎯 使用颜色变量
echo -e "${RED}❌ 错误信息${NC}"
echo -e "${GREEN}✅ 成功信息${NC}"
echo -e "${YELLOW}⚠️ 警告信息${NC}"
echo -e "${BLUE}ℹ️ 普通信息${NC}"
echo -e "${BOLD}${PURPLE}🔍 调试信息${NC}"
```

##### 3️⃣ 创建颜色函数库

```bash
#!/bin/bash
# 📄 colors.sh - 颜色函数库

# 🎨 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
BOLD='\033[1m'
NC='\033[0m'

# 🔧 颜色输出函数
print_error() {
    echo -e "${RED}❌ [ERROR] $1${NC}" >&2
}

print_success() {
    echo -e "${GREEN}✅ [SUCCESS] $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️ [WARNING] $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️ [INFO] $1${NC}"
}

print_debug() {
    echo -e "${PURPLE}🔍 [DEBUG] $1${NC}"
}

print_header() {
    echo -e "${BOLD}${CYAN}\n=== $1 ===${NC}\n"
}

# 🎯 使用示例
print_header "系统检查开始"
print_info "检查系统状态..."
print_success "系统运行正常"
print_warning "发现潜在问题"
print_error "检测到严重错误"
print_debug "调试信息：变量值为 $var"
```

#### 🎯 高级彩色输出技巧

##### 📊 完整的日志系统

```bash
#!/bin/bash
# 📄 advanced-logger.sh - 高级日志系统

# 🎨 日志级别颜色定义
declare -A LOG_COLORS=(
    ["ERROR"]="\033[1;31m"      # 粗体红色
    ["WARN"]="\033[1;33m"       # 粗体黄色
    ["INFO"]="\033[1;34m"       # 粗体蓝色
    ["SUCCESS"]="\033[1;32m"    # 粗体绿色
    ["DEBUG"]="\033[1;35m"      # 粗体紫色
)

# 🎯 日志级别图标
declare -A LOG_ICONS=(
    ["ERROR"]="❌"
    ["WARN"]="⚠️"
    ["INFO"]="ℹ️"
    ["SUCCESS"]="✅"
    ["DEBUG"]="🔍"
)

NC='\033[0m' # 重置颜色

# 📝 通用日志函数
log() {
    local level=$1
    shift
    local message="$*"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    local caller="${BASH_SOURCE[2]##*/}:${BASH_LINENO[1]}"
    
    # 📊 格式化输出
    printf "%s[%s] %s [%s] %s (%s)%s\n" \
        "${LOG_COLORS[$level]}" \
        "$timestamp" \
        "${LOG_ICONS[$level]}" \
        "$level" \
        "$message" \
        "$caller" \
        "$NC"
}

# 🔧 便捷函数
log_error() { log "ERROR" "$@"; }
log_warn() { log "WARN" "$@"; }
log_info() { log "INFO" "$@"; }
log_success() { log "SUCCESS" "$@"; }
log_debug() { log "DEBUG" "$@"; }

# 📋 使用示例
log_info "应用启动中..."
log_success "数据库连接成功"
log_warn "配置文件使用默认值"
log_error "无法连接到外部服务"
log_debug "变量值：USER=$USER, HOME=$HOME"
```

##### 📈 动态进度条

```bash
#!/bin/bash
# 📊 彩色进度条函数

show_progress() {
    local current=$1
    local total=$2
    local width=50
    local percentage=$((current * 100 / total))
    local completed=$((current * width / total))
    local remaining=$((width - completed))
    
    # 🎨 根据进度设置颜色
    local color
    if [ $percentage -lt 30 ]; then
        color="\033[31m"  # 红色
    elif [ $percentage -lt 70 ]; then
        color="\033[33m"  # 黄色
    else
        color="\033[32m"  # 绿色
    fi
    
    # 📊 绘制进度条
    printf "\r${color}["
    printf "%*s" $completed | tr ' ' '='
    printf "\033[33m>"
    printf "%*s" $remaining | tr ' ' '-'
    printf "${color}] %d%% (%d/%d)\033[0m" $percentage $current $total
}

# 🚀 进度条使用示例
total=100
for i in $(seq 1 $total); do
    show_progress $i $total
    sleep 0.05
done
echo  # 换行
```

##### 🎨 彩色表格输出

```bash
#!/bin/bash
# 📋 彩色表格函数库

# 🎨 表格颜色定义
TABLE_HEADER="\033[1;36m"     # 粗体青色
TABLE_BORDER="\033[0;36m"     # 普通青色
STATUS_RUNNING="\033[1;32m"   # 粗体绿色
STATUS_STOPPED="\033[1;31m"   # 粗体红色
STATUS_UNKNOWN="\033[1;33m"   # 粗体黄色
NC="\033[0m"

# 📊 打印表格头部
print_table_header() {
    echo -e "${TABLE_BORDER}┌──────────────┬──────────────┬──────────────┐${NC}"
    printf "${TABLE_BORDER}│${TABLE_HEADER} %-12s ${TABLE_BORDER}│${TABLE_HEADER} %-12s ${TABLE_BORDER}│${TABLE_HEADER} %-12s ${TABLE_BORDER}│${NC}\n" "服务名称" "运行状态" "端口号"
    echo -e "${TABLE_BORDER}├──────────────┼──────────────┼──────────────┤${NC}"
}

# 📋 打印表格行
print_table_row() {
    local service=$1
    local status=$2
    local port=$3
    local status_color
    
    case $status in
        "运行中") status_color=$STATUS_RUNNING ;;
        "已停止") status_color=$STATUS_STOPPED ;;
        *) status_color=$STATUS_UNKNOWN ;;
    esac
    
    printf "${TABLE_BORDER}│${NC} %-12s ${TABLE_BORDER}│${status_color} %-12s ${TABLE_BORDER}│${NC} %-12s ${TABLE_BORDER}│${NC}\n" "$service" "$status" "$port"
}

# 📊 打印表格底部
print_table_footer() {
    echo -e "${TABLE_BORDER}└──────────────┴──────────────┴──────────────┘${NC}"
}

# 🎯 使用示例
print_table_header
print_table_row "nginx" "运行中" "80"
print_table_row "mysql" "已停止" "3306"
print_table_row "redis" "运行中" "6379"
print_table_row "mongodb" "未知" "27017"
print_table_footer
```

#### 🛠️ 实用彩色输出脚本模板

##### 📊 系统监控脚本

```bash
#!/bin/bash
# 📄 system-monitor.sh - 彩色系统监控脚本

# 🎨 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
BOLD='\033[1m'
NC='\033[0m'

# 📊 系统信息显示函数
show_system_info() {
    echo -e "${BOLD}${CYAN}🖥️  系统监控报告${NC}"
    echo -e "${CYAN}═══════════════════════════════════════${NC}"
    echo -e "${BLUE}📅 报告时间：${NC}$(date '+%Y-%m-%d %H:%M:%S')"
    echo -e "${BLUE}🖥️  主机名称：${NC}$(hostname)"
    echo -e "${BLUE}👤 当前用户：${NC}$(whoami)"
    echo -e "${BLUE}⏱️  系统运行：${NC}$(uptime -p)"
    echo
}

# 🔍 CPU 使用率检查
check_cpu_usage() {
    local cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
    local cpu_int=${cpu_usage%.*}
    
    echo -e "${BOLD}🔥 CPU 使用率${NC}"
    
    if [ "$cpu_int" -gt 80 ]; then
        echo -e "${RED}⚠️  CPU: ${cpu_usage}% (高负载)${NC}"
    elif [ "$cpu_int" -gt 60 ]; then
        echo -e "${YELLOW}⚡ CPU: ${cpu_usage}% (中等负载)${NC}"
    else
        echo -e "${GREEN}✅ CPU: ${cpu_usage}% (正常)${NC}"
    fi
}

# 💾 内存使用率检查
check_memory_usage() {
    local mem_info=$(free | grep Mem)
    local mem_total=$(echo $mem_info | awk '{print $2}')
    local mem_used=$(echo $mem_info | awk '{print $3}')
    local mem_percentage=$((mem_used * 100 / mem_total))
    
    echo -e "${BOLD}💾 内存使用率${NC}"
    
    if [ $mem_percentage -gt 80 ]; then
        echo -e "${RED}⚠️  内存: ${mem_percentage}% (内存不足)${NC}"
    elif [ $mem_percentage -gt 60 ]; then
        echo -e "${YELLOW}⚡ 内存: ${mem_percentage}% (使用较高)${NC}"
    else
        echo -e "${GREEN}✅ 内存: ${mem_percentage}% (正常)${NC}"
    fi
}

# 💿 磁盘使用率检查
check_disk_usage() {
    echo -e "${BOLD}💿 磁盘使用率${NC}"
    
    df -h | grep -E '^/dev/' | while read line; do
        local usage=$(echo $line | awk '{print $5}' | cut -d'%' -f1)
        local mount=$(echo $line | awk '{print $6}')
        local size=$(echo $line | awk '{print $2}')
        
        if [ $usage -gt 90 ]; then
            echo -e "${RED}🚨 ${mount}: ${usage}% (${size}) - 磁盘空间严重不足${NC}"
        elif [ $usage -gt 70 ]; then
            echo -e "${YELLOW}⚠️  ${mount}: ${usage}% (${size}) - 磁盘空间不足${NC}"
        else
            echo -e "${GREEN}✅ ${mount}: ${usage}% (${size}) - 正常${NC}"
        fi
    done
}

# 🌐 网络连接检查
check_network() {
    echo -e "${BOLD}🌐 网络连接状态${NC}"
    
    if ping -c 1 8.8.8.8 &> /dev/null; then
        echo -e "${GREEN}✅ 外网连接正常${NC}"
    else
        echo -e "${RED}❌ 外网连接异常${NC}"
    fi
    
    local connections=$(netstat -an | grep ESTABLISHED | wc -l)
    echo -e "${BLUE}🔗 当前连接数: ${connections}${NC}"
}

# 🚀 主函数
main() {
    clear
    show_system_info
    check_cpu_usage
    echo
    check_memory_usage
    echo
    check_disk_usage
    echo
    check_network
    echo
    echo -e "${CYAN}═══════════════════════════════════════${NC}"
    echo -e "${GREEN}📊 监控报告生成完成${NC}"
}

# 🎯 执行主函数
main
```

##### 🚀 部署脚本模板

```bash
#!/bin/bash
# 📄 deploy.sh - 彩色部署脚本模板

# 🎨 颜色和图标定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

# 📝 日志函数
log_step() {
    echo -e "${BOLD}${BLUE}🔄 [步骤] $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
    exit 1
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_info() {
    echo -e "${CYAN}ℹ️  $1${NC}"
}

# 🎯 部署配置
APP_NAME="myapp"
APP_DIR="/opt/$APP_NAME"
BACKUP_DIR="/opt/backups"
GIT_REPO="https://github.com/user/myapp.git"
BRANCH="main"

# 🚀 部署流程
deploy_application() {
    echo -e "${BOLD}${CYAN}🚀 开始部署 $APP_NAME${NC}"
    echo -e "${CYAN}═══════════════════════════════════════${NC}"
    
    # 📋 步骤 1: 环境检查
    log_step "检查部署环境"
    
    if ! command -v git &> /dev/null; then
        log_error "Git 未安装，请先安装 Git"
    fi
    log_success "Git 环境检查通过"
    
    if ! command -v node &> /dev/null; then
        log_error "Node.js 未安装，请先安装 Node.js"
    fi
    log_success "Node.js 环境检查通过"
    
    # 📋 步骤 2: 备份当前版本
    log_step "备份当前版本"
    
    if [ -d "$APP_DIR" ]; then
        local backup_name="${APP_NAME}-$(date +%Y%m%d-%H%M%S)"
        mkdir -p "$BACKUP_DIR"
        cp -r "$APP_DIR" "$BACKUP_DIR/$backup_name"
        log_success "备份完成: $BACKUP_DIR/$backup_name"
    else
        log_info "首次部署，无需备份"
    fi
    
    # 📋 步骤 3: 拉取最新代码
    log_step "拉取最新代码"
    
    if [ -d "$APP_DIR/.git" ]; then
        cd "$APP_DIR"
        if git pull origin "$BRANCH"; then
            log_success "代码更新成功"
        else
            log_error "代码拉取失败"
        fi
    else
        if git clone -b "$BRANCH" "$GIT_REPO" "$APP_DIR"; then
            log_success "代码克隆成功"
        else
            log_error "代码克隆失败"
        fi
    fi
    
    # 📋 步骤 4: 安装依赖
    log_step "安装项目依赖"
    
    cd "$APP_DIR"
    if npm ci --production; then
        log_success "依赖安装成功"
    else
        log_error "依赖安装失败"
    fi
    
    # 📋 步骤 5: 构建应用
    log_step "构建应用"
    
    if npm run build; then
        log_success "应用构建成功"
    else
        log_error "应用构建失败"
    fi
    
    # 📋 步骤 6: 重启服务
    log_step "重启应用服务"
    
    if systemctl restart "$APP_NAME"; then
        log_success "服务重启成功"
    else
        log_error "服务重启失败"
    fi
    
    # 📋 步骤 7: 健康检查
    log_step "应用健康检查"
    
    sleep 5  # 等待服务启动
    
    if systemctl is-active --quiet "$APP_NAME"; then
        log_success "应用运行正常"
    else
        log_error "应用启动失败"
    fi
    
    # 🎉 部署完成
    echo
    echo -e "${BOLD}${GREEN}🎉 部署成功完成！${NC}"
    echo -e "${CYAN}═══════════════════════════════════════${NC}"
    echo -e "${GREEN}✅ 应用名称: $APP_NAME${NC}"
    echo -e "${GREEN}✅ 部署目录: $APP_DIR${NC}"
    echo -e "${GREEN}✅ 服务状态: $(systemctl is-active $APP_NAME)${NC}"
    echo -e "${GREEN}✅ 部署时间: $(date '+%Y-%m-%d %H:%M:%S')${NC}"
}

# 🎯 执行部署
deploy_application
```

#### 🔧 语法最佳实践

##### ✅ 推荐的语法格式

```bash
# ✅ 推荐：完整格式，明确指定样式
RED='\033[0;31m'           # 普通红色
BOLD_RED='\033[1;31m'      # 粗体红色
UNDERLINE_BLUE='\033[4;34m' # 下划线蓝色

# ✅ 推荐：复合样式明确分离
ALERT='\033[1;5;37;41m'    # 粗体+闪烁+白字+红底
NC='\033[0m'               # 重置

# ❌ 不推荐：样式不明确
RED='\033[31m'             # 可能继承之前的样式
```

##### 🚫 常见语法错误对照表

| 错误写法 | 正确写法 | 错误原因 | 修复说明 |
|----------|----------|----------|----------|
| `\033[31,42m` | `\033[31;42m` | 使用逗号分隔 | 必须使用分号分隔参数 |
| `\033[1 31m` | `\033[1;31m` | 使用空格分隔 | 不能使用空格分隔 |
| `\033[31` | `\033[31m` | 缺少结束符 | 必须以 m 结尾 |
| `\033[031m` | `\033[31m` | 不必要的前导零 | 颜色代码不需要前导零 |
| `echo "\033[31m"` | `echo -e "\033[31m"` | 缺少 -e 参数 | 需要 -e 启用转义序列 |

##### 🎨 高级颜色语法

**256 色模式：**
```bash
# 🌈 256 色前景色：\033[38;5;颜色号m
echo -e "\033[38;5;196m亮红色（256色模式）\033[0m"
echo -e "\033[38;5;46m亮绿色（256色模式）\033[0m"
echo -e "\033[38;5;21m深蓝色（256色模式）\033[0m"

# 🎨 256 色背景色：\033[48;5;颜色号m
echo -e "\033[48;5;196m红色背景\033[0m"
echo -e "\033[48;5;46m绿色背景\033[0m"
```

**RGB 真彩色模式：**
```bash
# 🌈 RGB 前景色：\033[38;2;R;G;Bm
echo -e "\033[38;2;255;0;0m纯红色（RGB模式）\033[0m"
echo -e "\033[38;2;0;255;0m纯绿色（RGB模式）\033[0m"
echo -e "\033[38;2;0;0;255m纯蓝色（RGB模式）\033[0m"

# 🎨 RGB 背景色：\033[48;2;R;G;Bm
echo -e "\033[48;2;255;165;0m橙色背景\033[0m"
echo -e "\033[48;2;128;0;128m紫色背景\033[0m"
```

#### 🔧 兼容性注意事项

##### 📱 终端支持检查

```bash
#!/bin/bash
# 🔍 检查终端颜色支持

check_color_support() {
    # 检查 TERM 环境变量
    if [[ -z "$TERM" ]]; then
        echo "⚠️  TERM 环境变量未设置"
        return 1
    fi
    
    # 检查基本颜色支持
    if [[ "$TERM" == "dumb" ]]; then
        echo "❌ 终端不支持颜色"
        return 1
    fi
    
    # 检查颜色数量支持
    local colors=$(tput colors 2>/dev/null)
    if [[ -n "$colors" ]]; then
        echo "✅ 终端支持 $colors 种颜色"
        
        if [[ $colors -ge 256 ]]; then
            echo "🌈 支持 256 色模式"
        fi
        
        if [[ $colors -ge 16777216 ]]; then
            echo "🎨 支持 RGB 真彩色模式"
        fi
    else
        echo "⚠️  无法检测颜色支持"
    fi
}

# 🎯 智能颜色输出函数
smart_color_echo() {
    local text="$1"
    local color_code="$2"
    
    # 检查是否支持颜色
    if [[ -t 1 ]] && [[ "$TERM" != "dumb" ]]; then
        echo -e "${color_code}${text}\033[0m"
    else
        echo "$text"
    fi
}

# 使用示例
check_color_support
smart_color_echo "这是彩色文本" "\033[1;32m"
```

##### 🌐 跨平台兼容性

```bash
#!/bin/bash
# 🔄 跨平台颜色兼容性处理

# 🖥️  检测操作系统
detect_os() {
    case "$(uname -s)" in
        Linux*)     echo "Linux";;
        Darwin*)    echo "macOS";;
        CYGWIN*)    echo "Cygwin";;
        MINGW*)     echo "MinGW";;
        MSYS*)      echo "MSYS";;
        *)          echo "Unknown";;
    esac
}

# 🎨 平台特定的颜色设置
setup_colors() {
    local os=$(detect_os)
    
    case "$os" in
        "Linux"|"macOS")
            # Unix/Linux 系统使用标准 ANSI 代码
            RED='\033[0;31m'
            GREEN='\033[0;32m'
            YELLOW='\033[1;33m'
            BLUE='\033[0;34m'
            NC='\033[0m'
            ;;
        "Cygwin"|"MinGW"|"MSYS")
            # Windows 环境可能需要特殊处理
            if command -v tput >/dev/null 2>&1; then
                RED=$(tput setaf 1)
                GREEN=$(tput setaf 2)
                YELLOW=$(tput setaf 3)
                BLUE=$(tput setaf 4)
                NC=$(tput sgr0)
            else
                # 回退到无颜色
                RED=''
                GREEN=''
                YELLOW=''
                BLUE=''
                NC=''
            fi
            ;;
        *)
            # 未知系统，禁用颜色
            RED=''
            GREEN=''
            YELLOW=''
            BLUE=''
            NC=''
            ;;
    esac
}

# 🚀 初始化颜色设置
setup_colors

# 📝 使用示例
echo -e "${GREEN}✅ 跨平台颜色输出测试${NC}"
echo -e "${RED}❌ 错误信息${NC}"
echo -e "${YELLOW}⚠️  警告信息${NC}"
echo -e "${BLUE}ℹ️  信息提示${NC}"
```

---

## 📦 包管理系统

### 🔧 RPM 包管理系统

#### 📋 RPM 简介

**RPM（Red Hat Package Manager）** 是 Red Hat 开发的包管理系统，广泛用于 Red Hat、CentOS、Fedora、SUSE 等 Linux 发行版。

##### 🎯 主要作用

| 功能 | 描述 | 优势 |
|------|------|------|
| 📦 **软件安装** | 自动处理依赖关系 | 简化安装过程 |
| 🔄 **版本管理** | 支持升级和降级 | 灵活的版本控制 |
| 🗑️ **卸载清理** | 完整移除软件包 | 避免系统垃圾 |
| 🔍 **查询信息** | 详细的包信息查询 | 便于系统管理 |
| ✅ **完整性验证** | 数字签名验证 | 确保软件安全 |

##### 📁 RPM 包文件格式

```bash
# 📦 RPM 包命名规范
# 格式：名称-版本-发布号.架构.rpm

# 示例分析
nginx-1.20.1-1.el8.x86_64.rpm
#  │     │     │  │    │
#  │     │     │  │    └── 架构（x86_64）
#  │     │     │  └─────── 发行版（el8 = Enterprise Linux 8）
#  │     │     └────────── 发布号（1）
#  │     └──────────────── 版本号（1.20.1）
#  └────────────────────── 软件名称（nginx）
```

#### 🛠️ RPM 常用命令

##### 📦 安装操作

```bash
# 🚀 安装 RPM 包
rpm -ivh package.rpm              # 安装并显示进度
rpm -Uvh package.rpm              # 升级安装（推荐）
rpm -Fvh package.rpm              # 仅升级已安装的包

# 📋 安装参数说明
# -i, --install     安装包
# -U, --upgrade     升级包（如果未安装则安装）
# -F, --freshen     仅升级已安装的包
# -v, --verbose     显示详细信息
# -h, --hash        显示安装进度

# 🔧 强制安装选项
rpm -ivh --force package.rpm      # 强制安装
rpm -ivh --nodeps package.rpm     # 忽略依赖关系
rpm -ivh --replacepkgs package.rpm # 替换已安装的包

# 📁 指定安装路径
rpm -ivh --prefix=/opt package.rpm # 安装到指定目录
```

##### 🗑️ 卸载操作

```bash
# 🚮 卸载软件包
rpm -e package_name               # 卸载指定包
rpm -e --nodeps package_name      # 忽略依赖强制卸载
rpm -e --test package_name        # 测试卸载（不实际执行）

# 📋 卸载示例
rpm -e nginx                      # 卸载 nginx
rpm -e nginx-1.20.1-1.el8        # 卸载特定版本
```

##### 🔍 查询操作

```bash
# 📊 查询已安装的包
rpm -qa                           # 列出所有已安装的包
rpm -qa | grep nginx              # 查找特定软件包
rpm -qi package_name              # 查看包详细信息
rpm -ql package_name              # 列出包中的文件
rpm -qc package_name              # 列出配置文件
rpm -qd package_name              # 列出文档文件

# 🔎 查询未安装的包
rpm -qpi package.rpm              # 查看 RPM 文件信息
rpm -qpl package.rpm              # 列出 RPM 文件内容

# 🎯 反向查询
rpm -qf /path/to/file             # 查询文件属于哪个包
rpm -qf $(which nginx)            # 查询命令属于哪个包

# 📈 依赖关系查询
rpm -qR package_name              # 查看包的依赖
rpm -q --whatrequires package_name # 查看哪些包依赖此包
rpm -q --whatprovides file        # 查看哪个包提供此文件
```

##### ✅ 验证操作

```bash
# 🔐 包完整性验证
rpm -V package_name               # 验证已安装包的完整性
rpm -Va                           # 验证所有已安装包
rpm -K package.rpm                # 验证 RPM 包签名

# 📋 验证结果说明
# S - 文件大小改变
# M - 文件权限或类型改变  
# 5 - MD5 校验和改变
# D - 设备文件改变
# L - 符号链接改变
# U - 用户所有权改变
# G - 组所有权改变
# T - 修改时间改变
```

#### 🏗️ YUM 包管理器

**YUM（Yellowdog Updater Modified）** 是基于 RPM 的高级包管理工具，自动处理依赖关系。

##### 🚀 基本操作

```bash
# 📦 软件包管理
yum install package_name          # 安装软件包
yum update package_name           # 更新特定软件包
yum update                        # 更新所有软件包
yum remove package_name           # 卸载软件包
yum autoremove                    # 自动移除不需要的依赖

# 🔍 搜索和查询
yum search keyword                # 搜索软件包
yum list                          # 列出所有可用包
yum list installed                # 列出已安装包
yum list available                # 列出可安装包
yum info package_name             # 查看包详细信息

# 🔧 系统维护
yum clean all                     # 清理缓存
yum makecache                     # 生成缓存
yum check-update                  # 检查可更新包
yum history                       # 查看操作历史
```

##### 📚 仓库管理

```bash
# 🏪 仓库操作
yum repolist                      # 列出启用的仓库
yum repolist all                  # 列出所有仓库
yum repoinfo repository_id        # 查看仓库详细信息

# 🔧 仓库配置
yum-config-manager --add-repo URL # 添加仓库
yum-config-manager --enable repo  # 启用仓库
yum-config-manager --disable repo # 禁用仓库

# 📁 仓库配置文件位置
# /etc/yum.repos.d/*.repo

# 📋 仓库配置示例
cat > /etc/yum.repos.d/custom.repo << EOF
[custom-repo]
name=Custom Repository
baseurl=https://example.com/repo/
enabled=1
gpgcheck=1
gpgkey=https://example.com/RPM-GPG-KEY
EOF
```

##### 👥 组管理

```bash
# 📦 软件包组操作
yum grouplist                     # 列出可用的包组
yum groupinfo "Group Name"        # 查看包组信息
yum groupinstall "Group Name"    # 安装包组
yum groupremove "Group Name"     # 移除包组
yum groupupdate "Group Name"     # 更新包组

# 📋 常用包组示例
yum groupinstall "Development Tools"        # 开发工具
yum groupinstall "Web Server"               # Web 服务器
yum groupinstall "Desktop"                  # 桌面环境
```

##### 📜 历史管理

```bash
# 🕐 历史操作
yum history                       # 查看操作历史
yum history info ID               # 查看特定操作详情
yum history list package_name    # 查看包的历史操作
yum history undo ID               # 撤销特定操作
yum history redo ID               # 重做特定操作

# 📊 历史统计
yum history stats                 # 查看历史统计信息
yum history summary               # 查看历史摘要
```

#### 🚀 DNF 包管理器

**DNF（Dandified YUM）** 是 YUM 的下一代版本，在 Fedora 22+ 和 RHEL 8+ 中替代了 YUM。

##### ✨ DNF 特点

| 特性 | DNF | YUM | 说明 |
|------|-----|-----|------|
| 🚀 **性能** | 更快 | 较慢 | 更好的依赖解析算法 |
| 💾 **内存使用** | 更少 | 更多 | 优化的内存管理 |
| 🔧 **API** | 稳定 | 不稳定 | 更好的 API 设计 |
| 🐍 **Python 版本** | Python 3 | Python 2 | 现代化的技术栈 |
| 📦 **模块支持** | 支持 | 不支持 | 应用流和模块化 |

##### 🛠️ DNF 常用命令

```bash
# 📦 基本包管理（与 YUM 相同）
dnf install package_name          # 安装软件包
dnf update package_name           # 更新软件包
dnf remove package_name           # 卸载软件包
dnf search keyword                # 搜索软件包
dnf info package_name             # 查看包信息

# 🔍 查询操作
dnf list                          # 列出所有包
dnf list installed                # 列出已安装包
dnf list available                # 列出可用包
dnf provides */file_name          # 查找提供文件的包

# 🏪 仓库管理
dnf repolist                      # 列出仓库
dnf repoquery                     # 查询仓库包
dnf config-manager --add-repo URL # 添加仓库
```

##### 🎯 DNF 特有功能

```bash
# 📦 模块管理（DNF 独有）
dnf module list                   # 列出所有模块
dnf module list nodejs            # 列出特定模块的流
dnf module info nodejs:14         # 查看模块流信息
dnf module install nodejs:14      # 安装特定模块流
dnf module enable nodejs:14       # 启用模块流
dnf module disable nodejs         # 禁用模块
dnf module reset nodejs           # 重置模块状态

# 🔄 自动更新
dnf automatic                     # 配置自动更新
systemctl enable --now dnf-automatic.timer  # 启用自动更新服务

# 🧹 系统清理
dnf autoremove                    # 移除不需要的依赖
dnf clean all                     # 清理所有缓存
dnf distro-sync                   # 同步到最新发行版
```

#### 🔄 YUM 与 DNF 对比

##### 📊 功能对比表

| 功能 | YUM 命令 | DNF 命令 | 兼容性 |
|------|----------|----------|--------|
| 安装包 | `yum install` | `dnf install` | ✅ 完全兼容 |
| 更新包 | `yum update` | `dnf update` | ✅ 完全兼容 |
| 搜索包 | `yum search` | `dnf search` | ✅ 完全兼容 |
| 包信息 | `yum info` | `dnf info` | ✅ 完全兼容 |
| 列出包 | `yum list` | `dnf list` | ✅ 完全兼容 |
| 包组管理 | `yum group*` | `dnf group*` | ✅ 完全兼容 |
| 历史管理 | `yum history` | `dnf history` | ✅ 完全兼容 |
| 模块管理 | ❌ 不支持 | `dnf module` | ⚠️ DNF 独有 |

##### 🚀 迁移指南

```bash
# 📋 从 YUM 迁移到 DNF

# 1️⃣ 安装 DNF（如果系统未预装）
yum install dnf

# 2️⃣ 基本命令替换
# 将所有 'yum' 替换为 'dnf'
sed -i 's/yum /dnf /g' script.sh

# 3️⃣ 配置文件兼容
# DNF 可以读取 YUM 的配置文件
# /etc/yum.conf → /etc/dnf/dnf.conf
# /etc/yum.repos.d/ → /etc/yum.repos.d/ (共享)

# 4️⃣ 插件迁移
# YUM 插件需要安装对应的 DNF 版本
dnf install python3-dnf-plugins-core

# 5️⃣ 别名设置（可选）
echo "alias yum='dnf'" >> ~/.bashrc
source ~/.bashrc
```

### 🌐 内网环境离线 RPM 包管理

#### 📦 创建本地仓库

##### 🏗️ 基础本地仓库

```bash
#!/bin/bash
# 🏪 创建本地 RPM 仓库

# 📁 创建仓库目录
REPO_DIR="/opt/local-repo"
mkdir -p "$REPO_DIR"

# 📦 复制 RPM 包到仓库目录
cp /path/to/*.rpm "$REPO_DIR/"

# 🔧 安装 createrepo 工具
yum install createrepo -y

# 🏗️ 创建仓库元数据
createrepo "$REPO_DIR"

# 📋 创建仓库配置文件
cat > /etc/yum.repos.d/local.repo << EOF
[local-repo]
name=Local Repository
baseurl=file://$REPO_DIR
enabled=1
gpgcheck=0
EOF

# 🔄 更新仓库缓存
yum clean all
yum makecache

echo "✅ 本地仓库创建完成：$REPO_DIR"
```

##### 🌐 HTTP/FTP 仓库服务

```bash
#!/bin/bash
# 🌐 创建 HTTP 仓库服务

# 📦 安装 HTTP 服务器
yum install httpd -y

# 📁 配置仓库目录
REPO_DIR="/var/www/html/repo"
mkdir -p "$REPO_DIR"

# 📦 复制 RPM 包
cp /path/to/*.rpm "$REPO_DIR/"

# 🏗️ 创建仓库元数据
createrepo "$REPO_DIR"

# 🚀 启动 HTTP 服务
systemctl enable --now httpd

# 🔥 配置防火墙
firewall-cmd --permanent --add-service=http
firewall-cmd --reload

# 📋 客户端配置
cat > /etc/yum.repos.d/http-repo.repo << EOF
[http-repo]
name=HTTP Repository
baseurl=http://$(hostname -I | awk '{print $1}')/repo
enabled=1
gpgcheck=0
EOF

echo "🌐 HTTP 仓库服务已启动"
echo "📍 仓库地址: http://$(hostname -I | awk '{print $1}')/repo"
```

#### 📥 离线安装依赖包

##### 🎯 下载依赖包方法

```bash
#!/bin/bash
# 📥 下载软件包及其依赖

# 方法1：使用 yumdownloader
yum install yum-utils -y

# 📦 下载单个包及依赖
yumdownloader --resolve --destdir=/tmp/packages package_name

# 📦 下载包组及依赖
yumdownloader --resolve --destdir=/tmp/packages @"Development Tools"

# 方法2：使用 yum 的 downloadonly 插件
yum install yum-plugin-downloadonly -y

# 📥 仅下载不安装
yum install --downloadonly --downloaddir=/tmp/packages package_name

# 方法3：使用 repotrack
yum install yum-utils -y
repotrack -p /tmp/packages package_name

echo "📦 依赖包已下载到 /tmp/packages"
```

##### 📋 最佳实践脚本

```bash
#!/bin/bash
# 🎯 创建离线安装包的完整脚本

set -euo pipefail

# 🎨 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 📝 日志函数
log_info() {
    echo -e "${BLUE}ℹ️  [INFO] $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ [SUCCESS] $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  [WARNING] $1${NC}"
}

log_error() {
    echo -e "${RED}❌ [ERROR] $1${NC}"
    exit 1
}

# 📋 配置变量
PACKAGE_NAME="${1:-}"
OUTPUT_DIR="${2:-/tmp/offline-packages}"
REPO_NAME="offline-repo"

# ✅ 参数检查
if [[ -z "$PACKAGE_NAME" ]]; then
    log_error "用法: $0 <package_name> [output_directory]"
fi

# 📁 创建输出目录
log_info "创建输出目录: $OUTPUT_DIR"
mkdir -p "$OUTPUT_DIR"

# 🔧 安装必要工具
log_info "检查并安装必要工具"
if ! command -v yumdownloader &> /dev/null; then
    yum install -y yum-utils
fi

if ! command -v createrepo &> /dev/null; then
    yum install -y createrepo
fi

# 📥 下载软件包及依赖
log_info "下载 $PACKAGE_NAME 及其依赖包"
yumdownloader --resolve --destdir="$OUTPUT_DIR" "$PACKAGE_NAME"

if [[ $? -eq 0 ]]; then
    log_success "软件包下载完成"
else
    log_error "软件包下载失败"
fi

# 🏗️ 创建本地仓库
log_info "创建本地仓库元数据"
createrepo "$OUTPUT_DIR"

# 📋 生成仓库配置文件
log_info "生成仓库配置文件"
cat > "$OUTPUT_DIR/$REPO_NAME.repo" << EOF
[$REPO_NAME]
name=Offline Repository for $PACKAGE_NAME
baseurl=file://$OUTPUT_DIR
enabled=1
gpgcheck=0
EOF

# 📦 生成安装脚本
log_info "生成离线安装脚本"
cat > "$OUTPUT_DIR/install.sh" << 'EOF'
#!/bin/bash
# 🚀 离线安装脚本

set -euo pipefail

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 🎨 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}🚀 开始离线安装...${NC}"

# 📋 复制仓库配置
echo -e "${YELLOW}📋 配置本地仓库...${NC}"
sudo cp "$SCRIPT_DIR/offline-repo.repo" /etc/yum.repos.d/

# 🔄 更新仓库缓存
echo -e "${YELLOW}🔄 更新仓库缓存...${NC}"
sudo yum clean all
sudo yum makecache

# 📦 安装软件包
echo -e "${YELLOW}📦 安装软件包...${NC}"
sudo yum install -y --disablerepo="*" --enablerepo="offline-repo" PACKAGE_NAME_PLACEHOLDER

if [[ $? -eq 0 ]]; then
    echo -e "${GREEN}✅ 安装完成！${NC}"
else
    echo -e "${RED}❌ 安装失败！${NC}"
    exit 1
fi

# 🧹 清理（可选）
read -p "是否删除临时仓库配置？(y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    sudo rm -f /etc/yum.repos.d/offline-repo.repo
    echo -e "${GREEN}🧹 清理完成${NC}"
fi
EOF

# 🔧 替换占位符并设置执行权限
sed -i "s/PACKAGE_NAME_PLACEHOLDER/$PACKAGE_NAME/g" "$OUTPUT_DIR/install.sh"
chmod +x "$OUTPUT_DIR/install.sh"

# 📊 生成包信息
log_info "生成包信息文件"
cat > "$OUTPUT_DIR/package-info.txt" << EOF
📦 离线安装包信息
==================

🎯 目标软件包: $PACKAGE_NAME
📅 创建时间: $(date '+%Y-%m-%d %H:%M:%S')
🖥️  创建主机: $(hostname)
📁 包含文件数: $(ls -1 "$OUTPUT_DIR"/*.rpm 2>/dev/null | wc -l)
💾 总大小: $(du -sh "$OUTPUT_DIR" | cut -f1)

📋 包含的 RPM 包:
$(ls -1 "$OUTPUT_DIR"/*.rpm 2>/dev/null | xargs -I {} basename {} || echo "无 RPM 包")

🚀 安装方法:
1. 将整个目录复制到目标机器
2. 执行: chmod +x install.sh && ./install.sh

📝 手动安装方法:
1. sudo cp offline-repo.repo /etc/yum.repos.d/
2. sudo yum clean all && sudo yum makecache
3. sudo yum install -y --disablerepo="*" --enablerepo="offline-repo" $PACKAGE_NAME
EOF

# 🎉 完成提示
log_success "离线安装包创建完成！"
echo -e "${BLUE}📁 输出目录: $OUTPUT_DIR${NC}"
echo -e "${BLUE}📦 包含文件:${NC}"
ls -la "$OUTPUT_DIR"
echo
echo -e "${GREEN}🚀 使用方法:${NC}"
echo -e "${YELLOW}1. 将 $OUTPUT_DIR 目录复制到目标机器${NC}"
echo -e "${YELLOW}2. 在目标机器上执行: cd $OUTPUT_DIR && ./install.sh${NC}"
```

#### 🔄 内网仓库同步

##### 📡 仓库同步脚本

```bash
#!/bin/bash
# 🔄 内网仓库同步脚本

set -euo pipefail

# 🎨 颜色和配置
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 📋 配置变量
SOURCE_REPO="https://mirror.centos.org/centos/8/BaseOS/x86_64/os/"
LOCAL_REPO_DIR="/opt/centos-mirror"
LOG_FILE="/var/log/repo-sync.log"
LOCK_FILE="/var/run/repo-sync.lock"

# 📝 日志函数
log_message() {
    local level="$1"
    local message="$2"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] [$level] $message" | tee -a "$LOG_FILE"
}

log_info() {
    log_message "INFO" "$1"
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    log_message "SUCCESS" "$1"
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    log_message "WARNING" "$1"
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    log_message "ERROR" "$1"
    echo -e "${RED}❌ $1${NC}"
    cleanup_and_exit 1
}

# 🧹 清理函数
cleanup_and_exit() {
    local exit_code="${1:-0}"
    [[ -f "$LOCK_FILE" ]] && rm -f "$LOCK_FILE"
    exit "$exit_code"
}

# 🔒 检查锁文件
check_lock() {
    if [[ -f "$LOCK_FILE" ]]; then
        local pid=$(cat "$LOCK_FILE")
        if kill -0 "$pid" 2>/dev/null; then
            log_error "同步进程已在运行 (PID: $pid)"
        else
            log_warning "发现过期锁文件，正在清理"
            rm -f "$LOCK_FILE"
        fi
    fi
    echo $$ > "$LOCK_FILE"
}

# 📦 同步仓库
sync_repository() {
    log_info "开始同步仓库: $SOURCE_REPO"
    
    # 📁 创建本地目录
    mkdir -p "$LOCAL_REPO_DIR"
    
    # 📥 使用 reposync 同步
    if command -v reposync &> /dev/null; then
        log_info "使用 reposync 进行同步"
        reposync -p "$LOCAL_REPO_DIR" -r base
    else
        log_info "使用 rsync 进行同步"
        rsync -avz --delete "$SOURCE_REPO" "$LOCAL_REPO_DIR/"
    fi
    
    # 🏗️ 创建仓库元数据
    log_info "创建仓库元数据"
    createrepo --update "$LOCAL_REPO_DIR"
    
    log_success "仓库同步完成"
}

# 🔧 配置 HTTP 服务
setup_http_service() {
    log_info "配置 HTTP 服务"
    
    # 📦 安装 nginx
    if ! command -v nginx &> /dev/null; then
        yum install -y nginx
    fi
    
    # 📋 配置 nginx
    cat > /etc/nginx/conf.d/repo.conf << EOF
server {
    listen 80;
    server_name _;
    root $LOCAL_REPO_DIR;
    
    location / {
        autoindex on;
        autoindex_exact_size off;
        autoindex_localtime on;
    }
    
    location ~ \.rpm$ {
        add_header Content-Type application/x-rpm;
    }
}
EOF
    
    # 🚀 启动服务
    systemctl enable --now nginx
    
    # 🔥 配置防火墙
    firewall-cmd --permanent --add-service=http
    firewall-cmd --reload
    
    log_success "HTTP 服务配置完成"
}

# 📊 生成统计报告
generate_report() {
    local report_file="$LOCAL_REPO_DIR/sync-report.html"
    
    cat > "$report_file" << EOF
<!DOCTYPE html>
<html>
<head>
    <title>仓库同步报告</title>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: #f0f0f0; padding: 10px; border-radius: 5px; }
        .stats { display: flex; gap: 20px; margin: 20px 0; }
        .stat-box { background: #e8f4fd; padding: 15px; border-radius: 5px; flex: 1; }
        .packages { margin-top: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🏪 内网仓库同步报告</h1>
        <p>📅 生成时间: $(date '+%Y-%m-%d %H:%M:%S')</p>
        <p>🖥️  服务器: $(hostname)</p>
    </div>
    
    <div class="stats">
        <div class="stat-box">
            <h3>📦 包统计</h3>
            <p>RPM 包数量: $(find "$LOCAL_REPO_DIR" -name "*.rpm" | wc -l)</p>
            <p>总大小: $(du -sh "$LOCAL_REPO_DIR" | cut -f1)</p>
        </div>
        <div class="stat-box">
            <h3>🔄 同步状态</h3>
            <p>最后同步: $(date '+%Y-%m-%d %H:%M:%S')</p>
            <p>状态: ✅ 成功</p>
        </div>
        <div class="stat-box">
            <h3>🌐 访问信息</h3>
            <p>HTTP 地址: http://$(hostname -I | awk '{print $1}')/</p>
            <p>本地路径: $LOCAL_REPO_DIR</p>
        </div>
    </div>
    
    <div class="packages">
        <h3>📋 最近更新的包</h3>
        <table>
            <tr><th>包名</th><th>大小</th><th>修改时间</th></tr>
EOF
    
    # 📦 添加最近的包信息
    find "$LOCAL_REPO_DIR" -name "*.rpm" -printf "%f\t%s\t%TY-%Tm-%Td %TH:%TM\n" | \
    sort -k3 -r | head -20 | \
    while IFS=$'\t' read -r name size mtime; do
        echo "            <tr><td>$name</td><td>$(numfmt --to=iec $size)</td><td>$mtime</td></tr>" >> "$report_file"
    done
    
    cat >> "$report_file" << EOF
        </table>
    </div>
</body>
</html>
EOF
    
    log_success "同步报告已生成: $report_file"
}

# 🚀 主函数
main() {
    log_info "开始仓库同步任务"
    
    # 🔒 检查锁文件
    check_lock
    
    # 🛡️ 设置信号处理
    trap cleanup_and_exit INT TERM
    
    # 📦 同步仓库
    sync_repository
    
    # 🔧 配置服务
    setup_http_service
    
    # 📊 生成报告
    generate_report
    
    log_success "所有任务完成"
    cleanup_and_exit 0
}

# 🎯 执行主函数
main "$@"
```

---

## 📚 总结与展望 <Badge type="success" text="完结" />

::: tip 🎉 恭喜完成学习！
通过本指南的学习，您已经掌握了现代 Linux 运维的核心技能：

**🔧 服务管理**
- systemd 服务的创建、配置和管理
- 传统 SysV Init 系统的兼容性处理
- 定时任务和开机自启动的多种实现方式

**🎨 Shell 编程**
- ANSI 颜色系统的完整应用
- 现代 Bash 脚本的最佳实践
- 错误处理和日志管理策略

**📦 包管理**
- RPM、YUM、DNF 包管理器的深度应用
- 内网环境下的离线包管理解决方案
- 企业级包管理的安全策略

**🔗 系统管理**
- 软连接的高级管理和监控
- 文件操作的安全实践
- 权限控制和安全加固

**📄 文本处理**
- AWK 和 find 命令的高级用法
- 大数据量文本处理的性能优化
- 自动化数据分析脚本开发

**🔧 函数编程**
- 模块化 Bash 脚本开发
- 可重用代码库的构建
- 企业级脚本架构设计
:::

### 🚀 下一步学习建议

::: info 📈 进阶路径

**🐳 容器化技术**
- Docker 容器管理
- Kubernetes 集群运维
- 容器化服务部署

**☁️ 云原生运维**
- 云平台服务管理
- 基础设施即代码 (IaC)
- 微服务架构运维

**📊 监控与可观测性**
- Prometheus + Grafana 监控栈
- ELK 日志分析平台
- APM 应用性能监控

**🔒 安全运维**
- 零信任网络架构
- 安全扫描与合规检查
- 事件响应与应急处理

**🤖 自动化运维**
- Ansible 自动化配置管理
- CI/CD 流水线设计
- GitOps 运维模式

:::

### 📖 参考资源

::: details 🔗 官方文档链接

**系统管理**
- [systemd 官方文档](https://systemd.io/)
- [Red Hat 系统管理指南](https://access.redhat.com/documentation/)
- [Ubuntu 服务器指南](https://ubuntu.com/server/docs)

**Shell 编程**
- [Bash 官方手册](https://www.gnu.org/software/bash/manual/)
- [Advanced Bash-Scripting Guide](https://tldp.org/LDP/abs/html/)
- [ShellCheck 语法检查工具](https://www.shellcheck.net/)

**包管理**
- [RPM 官方文档](https://rpm.org/documentation.html)
- [YUM 用户指南](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/8/html/configuring_basic_system_settings/managing-software-packages_configuring-basic-system-settings)
- [DNF 命令参考](https://dnf.readthedocs.io/)

:::

---

::: tip 💬 反馈与贡献
如果您在使用过程中发现问题或有改进建议，欢迎：
- 📧 提交 Issue 反馈问题
- 🔧 贡献代码和文档改进
- 💡 分享您的实践经验
- ⭐ 为项目点赞支持
:::

<div align="center">

**🎯 持续学习，精进技能！**

*"运维之路，永无止境。每一次实践都是成长的机会。"*

---

<Badge type="tip" text="v2.0" /> <Badge type="info" text="2024" /> <Badge type="success" text="完整版" />

</div>

---

## 🔧 函数编程与模块化

### 📋 函数基础语法

#### 🎯 函数定义与调用

```bash
# 🔧 基本函数定义
function_name() {
    # 函数体
    echo "Hello from function"
}

# 🎯 带function关键字的定义
function function_name {
    # 函数体
    echo "Hello from function"
}

# 📞 函数调用
function_name

# 📊 带参数的函数
greet() {
    local name="$1"
    local greeting="${2:-Hello}"
    echo "$greeting, $name!"
}

# 调用带参数的函数
greet "Alice" "Hi"          # 输出: Hi, Alice!
greet "Bob"                 # 输出: Hello, Bob!

# 🔄 返回值处理
get_user_count() {
    local count=$(who | wc -l)
    return $count
}

# 获取返回值
get_user_count
user_count=$?
echo "当前用户数: $user_count"

# 📤 输出返回值
get_current_time() {
    date '+%Y-%m-%d %H:%M:%S'
}

# 捕获输出
current_time=$(get_current_time)
echo "当前时间: $current_time"
```

#### 🔧 参数处理技巧

```bash
# 📊 参数处理函数
process_args() {
    echo "函数名: $FUNCNAME"
    echo "参数个数: $#"
    echo "所有参数: $*"
    echo "所有参数(数组): $@"
    
    # 遍历所有参数
    local i=1
    for arg in "$@"; do
        echo "参数 $i: $arg"
        ((i++))
    done
    
    # 检查参数数量
    if [[ $# -lt 2 ]]; then
        echo "错误: 至少需要2个参数" >&2
        return 1
    fi
}

# 🎯 默认参数值
setup_environment() {
    local env="${1:-development}"
    local port="${2:-8080}"
    local host="${3:-localhost}"
    
    echo "环境: $env"
    echo "端口: $port"
    echo "主机: $host"
}

# 🔄 可变参数处理
sum_numbers() {
    local sum=0
    local num
    
    for num in "$@"; do
        if [[ "$num" =~ ^[0-9]+$ ]]; then
            ((sum += num))
        else
            echo "警告: '$num' 不是有效数字" >&2
        fi
    done
    
    echo $sum
}

# 使用示例
result=$(sum_numbers 1 2 3 4 5)
echo "总和: $result"
```

#### 🔒 局部变量与作用域

```bash
# 🌍 全局变量
GLOBAL_VAR="全局变量"

# 🏠 局部变量示例
test_scope() {
    local local_var="局部变量"
    local GLOBAL_VAR="局部覆盖全局"
    
    echo "函数内 - 局部变量: $local_var"
    echo "函数内 - 全局变量: $GLOBAL_VAR"
    
    # 修改全局变量
    ANOTHER_GLOBAL="在函数中设置"
}

echo "调用前 - 全局变量: $GLOBAL_VAR"
test_scope
echo "调用后 - 全局变量: $GLOBAL_VAR"
echo "调用后 - 另一个全局: $ANOTHER_GLOBAL"

# 🔧 只读变量
setup_constants() {
    local -r PI=3.14159
    local -r APP_NAME="MyApp"
    
    echo "PI: $PI"
    echo "应用名: $APP_NAME"
    
    # PI=3.14  # 这会报错，因为PI是只读的
}

# 📊 数组作为局部变量
process_array() {
    local -a local_array=("item1" "item2" "item3")
    local -A local_assoc_array=(["key1"]="value1" ["key2"]="value2")
    
    echo "本地数组: ${local_array[@]}"
    echo "本地关联数组: ${local_assoc_array[@]}"
}
```

### 🛠️ 高级函数技巧

#### 🔄 递归函数

```bash
# 🔢 阶乘计算
factorial() {
    local n=$1
    
    # 基础情况
    if [[ $n -le 1 ]]; then
        echo 1
        return
    fi
    
    # 递归调用
    local prev=$(factorial $((n - 1)))
    echo $((n * prev))
}

# 📁 递归目录遍历
traverse_directory() {
    local dir="$1"
    local depth="${2:-0}"
    local max_depth="${3:-5}"
    
    # 防止无限递归
    if [[ $depth -gt $max_depth ]]; then
        return
    fi
    
    # 打印当前目录
    printf "%*s📁 %s\n" $((depth * 2)) "" "$(basename "$dir")"
    
    # 遍历子目录
    local item
    while IFS= read -r -d '' item; do
        if [[ -d "$item" ]]; then
            traverse_directory "$item" $((depth + 1)) "$max_depth"
        else
            printf "%*s📄 %s\n" $(((depth + 1) * 2)) "" "$(basename "$item")"
        fi
    done < <(find "$dir" -maxdepth 1 -mindepth 1 -print0 2>/dev/null)
}

# 🌲 斐波那契数列
fibonacci() {
    local n=$1
    
    if [[ $n -le 0 ]]; then
        echo 0
    elif [[ $n -eq 1 ]]; then
        echo 1
    else
        local a=$(fibonacci $((n - 1)))
        local b=$(fibonacci $((n - 2)))
        echo $((a + b))
    fi
}
```

#### 🎯 函数作为参数

```bash
# 🔧 高阶函数示例
apply_to_array() {
    local func_name="$1"
    shift
    local -a array=("$@")
    
    local item
    for item in "${array[@]}"; do
        "$func_name" "$item"
    done
}

# 📊 处理函数
double_number() {
    local num="$1"
    echo $((num * 2))
}

square_number() {
    local num="$1"
    echo $((num * num))
}

uppercase_string() {
    local str="$1"
    echo "${str^^}"
}

# 使用示例
echo "🔢 数字加倍:"
apply_to_array double_number 1 2 3 4 5

echo "\n📊 数字平方:"
apply_to_array square_number 1 2 3 4 5

echo "\n🔤 字符串大写:"
apply_to_array uppercase_string "hello" "world" "bash"

# 🎯 条件执行函数
execute_if() {
    local condition="$1"
    local func_name="$2"
    shift 2
    
    if eval "$condition"; then
        "$func_name" "$@"
    else
        echo "条件不满足，跳过执行 $func_name"
    fi
}

# 使用示例
test_function() {
    echo "测试函数被执行了！参数: $*"
}

execute_if '[[ -f /etc/passwd ]]' test_function "文件存在"
execute_if '[[ -f /nonexistent ]]' test_function "文件不存在"
```

#### 🔄 函数重载与动态调用

```bash
# 🎯 动态函数调用
call_function() {
    local func_name="$1"
    shift
    
    # 检查函数是否存在
    if declare -f "$func_name" > /dev/null; then
        "$func_name" "$@"
    else
        echo "错误: 函数 '$func_name' 不存在" >&2
        return 1
    fi
}

# 📊 函数注册系统
declare -A FUNCTION_REGISTRY

register_function() {
    local name="$1"
    local description="$2"
    local func_name="$3"
    
    FUNCTION_REGISTRY["$name"]="$description|$func_name"
}

list_functions() {
    echo "📋 已注册的函数:"
    local name desc func
    for name in "${!FUNCTION_REGISTRY[@]}"; do
        IFS='|' read -r desc func <<< "${FUNCTION_REGISTRY[$name]}"
        printf "  %-15s: %s\n" "$name" "$desc"
    done
}

call_registered_function() {
    local name="$1"
    shift
    
    if [[ -n "${FUNCTION_REGISTRY[$name]:-}" ]]; then
        local desc func
        IFS='|' read -r desc func <<< "${FUNCTION_REGISTRY[$name]}"
        echo "🚀 执行: $desc"
        "$func" "$@"
    else
        echo "❌ 未找到注册的函数: $name" >&2
        return 1
    fi
}

# 注册一些函数
hello_world() {
    echo "Hello, World! 参数: $*"
}

get_date() {
    date '+%Y-%m-%d %H:%M:%S'
}

register_function "hello" "打招呼函数" "hello_world"
register_function "time" "获取当前时间" "get_date"

# 使用示例
list_functions
call_registered_function "hello" "Alice" "Bob"
call_registered_function "time"
```

### 📦 模块化与库管理

#### 📁 创建函数库

```bash
#!/bin/bash
# 📦 utils.sh - 通用工具函数库

# 🔒 防止重复加载
if [[ -n "${UTILS_LIB_LOADED:-}" ]]; then
    return 0
fi
readonly UTILS_LIB_LOADED=1

# 📊 库信息
readonly UTILS_LIB_VERSION="1.0.0"
readonly UTILS_LIB_AUTHOR="Your Name"

# 🎨 颜色常量
readonly COLOR_RED='\033[0;31m'
readonly COLOR_GREEN='\033[0;32m'
readonly COLOR_YELLOW='\033[1;33m'
readonly COLOR_BLUE='\033[0;34m'
readonly COLOR_CYAN='\033[0;36m'
readonly COLOR_NC='\033[0m'

# 📝 日志函数
log_info() {
    echo -e "${COLOR_BLUE}[INFO]${COLOR_NC} $*" >&2
}

log_warn() {
    echo -e "${COLOR_YELLOW}[WARN]${COLOR_NC} $*" >&2
}

log_error() {
    echo -e "${COLOR_RED}[ERROR]${COLOR_NC} $*" >&2
}

log_success() {
    echo -e "${COLOR_GREEN}[SUCCESS]${COLOR_NC} $*" >&2
}

# 🔧 字符串工具
string_trim() {
    local str="$1"
    # 去除前后空白
    str="${str#"${str%%[![:space:]]*}"}"
    str="${str%"${str##*[![:space:]]}"}" 
    echo "$str"
}

string_upper() {
    echo "${1^^}"
}

string_lower() {
    echo "${1,,}"
}

string_contains() {
    local string="$1"
    local substring="$2"
    [[ "$string" == *"$substring"* ]]
}

# 📊 数组工具
array_contains() {
    local element="$1"
    shift
    local item
    for item in "$@"; do
        [[ "$item" == "$element" ]] && return 0
    done
    return 1
}

array_join() {
    local delimiter="$1"
    shift
    local first="$1"
    shift
    printf '%s' "$first" "${@/#/$delimiter}"
}

# 📁 文件工具
file_exists() {
    [[ -f "$1" ]]
}

dir_exists() {
    [[ -d "$1" ]]
}

ensure_dir() {
    local dir="$1"
    if [[ ! -d "$dir" ]]; then
        mkdir -p "$dir"
        log_info "创建目录: $dir"
    fi
}

get_file_size() {
    local file="$1"
    if file_exists "$file"; then
        stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null
    else
        echo 0
    fi
}

# 🕐 时间工具
get_timestamp() {
    date '+%s'
}

get_formatted_date() {
    local format="${1:-%Y-%m-%d %H:%M:%S}"
    date "+$format"
}

# 🔄 重试机制
retry() {
    local max_attempts="$1"
    local delay="$2"
    shift 2
    
    local attempt=1
    while [[ $attempt -le $max_attempts ]]; do
        if "$@"; then
            return 0
        fi
        
        log_warn "尝试 $attempt/$max_attempts 失败，${delay}秒后重试..."
        sleep "$delay"
        ((attempt++))
    done
    
    log_error "所有重试都失败了"
    return 1
}

# 📊 进度条
show_progress() {
    local current="$1"
    local total="$2"
    local width="${3:-50}"
    
    local percentage=$((current * 100 / total))
    local filled=$((current * width / total))
    local empty=$((width - filled))
    
    printf "\r[%s%s] %d%% (%d/%d)" \
        "$(printf '%*s' "$filled" '' | tr ' ' '█')" \
        "$(printf '%*s' "$empty" '' | tr ' ' '░')" \
        "$percentage" "$current" "$total"
    
    if [[ $current -eq $total ]]; then
        echo
    fi
}

# 🎯 库初始化函数
utils_init() {
    log_info "Utils库已加载 (版本: $UTILS_LIB_VERSION)"
}

# 📋 显示库信息
utils_info() {
    echo "📦 Utils函数库"
    echo "   版本: $UTILS_LIB_VERSION"
    echo "   作者: $UTILS_LIB_AUTHOR"
    echo "   功能: 日志、字符串、数组、文件、时间工具"
}
```

#### 📥 库的使用示例

```bash
#!/bin/bash
# 📋 main.sh - 使用函数库的主程序

set -euo pipefail

# 📦 加载工具库
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$script_dir/utils.sh"

# 🚀 初始化
utils_init

# 🎯 主函数
main() {
    log_info "开始执行主程序"
    
    # 📊 字符串处理示例
    local text="  Hello World  "
    local trimmed=$(string_trim "$text")
    local upper=$(string_upper "$trimmed")
    
    log_info "原始文本: '$text'"
    log_info "去空格后: '$trimmed'"
    log_info "转大写后: '$upper'"
    
    # 📁 文件操作示例
    local test_dir="/tmp/bash_test"
    ensure_dir "$test_dir"
    
    local test_file="$test_dir/test.txt"
    echo "测试内容" > "$test_file"
    
    if file_exists "$test_file"; then
        local size=$(get_file_size "$test_file")
        log_success "文件创建成功，大小: $size 字节"
    fi
    
    # 🔄 进度条示例
    log_info "模拟进度条"
    for i in {1..20}; do
        show_progress $i 20
        sleep 0.1
    done
    
    # 🧹 清理
    rm -rf "$test_dir"
    log_success "程序执行完成"
}

# 🎯 错误处理
trap 'log_error "程序异常退出"' ERR

# 🚀 执行主函数
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
```

#### 🔧 模块管理系统

```bash
#!/bin/bash
# 📦 module_manager.sh - 模块管理系统

set -euo pipefail

# 📊 模块注册表
declare -A MODULE_REGISTRY
declare -A MODULE_PATHS
declare -A MODULE_VERSIONS

# 📦 注册模块
register_module() {
    local name="$1"
    local path="$2"
    local version="${3:-1.0.0}"
    local description="${4:-No description}"
    
    MODULE_REGISTRY["$name"]="$description"
    MODULE_PATHS["$name"]="$path"
    MODULE_VERSIONS["$name"]="$version"
    
    echo "📦 模块已注册: $name (v$version)"
}

# 📥 加载模块
load_module() {
    local name="$1"
    
    if [[ -z "${MODULE_PATHS[$name]:-}" ]]; then
        echo "❌ 模块未注册: $name" >&2
        return 1
    fi
    
    local path="${MODULE_PATHS[$name]}"
    
    if [[ ! -f "$path" ]]; then
        echo "❌ 模块文件不存在: $path" >&2
        return 1
    fi
    
    echo "📥 加载模块: $name (${MODULE_VERSIONS[$name]})"
    source "$path"
}

# 📋 列出所有模块
list_modules() {
    echo "📋 已注册的模块:"
    echo
    
    local name
    for name in "${!MODULE_REGISTRY[@]}"; do
        printf "  📦 %-15s v%-8s %s\n" \
            "$name" \
            "${MODULE_VERSIONS[$name]}" \
            "${MODULE_REGISTRY[$name]}"
    done
}

# 🔍 检查模块状态
check_module() {
    local name="$1"
    
    if [[ -z "${MODULE_PATHS[$name]:-}" ]]; then
        echo "❌ 模块未注册: $name"
        return 1
    fi
    
    local path="${MODULE_PATHS[$name]}"
    
    echo "📦 模块信息: $name"
    echo "   版本: ${MODULE_VERSIONS[$name]}"
    echo "   路径: $path"
    echo "   描述: ${MODULE_REGISTRY[$name]}"
    echo "   状态: $([ -f "$path" ] && echo "✅ 可用" || echo "❌ 文件缺失")"
}

# 🎯 批量加载模块
load_modules() {
    local modules=("$@")
    
    if [[ ${#modules[@]} -eq 0 ]]; then
        # 加载所有已注册的模块
        modules=("${!MODULE_REGISTRY[@]}")
    fi
    
    local name
    for name in "${modules[@]}"; do
        load_module "$name"
    done
}

# 🚀 初始化模块管理器
init_module_manager() {
    echo "🚀 模块管理器已初始化"
    
    # 自动发现并注册模块
    local script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
    local modules_dir="$script_dir/modules"
    
    if [[ -d "$modules_dir" ]]; then
        local module_file
        while IFS= read -r -d '' module_file; do
            local module_name=$(basename "$module_file" .sh)
            register_module "$module_name" "$module_file" "auto" "自动发现的模块"
        done < <(find "$modules_dir" -name "*.sh" -type f -print0)
    fi
}

# 🎯 主函数
main() {
    local action="${1:-help}"
    
    case "$action" in
        "init")
            init_module_manager
            ;;
        "list")
            list_modules
            ;;
        "load")
            shift
            load_modules "$@"
            ;;
        "check")
            check_module "$2"
            ;;
        "register")
            register_module "$2" "$3" "${4:-1.0.0}" "${5:-No description}"
            ;;
        "help")
            echo "📋 模块管理器使用说明:"
            echo "  $0 init                              # 初始化模块管理器"
            echo "  $0 list                              # 列出所有模块"
            echo "  $0 load [module1] [module2] ...      # 加载指定模块"
            echo "  $0 check <module>                    # 检查模块状态"
            echo "  $0 register <name> <path> [version] [desc]  # 注册模块"
            ;;
        *)
            echo "❌ 未知操作: $action" >&2
            echo "💡 使用 '$0 help' 查看帮助"
            return 1
            ;;
    esac
}

# 🚀 执行主函数
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
```

---

## 📁 文件操作与判断

### 🔍 文件判断命令

#### 📋 基本文件测试

```bash
# 🎯 文件存在性判断
test -e /path/to/file    # 文件或目录存在
test -f /path/to/file    # 是普通文件
test -d /path/to/dir     # 是目录
test -L /path/to/link    # 是软连接
test -h /path/to/link    # 是软连接（同 -L）
test -b /dev/sda1        # 是块设备文件
test -c /dev/tty         # 是字符设备文件
test -p /path/to/pipe    # 是命名管道
test -S /path/to/socket  # 是套接字文件

# 🔐 文件权限判断
test -r /path/to/file    # 当前用户可读
test -w /path/to/file    # 当前用户可写
test -x /path/to/file    # 当前用户可执行
test -u /path/to/file    # 设置了 SUID 位
test -g /path/to/file    # 设置了 SGID 位
test -k /path/to/file    # 设置了粘滞位
test -O /path/to/file    # 当前用户拥有
test -G /path/to/file    # 当前组拥有

# 📊 文件大小和时间判断
test -s /path/to/file    # 文件大小大于 0
test -z "$string"        # 字符串长度为 0
test -n "$string"        # 字符串长度不为 0
test file1 -nt file2     # file1 比 file2 新
test file1 -ot file2     # file1 比 file2 旧
test file1 -ef file2     # file1 和 file2 是同一文件（硬连接）
```

#### 🛠️ 实用判断函数

```bash
#!/bin/bash
# 📋 文件操作判断函数库

set -euo pipefail

# 🎨 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# ✅ 文件存在检查
file_exists() {
    local file="$1"
    if [[ -e "$file" ]]; then
        echo -e "${GREEN}✅ 文件存在: $file${NC}"
        return 0
    else
        echo -e "${RED}❌ 文件不存在: $file${NC}"
        return 1
    fi
}

# 📁 目录存在检查
dir_exists() {
    local dir="$1"
    if [[ -d "$dir" ]]; then
        echo -e "${GREEN}✅ 目录存在: $dir${NC}"
        return 0
    else
        echo -e "${RED}❌ 目录不存在: $dir${NC}"
        return 1
    fi
}

# 🔗 软连接检查
link_exists() {
    local link="$1"
    if [[ -L "$link" ]]; then
        local target=$(readlink "$link")
        if [[ -e "$link" ]]; then
            echo -e "${GREEN}✅ 有效软连接: $link -> $target${NC}"
        else
            echo -e "${YELLOW}⚠️  断开软连接: $link -> $target${NC}"
        fi
        return 0
    else
        echo -e "${RED}❌ 不是软连接: $link${NC}"
        return 1
    fi
}

# 🔐 权限检查
check_permissions() {
    local file="$1"
    
    if [[ ! -e "$file" ]]; then
        echo -e "${RED}❌ 文件不存在: $file${NC}"
        return 1
    fi
    
    echo -e "${BLUE}📋 权限检查: $file${NC}"
    
    # 基本权限
    [[ -r "$file" ]] && echo -e "${GREEN}  ✅ 可读${NC}" || echo -e "${RED}  ❌ 不可读${NC}"
    [[ -w "$file" ]] && echo -e "${GREEN}  ✅ 可写${NC}" || echo -e "${RED}  ❌ 不可写${NC}"
    [[ -x "$file" ]] && echo -e "${GREEN}  ✅ 可执行${NC}" || echo -e "${RED}  ❌ 不可执行${NC}"
    
    # 特殊权限
    [[ -u "$file" ]] && echo -e "${YELLOW}  ⚠️  设置了 SUID${NC}"
    [[ -g "$file" ]] && echo -e "${YELLOW}  ⚠️  设置了 SGID${NC}"
    [[ -k "$file" ]] && echo -e "${YELLOW}  ⚠️  设置了粘滞位${NC}"
    
    # 所有权
    [[ -O "$file" ]] && echo -e "${CYAN}  👤 当前用户拥有${NC}"
    [[ -G "$file" ]] && echo -e "${CYAN}  👥 当前组拥有${NC}"
}

# 📊 文件信息统计
file_info() {
    local file="$1"
    
    if [[ ! -e "$file" ]]; then
        echo -e "${RED}❌ 文件不存在: $file${NC}"
        return 1
    fi
    
    echo -e "${BLUE}📊 文件信息: $file${NC}"
    
    # 文件类型
    if [[ -f "$file" ]]; then
        echo -e "${GREEN}  📄 类型: 普通文件${NC}"
    elif [[ -d "$file" ]]; then
        echo -e "${GREEN}  📁 类型: 目录${NC}"
    elif [[ -L "$file" ]]; then
        echo -e "${GREEN}  🔗 类型: 软连接${NC}"
        echo -e "${CYAN}  🎯 目标: $(readlink "$file")${NC}"
    elif [[ -b "$file" ]]; then
        echo -e "${GREEN}  💾 类型: 块设备${NC}"
    elif [[ -c "$file" ]]; then
        echo -e "${GREEN}  🖥️  类型: 字符设备${NC}"
    elif [[ -p "$file" ]]; then
        echo -e "${GREEN}  🚰 类型: 命名管道${NC}"
    elif [[ -S "$file" ]]; then
        echo -e "${GREEN}  🔌 类型: 套接字${NC}"
    fi
    
    # 文件大小
    if [[ -f "$file" ]]; then
        local size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        echo -e "${CYAN}  📏 大小: $(numfmt --to=iec-i --suffix=B "$size")${NC}"
        
        if [[ -s "$file" ]]; then
            echo -e "${GREEN}  ✅ 文件非空${NC}"
        else
            echo -e "${YELLOW}  ⚠️  文件为空${NC}"
        fi
    fi
    
    # 时间信息
    echo -e "${CYAN}  🕐 修改时间: $(stat -f%Sm "$file" 2>/dev/null || stat -c%y "$file" 2>/dev/null)${NC}"
    
    # 权限信息
    local perms=$(stat -f%Mp%Lp "$file" 2>/dev/null || stat -c%a "$file" 2>/dev/null)
    echo -e "${CYAN}  🔐 权限: $perms${NC}"
}

# 🔍 批量文件检查
batch_check() {
    local files=("$@")
    
    echo -e "${BLUE}🔍 批量文件检查${NC}"
    echo -e "${CYAN}📋 检查文件数量: ${#files[@]}${NC}"
    echo
    
    local exists_count=0
    local missing_count=0
    
    for file in "${files[@]}"; do
        if [[ -e "$file" ]]; then
            echo -e "${GREEN}✅ $file${NC}"
            ((exists_count++))
        else
            echo -e "${RED}❌ $file${NC}"
            ((missing_count++))
        fi
    done
    
    echo
    echo -e "${GREEN}📊 统计结果:${NC}"
    echo -e "${GREEN}  ✅ 存在: $exists_count${NC}"
    echo -e "${RED}  ❌ 缺失: $missing_count${NC}"
    
    return $missing_count
}

# 🎯 使用示例
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    echo -e "${BLUE}📋 文件判断函数库演示${NC}"
    echo
    
    # 测试文件
    test_files=(
        "/etc/passwd"
        "/etc/shadow"
        "/usr/bin/bash"
        "/nonexistent/file"
        "/tmp"
    )
    
    for file in "${test_files[@]}"; do
        echo -e "${YELLOW}🔍 检查: $file${NC}"
        file_info "$file"
        echo
    done
    
    echo -e "${BLUE}📊 批量检查演示${NC}"
    batch_check "${test_files[@]}"
fi
```

### ✍️ 文件写入方法

#### 📝 基本写入操作

```bash
# 🎯 基本写入方法

# 1️⃣ 重定向写入（覆盖）
echo "Hello World" > file.txt
printf "格式化内容: %s\n" "$variable" > file.txt
cat > file.txt << 'EOF'
多行内容
第二行
EOF

# 2️⃣ 追加写入
echo "追加内容" >> file.txt
printf "追加格式化: %s\n" "$variable" >> file.txt
cat >> file.txt << 'EOF'
追加多行
内容
EOF

# 3️⃣ 使用 tee 命令（同时输出到屏幕和文件）
echo "内容" | tee file.txt              # 覆盖写入
echo "内容" | tee -a file.txt           # 追加写入
echo "内容" | tee file1.txt file2.txt   # 写入多个文件
echo "内容" | tee -a file.txt | wc -l   # 写入文件并继续处理

# 4️⃣ 使用 dd 命令
echo "内容" | dd of=file.txt            # 写入文件
dd if=/dev/zero of=file.txt bs=1M count=10  # 创建指定大小文件

# 5️⃣ 使用 printf 精确控制
printf "%s\n" "line1" "line2" > file.txt
printf "%-10s %5d\n" "name" 123 > file.txt
```

#### 🛡️ 安全写入函数

```bash
#!/bin/bash
# 🛡️ 安全文件写入函数库

set -euo pipefail

# 🎨 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# 📝 安全写入函数
safe_write() {
    local file="$1"
    local content="$2"
    local backup="${3:-true}"
    
    # 🔍 参数验证
    if [[ -z "$file" ]]; then
        echo -e "${RED}❌ 错误: 文件路径不能为空${NC}" >&2
        return 1
    fi
    
    # 📁 确保目录存在
    local dir=$(dirname "$file")
    if [[ ! -d "$dir" ]]; then
        echo -e "${YELLOW}📁 创建目录: $dir${NC}"
        mkdir -p "$dir" || {
            echo -e "${RED}❌ 创建目录失败: $dir${NC}" >&2
            return 1
        }
    fi
    
    # 💾 备份原文件
    if [[ "$backup" == "true" && -f "$file" ]]; then
        local backup_file="${file}.backup.$(date +%Y%m%d-%H%M%S)"
        echo -e "${CYAN}💾 备份原文件: $backup_file${NC}"
        cp "$file" "$backup_file" || {
            echo -e "${RED}❌ 备份失败${NC}" >&2
            return 1
        }
    fi
    
    # ✍️ 原子写入（先写临时文件，再移动）
    local temp_file="${file}.tmp.$$"
    
    # 🛡️ 设置陷阱清理临时文件
    trap "rm -f '$temp_file'" EXIT
    
    # 📝 写入内容
    if printf "%s" "$content" > "$temp_file"; then
        # 🔄 原子移动
        if mv "$temp_file" "$file"; then
            echo -e "${GREEN}✅ 写入成功: $file${NC}"
            return 0
        else
            echo -e "${RED}❌ 移动文件失败${NC}" >&2
            return 1
        fi
    else
        echo -e "${RED}❌ 写入临时文件失败${NC}" >&2
        return 1
    fi
}

# 📄 安全追加函数
safe_append() {
    local file="$1"
    local content="$2"
    local create_if_missing="${3:-true}"
    
    # 🔍 文件存在检查
    if [[ ! -f "$file" ]]; then
        if [[ "$create_if_missing" == "true" ]]; then
            echo -e "${YELLOW}📄 创建新文件: $file${NC}"
            safe_write "$file" "" false
        else
            echo -e "${RED}❌ 文件不存在: $file${NC}" >&2
            return 1
        fi
    fi
    
    # 📝 追加内容
    if printf "%s" "$content" >> "$file"; then
        echo -e "${GREEN}✅ 追加成功: $file${NC}"
        return 0
    else
        echo -e "${RED}❌ 追加失败: $file${NC}" >&2
        return 1
    fi
}

# 🔒 带权限控制的写入
secure_write() {
    local file="$1"
    local content="$2"
    local permissions="${3:-644}"
    local owner="${4:-}"
    
    # 📝 安全写入
    if safe_write "$file" "$content" true; then
        # 🔐 设置权限
        if chmod "$permissions" "$file"; then
            echo -e "${CYAN}🔐 权限设置: $permissions${NC}"
        else
            echo -e "${YELLOW}⚠️  权限设置失败${NC}" >&2
        fi
        
        # 👤 设置所有者
        if [[ -n "$owner" ]]; then
            if chown "$owner" "$file" 2>/dev/null; then
                echo -e "${CYAN}👤 所有者设置: $owner${NC}"
            else
                echo -e "${YELLOW}⚠️  所有者设置失败（可能需要 root 权限）${NC}" >&2
            fi
        fi
        
        return 0
    else
        return 1
    fi
}

# 📋 批量写入函数
batch_write() {
    local -A files_content
    local file content
    
    # 📥 解析参数（文件:内容 格式）
    for arg in "$@"; do
        if [[ "$arg" == *":"* ]]; then
            file="${arg%%:*}"
            content="${arg#*:}"
            files_content["$file"]="$content"
        else
            echo -e "${RED}❌ 参数格式错误: $arg（应为 file:content）${NC}" >&2
            return 1
        fi
    done
    
    echo -e "${BLUE}📋 批量写入 ${#files_content[@]} 个文件${NC}"
    
    local success_count=0
    local fail_count=0
    
    # 🔄 批量处理
    for file in "${!files_content[@]}"; do
        content="${files_content[$file]}"
        echo -e "${CYAN}📝 写入: $file${NC}"
        
        if safe_write "$file" "$content" false; then
            ((success_count++))
        else
            ((fail_count++))
        fi
    done
    
    echo
    echo -e "${GREEN}📊 批量写入结果:${NC}"
    echo -e "${GREEN}  ✅ 成功: $success_count${NC}"
    echo -e "${RED}  ❌ 失败: $fail_count${NC}"
    
    return $fail_count
}

# 🎯 使用示例
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    echo -e "${BLUE}📝 文件写入函数库演示${NC}"
    echo
    
    # 测试目录
    test_dir="/tmp/file_write_test"
    mkdir -p "$test_dir"
    
    # 单文件写入测试
    echo -e "${YELLOW}🔍 单文件写入测试${NC}"
    safe_write "$test_dir/test1.txt" "Hello World\nLine 2\n"
    
    # 追加测试
    echo -e "${YELLOW}🔍 追加写入测试${NC}"
    safe_append "$test_dir/test1.txt" "Appended line\n"
    
    # 安全写入测试
    echo -e "${YELLOW}🔍 安全写入测试${NC}"
    secure_write "$test_dir/secure.txt" "Secure content\n" "600"
    
    # 批量写入测试
    echo -e "${YELLOW}🔍 批量写入测试${NC}"
    batch_write \
        "$test_dir/batch1.txt:Content 1" \
        "$test_dir/batch2.txt:Content 2" \
        "$test_dir/batch3.txt:Content 3"
    
    # 显示结果
    echo -e "${BLUE}📋 写入结果:${NC}"
    ls -la "$test_dir"
    
    # 清理
    echo -e "${CYAN}🧹 清理测试文件${NC}"
    rm -rf "$test_dir"
fi
```

---

## 📄 文本处理与数据操作

### 🔧 AWK 文本处理

#### 📋 AWK 基础语法

```bash
# 🎯 AWK 基本语法结构
awk 'pattern { action }' file
awk 'BEGIN { action } pattern { action } END { action }' file

# 📊 内置变量
# $0    - 整行内容
# $1,$2 - 第1列，第2列
# NF    - 当前行字段数
# NR    - 当前行号
# FS    - 字段分隔符（默认空格）
# RS    - 记录分隔符（默认换行）
# OFS   - 输出字段分隔符
# ORS   - 输出记录分隔符

# 🔍 基本使用示例
awk '{ print $1 }' file.txt                    # 打印第一列
awk '{ print $1, $3 }' file.txt                # 打印第1和第3列
awk '{ print NR, $0 }' file.txt                # 打印行号和整行
awk 'NR==5' file.txt                           # 打印第5行
awk 'NF>3' file.txt                            # 打印字段数大于3的行
awk '/pattern/' file.txt                       # 打印匹配模式的行
awk '!/pattern/' file.txt                      # 打印不匹配模式的行
```

#### 🎨 AWK 高级功能

```bash
# 🔢 数学运算
awk '{ sum += $1 } END { print "总和:", sum }' numbers.txt
awk '{ print $1, $2, $1+$2 }' data.txt         # 计算两列之和
awk '{ avg = ($1+$2+$3)/3; print $0, avg }' scores.txt

# 📊 统计功能
awk '{ count[$1]++ } END { for(i in count) print i, count[i] }' file.txt
awk '{ sum+=$1; count++ } END { print "平均值:", sum/count }' numbers.txt
awk '{ if($1>max) max=$1 } END { print "最大值:", max }' numbers.txt

# 🔤 字符串处理
awk '{ print length($0) }' file.txt             # 打印每行长度
awk '{ print toupper($1) }' file.txt            # 转换为大写
awk '{ print tolower($1) }' file.txt            # 转换为小写
awk '{ print substr($1, 2, 3) }' file.txt       # 截取子字符串
awk '{ gsub(/old/, "new", $0); print }' file.txt # 全局替换

# 🎯 条件处理
awk '$1 > 100 { print "大于100:", $0 }' data.txt
awk '$2 ~ /^[0-9]+$/ { print "第二列是数字:", $0 }' file.txt
awk 'BEGIN { FS="," } $3 == "active" { print $1 }' users.csv

# 📋 格式化输出
awk '{ printf "%-10s %5d\n", $1, $2 }' data.txt
awk 'BEGIN { printf "%-10s %-10s %s\n", "Name", "Score", "Grade" }
     { printf "%-10s %-10d %s\n", $1, $2, ($2>=90?"A":$2>=80?"B":"C") }' scores.txt
```

#### 🛠️ AWK 实用脚本

```bash
#!/bin/bash
# 📊 AWK 实用脚本集合

set -euo pipefail

# 🎨 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# 📊 日志分析脚本
analyze_access_log() {
    local log_file="$1"
    
    if [[ ! -f "$log_file" ]]; then
        echo -e "${RED}❌ 日志文件不存在: $log_file${NC}" >&2
        return 1
    fi
    
    echo -e "${BLUE}📊 访问日志分析: $log_file${NC}"
    echo
    
    # 🔝 Top 10 IP 地址
    echo -e "${CYAN}🔝 Top 10 访问IP:${NC}"
    awk '{ print $1 }' "$log_file" | sort | uniq -c | sort -nr | head -10 | \
    awk '{ printf "  %s: %d 次\n", $2, $1 }'
    echo
    
    # 📈 状态码统计
    echo -e "${CYAN}📈 HTTP状态码统计:${NC}"
    awk '{ print $9 }' "$log_file" | sort | uniq -c | sort -nr | \
    awk '{ printf "  %s: %d 次\n", $2, $1 }'
    echo
    
    # 🕐 按小时统计访问量
    echo -e "${CYAN}🕐 按小时统计访问量:${NC}"
    awk '{
        # 提取时间戳中的小时
        match($4, /\[.*:([0-9]{2}):/, hour)
        if (hour[1] != "") hours[hour[1]]++
    } END {
        for (h=0; h<24; h++) {
            printf "  %02d:00-%02d:59: %d 次\n", h, h, (hours[sprintf("%02d", h)] ? hours[sprintf("%02d", h)] : 0)
        }
    }' "$log_file"
    echo
    
    # 📄 请求的文件类型统计
    echo -e "${CYAN}📄 请求文件类型统计:${NC}"
    awk '{
        # 提取请求路径
        match($7, /\.([a-zA-Z0-9]+)(\?|$)/, ext)
        if (ext[1] != "") {
            extensions[ext[1]]++
        } else {
            extensions["no-ext"]++
        }
    } END {
        for (e in extensions) {
            printf "  .%s: %d 次\n", e, extensions[e]
        }
    }' "$log_file" | sort -k2 -nr | head -10
}

# 💰 CSV 数据处理
process_csv_data() {
    local csv_file="$1"
    local operation="${2:-summary}"
    
    if [[ ! -f "$csv_file" ]]; then
        echo -e "${RED}❌ CSV文件不存在: $csv_file${NC}" >&2
        return 1
    fi
    
    echo -e "${BLUE}💰 CSV数据处理: $csv_file${NC}"
    echo
    
    case "$operation" in
        "summary")
            echo -e "${CYAN}📊 数据摘要:${NC}"
            awk -F',' '
            NR==1 { 
                for(i=1; i<=NF; i++) headers[i] = $i
                print "  列数:", NF
                next
            }
            { 
                rows++
                for(i=1; i<=NF; i++) {
                    if($i ~ /^[0-9]+(\.[0-9]+)?$/) {
                        sum[i] += $i
                        count[i]++
                        if(min[i] == "" || $i < min[i]) min[i] = $i
                        if(max[i] == "" || $i > max[i]) max[i] = $i
                    }
                }
            }
            END {
                print "  行数:", rows
                print "  数值列统计:"
                for(i in sum) {
                    printf "    %s: 总和=%.2f, 平均=%.2f, 最小=%.2f, 最大=%.2f\n", 
                           headers[i], sum[i], sum[i]/count[i], min[i], max[i]
                }
            }' "$csv_file"
            ;;
        "validate")
            echo -e "${CYAN}✅ 数据验证:${NC}"
            awk -F',' '
            NR==1 { 
                field_count = NF
                print "  标准列数:", field_count
                next
            }
            NF != field_count {
                printf "  ❌ 第%d行列数不匹配: 期望%d, 实际%d\n", NR, field_count, NF
                errors++
            }
            END {
                if(errors > 0) {
                    printf "  发现 %d 个错误\n", errors
                } else {
                    print "  ✅ 数据格式正确"
                }
            }' "$csv_file"
            ;;
        "convert")
            echo -e "${CYAN}🔄 转换为表格格式:${NC}"
            awk -F',' '
            NR==1 {
                for(i=1; i<=NF; i++) {
                    headers[i] = $i
                    max_len[i] = length($i)
                }
                next
            }
            {
                for(i=1; i<=NF; i++) {
                    data[NR-1][i] = $i
                    if(length($i) > max_len[i]) max_len[i] = length($i)
                }
                rows = NR-1
            }
            END {
                # 打印表头
                for(i=1; i<=length(headers); i++) {
                    printf "%-*s ", max_len[i], headers[i]
                }
                print ""
                
                # 打印分隔线
                for(i=1; i<=length(headers); i++) {
                    for(j=1; j<=max_len[i]; j++) printf "-"
                    printf " "
                }
                print ""
                
                # 打印数据
                for(r=1; r<=rows; r++) {
                    for(i=1; i<=length(headers); i++) {
                        printf "%-*s ", max_len[i], data[r][i]
                    }
                    print ""
                }
            }' "$csv_file"
            ;;
    esac
}

# 📊 系统监控数据分析
analyze_system_stats() {
    echo -e "${BLUE}📊 系统监控数据分析${NC}"
    echo
    
    # 🖥️ CPU 使用率统计
    echo -e "${CYAN}🖥️ CPU使用率统计:${NC}"
    top -l 1 -n 0 | awk '
    /CPU usage/ {
        gsub(/%/, "", $3)
        gsub(/%/, "", $5)
        user = $3
        system = $5
        idle = 100 - user - system
        printf "  用户态: %.1f%%\n", user
        printf "  系统态: %.1f%%\n", system
        printf "  空闲: %.1f%%\n", idle
    }'
    echo
    
    # 💾 内存使用统计
    echo -e "${CYAN}💾 内存使用统计:${NC}"
    vm_stat | awk '
    /Pages free/ { free = $3 }
    /Pages active/ { active = $3 }
    /Pages inactive/ { inactive = $3 }
    /Pages wired down/ { wired = $4 }
    END {
        page_size = 4096
        total_pages = free + active + inactive + wired
        total_mb = (total_pages * page_size) / 1024 / 1024
        free_mb = (free * page_size) / 1024 / 1024
        used_mb = total_mb - free_mb
        
        printf "  总内存: %.0f MB\n", total_mb
        printf "  已使用: %.0f MB (%.1f%%)\n", used_mb, (used_mb/total_mb)*100
        printf "  空闲: %.0f MB (%.1f%%)\n", free_mb, (free_mb/total_mb)*100
    }'
    echo
    
    # 💿 磁盘使用统计
    echo -e "${CYAN}💿 磁盘使用统计:${NC}"
    df -h | awk '
    NR==1 { next }
    $1 ~ /^\/dev\// {
        gsub(/%/, "", $5)
        printf "  %s: %s/%s (%.1f%%)\n", $1, $3, $2, $5
    }'
}

# 🎯 主函数
main() {
    local operation="${1:-help}"
    local file="${2:-}"
    
    case "$operation" in
        "log")
            if [[ -n "$file" ]]; then
                analyze_access_log "$file"
            else
                echo -e "${RED}❌ 请指定日志文件${NC}" >&2
                return 1
            fi
            ;;
        "csv")
            if [[ -n "$file" ]]; then
                local csv_op="${3:-summary}"
                process_csv_data "$file" "$csv_op"
            else
                echo -e "${RED}❌ 请指定CSV文件${NC}" >&2
                return 1
            fi
            ;;
        "system")
            analyze_system_stats
            ;;
        "help")
            echo -e "${GREEN}📋 AWK实用脚本使用说明:${NC}"
            echo "  $0 log <log_file>                    # 分析访问日志"
            echo "  $0 csv <csv_file> [summary|validate|convert]  # 处理CSV数据"
            echo "  $0 system                            # 系统监控数据分析"
            ;;
        *)
            echo -e "${RED}❌ 未知操作: $operation${NC}" >&2
            echo -e "${YELLOW}💡 使用 '$0 help' 查看帮助${NC}"
            return 1
            ;;
    esac
}

# 🚀 执行主函数
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
```

### 🔍 find 命令详解

#### 📋 基本查找语法

```bash
# 🎯 基本语法
find [路径] [表达式] [动作]

# 📁 按名称查找
find /path -name "filename"              # 精确匹配文件名
find /path -name "*.txt"                 # 通配符匹配
find /path -iname "*.TXT"                # 忽略大小写匹配
find /path -name "file*" -o -name "*.log" # 多条件或查找
find /path -name "temp*" -not -name "*.bak" # 排除条件

# 📊 按文件类型查找
find /path -type f                       # 查找普通文件
find /path -type d                       # 查找目录
find /path -type l                       # 查找软连接
find /path -type b                       # 查找块设备
find /path -type c                       # 查找字符设备
find /path -type p                       # 查找命名管道
find /path -type s                       # 查找套接字

# 📏 按大小查找
find /path -size +100M                   # 大于100MB的文件
find /path -size -1k                     # 小于1KB的文件
find /path -size 50c                     # 等于50字节的文件
find /path -empty                        # 空文件或空目录

# 🕐 按时间查找
find /path -mtime -7                     # 7天内修改的文件
find /path -mtime +30                    # 30天前修改的文件
find /path -atime -1                     # 1天内访问的文件
find /path -ctime +7                     # 7天前状态改变的文件
find /path -newer reference_file         # 比参考文件新的文件

# 🔐 按权限查找
find /path -perm 755                     # 权限完全匹配755
find /path -perm -755                    # 至少包含755权限
find /path -perm /755                    # 包含755中任一权限
find /path -perm -u+s                    # 设置了SUID的文件
find /path -perm -g+s                    # 设置了SGID的文件

# 👤 按所有者查找
find /path -user username                # 指定用户拥有的文件
find /path -group groupname              # 指定组拥有的文件
find /path -uid 1000                     # 指定UID拥有的文件
find /path -gid 1000                     # 指定GID拥有的文件
find /path -nouser                       # 无有效用户的文件
find /path -nogroup                      # 无有效组的文件
```

#### 🎯 高级查找技巧

```bash
# 🔧 复杂条件组合
find /var/log -name "*.log" -size +10M -mtime +7  # 多条件AND
find /tmp \( -name "*.tmp" -o -name "*.temp" \) -mtime +1  # 括号分组
find /home -type f -name "*.sh" -perm -u+x        # 可执行的shell脚本

# 🚫 排除特定目录
find /usr -path "*/bin" -prune -o -name "*.conf" -print
find / -path "/proc" -prune -o -path "/sys" -prune -o -name "*.log" -print

# 📊 使用正则表达式
find /path -regex ".*\\.(jpg|png|gif)$"          # 图片文件
find /path -iregex ".*\\.(txt|doc|pdf)$"         # 文档文件（忽略大小写）

# 🔍 按内容查找
find /path -type f -exec grep -l "pattern" {} \;  # 包含特定内容的文件
find /path -name "*.txt" -exec grep -H "error" {} \;  # 在txt文件中搜索error

# 📈 统计和分析
find /path -type f -printf "%s\n" | awk '{sum+=$1} END {print "总大小:", sum}'
find /path -type f -printf "%TY-%Tm-%Td %p\n" | sort  # 按日期排序显示
find /path -type f -printf "%s %p\n" | sort -nr | head -10  # 最大的10个文件
```

#### 🛠️ find 实用脚本

```bash
#!/bin/bash
# 🔍 find 命令实用脚本集合

set -euo pipefail

# 🎨 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# 🧹 清理临时文件
cleanup_temp_files() {
    local target_dir="${1:-.}"
    local days="${2:-7}"
    local dry_run="${3:-false}"
    
    echo -e "${BLUE}🧹 清理临时文件${NC}"
    echo -e "${CYAN}📁 目标目录: $target_dir${NC}"
    echo -e "${CYAN}📅 清理天数: $days 天前${NC}"
    echo -e "${CYAN}🔍 预览模式: $dry_run${NC}"
    echo
    
    # 定义临时文件模式
    local temp_patterns=(
        "*.tmp"
        "*.temp"
        "*.bak"
        "*.old"
        "*.swp"
        "*~"
        ".DS_Store"
        "Thumbs.db"
    )
    
    local total_files=0
    local total_size=0
    
    for pattern in "${temp_patterns[@]}"; do
        echo -e "${YELLOW}🔍 查找模式: $pattern${NC}"
        
        # 查找匹配的文件
        while IFS= read -r -d '' file; do
            local size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
            local size_human=$(numfmt --to=iec-i --suffix=B "$size" 2>/dev/null || echo "${size}B")
            
            echo -e "  ${RED}🗑️  $file ($size_human)${NC}"
            
            if [[ "$dry_run" != "true" ]]; then
                rm -f "$file" && echo -e "    ${GREEN}✅ 已删除${NC}"
            fi
            
            ((total_files++))
            ((total_size += size))
            
        done < <(find "$target_dir" -name "$pattern" -type f -mtime +"$days" -print0 2>/dev/null)
    done
    
    echo
    echo -e "${GREEN}📊 清理统计:${NC}"
    echo -e "${GREEN}  📄 文件数量: $total_files${NC}"
    echo -e "${GREEN}  💾 释放空间: $(numfmt --to=iec-i --suffix=B "$total_size" 2>/dev/null || echo "${total_size}B")${NC}"
    
    if [[ "$dry_run" == "true" ]]; then
        echo -e "${YELLOW}💡 这是预览模式，使用 --execute 参数执行实际删除${NC}"
    fi
}

# 🔍 查找重复文件
find_duplicate_files() {
    local target_dir="${1:-.}"
    local min_size="${2:-1k}"
    
    echo -e "${BLUE}🔍 查找重复文件${NC}"
    echo -e "${CYAN}📁 目标目录: $target_dir${NC}"
    echo -e "${CYAN}📏 最小大小: $min_size${NC}"
    echo
    
    # 临时文件存储MD5值
    local temp_file="/tmp/find_duplicates_$$"
    trap "rm -f '$temp_file'" EXIT
    
    echo -e "${YELLOW}🔄 计算文件MD5值...${NC}"
    
    # 查找文件并计算MD5
    find "$target_dir" -type f -size +"$min_size" -exec md5sum {} \; 2>/dev/null | \
    sort > "$temp_file"
    
    echo -e "${YELLOW}🔍 分析重复文件...${NC}"
    
    # 查找重复的MD5值
    awk '{
        md5 = $1
        file = substr($0, 35)  # MD5后面的文件路径
        files[md5] = files[md5] ? files[md5] "\n" file : file
        count[md5]++
    }
    END {
        duplicates = 0
        total_size = 0
        for (md5 in count) {
            if (count[md5] > 1) {
                duplicates++
                printf "\n🔄 重复组 %d (MD5: %s):\n", duplicates, md5
                
                # 分割文件列表并显示
                split(files[md5], file_list, "\n")
                for (i in file_list) {
                    cmd = "stat -f%z \"" file_list[i] "\" 2>/dev/null || stat -c%s \"" file_list[i] "\" 2>/dev/null"
                    cmd | getline size
                    close(cmd)
                    
                    cmd = "numfmt --to=iec-i --suffix=B " size " 2>/dev/null || echo " size "B"
                    cmd | getline size_human
                    close(cmd)
                    
                    printf "  📄 %s (%s)\n", file_list[i], size_human
                    
                    if (i > 1) total_size += size  # 除第一个文件外的重复文件大小
                }
            }
        }
        
        if (duplicates > 0) {
            cmd = "numfmt --to=iec-i --suffix=B " total_size " 2>/dev/null || echo " total_size "B"
            cmd | getline total_size_human
            close(cmd)
            
            printf "\n📊 重复文件统计:\n"
            printf "  🔄 重复组数: %d\n", duplicates
            printf "  💾 可节省空间: %s\n", total_size_human
        } else {
            printf "\n✅ 未发现重复文件\n"
        }
    }' "$temp_file"
}

# 📊 目录大小分析
analyze_directory_size() {
    local target_dir="${1:-.}"
    local depth="${2:-2}"
    
    echo -e "${BLUE}📊 目录大小分析${NC}"
    echo -e "${CYAN}📁 目标目录: $target_dir${NC}"
    echo -e "${CYAN}📏 分析深度: $depth 层${NC}"
    echo
    
    echo -e "${YELLOW}🔄 分析中...${NC}"
    
    # 使用find和du分析目录大小
    find "$target_dir" -maxdepth "$depth" -type d -exec du -sh {} \; 2>/dev/null | \
    sort -hr | \
    awk -v target="$target_dir" '
    BEGIN {
        print "📊 目录大小排行榜:"
        print "" 
    }
    {
        size = $1
        path = substr($0, length($1) + 2)
        
        # 计算相对路径
        if (path == target) {
            rel_path = "."
        } else {
            rel_path = substr(path, length(target) + 2)
        }
        
        printf "  📁 %-50s %10s\n", rel_path, size
    }
    END {
        print ""
    }'
    
    # 文件类型统计
    echo -e "${CYAN}📄 文件类型统计:${NC}"
    find "$target_dir" -type f -name "*.*" | \
    awk -F. '{ ext = tolower($NF); count[ext]++; } 
    END { 
        for (e in count) printf "  .%-10s: %d 个\n", e, count[e] 
    }' | \
    sort -k2 -nr | head -10
    
    echo
    
    # 大文件统计
    echo -e "${CYAN}📈 大文件 Top 10:${NC}"
    find "$target_dir" -type f -exec ls -lh {} \; 2>/dev/null | \
    sort -k5 -hr | head -10 | \
    awk '{ printf "  📄 %-50s %10s\n", $9, $5 }'
}

# 🔒 查找安全问题文件
find_security_issues() {
    local target_dir="${1:-.}"
    
    echo -e "${BLUE}🔒 安全问题文件检查${NC}"
    echo -e "${CYAN}📁 目标目录: $target_dir${NC}"
    echo
    
    local issues_found=false
    
    # 检查SUID文件
    echo -e "${YELLOW}🔍 检查SUID文件:${NC}"
    local suid_files=$(find "$target_dir" -type f -perm -u+s 2>/dev/null)
    if [[ -n "$suid_files" ]]; then
        echo "$suid_files" | while read -r file; do
            echo -e "  ${RED}⚠️  SUID: $file${NC}"
            issues_found=true
        done
    else
        echo -e "  ${GREEN}✅ 未发现SUID文件${NC}"
    fi
    echo
    
    # 检查SGID文件
    echo -e "${YELLOW}🔍 检查SGID文件:${NC}"
    local sgid_files=$(find "$target_dir" -type f -perm -g+s 2>/dev/null)
    if [[ -n "$sgid_files" ]]; then
        echo "$sgid_files" | while read -r file; do
            echo -e "  ${RED}⚠️  SGID: $file${NC}"
            issues_found=true
        done
    else
        echo -e "  ${GREEN}✅ 未发现SGID文件${NC}"
    fi
    echo
    
    # 检查全局可写文件
    echo -e "${YELLOW}🔍 检查全局可写文件:${NC}"
    local writable_files=$(find "$target_dir" -type f -perm -o+w 2>/dev/null)
    if [[ -n "$writable_files" ]]; then
        echo "$writable_files" | while read -r file; do
            echo -e "  ${RED}⚠️  全局可写: $file${NC}"
            issues_found=true
        done
    else
        echo -e "  ${GREEN}✅ 未发现全局可写文件${NC}"
    fi
    echo
    
    # 检查无主文件
    echo -e "${YELLOW}🔍 检查无主文件:${NC}"
    local orphan_files=$(find "$target_dir" -nouser -o -nogroup 2>/dev/null)
    if [[ -n "$orphan_files" ]]; then
        echo "$orphan_files" | while read -r file; do
            echo -e "  ${RED}⚠️  无主文件: $file${NC}"
            issues_found=true
        done
    else
        echo -e "  ${GREEN}✅ 未发现无主文件${NC}"
    fi
    
    if [[ "$issues_found" != "true" ]]; then
        echo -e "${GREEN}🎉 未发现安全问题！${NC}"
    fi
}

# 🎯 主函数
main() {
    local operation="${1:-help}"
    
    case "$operation" in
        "cleanup")
            local dir="${2:-.}"
            local days="${3:-7}"
            local execute="${4:-false}"
            [[ "$execute" == "--execute" ]] && execute="false" || execute="true"
            cleanup_temp_files "$dir" "$days" "$execute"
            ;;
        "duplicates")
            local dir="${2:-.}"
            local min_size="${3:-1k}"
            find_duplicate_files "$dir" "$min_size"
            ;;
        "analyze")
            local dir="${2:-.}"
            local depth="${3:-2}"
            analyze_directory_size "$dir" "$depth"
            ;;
        "security")
            local dir="${2:-.}"
            find_security_issues "$dir"
            ;;
        "help")
            echo -e "${GREEN}📋 find实用脚本使用说明:${NC}"
            echo "  $0 cleanup [dir] [days] [--execute]     # 清理临时文件"
            echo "  $0 duplicates [dir] [min_size]          # 查找重复文件"
            echo "  $0 analyze [dir] [depth]                # 目录大小分析"
            echo "  $0 security [dir]                       # 安全问题检查"
            ;;
        *)
            echo -e "${RED}❌ 未知操作: $operation${NC}" >&2
            echo -e "${YELLOW}💡 使用 '$0 help' 查看帮助${NC}"
            return 1
            ;;
    esac
}

# 🚀 执行主函数
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
```

---

## 🔗 软连接（符号链接）管理

### 📋 基础概念

**软连接（Symbolic Link）** 也称为符号链接，是一种特殊的文件类型，它包含指向另一个文件或目录的路径。

#### 🎯 主要作用

| 功能 | 描述 | 使用场景 |
|------|------|----------|
| 🔗 **路径映射** | 创建文件/目录的别名 | 简化长路径访问 |
| 📦 **版本管理** | 指向不同版本的软件 | 软件版本切换 |
| 🔄 **动态引用** | 运行时解析目标路径 | 配置文件管理 |
| 🌐 **跨文件系统** | 可跨越不同分区 | 灵活的文件组织 |
| 🛠️ **系统维护** | 便于备份和迁移 | 系统管理优化 |

#### 💡 实际应用价值

```bash
# 🎯 常见应用场景示例

# 1️⃣ 软件版本管理
/opt/java -> /opt/java-11.0.2
/opt/node -> /opt/node-v16.14.0

# 2️⃣ 配置文件管理
/etc/nginx/nginx.conf -> /etc/nginx/sites-available/production.conf

# 3️⃣ 日志文件管理
/var/log/app/current -> /var/log/app/app-2024-01-15.log

# 4️⃣ 数据目录管理
/data/mysql -> /mnt/storage/mysql-data

# 5️⃣ 备份策略
/backup/latest -> /backup/backup-2024-01-15
```

#### 🔄 软连接 vs 硬连接对比

| 特性 | 软连接 | 硬连接 | 说明 |
|------|--------|--------|----- |
| 🎯 **目标类型** | 文件或目录 | 仅文件 | 软连接更灵活 |
| 🌐 **跨文件系统** | ✅ 支持 | ❌ 不支持 | 软连接可跨分区 |
| 🔗 **链接方式** | 路径引用 | inode 引用 | 不同的实现机制 |
| 📊 **inode 编号** | 不同 | 相同 | 硬连接共享 inode |
| 🗑️ **删除影响** | 链接失效 | 不影响 | 软连接依赖目标 |
| 📁 **存储开销** | 路径长度 | 几乎无 | 软连接需存储路径 |
| 🔍 **识别方式** | `ls -l` 显示 `->` | 链接计数 > 1 | 不同的识别方法 |

#### 🔧 工作原理

```bash
# 🔍 软连接的工作原理演示

# 📁 创建测试文件
echo "Hello World" > /tmp/original.txt

# 🔗 创建软连接
ln -s /tmp/original.txt /tmp/link.txt

# 📊 查看文件信息
ls -li /tmp/original.txt /tmp/link.txt
# 输出示例：
# 1234567 -rw-r--r-- 1 user user 12 Jan 15 10:00 /tmp/original.txt
# 7654321 lrwxrwxrwx 1 user user 17 Jan 15 10:01 /tmp/link.txt -> /tmp/original.txt

# 🔍 分析输出
# - 不同的 inode 编号（1234567 vs 7654321）
# - 软连接权限显示为 lrwxrwxrwx（l 表示链接）
# - 箭头 -> 显示目标路径
# - 软连接大小为目标路径的字符数

# 📖 读取内容（两种方式结果相同）
cat /tmp/original.txt  # Hello World
cat /tmp/link.txt      # Hello World

# 🗑️ 删除原文件后的影响
rm /tmp/original.txt
cat /tmp/link.txt      # cat: /tmp/link.txt: No such file or directory
ls -l /tmp/link.txt    # 显示红色或闪烁（断开的链接）
```

### 🛠️ 常用命令

#### 🔗 创建软连接

```bash
# 📋 基本语法
ln -s [目标路径] [链接路径]

# 📁 文件软连接
ln -s /path/to/original/file.txt /path/to/link.txt
ln -s /etc/nginx/nginx.conf ~/nginx.conf
ln -s /var/log/app.log ~/current.log

# 📂 目录软连接
ln -s /opt/application-v2.1.0 /opt/app
ln -s /mnt/storage/data /home/user/data
ln -s /usr/local/bin /home/user/bin

# 🔄 相对路径软连接
cd /opt
ln -s ./java-11.0.2 java          # 相对路径
ln -s /opt/java-11.0.2 java        # 绝对路径（推荐）

# 🔧 强制创建（覆盖已存在的链接）
ln -sf /new/target /existing/link

# 📋 批量创建软连接
for app in java node python; do
    ln -sf "/opt/${app}-latest" "/usr/local/bin/${app}"
done
```

#### 🔍 查看和管理软连接

```bash
# 👀 查看软连接信息
ls -l /path/to/link                # 显示链接详情
ls -la | grep "^l"                 # 列出当前目录所有软连接
file /path/to/link                 # 显示文件类型信息
readlink /path/to/link             # 显示链接目标
readlink -f /path/to/link          # 显示绝对路径目标

# 🔍 检查链接状态
test -L /path/to/link && echo "是软连接" || echo "不是软连接"
test -e /path/to/link && echo "目标存在" || echo "目标不存在"

# 📊 链接统计信息
stat /path/to/link                 # 详细文件统计
ls -i /path/to/link                # 显示 inode 编号

# 🔄 更新软连接目标
ln -sfn /new/target /existing/link # -n 防止目录链接递归

# 🗑️ 删除软连接
rm /path/to/link                   # 删除链接（不影响目标）
unlink /path/to/link               # 另一种删除方式

# ⚠️ 注意：删除目录软连接时不要加斜杠
rm /path/to/dir_link               # ✅ 正确：删除链接
rm /path/to/dir_link/              # ❌ 错误：删除目录内容
```

### 🔍 系统中的软连接查询

#### 📋 基本查询命令

```bash
# 🔍 查找所有软连接
find /path -type l                 # 查找指定路径下的所有软连接
find / -type l 2>/dev/null         # 查找整个系统的软连接（忽略错误）
find /usr/bin -type l -ls          # 查找并显示详细信息

# 🎯 查找指向特定目标的软连接
find /usr -type l -lname "*/java*" # 查找指向包含 java 的目标
find / -type l -lname "/opt/*" 2>/dev/null  # 查找指向 /opt 下的链接

# 🔗 查找断开的软连接（死链接）
find /path -type l ! -exec test -e {} \; -print
find / -xtype l 2>/dev/null        # 更简洁的方式

# 📊 按修改时间查找
find /usr/local -type l -mtime -7  # 7天内修改的软连接
find /etc -type l -newer /tmp/reference_file  # 比参考文件新的链接
```

#### 🔧 高级查询技巧

```bash
# 🎯 复杂查询示例

# 查找所有指向不存在文件的软连接
find /usr/local -type l -exec sh -c 'test ! -e "$1" && echo "$1"' _ {} \;

# 查找循环引用的软连接
find /path -type l -exec sh -c '
    target=$(readlink "$1")
    if [[ "$target" == "$1" ]]; then
        echo "循环引用: $1 -> $target"
    fi
' _ {} \;

# 查找相对路径软连接
find /usr/local -type l -exec sh -c '
    target=$(readlink "$1")
    if [[ "$target" != /* ]]; then
        echo "相对路径链接: $1 -> $target"
    fi
' _ {} \;

# 按链接目标分组统计
find /usr/bin -type l -exec readlink {} \; | sort | uniq -c | sort -nr
```

#### 📊 软连接统计脚本

```bash
#!/bin/bash
# 📊 系统软连接统计分析脚本

set -euo pipefail

# 🎨 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# 📋 配置变量
SEARCH_PATH="${1:-/usr}"
OUTPUT_FILE="/tmp/symlink-report-$(date +%Y%m%d-%H%M%S).txt"

# 📝 日志函数
log_section() {
    echo -e "\n${BLUE}$1${NC}"
    echo "$1" >> "$OUTPUT_FILE"
    echo "$(printf '=%.0s' {1..50})" >> "$OUTPUT_FILE"
}

log_info() {
    echo -e "${CYAN}$1${NC}"
    echo "$1" >> "$OUTPUT_FILE"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
    echo "⚠️  $1" >> "$OUTPUT_FILE"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
    echo "❌ $1" >> "$OUTPUT_FILE"
}

# 🔍 分析函数
analyze_symlinks() {
    local search_path="$1"
    
    log_section "🔗 软连接统计分析报告"
    log_info "📅 生成时间: $(date '+%Y-%m-%d %H:%M:%S')"
    log_info "🖥️  主机名: $(hostname)"
    log_info "📁 搜索路径: $search_path"
    log_info ""
    
    # 📊 基本统计
    log_section "📊 基本统计信息"
    
    local total_links=$(find "$search_path" -type l 2>/dev/null | wc -l)
    local broken_links=$(find "$search_path" -type l ! -exec test -e {} \; -print 2>/dev/null | wc -l)
    local valid_links=$((total_links - broken_links))
    
    log_info "📦 软连接总数: $total_links"
    log_info "✅ 有效链接: $valid_links"
    log_info "❌ 断开链接: $broken_links"
    
    if [[ $total_links -gt 0 ]]; then
        local broken_percentage=$(( (broken_links * 100) / total_links ))
        log_info "📈 断开率: ${broken_percentage}%"
    fi
    
    # 🎯 目标类型统计
    log_section "🎯 链接目标类型统计"
    
    local file_links=0
    local dir_links=0
    local other_links=0
    
    while IFS= read -r -d '' link; do
        if [[ -f "$link" ]]; then
            ((file_links++))
        elif [[ -d "$link" ]]; then
            ((dir_links++))
        else
            ((other_links++))
        fi
    done < <(find "$search_path" -type l -print0 2>/dev/null)
    
    log_info "📄 指向文件: $file_links"
    log_info "📁 指向目录: $dir_links"
    log_info "❓ 其他/断开: $other_links"
    
    # 🔗 路径类型统计
    log_section "🔗 路径类型统计"
    
    local absolute_links=0
    local relative_links=0
    
    while IFS= read -r link; do
        local target=$(readlink "$link" 2>/dev/null || echo "")
        if [[ "$target" == /* ]]; then
            ((absolute_links++))
        else
            ((relative_links++))
        fi
    done < <(find "$search_path" -type l 2>/dev/null)
    
    log_info "🌐 绝对路径: $absolute_links"
    log_info "📍 相对路径: $relative_links"
    
    # 🏆 热门目标统计
    log_section "🏆 热门链接目标 (Top 10)"
    
    find "$search_path" -type l -exec readlink {} \; 2>/dev/null | \
    sort | uniq -c | sort -nr | head -10 | \
    while read -r count target; do
        log_info "$count 次: $target"
    done
    
    # ❌ 断开的链接详情
    if [[ $broken_links -gt 0 ]]; then
        log_section "❌ 断开的软连接详情"
        
        find "$search_path" -type l ! -exec test -e {} \; -print 2>/dev/null | \
        while IFS= read -r broken_link; do
            local target=$(readlink "$broken_link" 2>/dev/null || echo "未知")
            log_error "$broken_link -> $target"
        done
    fi
    
    # 🔄 循环引用检查
    log_section "🔄 循环引用检查"
    
    local circular_found=false
    find "$search_path" -type l 2>/dev/null | \
    while IFS= read -r link; do
        local target=$(readlink "$link" 2>/dev/null || continue)
        local resolved=$(readlink -f "$link" 2>/dev/null || continue)
        
        if [[ "$link" == "$resolved" ]]; then
            log_warning "发现循环引用: $link -> $target"
            circular_found=true
        fi
    done
    
    if [[ "$circular_found" != "true" ]]; then
        log_info "✅ 未发现循环引用"
    fi
    
    # 📁 按目录统计
    log_section "📁 按目录统计软连接数量 (Top 10)"
    
    find "$search_path" -type l -printf '%h\n' 2>/dev/null | \
    sort | uniq -c | sort -nr | head -10 | \
    while read -r count dir; do
        log_info "$count 个: $dir"
    done
}

# 🧹 清理建议
generate_cleanup_suggestions() {
    log_section "🧹 清理建议"
    
    # 查找断开的链接
    local broken_count=$(find "$SEARCH_PATH" -type l ! -exec test -e {} \; -print 2>/dev/null | wc -l)
    
    if [[ $broken_count -gt 0 ]]; then
        log_warning "发现 $broken_count 个断开的软连接"
        log_info "清理命令: find $SEARCH_PATH -type l ! -exec test -e {} \\; -delete"
    else
        log_info "✅ 未发现需要清理的断开链接"
    fi
    
    # 查找可疑的相对路径链接
    local relative_count=$(find "$SEARCH_PATH" -type l -exec sh -c '
        target=$(readlink "$1")
        [[ "$target" != /* ]] && echo "$1"
    ' _ {} \; 2>/dev/null | wc -l)
    
    if [[ $relative_count -gt 0 ]]; then
        log_warning "发现 $relative_count 个相对路径软连接，建议检查"
        log_info "查看命令: find $SEARCH_PATH -type l -exec sh -c 'target=\$(readlink \"\$1\"); [[ \"\$target\" != /* ]] && echo \"\$1 -> \$target\"' _ {} \\;"
    fi
}

# 🚀 主函数
main() {
    echo -e "${GREEN}🔗 开始软连接分析...${NC}"
    echo -e "${CYAN}📁 搜索路径: $SEARCH_PATH${NC}"
    echo -e "${CYAN}📄 报告文件: $OUTPUT_FILE${NC}"
    echo
    
    # 初始化报告文件
    echo "软连接统计分析报告" > "$OUTPUT_FILE"
    echo "生成时间: $(date '+%Y-%m-%d %H:%M:%S')" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    
    # 执行分析
    analyze_symlinks "$SEARCH_PATH"
    
    # 生成清理建议
    generate_cleanup_suggestions
    
    echo
    echo -e "${GREEN}✅ 分析完成！${NC}"
    echo -e "${BLUE}📄 详细报告已保存到: $OUTPUT_FILE${NC}"
    echo -e "${YELLOW}💡 使用 'cat $OUTPUT_FILE' 查看完整报告${NC}"
}

# 🎯 执行主函数
main "$@"
```