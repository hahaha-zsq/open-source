
# Nginx 全面指南：配置详解 + 周边工具一览 🚀

> Nginx 是一个高性能的 Web 服务和反向代理服务器。本文详细介绍 Nginx 的配置方法、代理原理和实际应用场景。

![Nginx Logo](nginx.png)

## 什么是 Nginx？ 🧠

**Nginx**（Engine-X）是一个高性能的 Web 服务和反向代理服务器。它以**轻量、并发高、模块化**著称。

### 核心功能

- 🌐 托管静态资源
- 🔁 反向代理转发请求
- 🧭 实现负载均衡
- 🔒 支持 SSL 加密
- 🚀 缓存和压缩资源
- 📈 提高整体服务稳定性

## Nginx 的文件结构及作用 🗂️

| **📁 文件路径** | **📝 作用** |
|---|---|
| `/etc/nginx/nginx.conf` | 主配置文件，包含全局设置和 HTTP 块 |
| `/etc/nginx/conf.d/*.conf` | 子配置，通常一个站点一个文件 |
| `/etc/nginx/mime.types` | MIME 类型映射表，用于静态资源 |
| `/usr/share/nginx/modules/*.conf` | 可选模块配置，如 gzip 等 |
| `/var/log/nginx/*.log` | 日志文件，包含访问日志和错误日志 |

## Nginx 主要的配置文件 ⚙️

Nginx 的配置文件主要由几个关键部分组成，这些部分分布在不同的文件中。以下是常见的几个配置文件及其作用：

### 1. 主配置文件 (`/etc/nginx/nginx.conf`)

- 这是 Nginx 的主配置文件，包含了全局设置和默认行为
- 其中包括了 Nginx 的用户、进程数、错误日志位置、PID 文件位置等基本信息
- 主配置文件还可能包含事件模型的配置（`events` 块），HTTP 的全局设置（`http` 块），以及对其他配置文件的引用

### 2. 模块配置文件 (`/usr/share/nginx/modules/*.conf`)

- 如果使用的是动态模块版本的 Nginx，则可能会有额外的模块配置文件
- 这些文件通常包含动态加载模块所需的配置

### 3. 站点配置文件 (`/etc/nginx/conf.d/*.conf`)

- 该目录下的每个 `.conf` 文件通常对应一个虚拟主机或一组相关服务
- 每个站点配置文件可以定义一个或多个 `server` 块，用于指定特定域名、端口、路径映射等
- 这种分离式配置使得管理多个站点更为方便

### 4. MIME 类型文件 (`/etc/nginx/mime.types`)

- 此文件包含了 MIME 类型到文件扩展名的映射，用于正确识别和处理不同类型的文件
- 在主配置文件中通过 `include` 指令引用

### 5. 日志文件配置 (`/var/log/nginx/access.log`, `/var/log/nginx/error.log`)

- 虽然这不是配置文件，但日志文件的位置和格式通常在配置文件中定义
- `access_log` 用于记录访问日志，`error_log` 用于记录错误日志

## Nginx 主配置文件 vs 站点配置文件的区别 ⚔️

在 Nginx 的配置体系中，文件结构是模块化的，便于分离全局控制逻辑和站点具体逻辑。我们来看两个核心配置文件的区别：

### 主配置文件：/etc/nginx/nginx.conf 📌

这是 **Nginx 启动时读取的首个配置文件**，包含了对整个服务器行为的控制：

