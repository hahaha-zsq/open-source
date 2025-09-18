# 📊 TDengine 时序数据库 <Badge type="tip" text="时序数据库" />

## 🌟 概述 <Badge type="warning" text="核心技能" />

TDengine 是一款专为物联网、车联网、工业互联网、金融、IT运维等场景设计的高性能时序数据库。它具有高性能、高可靠、易管理、易维护等特点，是处理时序数据的理想选择。

::: tip 什么是时序数据？
时序数据是按时间顺序排列的数据点序列，通常用于记录某个指标随时间变化的情况，如温度、压力、股价、CPU使用率等。
:::

## 🚀 核心特性 <Badge type="info" text="特性" />

### ⚡ 高性能
- **写入性能**：单核每秒可处理超过2万个数据点
- **查询性能**：比传统数据库快10-100倍
- **压缩比**：数据压缩比可达1/10

### 🔧 易用性
- **SQL兼容**：支持标准SQL语法，学习成本低
- **零管理**：自动分片、自动负载均衡
- **多语言支持**：支持C/C++、Java、Python、Go、Node.js等

### 🛡️ 高可靠
- **集群支持**：支持多副本、自动故障转移
- **数据安全**：支持数据加密、访问控制
- **备份恢复**：支持热备份和增量备份

## 📚 SQL语法详解 <Badge type="warning" text="核心技能" />

### 🏗️ 数据库和表操作

#### 创建数据库
```sql
-- 创建数据库
CREATE DATABASE power;

-- 使用数据库
USE power;

-- 创建数据库时指定参数
CREATE DATABASE power 
KEEP 365 
DAYS 10 
CACHE 16 
BLOCKS 6 
PRECISION 'ms';
```

#### 创建超级表（Super Table）
```sql
-- 创建超级表
CREATE STABLE meters (
    ts TIMESTAMP,           -- 时间戳（主键）
    current FLOAT,          -- 电流
    voltage INT,            -- 电压
    phase FLOAT             -- 相位
) TAGS (
    location BINARY(64),    -- 位置标签
    groupId INT             -- 组ID标签
);
```

#### 创建子表
```sql
-- 基于超级表创建子表
CREATE TABLE d1001 USING meters TAGS ('California.SanFrancisco', 2);
CREATE TABLE d1002 USING meters TAGS ('California.LosAngeles', 2);
```

### 📝 数据插入

#### 单条插入
```sql
-- 插入单条数据
INSERT INTO d1001 VALUES (NOW, 10.3, 219, 0.31);

-- 指定时间戳插入
INSERT INTO d1001 VALUES ('2023-07-01 00:00:00.000', 10.2, 220, 0.23);
```

#### 批量插入
```sql
-- 批量插入多条数据
INSERT INTO d1001 VALUES 
    ('2023-07-01 00:00:00.000', 10.2, 220, 0.23)
    ('2023-07-01 00:01:00.000', 10.3, 218, 0.25)
    ('2023-07-01 00:02:00.000', 10.1, 221, 0.28);

-- 多表批量插入
INSERT INTO 
    d1001 VALUES ('2023-07-01 00:00:00.000', 10.2, 220, 0.23)
    d1002 VALUES ('2023-07-01 00:00:00.000', 9.5, 215, 0.33);
```

### 🔍 数据查询

#### 基本查询
```sql
-- 查询所有数据
SELECT * FROM d1001;

-- 条件查询
SELECT * FROM d1001 WHERE ts >= '2023-07-01 00:00:00' AND ts < '2023-07-02 00:00:00';

-- 聚合查询
SELECT AVG(current), MAX(voltage), MIN(phase) FROM d1001 
WHERE ts >= '2023-07-01 00:00:00' AND ts < '2023-07-02 00:00:00';
```

