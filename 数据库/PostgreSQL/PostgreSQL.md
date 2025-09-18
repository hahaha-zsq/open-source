# 🐘 PostgreSQL 关系型数据库 <Badge type="tip" text="关系型数据库" />

## 🌟 概述 <Badge type="warning" text="核心技能" />

PostgreSQL 是一个功能强大的开源对象关系数据库系统，拥有超过35年的积极开发历史，在可靠性、功能稳健性和性能方面享有良好声誉。它被广泛认为是最先进的开源关系数据库，支持SQL标准的大部分功能，并提供了许多现代特性。

::: tip 什么是PostgreSQL？
PostgreSQL 是一个对象关系数据库管理系统（ORDBMS），它不仅支持传统的关系数据库功能，还支持面向对象的特性，如表继承和函数重载。
:::

## 🚀 核心特性 <Badge type="info" text="特性" />

### ⚡ 高性能
- **MVCC**：多版本并发控制，支持高并发读写
- **索引优化**：支持B-tree、Hash、GiST、SP-GiST、GIN和BRIN索引
- **查询优化器**：基于成本的查询优化器，智能选择执行计划
- **并行查询**：支持并行查询执行，提升大数据处理性能

### 🔧 丰富功能
- **数据类型**：支持丰富的内置数据类型和自定义类型
- **JSON支持**：原生支持JSON和JSONB数据类型
- **全文搜索**：内置全文搜索功能
- **地理信息**：通过PostGIS扩展支持地理信息系统

### 🛡️ 高可靠性
- **ACID兼容**：完全支持ACID事务特性
- **数据完整性**：支持主键、外键、唯一约束、检查约束
- **备份恢复**：支持热备份、增量备份和时间点恢复
- **高可用**：支持流复制、逻辑复制和故障转移

### 🌐 扩展性
- **插件系统**：丰富的扩展插件生态
- **自定义函数**：支持多种编程语言编写存储过程
- **分区表**：支持表分区，提升大表查询性能
- **外部数据包装器**：可以访问外部数据源

## 📚 SQL语法详解 <Badge type="warning" text="核心技能" />

### 🏗️ 数据库和表操作

#### 创建数据库
```sql
-- 创建数据库
CREATE DATABASE company_db
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- 连接到数据库
\c company_db;
```

#### 创建表
```sql
-- 创建员工表
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    department_id INTEGER,
    salary DECIMAL(10,2),
    hire_date DATE DEFAULT CURRENT_DATE,
    is_active BOOLEAN DEFAULT true,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建部门表
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    manager_id INTEGER,
    budget DECIMAL(15,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 添加外键约束
ALTER TABLE employees 
ADD CONSTRAINT fk_employee_department 
FOREIGN KEY (department_id) REFERENCES departments(id);

ALTER TABLE departments 
ADD CONSTRAINT fk_department_manager 
FOREIGN KEY (manager_id) REFERENCES employees(id);
```

#### 创建索引
```sql
-- 创建普通索引
CREATE INDEX idx_employees_email ON employees(email);
CREATE INDEX idx_employees_department ON employees(department_id);

-- 创建复合索引
CREATE INDEX idx_employees_dept_salary ON employees(department_id, salary);

-- 创建部分索引
CREATE INDEX idx_active_employees ON employees(name) WHERE is_active = true;

-- 创建表达式索引
CREATE INDEX idx_employees_lower_name ON employees(LOWER(name));

-- 创建JSONB索引
CREATE INDEX idx_employees_metadata ON employees USING GIN(metadata);
```

### 📝 数据操作

#### 插入数据
```sql
-- 插入单条数据
INSERT INTO departments (name, description, budget) 
VALUES ('Engineering', 'Software Development Team', 1000000.00);

INSERT INTO employees (name, email, department_id, salary, metadata) 
VALUES (
    'John Doe', 
    'john.doe@company.com', 
    1, 
    75000.00,
    '{"skills": ["Java", "Spring", "PostgreSQL"], "level": "Senior"}'::jsonb
);

-- 批量插入
INSERT INTO employees (name, email, department_id, salary, metadata) VALUES
    ('Jane Smith', 'jane.smith@company.com', 1, 80000.00, '{"skills": ["Python", "Django"], "level": "Senior"}'::jsonb),
    ('Bob Johnson', 'bob.johnson@company.com', 1, 65000.00, '{"skills": ["JavaScript", "React"], "level": "Mid"}'::jsonb),
    ('Alice Brown', 'alice.brown@company.com', 1, 90000.00, '{"skills": ["Java", "Microservices"], "level": "Lead"}'::jsonb);

-- 使用RETURNING子句
INSERT INTO departments (name, description, budget) 
VALUES ('Marketing', 'Marketing and Sales Team', 500000.00)
RETURNING id, name, created_at;
```