- 🧠 **全局设置**：如工作进程数（worker_processes）、日志路径（error_log）、PID 文件位置等
- ⚙️ **事件模型**：配置网络事件处理方式（events 块）
- 🌐 **HTTP 全局设置**：定义 MIME 类型、日志格式、连接保持、缓冲区等（http 块）
- 📂 **配置引用**：通过 include 指令加载 conf.d/*.conf 等子配置

> [!NOTE]
> 它定义了 Nginx 的"骨架"。

### 站点配置文件：/etc/nginx/conf.d/default.conf 🌍

站点配置文件，通常用于描述单个网站或服务的运行方式，属于 Nginx 的**虚拟主机机制**的一部分。

- 📦 **定义一个或多个 server 块**：指定域名（server_name）、监听端口（listen）、路径映射（location）等
- 📁 **静态资源路径**：配置 root 或 alias
- 🔁 **代理转发配置**：如 proxy_pass 实现后端服务代理
- 📜 **错误页面、重定向等规则**

这些配置被主配置文件中的：

```bash
include /etc/nginx/conf.d/*.conf;
```

> [!TIP]
> 每个站点一个配置文件，清晰、独立、可拓展。

### 区别总结一览 🔍

| **对比项** | **主配置文件** nginx.conf | **站点配置文件（如** default.conf**）** |
|---|---|---|
| 🧭 **位置** | /etc/nginx/nginx.conf | /etc/nginx/conf.d/*.conf |
| 🎯 **作用** | 管理全局行为，决定 Nginx 怎么"运行" | 管理单个站点或服务，决定怎么"响应" |
| ⚙️ **内容** | events 块、http 块、全局设置、日志 | server 块、路径映射、反向代理 |
| 📦 **结构** | 一个主配置，包含所有引用 | 多个子配置，模块化管理 |
| 🔧 **维护性** | 修改需谨慎，影响全局 | 新建/修改更灵活，便于多站点扩展 |

## 配置示例：如何管理多站点服务 🛠️

以下示例展示了如何通过子配置文件和 include 指令，实现对多个虚拟主机或服务的清晰管理。

### 1. 在 conf.d 中添加 default.conf 配置文件 📁

**在 conf.d 中添加 default.conf 配置文件**

```bash
server {
    listen       80;
    server_name  localhost;

    # 静态资源根目录
    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    # 🧩 业务服务代理
    location /business {
        proxy_pass  http://business.app.com;
    }

    # 👤 用户服务代理
    location /user {
        proxy_pass  http://user.app.com;
    }
}
```

> [!NOTE] 说明
> - 每个 server 块对应一个网站或服务
> - 使用 location 来区分路径，执行反向代理或资源映射

### 2. 在主配置文件 nginx.conf 中引入子配置 ⚙️

```bash
http {
    ...

    # 启用 Gzip（可选）
    # gzip on;

    # 👇 加载所有站点配置
    include /etc/nginx/conf.d/*.conf;
}
```

> [!IMPORTANT] 这一行配置的作用
> Nginx 会自动扫描并加载 /etc/nginx/conf.d/ 目录下所有以 .conf 结尾的文件。

这就意味着，你可以为每个站点或服务创建一个独立配置文件，如：

- example.com.conf
- blog.example.com.conf
- admin.internal.conf

Nginx 会在启动或重载时自动引入这些配置，**无需修改主配置文件**，极大提高了可维护性与扩展性 🔄。

### 总结优势

| **优势** | **描述** |
|---|---|
| 🧩 模块化 | 每个服务/域名独立配置，逻辑清晰 |
| 🔄 热更新 | 修改单个文件后 reload 即可生效 |
| 👥 团队协作 | 前后端/多团队可独立开发各自站点配置 |
| 📁 易管理 | 所有服务统一放在 conf.d/ 目录，结构一目了然 |

## 代理类型：正向代理（Forward Proxy） 🔁

### 正向代理是什么？ 🧭

**正向代理** 是一种位于客户端与目标服务器之间的中间服务器，其代表客户端向外发起请求。

![正向代理](正向代理.png)

### 工作机制 🛠️

- 用户先向代理服务器发送请求
- 代理服务器再向目标网站转发该请求，并将结果返回给用户
- 客户端**知道**自己在使用代理服务器

### 正向代理的核心功能 🧰

| **功能** | **描述** |
|---|---|
| 🕵️‍♂️ 匿名访问 | 隐藏真实 IP，保护隐私 |
| 🚫 内容过滤 | 可限制特定网站或内容的访问（如局域网内） |
| 📦 缓存加速 | 对高频请求资源进行缓存，提升访问速度 |
| 🛡️ 安全隔离 | 阻挡潜在威胁，避免客户端直接暴露在公网下 |

### 应用场景举例 📌

- 🏢 **企业网络管理**：限制员工访问某些网站，提升信息安全
- 🏠 **家庭用户**：访问被地理位置限制的网站内容（如外区 Netflix）
- 🌍 **跨境访问**：通过代理访问国外或受限地区的内容

> [!TIP] 总结一句话
> 正向代理是"客户端的代表"，适合用来**翻墙、缓存、匿名、安全隔离**

## 代理类型：反向代理（Reverse Proxy） 🔄

### 什么是反向代理？ 📥

**反向代理** 是一种代理服务器，位于客户端和多个后端服务器之间，**代表服务器接收请求并做出响应**。

![反向代理](反向代理.png)

### 工作机制 🛠️

- 客户端将请求发送给反向代理服务器
- 反向代理根据策略将请求转发给后端服务器（如 Web、API 等）
- 客户端并不知道最终提供服务的是哪台后端服务器

### 反向代理的主要功能 🧰

| **功能** | **描述** |
|---|---|
| ⚖️ 负载均衡 | 将流量分发至多台后端服务器，提升并发处理能力 |
| 🗃️ 缓存 | 缓存静态资源（如图片、CSS、JS），减轻后端压力 |
| 🛡️ 安全隔离 | 隐藏后端 IP，仅暴露代理服务器地址，防止攻击 |
| 🔐 加密卸载 | 由代理服务器处理 SSL/TLS，加快后端响应 |
| 📦 内容压缩 | 对响应内容进行 gzip 压缩，节省带宽、加快传输 |

### 应用场景举例 📌

- 🌐 **大型网站**：如电商平台、门户网站等，使用反向代理统一入口并实现负载均衡
- ⚙️ **微服务架构**：前端请求统一由代理调度至不同微服务模块
- 🧩 **静态资源加速**：通过缓存和压缩机制，加速前端页面加载
- 🔒 **安全防护入口**：集中管理证书、防火墙策略、流量拦截等

> [!TIP] 总结一句话
> 反向代理是"服务端的代表"，用于实现**统一入口、流量调度、安全隔离、性能优化**

## Nginx 配置文件的组成部分详解 🧩

Nginx 的配置文件通常由一个或多个 .conf 文件构成，通过模块化结构来定义服务行为。每个配置文件由多个**顶级块**（如 http、events、server）组成，每个块中又可以包含子块和具体的配置指令。

### 1️⃣ 全局块（Global Block）

定义 Nginx 的运行基本参数，位于主配置文件（如 /etc/nginx/nginx.conf）最上方。

| **指令** | **功能说明** |
|---|---|
| worker_processes | 设置工作进程数量，建议设为 CPU 核心数 🧠 |
| daemon | 默认值为 `on`，表示以后台模式运行；设置为 `off` 则会在前台运行 |
| pid | 设置主进程 PID 文件保存路径 |
| error_log | 配置错误日志路径与级别 |
| include | 引入其他配置文件，实现模块化管理 📂 |

### 2️⃣ events 块

控制连接处理的行为：

```bash
events {
    worker_connections 1024; # 每个 worker 允许的最大连接数
    # multi_accept on;
}
```

可选参数包括：

- multi_accept：同时接受多个新连接，提高并发处理能力
- use epoll：设置事件驱动模型（Linux 推荐使用 epoll）

### 3️⃣ http 块（HTTP 配置核心）

配置所有 HTTP 服务相关的功能，是 Nginx 的核心模块。

```bash
http {
    include       mime.types;
    default_type  application/octet-stream;
    access_log    /var/log/nginx/access.log;
    sendfile      on;
    keepalive_timeout  65;

    include /etc/nginx/conf.d/*.conf;
}
```

#### 🔸 server 块（虚拟主机）

`server` 块定义了一个虚拟主机，并且可以包含多个 `location` 块。一个 `server` 块通常用于配置一个特定的域名或者IP地址，也可以配置监听的端口、SSL 证书、访问控制、错误处理等。

```bash
server {
    listen 80;
    server_name example.com;

    location / {
        root /var/www/example;
        index index.html;
    }
}
```

- listen：监听端口
- server_name：绑定域名
- location：用于匹配并处理不同路径的请求

#### 🔸 location 块（路径匹配规则）

location 块用于处理不同路径的访问策略，比如：

- 静态资源托管（root/alias）
- 动态接口代理（proxy_pass）
- 权限控制（auth_basic）
- 重定向与 URL 重写

#### 🔸 upstream 块（后端服务器组）

用于定义多个后端服务节点，并提供负载均衡策略。

> [!NOTE]
> upstream 可在 http 块中定义（推荐，支持多个 server 共用），也可在单个 server 块中定义（仅当前 server 使用）。

**常见负载均衡策略：**

| **策略名称** | **说明** |
|---|---|
| **轮询（默认）** | 请求轮流分配到各个后端服务器 |
| **weight 权重** | 权重越大，被请求的概率越高 |
| **ip_hash** | 每个请求按访问ip的hash结果分配，这样子访客固定访问一个后端服务器，举个例子：A用户固定ip，第一次访问tomcat，那么后面就都是访问到这台机器 |
| **fair**（第三方模块） | 根据后端响应时间动态调度，请求优先给响应更快的服务器 ⚡ |

```bash
upstream myserver {
    # 默认轮询
    server 127.0.0.1:8080;
    server 127.0.0.1:8081;
}

upstream weighted {
    server 127.0.0.1:8080 weight=5;
    server 127.0.0.1:8081 weight=10;
}

upstream session_sticky {
    ip_hash;
    server 127.0.0.1:8080;
    server 127.0.0.1:8081;
}

upstream fast_response {
    # 需要 nginx-upstream-fair 模块支持
    server 127.0.0.1:8080;
    server 127.0.0.1:8081;
    fair;
}
```

## include 指令详解 🧩

在 Nginx 配置文件中，include 是一个非常实用的指令，它允许你**将多个配置文件整合进主配置文件中**，从而实现配置的模块化和高可维护性。

### 基本语法 📘

```bash
include path/to/files;
```

- ✅ path/to/files 可以是一个具体文件名（如 mime.types），也可以使用通配符（如 *.conf）来匹配一组配置文件
- 📁 相对路径是**相对于当前配置文件所在位置**

### 典型使用场景 🧰

1. **📂 多站点配置拆分**
   - 将每个网站或服务的配置拆分为独立 .conf 文件
   - 放入 conf.d/ 或 sites-enabled/ 等目录，主配置统一加载

2. **📦 通用配置复用**
   - 将 MIME 类型、日志格式、缓存参数等通用内容抽离至独立文件
   - 各项目中通过 include 引用，提升一致性和复用性

### 示例 1：引入多个站点配置文件 📎

假设你为多个站点编写了独立配置文件，放在 /etc/nginx/conf.d/ 目录下：

**主配置文件/etc/nginx/nginx.conf**

```bash
http {
    include       mime.types;
    default_type  application/octet-stream;

    # 引入所有子站点配置
    include /etc/nginx/conf.d/*.conf;
}
```

**子站点配置文件 /etc/nginx/conf.d/example.com.conf**

```bash
# /etc/nginx/conf.d/example.com.conf
server {
    # 监听 HTTP 端口
    listen 80;
    
    # 监听 HTTPS 端口
    listen 443 ssl;
    
    # 域名
    server_name example.com www.example.com;
    
    # 根目录
    root /var/www/example.com;
    
    # 索引文件
    index index.html index.htm;
    
    # 访问日志
    access_log /var/log/nginx/example.com.access.log combined;
    
    # 错误日志
    error_log /var/log/nginx/example.com.error.log;
    
     # 🔐SSL 证书配置
    ssl_certificate /etc/nginx/ssl/example.com.crt; # 证书路径
    ssl_certificate_key /etc/nginx/ssl/example.com.key; # 私钥路径

    # SSL 设置
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:10m; # 使用共享内存缓存会话
    ssl_session_tickets off; # 关闭 SSL session tickets

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # 支持的协议版本
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384'; # 加密套件
    ssl_prefer_server_ciphers on;
    
    # ❗错误页配置
    error_page 404 /404.html;
    
    # 📁 静态文件处理
    location /static {
        alias /var/www/example.com/static/;
    }
    
    # 🔁 API 接口代理
    location /api {
        # 所有到达 /api 路径的请求都将被代理到 http://backend，backend 是之前定义的 upstream 块的名称，它指向一组后端服务器
        proxy_pass http://backend;
        
        # 代理设置
        # 设置 Host 头为客户端请求中的 Host 头
        proxy_set_header Host $host;
        # 设置 X-Real-IP 头为客户端的实际 IP 地址
        proxy_set_header X-Real-IP $remote_addr;
        # 设置 X-Forwarded-For 头为客户端的实际 IP 地址及任何先前代理添加的 IP 地址
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        # 设置 X-Forwarded-Proto 头为客户端请求使用的协议（http 或 https）
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # 其他代理设置
        # 关闭代理重定向，防止后端服务器返回的响应中有绝对 URL
        proxy_redirect off;
        # 开启代理缓冲，Nginx 会缓存部分响应体，以优化性能
        proxy_buffering on;
        # 设置建立连接的超时时间为 90 秒
        proxy_connect_timeout 90s;
        # 设置发送响应数据的超时时间为 90 秒。
        proxy_send_timeout 90s;
        # 设置读取后端服务器响应数据的超时时间为 90 秒。
        proxy_read_timeout 90s;
    }
    
    # 🔒 其他位置块
    location /admin {
        auth_basic "Restricted Area";
        auth_basic_user_file /etc/nginx/.htpasswd;
    }
    
    # 🔁 URL重定向
    location /old-url {
        return 301 http://example.com/new-url;
    }
    
    # ⚖️  定义负载均衡的上游服务器组
    upstream backend {
        server server1.example.com:8000;
        server server2.example.com:8000;
        
        # 负载均衡算法
        least_conn;
        
        # 健康检查
        # 这里使用简单的健康检查配置
        # 更复杂的健康检查可以通过第三方模块实现
        server server1.example.com:8000 down;
        server server2.example.com:8000 down;
    }
}
```

### 注意事项 🛡️

| **项目** | **说明** |
|---|---|
| ✅ 支持通配符 | 如 *.conf、*.types 等 |
| ❗ 不支持递归包含 | 被引入文件中不能再次使用 include |
| 📍 相对路径处理 | 相对于当前配置文件的所在路径 |
| 📁 最佳实践 | 所有站点配置集中放置在 conf.d/、sites-available/ 中统一加载 |

### 示例 2：引入通用配置文件 ⚖️

若你有一些通用配置（如 MIME 类型映射、日志格式定义等），可以将它们拆分成独立的文件，然后在主配置文件中使用 include 指令进行引入，实现复用与集中管理。

**主配置文件 /etc/nginx/nginx.conf示例：**

```bash
# /etc/nginx/nginx.conf
http {
    # 引入 MIME 类型定义
    include /etc/nginx/mime.types;

    # 引入站点配置文件
    include /etc/nginx/conf.d/*.conf;
}
```

> [!TIP] 适用场景
> - 统一 MIME 类型映射
> - 公共日志格式、缓存策略配置
> - 全局 gzip、限速、连接设置

### 示例 3：引入动态模块配置文件 🧩

如果你使用的是支持**动态模块**（Dynamic Modules）的 Nginx 版本，可以将相关模块的配置拆分为独立 .conf 文件，并在 http 块中引入。

**配置示例：**

```bash
http {
    # 加载所有模块配置
    include /usr/share/nginx/modules/*.conf;
}
```

常见用法包括：

- 启用 ngx_http_geoip_module、ngx_http_image_filter_module 等模块
- 模块路径通常位于 /usr/share/nginx/modules/

### 使用include的注意事项 🛡️

| **⚠️ 注意点** | **📌 说明** |
|---|---|
| 📁 **相对路径支持** | include 支持相对路径，基于当前配置文件所在目录解析 |
| 🌀 **通配符支持** | 可使用 *.conf、*.types 等通配模式批量加载文件 |
| 🚫 **不支持递归** | 被引入的文件中**不能再包含其他 include 指令**，否则可能导致加载失败或冲突 |

## root 与 alias 在 Nginx 中的区别详解 📂

在 Nginx 的 location 模块中，root 和 alias 都用于指定静态文件的目录路径，但它们在实际路径拼接规则上有明显区别。理解这两者的差异，有助于你在构建路径映射时避免出错。

### root 指令 🌳

root 会将 **请求 URI 中匹配 location 之后的部分**，拼接在定义的 root 路径后，形成最终访问的文件路径。

#### 示例 📌

请求地址：**`http://example.com/foo/bar/hello.html`**

```bash
location /foo/bar/ {
    root /home/hfy/;
}
```

实际路径拼接逻辑：

```bash
实际访问路径 = root + location 后的 URI
             = /home/hfy + /foo/bar/hello.html
             = /home/hfy/foo/bar/hello.html
```

> [!NOTE]
> root 会**保留 location 中的路径部分**。

### alias 指令 📎

alias 会将 **整个 location 路径**直接替换为 alias 指定的路径，**不会拼接 URI 中的匹配路径**。

#### 示例 📌

请求地址：**`http://example.com/foo/bar/hello.html`**

```bash
location /foo/ {
    alias /home/hfy/;
}
```

实际访问路径逻辑：

```bash
实际访问路径 = alias + location 之后的 URI
             = /home/hfy/ + bar/hello.html
             = /home/hfy/bar/hello.html
```

> [!WARNING]
> 如果使用了 alias，**location 后的路径将不会参与拼接**，即 alias 是**完整替代**。

### index 默认行为说明 🧪

在 location 中，Nginx 默认存在如下设置：

```bash
index index.html;
```

示例：

```bash
location /foo {
    root /home/hfy;
    index index.html;
}
```

访问 **`http://example.com/foo/bar/`**，则：

- 会尝试访问路径 **`/home/hfy/foo/bar/index.html`**
- 如果该文件不存在，会返回 403 Forbidden

### 匹配原则提醒：最左匹配（前缀优先） ⚠️

```bash
location /bar {
    root /home/hfy;
}
```

> [!WARNING]
> 请求 **`http://example.com/foo/bar/hello.html` 不会命中上面配置**
> 
> 只有请求以 /bar 开头的 URL，如 **`http://example.com/bar/hello.html`** 才会命中该 location。

### 总结对比 ✅

| **比较项** | root | alias |
|---|---|---|
| 路径拼接方式 | root + URI | alias 直接替代匹配路径 |
| 使用语境 | 常用于保持路径一致性场景 | 常用于路径转换或外部资源映射 |
| 示例结果（匹配 /foo/bar/hello.html） | /root/foo/bar/hello.html | /alias/bar/hello.html |
| 注意事项 | 保留 URI 路径结构 | 完全替换匹配路径 |

> [!TIP] 建议
> - 若你希望 **保持 URI 和目录结构一致**，请使用 root
> - 若你希望 **将某路径重定向到另一个文件夹结构**，请使用 alias

---

> 💡 **总结**：Nginx 是一个功能强大的 Web 服务器和反向代理，掌握其配置方法和原理，能够帮助你构建高性能、高可用的 Web 服务架构。从基础配置到高级特性，都需要结合实际场景灵活运用。