#### 时间窗口查询
```sql
-- 按小时聚合
SELECT _wstart, AVG(current), MAX(voltage) FROM d1001 
WHERE ts >= '2023-07-01 00:00:00' AND ts < '2023-07-02 00:00:00'
INTERVAL(1h);

-- 滑动窗口查询
SELECT _wstart, AVG(current) FROM d1001 
WHERE ts >= '2023-07-01 00:00:00' AND ts < '2023-07-02 00:00:00'
INTERVAL(1h) SLIDING(30m);
```

#### 超级表查询
```sql
-- 查询所有子表数据
SELECT * FROM meters WHERE ts >= '2023-07-01 00:00:00';

-- 按标签分组查询
SELECT location, AVG(current) FROM meters 
WHERE ts >= '2023-07-01 00:00:00' 
GROUP BY location;

-- 标签过滤查询
SELECT * FROM meters WHERE location = 'California.SanFrancisco';
```

### 📊 高级查询功能

#### 时序函数
```sql
-- 差值函数
SELECT DIFF(current) FROM d1001;

-- 移动平均
SELECT MAVG(current, 5) FROM d1001;

-- 时间加权平均
SELECT TWA(current) FROM d1001 WHERE ts >= '2023-07-01 00:00:00' INTERVAL(1h);

-- 采样函数
SELECT SAMPLE(current, 10) FROM d1001;
```

#### 数学函数
```sql
-- 数学运算
SELECT current * voltage AS power FROM d1001;

-- 数学函数
SELECT ABS(current), SQRT(voltage), SIN(phase) FROM d1001;

-- 条件函数
SELECT current, 
       CASE WHEN current > 10 THEN 'High' 
            WHEN current > 5 THEN 'Medium' 
            ELSE 'Low' END AS level 
FROM d1001;
```

## 🔗 SpringBoot 集成 <Badge type="warning" text="核心技能" />

### 📦 依赖配置

#### Maven依赖
```xml
<dependencies>
    <!-- TDengine JDBC驱动 -->
    <dependency>
        <groupId>com.taosdata.jdbc</groupId>
        <artifactId>taos-jdbcdriver</artifactId>
        <version>3.2.4</version>
    </dependency>
    
    <!-- Spring Boot Starter -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-jdbc</artifactId>
    </dependency>
    
    <!-- MyBatis Plus (可选) -->
    <dependency>
        <groupId>com.baomidou</groupId>
        <artifactId>mybatis-plus-boot-starter</artifactId>
        <version>3.5.3</version>
    </dependency>
</dependencies>
```

#### Gradle依赖
```gradle
dependencies {
    implementation 'com.taosdata.jdbc:taos-jdbcdriver:3.2.4'
    implementation 'org.springframework.boot:spring-boot-starter-jdbc'
    implementation 'com.baomidou:mybatis-plus-boot-starter:3.5.3'
}
```

### ⚙️ 配置文件

#### application.yml
```yaml
spring:
  datasource:
    driver-class-name: com.taosdata.jdbc.TSDBDriver
    url: jdbc:TAOS://localhost:6030/power?timezone=UTC-8&charset=UTF-8&locale=en_US.UTF-8
    username: root
    password: taosdata
    
# TDengine连接池配置
  hikari:
    maximum-pool-size: 10
    minimum-idle: 5
    connection-timeout: 30000
    idle-timeout: 600000
    max-lifetime: 1800000

# MyBatis Plus配置
mybatis-plus:
  configuration:
    map-underscore-to-camel-case: true
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```

#### application.properties
```properties
# TDengine数据源配置
spring.datasource.driver-class-name=com.taosdata.jdbc.TSDBDriver
spring.datasource.url=jdbc:TAOS://localhost:6030/power?timezone=UTC-8&charset=UTF-8&locale=en_US.UTF-8
spring.datasource.username=root
spring.datasource.password=taosdata

# 连接池配置
spring.datasource.hikari.maximum-pool-size=10
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000
```

### 🏗️ 数据库配置类