#### 查询数据
```sql
-- 基本查询
SELECT * FROM employees WHERE is_active = true;

-- 连接查询
SELECT 
    e.name AS employee_name,
    e.email,
    e.salary,
    d.name AS department_name
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE e.salary > 70000;

-- 聚合查询
SELECT 
    d.name AS department,
    COUNT(*) AS employee_count,
    AVG(e.salary) AS avg_salary,
    MAX(e.salary) AS max_salary,
    MIN(e.salary) AS min_salary
FROM employees e
JOIN departments d ON e.department_id = d.id
GROUP BY d.id, d.name
HAVING COUNT(*) > 1
ORDER BY avg_salary DESC;

-- 窗口函数
SELECT 
    name,
    department_id,
    salary,
    ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) as rank_in_dept,
    LAG(salary) OVER (PARTITION BY department_id ORDER BY salary) as prev_salary,
    salary - LAG(salary) OVER (PARTITION BY department_id ORDER BY salary) as salary_diff
FROM employees;
```

#### JSON查询
```sql
-- JSON字段查询
SELECT name, metadata->'skills' as skills 
FROM employees 
WHERE metadata->>'level' = 'Senior';

-- JSONB操作符
SELECT name, metadata 
FROM employees 
WHERE metadata @> '{"level": "Senior"}';

SELECT name, metadata 
FROM employees 
WHERE metadata ? 'skills' 
AND metadata->'skills' @> '["Java"]';

-- JSON聚合
SELECT 
    department_id,
    json_agg(json_build_object(
        'name', name,
        'salary', salary,
        'skills', metadata->'skills'
    )) as employees
FROM employees 
GROUP BY department_id;
```

### 🔍 高级查询功能

#### 公用表表达式 (CTE)
```sql
-- 递归CTE - 组织结构查询
WITH RECURSIVE org_chart AS (
    -- 基础查询：顶级管理者
    SELECT id, name, manager_id, 1 as level, name as path
    FROM employees 
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- 递归查询：下级员工
    SELECT e.id, e.name, e.manager_id, oc.level + 1, oc.path || ' -> ' || e.name
    FROM employees e
    JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT * FROM org_chart ORDER BY level, name;

-- 非递归CTE
WITH high_earners AS (
    SELECT * FROM employees WHERE salary > 80000
),
dept_stats AS (
    SELECT 
        department_id,
        COUNT(*) as high_earner_count,
        AVG(salary) as avg_high_salary
    FROM high_earners
    GROUP BY department_id
)
SELECT 
    d.name,
    ds.high_earner_count,
    ds.avg_high_salary
FROM dept_stats ds
JOIN departments d ON ds.department_id = d.id;
```

#### 数组操作
```sql
-- 创建包含数组的表
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    tags TEXT[],
    team_members INTEGER[],
    created_at TIMESTAMP DEFAULT NOW()
);

-- 插入数组数据
INSERT INTO projects (name, tags, team_members) VALUES
    ('Web App', ARRAY['web', 'frontend', 'react'], ARRAY[1, 2, 3]),
    ('API Service', ARRAY['backend', 'api', 'java'], ARRAY[1, 4, 5]),
    ('Mobile App', ARRAY['mobile', 'ios', 'android'], ARRAY[2, 3, 6]);

-- 数组查询
SELECT * FROM projects WHERE 'web' = ANY(tags);
SELECT * FROM projects WHERE tags @> ARRAY['backend'];
SELECT * FROM projects WHERE array_length(team_members, 1) > 2;

-- 数组聚合
SELECT 
    unnest(tags) as tag,
    COUNT(*) as project_count
FROM projects 
GROUP BY tag 
ORDER BY project_count DESC;
```

#### 全文搜索
```sql
-- 创建全文搜索索引
ALTER TABLE employees ADD COLUMN search_vector tsvector;

UPDATE employees 
SET search_vector = to_tsvector('english', name || ' ' || email);

CREATE INDEX idx_employees_search ON employees USING GIN(search_vector);

-- 全文搜索查询
SELECT name, email, ts_rank(search_vector, query) as rank
FROM employees, to_tsquery('english', 'john & doe') query
WHERE search_vector @@ query
ORDER BY rank DESC;

-- 高亮搜索结果
SELECT 
    name,
    ts_headline('english', name, to_tsquery('english', 'john')) as highlighted_name
FROM employees 
WHERE search_vector @@ to_tsquery('english', 'john');
```

## 🔗 SpringBoot 集成 <Badge type="warning" text="核心技能" />

### 📦 依赖配置