```java
@Configuration
@EnableTransactionManagement
public class TDengineConfig {
    
    @Bean
    @Primary
    @ConfigurationProperties("spring.datasource")
    public DataSource dataSource() {
        return DataSourceBuilder.create().build();
    }
    
    @Bean
    public JdbcTemplate jdbcTemplate(@Qualifier("dataSource") DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
    
    @Bean
    public PlatformTransactionManager transactionManager(@Qualifier("dataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }
}
```

### 📊 实体类定义

```java
@Data
@TableName("meters")
public class MeterData {
    
    @TableField("ts")
    private LocalDateTime timestamp;
    
    @TableField("current")
    private Float current;
    
    @TableField("voltage")
    private Integer voltage;
    
    @TableField("phase")
    private Float phase;
    
    // 标签字段
    @TableField("location")
    private String location;
    
    @TableField("groupId")
    private Integer groupId;
}

@Data
public class MeterStatistics {
    private LocalDateTime windowStart;
    private Double avgCurrent;
    private Integer maxVoltage;
    private Integer minVoltage;
    private String location;
}
```

### 🔧 数据访问层

#### Repository接口
```java
@Repository
public interface MeterDataRepository {
    
    /**
     * 插入单条数据
     */
    void insertMeterData(MeterData meterData);
    
    /**
     * 批量插入数据
     */
    void batchInsertMeterData(List<MeterData> meterDataList);
    
    /**
     * 查询指定时间范围的数据
     */
    List<MeterData> findByTimeRange(LocalDateTime startTime, LocalDateTime endTime);
    
    /**
     * 查询聚合统计数据
     */
    List<MeterStatistics> getStatisticsByLocation(LocalDateTime startTime, LocalDateTime endTime);
    
    /**
     * 查询最新数据
     */
    List<MeterData> findLatestData(int limit);
}
```