#### Maven依赖
```xml
<dependencies>
    <!-- PostgreSQL JDBC驱动 -->
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <scope>runtime</scope>
    </dependency>
    
    <!-- Spring Boot JPA Starter -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <!-- Spring Boot Web Starter -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- Spring Boot Validation -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    
    <!-- Flyway数据库迁移 -->
    <dependency>
        <groupId>org.flywaydb</groupId>
        <artifactId>flyway-core</artifactId>
    </dependency>
    
    <!-- HikariCP连接池 -->
    <dependency>
        <groupId>com.zaxxer</groupId>
        <artifactId>HikariCP</artifactId>
    </dependency>
</dependencies>
```

#### Gradle依赖
```gradle
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    implementation 'org.flywaydb:flyway-core'
    runtimeOnly 'org.postgresql:postgresql'
    implementation 'com.zaxxer:HikariCP'
}
```

### ⚙️ 配置文件

#### application.yml
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/company_db
    username: postgres
    password: password
    driver-class-name: org.postgresql.Driver
    
    # HikariCP连接池配置
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000
      leak-detection-threshold: 60000
      
  # JPA配置
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
        format_sql: true
        use_sql_comments: true
        # 启用批量操作
        jdbc:
          batch_size: 20
        order_inserts: true
        order_updates: true
        
  # Flyway配置
  flyway:
    enabled: true
    locations: classpath:db/migration
    baseline-on-migrate: true
    validate-on-migrate: true

# 日志配置
logging:
  level:
    org.hibernate.SQL: DEBUG
    org.hibernate.type.descriptor.sql.BasicBinder: TRACE
    org.springframework.jdbc.core: DEBUG
```

#### application.properties
```properties
# PostgreSQL数据源配置
spring.datasource.url=jdbc:postgresql://localhost:5432/company_db
spring.datasource.username=postgres
spring.datasource.password=password
spring.datasource.driver-class-name=org.postgresql.Driver

# HikariCP连接池配置
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5
spring.datasource.hikari.connection-timeout=30000
spring.datasource.hikari.idle-timeout=600000
spring.datasource.hikari.max-lifetime=1800000

# JPA配置
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true

# Flyway配置
spring.flyway.enabled=true
spring.flyway.locations=classpath:db/migration
```

### 🏗️ 实体类定义

```java
@Entity
@Table(name = "employees")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    @NotBlank(message = "姓名不能为空")
    private String name;
    
    @Column(nullable = false, unique = true, length = 150)
    @Email(message = "邮箱格式不正确")
    @NotBlank(message = "邮箱不能为空")
    private String email;
    
    @Column(name = "department_id")
    private Long departmentId;
    
    @Column(precision = 10, scale = 2)
    @DecimalMin(value = "0.0", message = "薪资不能为负数")
    private BigDecimal salary;
    
    @Column(name = "hire_date")
    private LocalDate hireDate;
    
    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;
    
    // PostgreSQL JSONB支持
    @Type(JsonBinaryType.class)
    @Column(columnDefinition = "jsonb")
    private Map<String, Object> metadata;
    
    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    // 关联关系
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", insertable = false, updatable = false)
    private Department department;
    
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ProjectAssignment> projectAssignments;
}

@Entity
@Table(name = "departments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Department {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 100)
    @NotBlank(message = "部门名称不能为空")
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "manager_id")
    private Long managerId;
    
    @Column(precision = 15, scale = 2)
    private BigDecimal budget;
    
    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    // 关联关系
    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Employee> employees;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "manager_id", insertable = false, updatable = false)
    private Employee manager;
}

@Entity
@Table(name = "projects")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    @NotBlank(message = "项目名称不能为空")
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    // PostgreSQL数组支持
    @Type(StringArrayType.class)
    @Column(columnDefinition = "text[]")
    private String[] tags;
    
    @Column(name = "start_date")
    private LocalDate startDate;
    
    @Column(name = "end_date")
    private LocalDate endDate;
    
    @Enumerated(EnumType.STRING)
    private ProjectStatus status;
    
    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ProjectAssignment> projectAssignments;
}