#### Repository实现
```java
@Repository
public class MeterDataRepositoryImpl implements MeterDataRepository {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @Override
    public void insertMeterData(MeterData meterData) {
        String sql = "INSERT INTO ? VALUES (?, ?, ?, ?)";
        String tableName = generateTableName(meterData.getLocation(), meterData.getGroupId());
        
        jdbcTemplate.update(
            "INSERT INTO " + tableName + " VALUES (?, ?, ?, ?)",
            meterData.getTimestamp(),
            meterData.getCurrent(),
            meterData.getVoltage(),
            meterData.getPhase()
        );
    }
    
    @Override
    public void batchInsertMeterData(List<MeterData> meterDataList) {
        String sql = "INSERT INTO ? VALUES (?, ?, ?, ?)";
        
        // 按表名分组批量插入
        Map<String, List<MeterData>> groupedData = meterDataList.stream()
            .collect(Collectors.groupingBy(data -> 
                generateTableName(data.getLocation(), data.getGroupId())));
        
        groupedData.forEach((tableName, dataList) -> {
            List<Object[]> batchArgs = dataList.stream()
                .map(data -> new Object[]{
                    data.getTimestamp(),
                    data.getCurrent(),
                    data.getVoltage(),
                    data.getPhase()
                })
                .collect(Collectors.toList());
            
            jdbcTemplate.batchUpdate(
                "INSERT INTO " + tableName + " VALUES (?, ?, ?, ?)",
                batchArgs
            );
        });
    }
    
    @Override
    public List<MeterData> findByTimeRange(LocalDateTime startTime, LocalDateTime endTime) {
        String sql = """
            SELECT ts, current, voltage, phase, location, groupId 
            FROM meters 
            WHERE ts >= ? AND ts < ? 
            ORDER BY ts
            """;
        
        return jdbcTemplate.query(sql, 
            (rs, rowNum) -> {
                MeterData data = new MeterData();
                data.setTimestamp(rs.getTimestamp("ts").toLocalDateTime());
                data.setCurrent(rs.getFloat("current"));
                data.setVoltage(rs.getInt("voltage"));
                data.setPhase(rs.getFloat("phase"));
                data.setLocation(rs.getString("location"));
                data.setGroupId(rs.getInt("groupId"));
                return data;
            },
            startTime, endTime
        );
    }
    
    @Override
    public List<MeterStatistics> getStatisticsByLocation(LocalDateTime startTime, LocalDateTime endTime) {
        String sql = """
            SELECT _wstart as window_start, 
                   location,
                   AVG(current) as avg_current,
                   MAX(voltage) as max_voltage,
                   MIN(voltage) as min_voltage
            FROM meters 
            WHERE ts >= ? AND ts < ?
            INTERVAL(1h)
            GROUP BY location
            ORDER BY window_start, location
            """;
        
        return jdbcTemplate.query(sql,
            (rs, rowNum) -> {
                MeterStatistics stats = new MeterStatistics();
                stats.setWindowStart(rs.getTimestamp("window_start").toLocalDateTime());
                stats.setLocation(rs.getString("location"));
                stats.setAvgCurrent(rs.getDouble("avg_current"));
                stats.setMaxVoltage(rs.getInt("max_voltage"));
                stats.setMinVoltage(rs.getInt("min_voltage"));
                return stats;
            },
            startTime, endTime
        );
    }
    
    @Override
    public List<MeterData> findLatestData(int limit) {
        String sql = """
            SELECT LAST_ROW(ts, current, voltage, phase), location, groupId 
            FROM meters 
            GROUP BY location, groupId 
            LIMIT ?
            """;
        
        return jdbcTemplate.query(sql,
            (rs, rowNum) -> {
                MeterData data = new MeterData();
                data.setTimestamp(rs.getTimestamp("ts").toLocalDateTime());
                data.setCurrent(rs.getFloat("current"));
                data.setVoltage(rs.getInt("voltage"));
                data.setPhase(rs.getFloat("phase"));
                data.setLocation(rs.getString("location"));
                data.setGroupId(rs.getInt("groupId"));
                return data;
            },
            limit
        );
    }
    
    private String generateTableName(String location, Integer groupId) {
        // 根据位置和组ID生成表名
        return "meter_" + location.replaceAll("[^a-zA-Z0-9]", "_") + "_" + groupId;
    }
}
```

### 🎯 服务层

```java
@Service
@Transactional
public class MeterDataService {
    
    @Autowired
    private MeterDataRepository meterDataRepository;
    
    /**
     * 保存电表数据
     */
    public void saveMeterData(MeterData meterData) {
        // 设置当前时间戳
        if (meterData.getTimestamp() == null) {
            meterData.setTimestamp(LocalDateTime.now());
        }
        
        meterDataRepository.insertMeterData(meterData);
    }
    
    /**
     * 批量保存电表数据
     */
    public void batchSaveMeterData(List<MeterData> meterDataList) {
        if (meterDataList == null || meterDataList.isEmpty()) {
            return;
        }
        
        // 设置时间戳
        meterDataList.forEach(data -> {
            if (data.getTimestamp() == null) {
                data.setTimestamp(LocalDateTime.now());
            }
        });
        
        meterDataRepository.batchInsertMeterData(meterDataList);
    }
    
    /**
     * 查询指定时间范围的数据
     */
    public List<MeterData> getMeterDataByTimeRange(LocalDateTime startTime, LocalDateTime endTime) {
        return meterDataRepository.findByTimeRange(startTime, endTime);
    }
    
    /**
     * 获取统计数据
     */
    public List<MeterStatistics> getMeterStatistics(LocalDateTime startTime, LocalDateTime endTime) {
        return meterDataRepository.getStatisticsByLocation(startTime, endTime);
    }
    
    /**
     * 获取最新数据
     */
    public List<MeterData> getLatestMeterData(int limit) {
        return meterDataRepository.findLatestData(limit);
    }
    
    /**
     * 获取实时数据流
     */
    @Async
    public CompletableFuture<List<MeterData>> getRealTimeData(String location) {
        // 模拟实时数据获取
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime oneMinuteAgo = now.minusMinutes(1);
        
        List<MeterData> realtimeData = meterDataRepository.findByTimeRange(oneMinuteAgo, now)
            .stream()
            .filter(data -> location.equals(data.getLocation()))
            .collect(Collectors.toList());
        
        return CompletableFuture.completedFuture(realtimeData);
    }
}
```

### 🌐 控制器层

```java
@RestController
@RequestMapping("/api/meter")
@Validated
public class MeterDataController {
    
    @Autowired
    private MeterDataService meterDataService;
    
    /**
     * 添加电表数据
     */
    @PostMapping("/data")
    public ResponseEntity<String> addMeterData(@RequestBody @Valid MeterData meterData) {
        try {
            meterDataService.saveMeterData(meterData);
            return ResponseEntity.ok("数据保存成功");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("数据保存失败: " + e.getMessage());
        }
    }
    
    /**
     * 批量添加电表数据
     */
    @PostMapping("/data/batch")
    public ResponseEntity<String> batchAddMeterData(@RequestBody @Valid List<MeterData> meterDataList) {
        try {
            meterDataService.batchSaveMeterData(meterDataList);
            return ResponseEntity.ok("批量数据保存成功，共 " + meterDataList.size() + " 条");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("批量数据保存失败: " + e.getMessage());
        }
    }
    
    /**
     * 查询指定时间范围的数据
     */
    @GetMapping("/data")
    public ResponseEntity<List<MeterData>> getMeterData(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime) {
        
        List<MeterData> data = meterDataService.getMeterDataByTimeRange(startTime, endTime);
        return ResponseEntity.ok(data);
    }
    
    /**
     * 获取统计数据
     */
    @GetMapping("/statistics")
    public ResponseEntity<List<MeterStatistics>> getStatistics(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startTime,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endTime) {
        
        List<MeterStatistics> statistics = meterDataService.getMeterStatistics(startTime, endTime);
        return ResponseEntity.ok(statistics);
    }
    
    /**
     * 获取最新数据
     */
    @GetMapping("/latest")
    public ResponseEntity<List<MeterData>> getLatestData(@RequestParam(defaultValue = "10") int limit) {
        List<MeterData> latestData = meterDataService.getLatestMeterData(limit);
        return ResponseEntity.ok(latestData);
    }
    
    /**
     * 获取实时数据
     */
    @GetMapping("/realtime/{location}")
    public ResponseEntity<List<MeterData>> getRealTimeData(@PathVariable String location) {
        try {
            CompletableFuture<List<MeterData>> future = meterDataService.getRealTimeData(location);
            List<MeterData> realtimeData = future.get(5, TimeUnit.SECONDS);
            return ResponseEntity.ok(realtimeData);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
```

## 🛠️ 最佳实践 <Badge type="tip" text="最佳实践" />

### 📋 表设计原则

::: warning 重要提示
合理的表设计是TDengine高性能的关键！
:::

1. **超级表设计**
   - 将相同类型的设备数据定义为一个超级表
   - 合理选择标签，标签数量不宜过多（建议不超过128个）
   - 标签值的基数不宜过大

2. **子表命名**
   - 使用有意义的表名，便于管理和查询
   - 避免使用特殊字符和关键字

3. **时间戳设计**
   - 时间戳必须是递增的
   - 建议使用毫秒精度

### ⚡ 性能优化