public enum ProjectStatus {
    PLANNING, IN_PROGRESS, COMPLETED, CANCELLED
}
```

### 🔧 数据访问层

#### Repository接口
```java
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>, JpaSpecificationExecutor<Employee> {
    
    // 基本查询方法
    List<Employee> findByIsActiveTrue();
    
    List<Employee> findByDepartmentId(Long departmentId);
    
    Optional<Employee> findByEmail(String email);
    
    List<Employee> findBySalaryBetween(BigDecimal minSalary, BigDecimal maxSalary);
    
    // 自定义查询
    @Query("SELECT e FROM Employee e JOIN e.department d WHERE d.name = :departmentName")
    List<Employee> findByDepartmentName(@Param("departmentName") String departmentName);
    
    @Query(value = "SELECT * FROM employees WHERE metadata @> :metadata::jsonb", nativeQuery = true)
    List<Employee> findByMetadata(@Param("metadata") String metadata);
    
    // 聚合查询
    @Query("SELECT d.name, COUNT(e), AVG(e.salary) FROM Employee e JOIN e.department d GROUP BY d.name")
    List<Object[]> getDepartmentStatistics();
    
    // 分页查询
    Page<Employee> findByDepartmentIdAndIsActiveTrue(Long departmentId, Pageable pageable);
    
    // 投影查询
    @Query("SELECT new com.example.dto.EmployeeSummaryDTO(e.id, e.name, e.email, d.name) " +
           "FROM Employee e JOIN e.department d WHERE e.isActive = true")
    List<EmployeeSummaryDTO> findEmployeeSummaries();
    
    // 全文搜索
    @Query(value = "SELECT * FROM employees WHERE search_vector @@ to_tsquery('english', :query)", 
           nativeQuery = true)
    List<Employee> fullTextSearch(@Param("query") String query);
    
    // 批量操作
    @Modifying
    @Query("UPDATE Employee e SET e.isActive = false WHERE e.departmentId = :departmentId")
    int deactivateEmployeesByDepartment(@Param("departmentId") Long departmentId);
}

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    
    Optional<Department> findByName(String name);
    
    List<Department> findByBudgetGreaterThan(BigDecimal budget);
    
    @Query("SELECT d FROM Department d LEFT JOIN FETCH d.employees WHERE d.id = :id")
    Optional<Department> findByIdWithEmployees(@Param("id") Long id);
    
    @Query(value = "SELECT d.*, COUNT(e.id) as employee_count " +
                   "FROM departments d LEFT JOIN employees e ON d.id = e.department_id " +
                   "GROUP BY d.id", nativeQuery = true)
    List<Object[]> findDepartmentsWithEmployeeCount();
}
```

#### 自定义Repository实现
```java
@Component
public class EmployeeRepositoryCustomImpl {
    
    @PersistenceContext
    private EntityManager entityManager;
    
    public List<Employee> findEmployeesWithDynamicCriteria(EmployeeSearchCriteria criteria) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Employee> query = cb.createQuery(Employee.class);
        Root<Employee> root = query.from(Employee.class);
        
        List<Predicate> predicates = new ArrayList<>();
        
        if (criteria.getName() != null) {
            predicates.add(cb.like(cb.lower(root.get("name")), 
                "%" + criteria.getName().toLowerCase() + "%"));
        }
        
        if (criteria.getDepartmentId() != null) {
            predicates.add(cb.equal(root.get("departmentId"), criteria.getDepartmentId()));
        }
        
        if (criteria.getMinSalary() != null) {
            predicates.add(cb.greaterThanOrEqualTo(root.get("salary"), criteria.getMinSalary()));
        }
        
        if (criteria.getMaxSalary() != null) {
            predicates.add(cb.lessThanOrEqualTo(root.get("salary"), criteria.getMaxSalary()));
        }
        
        if (criteria.getIsActive() != null) {
            predicates.add(cb.equal(root.get("isActive"), criteria.getIsActive()));
        }
        
        query.where(predicates.toArray(new Predicate[0]));
        query.orderBy(cb.asc(root.get("name")));
        
        return entityManager.createQuery(query).getResultList();
    }
    
    public List<Employee> findEmployeesWithJsonQuery(String skillName) {
        String jpql = "SELECT e FROM Employee e WHERE " +
                     "JSON_EXTRACT(e.metadata, '$.skills') LIKE :skill";
        
        return entityManager.createQuery(jpql, Employee.class)
                .setParameter("skill", "%" + skillName + "%")
                .getResultList();
    }
}
```

### 🎯 服务层

```java
@Service
@Transactional
@Slf4j
public class EmployeeService {
    
    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final EmployeeRepositoryCustomImpl employeeRepositoryCustom;
    
    public EmployeeService(EmployeeRepository employeeRepository,
                          DepartmentRepository departmentRepository,
                          EmployeeRepositoryCustomImpl employeeRepositoryCustom) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.employeeRepositoryCustom = employeeRepositoryCustom;
    }
    
    /**
     * 创建员工
     */
    public Employee createEmployee(CreateEmployeeDTO createEmployeeDTO) {
        // 验证部门是否存在
        if (createEmployeeDTO.getDepartmentId() != null) {
            departmentRepository.findById(createEmployeeDTO.getDepartmentId())
                .orElseThrow(() -> new EntityNotFoundException("部门不存在"));
        }
        
        // 检查邮箱是否已存在
        if (employeeRepository.findByEmail(createEmployeeDTO.getEmail()).isPresent()) {
            throw new BusinessException("邮箱已存在");
        }
        
        Employee employee = Employee.builder()
            .name(createEmployeeDTO.getName())
            .email(createEmployeeDTO.getEmail())
            .departmentId(createEmployeeDTO.getDepartmentId())
            .salary(createEmployeeDTO.getSalary())
            .hireDate(createEmployeeDTO.getHireDate() != null ? 
                createEmployeeDTO.getHireDate() : LocalDate.now())
            .metadata(createEmployeeDTO.getMetadata())
            .build();
        
        Employee savedEmployee = employeeRepository.save(employee);
        log.info("创建员工成功: {}", savedEmployee.getId());
        
        return savedEmployee;
    }
    
    /**
     * 批量创建员工
     */
    public List<Employee> batchCreateEmployees(List<CreateEmployeeDTO> createEmployeeDTOs) {
        List<Employee> employees = createEmployeeDTOs.stream()
            .map(dto -> Employee.builder()
                .name(dto.getName())
                .email(dto.getEmail())
                .departmentId(dto.getDepartmentId())
                .salary(dto.getSalary())
                .hireDate(dto.getHireDate() != null ? dto.getHireDate() : LocalDate.now())
                .metadata(dto.getMetadata())
                .build())
            .collect(Collectors.toList());
        
        List<Employee> savedEmployees = employeeRepository.saveAll(employees);
        log.info("批量创建员工成功，数量: {}", savedEmployees.size());
        
        return savedEmployees;
    }
    
    /**
     * 更新员工信息
     */
    public Employee updateEmployee(Long id, UpdateEmployeeDTO updateEmployeeDTO) {
        Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("员工不存在"));
        
        if (updateEmployeeDTO.getName() != null) {
            employee.setName(updateEmployeeDTO.getName());
        }
        
        if (updateEmployeeDTO.getEmail() != null && 
            !updateEmployeeDTO.getEmail().equals(employee.getEmail())) {
            // 检查新邮箱是否已存在
            if (employeeRepository.findByEmail(updateEmployeeDTO.getEmail()).isPresent()) {
                throw new BusinessException("邮箱已存在");
            }
            employee.setEmail(updateEmployeeDTO.getEmail());
        }
        
        if (updateEmployeeDTO.getDepartmentId() != null) {
            departmentRepository.findById(updateEmployeeDTO.getDepartmentId())
                .orElseThrow(() -> new EntityNotFoundException("部门不存在"));
            employee.setDepartmentId(updateEmployeeDTO.getDepartmentId());
        }
        
        if (updateEmployeeDTO.getSalary() != null) {
            employee.setSalary(updateEmployeeDTO.getSalary());
        }
        
        if (updateEmployeeDTO.getMetadata() != null) {
            employee.setMetadata(updateEmployeeDTO.getMetadata());
        }
        
        Employee updatedEmployee = employeeRepository.save(employee);
        log.info("更新员工信息成功: {}", updatedEmployee.getId());
        
        return updatedEmployee;
    }
    
    /**
     * 查询员工列表
     */
    @Transactional(readOnly = true)
    public Page<Employee> getEmployees(EmployeeSearchCriteria criteria, Pageable pageable) {
        if (criteria.hasAnyCriteria()) {
            List<Employee> employees = employeeRepositoryCustom
                .findEmployeesWithDynamicCriteria(criteria);
            
            int start = (int) pageable.getOffset();
            int end = Math.min((start + pageable.getPageSize()), employees.size());
            
            return new PageImpl<>(
                employees.subList(start, end), 
                pageable, 
                employees.size()
            );
        }
        
        return employeeRepository.findAll(pageable);
    }
    
    /**
     * 根据技能搜索员工
     */
    @Transactional(readOnly = true)
    public List<Employee> searchEmployeesBySkill(String skill) {
        String metadataQuery = String.format("{\"skills\": [\"%s\"]}", skill);
        return employeeRepository.findByMetadata(metadataQuery);
    }
    
    /**
     * 全文搜索员工
     */
    @Transactional(readOnly = true)
    public List<Employee> fullTextSearchEmployees(String query) {
        return employeeRepository.fullTextSearch(query);
    }
    
    /**
     * 获取部门统计信息
     */
    @Transactional(readOnly = true)
    public List<DepartmentStatisticsDTO> getDepartmentStatistics() {
        List<Object[]> results = employeeRepository.getDepartmentStatistics();
        
        return results.stream()
            .map(result -> DepartmentStatisticsDTO.builder()
                .departmentName((String) result[0])
                .employeeCount(((Number) result[1]).longValue())
                .averageSalary((BigDecimal) result[2])
                .build())
            .collect(Collectors.toList());
    }
    
    /**
     * 软删除员工
     */
    public void deactivateEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("员工不存在"));
        
        employee.setIsActive(false);
        employeeRepository.save(employee);
        
        log.info("员工已停用: {}", id);
    }
}
```

### 🌐 控制器层

```java
@RestController
@RequestMapping("/api/employees")
@Validated
@Slf4j
public class EmployeeController {
    