#### 写入优化
```java
@Component
public class TDengineOptimizer {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    /**
     * 批量写入优化
     */
    public void optimizedBatchInsert(List<MeterData> dataList) {
        // 1. 按表分组
        Map<String, List<MeterData>> groupedData = dataList.stream()
            .collect(Collectors.groupingBy(this::getTableName));
        
        // 2. 并行写入
        groupedData.entrySet().parallelStream().forEach(entry -> {
            String tableName = entry.getKey();
            List<MeterData> tableData = entry.getValue();
            
            // 3. 构建批量插入SQL
            StringBuilder sql = new StringBuilder("INSERT INTO ");
            sql.append(tableName).append(" VALUES ");
            
            List<Object> params = new ArrayList<>();
            for (int i = 0; i < tableData.size(); i++) {
                if (i > 0) sql.append(",");
                sql.append("(?,?,?,?)");
                
                MeterData data = tableData.get(i);
                params.add(data.getTimestamp());
                params.add(data.getCurrent());
                params.add(data.getVoltage());
                params.add(data.getPhase());
            }
            
            jdbcTemplate.update(sql.toString(), params.toArray());
        });
    }
    
    private String getTableName(MeterData data) {
        return "meter_" + data.getLocation().replaceAll("[^a-zA-Z0-9]", "_") + "_" + data.getGroupId();
    }
}
```

#### 查询优化
```java
/**
 * 查询优化示例
 */
@Service
public class QueryOptimizationService {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    /**
     * 使用时间分区查询
     */
    public List<MeterData> optimizedTimeRangeQuery(LocalDateTime startTime, LocalDateTime endTime, String location) {
        // 使用标签过滤 + 时间范围查询
        String sql = """
            SELECT ts, current, voltage, phase 
            FROM meters 
            WHERE location = ? 
            AND ts >= ? AND ts < ?
            ORDER BY ts
            """;
        
        return jdbcTemplate.query(sql, 
            (rs, rowNum) -> {
                MeterData data = new MeterData();
                data.setTimestamp(rs.getTimestamp("ts").toLocalDateTime());
                data.setCurrent(rs.getFloat("current"));
                data.setVoltage(rs.getInt("voltage"));
                data.setPhase(rs.getFloat("phase"));
                return data;
            },
            location, startTime, endTime
        );
    }
    
    /**
     * 聚合查询优化
     */
    public List<MeterStatistics> optimizedAggregationQuery(LocalDateTime startTime, LocalDateTime endTime) {
        // 使用预聚合和时间窗口
        String sql = """
            SELECT _wstart, location,
                   AVG(current) as avg_current,
                   MAX(voltage) as max_voltage,
                   MIN(voltage) as min_voltage,
                   COUNT(*) as data_count
            FROM meters 
            WHERE ts >= ? AND ts < ?
            INTERVAL(1h) SLIDING(30m)
            GROUP BY location
            ORDER BY _wstart, location
            """;
        
        return jdbcTemplate.query(sql,
            (rs, rowNum) -> {
                MeterStatistics stats = new MeterStatistics();
                stats.setWindowStart(rs.getTimestamp("_wstart").toLocalDateTime());
                stats.setLocation(rs.getString("location"));
                stats.setAvgCurrent(rs.getDouble("avg_current"));
                stats.setMaxVoltage(rs.getInt("max_voltage"));
                stats.setMinVoltage(rs.getInt("min_voltage"));
                return stats;
            },
            startTime, endTime
        );
    }
}
```

### 🔧 连接池配置

```yaml
spring:
  datasource:
    hikari:
      # 连接池配置
      maximum-pool-size: 20          # 最大连接数
      minimum-idle: 5                # 最小空闲连接数
      connection-timeout: 30000      # 连接超时时间(ms)
      idle-timeout: 600000           # 空闲超时时间(ms)
      max-lifetime: 1800000          # 连接最大生存时间(ms)
      leak-detection-threshold: 60000 # 连接泄漏检测阈值(ms)
      
      # TDengine特定配置
      connection-init-sql: "SET time_zone = '+08:00'"
      
      # 连接池监控
      register-mbeans: true
```

## 🎯 实际应用场景 <Badge type="info" text="应用场景" />

### 🏭 工业物联网监控