    private final EmployeeService employeeService;
    
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }
    
    /**
     * 创建员工
     */
    @PostMapping
    public ResponseEntity<ApiResponse<Employee>> createEmployee(
            @RequestBody @Valid CreateEmployeeDTO createEmployeeDTO) {
        
        Employee employee = employeeService.createEmployee(createEmployeeDTO);
        
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.success("员工创建成功", employee));
    }
    
    /**
     * 批量创建员工
     */
    @PostMapping("/batch")
    public ResponseEntity<ApiResponse<List<Employee>>> batchCreateEmployees(
            @RequestBody @Valid List<CreateEmployeeDTO> createEmployeeDTOs) {
        
        List<Employee> employees = employeeService.batchCreateEmployees(createEmployeeDTOs);
        
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(ApiResponse.success("员工批量创建成功", employees));
    }
    
    /**
     * 更新员工信息
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Employee>> updateEmployee(
            @PathVariable Long id,
            @RequestBody @Valid UpdateEmployeeDTO updateEmployeeDTO) {
        
        Employee employee = employeeService.updateEmployee(id, updateEmployeeDTO);
        
        return ResponseEntity.ok(ApiResponse.success("员工信息更新成功", employee));
    }
    
    /**
     * 查询员工列表
     */
    @GetMapping
    public ResponseEntity<ApiResponse<Page<Employee>>> getEmployees(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Long departmentId,
            @RequestParam(required = false) BigDecimal minSalary,
            @RequestParam(required = false) BigDecimal maxSalary,
            @RequestParam(required = false) Boolean isActive,
            @PageableDefault(size = 20, sort = "id") Pageable pageable) {
        
        EmployeeSearchCriteria criteria = EmployeeSearchCriteria.builder()
            .name(name)
            .departmentId(departmentId)
            .minSalary(minSalary)
            .maxSalary(maxSalary)
            .isActive(isActive)
            .build();
        
        Page<Employee> employees = employeeService.getEmployees(criteria, pageable);
        
        return ResponseEntity.ok(ApiResponse.success("查询成功", employees));
    }
    
    /**
     * 根据ID查询员工
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Employee>> getEmployeeById(@PathVariable Long id) {
        Employee employee = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(ApiResponse.success("查询成功", employee));
    }
    
    /**
     * 根据技能搜索员工
     */
    @GetMapping("/search/by-skill")
    public ResponseEntity<ApiResponse<List<Employee>>> searchBySkill(
            @RequestParam String skill) {
        
        List<Employee> employees = employeeService.searchEmployeesBySkill(skill);
        
        return ResponseEntity.ok(ApiResponse.success("搜索成功", employees));
    }
    
    /**
     * 全文搜索员工
     */
    @GetMapping("/search/fulltext")
    public ResponseEntity<ApiResponse<List<Employee>>> fullTextSearch(
            @RequestParam String query) {
        
        List<Employee> employees = employeeService.fullTextSearchEmployees(query);
        
        return ResponseEntity.ok(ApiResponse.success("搜索成功", employees));
    }
    
    /**
     * 获取部门统计信息
     */
    @GetMapping("/statistics/by-department")
    public ResponseEntity<ApiResponse<List<DepartmentStatisticsDTO>>> getDepartmentStatistics() {
        List<DepartmentStatisticsDTO> statistics = employeeService.getDepartmentStatistics();
        return ResponseEntity.ok(ApiResponse.success("统计查询成功", statistics));
    }
    
    /**
     * 停用员工
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deactivateEmployee(@PathVariable Long id) {
        employeeService.deactivateEmployee(id);
        return ResponseEntity.ok(ApiResponse.success("员工已停用", null));
    }
}
```

## 🛠️ 最佳实践 <Badge type="tip" text="最佳实践" />

### 📋 数据库设计原则

::: warning 重要提示
合理的数据库设计是PostgreSQL高性能的基础！
:::

1. **表设计原则**
   - 合理使用主键和外键约束
   - 选择合适的数据类型，避免过度设计
   - 使用NOT NULL约束提高查询性能
   - 合理设计索引，避免过多索引影响写入性能

2. **索引策略**
   - 为经常查询的列创建索引
   - 使用复合索引优化多列查询
   - 考虑使用部分索引减少索引大小
   - 定期分析和维护索引

3. **数据类型选择**
   - 使用SERIAL或BIGSERIAL作为自增主键
   - 优先使用VARCHAR而不是CHAR
   - 合理使用JSONB存储半结构化数据
   - 使用适当精度的DECIMAL类型处理金额

### ⚡ 性能优化

#### 连接池优化
```java
@Configuration
public class DatabaseConfig {
    
    @Bean
    @ConfigurationProperties("spring.datasource.hikari")
    public HikariConfig hikariConfig() {
        HikariConfig config = new HikariConfig();
        
        // 连接池大小 = CPU核心数 * 2 + 磁盘数
        config.setMaximumPoolSize(20);
        config.setMinimumIdle(5);
        
        // 连接超时时间
        config.setConnectionTimeout(30000);
        config.setIdleTimeout(600000);
        config.setMaxLifetime(1800000);
        
        // 连接泄漏检测
        config.setLeakDetectionThreshold(60000);
        
        // 连接测试
        config.setConnectionTestQuery("SELECT 1");
        
        return config;
    }
    
    @Bean
    public DataSource dataSource() {
        return new HikariDataSource(hikariConfig());
    }
}
```

#### 查询优化
```java
@Service
public class PerformanceOptimizationService {
    
    @PersistenceContext
    private EntityManager entityManager;
    
    /**
     * 批量操作优化
     */
    @Transactional
    public void batchInsertEmployees(List<Employee> employees) {
        int batchSize = 20;
        
        for (int i = 0; i < employees.size(); i++) {
            entityManager.persist(employees.get(i));
            
            if (i % batchSize == 0 && i > 0) {
                entityManager.flush();
                entityManager.clear();
            }
        }
    }
    
    /**
     * 使用投影减少数据传输
     */
    public List<EmployeeSummaryProjection> getEmployeeSummaries() {
        String jpql = "SELECT e.id as id, e.name as name, e.email as email, " +
                     "d.name as departmentName FROM Employee e JOIN e.department d";
        
        return entityManager.createQuery(jpql, EmployeeSummaryProjection.class)
                .getResultList();
    }
    
    /**
     * 使用原生SQL优化复杂查询
     */
    public List<Object[]> getComplexStatistics() {
        String sql = """
            WITH dept_stats AS (
                SELECT 
                    d.id,
                    d.name,
                    COUNT(e.id) as emp_count,
                    AVG(e.salary) as avg_salary,
                    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY e.salary) as median_salary
                FROM departments d
                LEFT JOIN employees e ON d.id = e.department_id AND e.is_active = true
                GROUP BY d.id, d.name
            )
            SELECT * FROM dept_stats ORDER BY avg_salary DESC
            """;
        
        return entityManager.createNativeQuery(sql).getResultList();
    }
}
```

### 🔒 安全配置

#### 数据库安全
```java
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {
    
    /**
     * 数据源安全配置
     */
    @Bean
    public DataSource secureDataSource() {
        HikariConfig config = new HikariConfig();
        
        // 使用环境变量配置敏感信息
        config.setJdbcUrl(System.getenv("DATABASE_URL"));
        config.setUsername(System.getenv("DATABASE_USERNAME"));
        config.setPassword(System.getenv("DATABASE_PASSWORD"));
        
        // 启用SSL连接
        config.addDataSourceProperty("sslmode", "require");
        config.addDataSourceProperty("sslcert", "client-cert.pem");
        config.addDataSourceProperty("sslkey", "client-key.pem");
        config.addDataSourceProperty("sslrootcert", "ca-cert.pem");
        
        return new HikariDataSource(config);
    }
}

/**
 * 行级安全示例
 */
@Entity
@Table(name = "employees")
@Where(clause = "is_active = true") // Hibernate过滤器
public class Employee {
    // ... 实体定义
}
```

## 🎯 实际应用场景 <Badge type="success" text="应用场景" />

### 💼 企业级应用

::: info 适用场景
PostgreSQL特别适合需要复杂查询、事务一致性和数据完整性的企业级应用。
:::

1. **ERP系统**
   - 复杂的业务逻辑和数据关系
   - 严格的事务要求
   - 丰富的报表和分析需求

2. **CRM系统**
   - 客户数据管理
   - 销售流程跟踪
   - 数据分析和挖掘

3. **电商平台**
   - 商品目录管理
   - 订单处理系统
   - 库存管理

### 🌐 Web应用

```java
// 电商订单处理示例
@Service
@Transactional
public class OrderService {
    
    public Order createOrder(CreateOrderDTO orderDTO) {
        // 1. 检查库存
        for (OrderItemDTO item : orderDTO.getItems()) {
            Product product = productRepository.findById(item.getProductId())
                .orElseThrow(() -> new EntityNotFoundException("商品不存在"));
            
            if (product.getStock() < item.getQuantity()) {
                throw new BusinessException("库存不足");
            }
        }
        
        // 2. 创建订单
        Order order = Order.builder()
            .customerId(orderDTO.getCustomerId())
            .status(OrderStatus.PENDING)
            .totalAmount(calculateTotalAmount(orderDTO.getItems()))
            .build();
        
        order = orderRepository.save(order);
        
        // 3. 创建订单项并扣减库存
        for (OrderItemDTO itemDTO : orderDTO.getItems()) {
            OrderItem item = OrderItem.builder()
                .orderId(order.getId())
                .productId(itemDTO.getProductId())
                .quantity(itemDTO.getQuantity())
                .price(itemDTO.getPrice())
                .build();
            
            orderItemRepository.save(item);
            
            // 扣减库存
            productRepository.decreaseStock(itemDTO.getProductId(), itemDTO.getQuantity());
        }
        
        return order;
    }
}
```

### 📊 数据分析

```sql
-- 复杂的数据分析查询示例
WITH monthly_sales AS (
    SELECT 
        DATE_TRUNC('month', o.created_at) as month,
        SUM(o.total_amount) as total_sales,
        COUNT(*) as order_count,
        COUNT(DISTINCT o.customer_id) as unique_customers
    FROM orders o
    WHERE o.status = 'COMPLETED'
    GROUP BY DATE_TRUNC('month', o.created_at)
),
growth_analysis AS (
    SELECT 
        month,
        total_sales,
        LAG(total_sales) OVER (ORDER BY month) as prev_month_sales,
        (total_sales - LAG(total_sales) OVER (ORDER BY month)) / 
        LAG(total_sales) OVER (ORDER BY month) * 100 as growth_rate
    FROM monthly_sales
)
SELECT 
    month,
    total_sales,
    prev_month_sales,
    ROUND(growth_rate, 2) as growth_percentage