```java
@Component
public class IndustrialMonitoringService {
    
    @Autowired
    private MeterDataService meterDataService;
    
    /**
     * 设备状态监控
     */
    @Scheduled(fixedRate = 5000) // 每5秒执行一次
    public void monitorDeviceStatus() {
        // 获取最新数据
        List<MeterData> latestData = meterDataService.getLatestMeterData(100);
        
        // 检查异常设备
        List<MeterData> abnormalDevices = latestData.stream()
            .filter(data -> data.getCurrent() > 15.0 || data.getVoltage() > 250)
            .collect(Collectors.toList());
        
        if (!abnormalDevices.isEmpty()) {
            // 发送告警
            sendAlert(abnormalDevices);
        }
    }
    
    private void sendAlert(List<MeterData> abnormalDevices) {
        // 实现告警逻辑
        log.warn("发现异常设备: {}", abnormalDevices.size());
    }
}
```

### 📊 实时数据大屏

```java
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    
    @Autowired
    private MeterDataService meterDataService;
    
    /**
     * 获取实时监控数据
     */
    @GetMapping("/realtime")
    public ResponseEntity<Map<String, Object>> getRealtimeData() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime oneHourAgo = now.minusHours(1);
        
        // 获取统计数据
        List<MeterStatistics> statistics = meterDataService.getMeterStatistics(oneHourAgo, now);
        
        // 获取最新数据
        List<MeterData> latestData = meterDataService.getLatestMeterData(50);
        
        Map<String, Object> result = new HashMap<>();
        result.put("statistics", statistics);
        result.put("latestData", latestData);
        result.put("timestamp", now);
        
        return ResponseEntity.ok(result);
    }
}
```

## 🚨 常见问题与解决方案 <Badge type="danger" text="故障排除" />

### ❌ 连接问题

::: danger 连接失败
如果遇到连接失败，请检查以下几点：
:::

1. **检查TDengine服务状态**
```bash
# 检查服务状态
sudo systemctl status taosd

# 启动服务
sudo systemctl start taosd
```

2. **检查防火墙设置**
```bash
# 开放6030端口
sudo firewall-cmd --permanent --add-port=6030/tcp
sudo firewall-cmd --reload
```

3. **检查配置文件**
```bash
# 查看配置文件
cat /etc/taos/taos.cfg
```

### ⚠️ 性能问题

::: warning 性能优化建议
:::

1. **批量插入代替单条插入**
2. **合理设计标签，避免高基数标签**
3. **使用时间分区查询**
4. **避免SELECT * 查询**

### 🔧 数据类型问题

```java
// 正确的数据类型映射
@Component
public class DataTypeHandler {
    
    public void handleDataTypes() {
        // TDengine数据类型对应关系
        // TIMESTAMP -> java.sql.Timestamp / LocalDateTime
        // INT -> Integer
        // BIGINT -> Long
        // FLOAT -> Float
        // DOUBLE -> Double
        // BINARY -> String
        // NCHAR -> String
        // BOOL -> Boolean
    }
}
```

## 📚 参考资源 <Badge type="info" text="学习资源" />

### 📖 官方文档
- [TDengine官方文档](https://docs.taosdata.com/)
- [TDengine Java连接器](https://docs.taosdata.com/connector/java/)
- [TDengine SQL参考手册](https://docs.taosdata.com/taos-sql/)

### 🛠️ 开发工具
- [TDengine Studio](https://www.taosdata.com/tools) - 图形化管理工具
- [Grafana插件](https://grafana.com/grafana/plugins/tdengine-datasource/) - 数据可视化

### 📊 监控工具
- [TDinsight](https://docs.taosdata.com/operation/monitor/) - TDengine监控解决方案

::: tip 💡 小贴士
TDengine是专为时序数据设计的数据库，在物联网、工业监控、金融等领域有着广泛的应用。合理使用其特性可以大大提升系统性能！
:::