FROM growth_analysis
ORDER BY month DESC;
```

## ❓ 常见问题 <Badge type="danger" text="FAQ" />

### 🔧 性能问题

::: details 查询性能慢怎么办？
1. **检查执行计划**：使用EXPLAIN ANALYZE分析查询
2. **优化索引**：为WHERE、JOIN、ORDER BY子句中的列创建索引
3. **重写查询**：避免SELECT *，使用合适的JOIN类型
4. **分区表**：对大表进行分区
5. **统计信息**：定期更新表统计信息
:::

::: details 连接池配置建议
```yaml
spring:
  datasource:
    hikari:
      # 最大连接数 = CPU核心数 * 2 + 磁盘数
      maximum-pool-size: 20
      # 最小空闲连接数
      minimum-idle: 5
      # 连接超时时间（毫秒）
      connection-timeout: 30000
      # 空闲超时时间（毫秒）
      idle-timeout: 600000
      # 连接最大生命周期（毫秒）
      max-lifetime: 1800000
```
:::

### 🛠️ 开发问题

::: details JSONB字段如何查询？
```java
// 1. 使用原生SQL
@Query(value = "SELECT * FROM employees WHERE metadata @> :metadata::jsonb", 
       nativeQuery = true)
List<Employee> findByMetadata(@Param("metadata") String metadata);

// 2. 使用Criteria API
public List<Employee> findByJsonField(String skill) {
    CriteriaBuilder cb = entityManager.getCriteriaBuilder();
    CriteriaQuery<Employee> query = cb.createQuery(Employee.class);
    Root<Employee> root = query.from(Employee.class);
    
    // 使用原生SQL函数
    Expression<Boolean> jsonContains = cb.function(
        "jsonb_path_exists", 
        Boolean.class,
        root.get("metadata"),
        cb.literal("$.skills[*] ? (@ == \"" + skill + "\")")
    );
    
    query.where(jsonContains);
    return entityManager.createQuery(query).getResultList();
}
```
:::

::: details 如何处理大批量数据？
```java
@Service
public class BatchProcessingService {
    
    @Transactional
    public void processBatchData(List<Employee> employees) {
        int batchSize = 1000;
        
        for (int i = 0; i < employees.size(); i += batchSize) {
            int end = Math.min(i + batchSize, employees.size());
            List<Employee> batch = employees.subList(i, end);
            
            // 批量处理
            employeeRepository.saveAll(batch);
            
            // 清理持久化上下文
            entityManager.flush();
            entityManager.clear();
        }
    }
}
```
:::

## 📚 参考资源 <Badge type="info" text="学习资源" />

### 📖 官方文档
- [PostgreSQL官方文档](https://www.postgresql.org/docs/)
- [Spring Data JPA参考文档](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/)
- [Hibernate用户指南](https://docs.jboss.org/hibernate/orm/current/userguide/html_single/Hibernate_User_Guide.html)

### 🛠️ 工具推荐
- **pgAdmin**：PostgreSQL图形化管理工具
- **DBeaver**：通用数据库管理工具
- **DataGrip**：JetBrains出品的数据库IDE
- **pg_stat_statements**：查询性能分析扩展

### 📚 学习资源
- **《PostgreSQL即学即用》**：PostgreSQL入门经典
- **《高性能PostgreSQL》**：性能优化指南
- **PostgreSQL中文社区**：[http://www.postgres.cn/](http://www.postgres.cn/)

---

::: tip 💡 小贴士
PostgreSQL是一个功能强大且稳定的数据库系统，合理使用其高级特性可以大大提升应用性能和开发效率。建议在实际项目中逐步学习和应用这些特性。
:::