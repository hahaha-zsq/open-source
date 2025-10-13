// 1. 导入 defineConfigWithTheme 函数
import {defineConfigWithTheme} from 'vitepress'
// 2. 导入需要继承的配置对象
import escookConfig from '@escook/vitepress-theme/config'
// 3. 导入 mermaid 插件
import {withMermaid} from 'vitepress-plugin-mermaid'
// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfigWithTheme({
    // 3. 通过 extends 指定要继承的配置
    extends: escookConfig,
    title: "Winter 开源技术体系",
    description: "涵盖后端、前端、运维、数据库、工具等全栈技术的 Winter 系列开源项目与实用教程，助力开发者高效成长。",
    // 添加 base 配置，用于 GitHub Pages 部署
    base: '/open-source/',
    // 添加图标和元数据
    head: [
        ['link', {rel: 'icon', href: '/open-source/favicon.svg'}],
        ['link', {rel: 'alternate icon', href: '/open-source/favicon.ico'}],
        ['meta', {name: 'theme-color', content: '#5f67ee'}]
    ],
    // 启用 mermaid 支持
    markdown: {
        config: (md) => {
            // 其他 markdown 配置
        },
        // 配置 markdown 渲染选项
        lineNumbers: true,
        // 启用图片懒加载
        image: {
            lazyLoading: true
        }
    },
    // 忽略死链接检查
    ignoreDeadLinks: true,
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: '首页', link: '/'},
            {
                text: '开源项目',
                items: [
                    {
                        text: '☕ 后端项目',
                        items: [
                            {text: 'AWS S3 分片上传', link: '/开源项目/Java/aws-s3-upload'},
                            {text: 'Winter I18n', link: '/开源项目/Java/winter-i18n'},
                            {text: 'Winter Encrypt', link: '/开源项目/Java/winter-encrypt'},
                            {text: 'Winter Log', link: '/开源项目/Java/winter-log'},
                            {text: 'Winter Minio', link: '/开源项目/Java/winter-minio'},
                        ]
                    },
                    {
                        text: '🎨 前端项目',
                        items: [
                            {text: 'dadandiaoming-cli', link: '/开源项目/前端/dadandiaoming-cli'}
                        ]
                    },
                    {
                        text: '🔧 其他项目',
                        items: [
                            {text: 'Shortcut-Script', link: '/开源项目/其他/centos/centos'},
                            {text: '更多项目开发中...', link: '/开源项目/README'}
                        ]
                    }
                ]
            },
            {
                text: '后端技术',
                items: [
                    {
                        text: '☕ Java基础知识',
                        items: [
                            {text: '函数式接口', link: '/后端/Java基础知识/函数式接口/函数式接口'}
                        ]
                    },
                    {
                        text: '🍃 SpringBoot',
                        items: [
                            {text: 'Spring事务传播行为', link: '/后端/SpringBoot/Spring事务传播行为'}
                        ]
                    },
                    {
                        text: '🗄️ 持久层框架',
                        items: [
                            {text: 'MyBatis 自定义拦截器', link: '/后端/持久层框架/mybatis'},
                            {text: 'JdbcTemplate 详解', link: '/后端/持久层框架/jdbcTemplate'}
                        ]
                    },
                    {
                        text: '🎯 设计模式',
                        items: [
                            {text: 'Java 设计模式', link: '/后端/设计模式/README'}
                        ]
                    },
                    {
                        text: '☁️ SpringCloud',
                        items: [
                            {text: 'SpringCloud', link: '/后端/SpringCloud/README'},
                            {text: 'SpringCloud Gateway', link: '/后端/SpringCloud/SpringCloud Gateway'}
                        ]
                    },
                    {
                        text: '🔗 中间件',
                        items: [
                            {text: 'RocketMQ', link: '/后端/中间件/RocketMQ/README'},
                            {text: 'Kafka', link: '/后端/中间件/Kafka/README'},
                            {text: 'Elasticsearch', link: '/后端/中间件/Elasticsearch/README'},
                            {text: 'XXL-JOB', link: '/后端/中间件/XXL-JOB/README'},
                            {text: 'Minio', link: '/后端/中间件/Minio/README'},
                            {text: 'Netty', link: '/后端/中间件/Netty/Netty'}
                        ]
                    }
                ]
            },
            {
                text: '前端技术',
                items: [
                    {
                        text: 'React',
                        items: [
                            {text: 'React 组件通信', link: '/前端/React/React的通信方式'}
                        ]
                    },
                    {
                        text: 'Vue',
                        items: [
                            {text: 'Vue 基础', link: '/前端/Vue/README'}
                        ]
                    }
                ]
            },
            {
                text: '运维技术',
                items: [
                    {text: 'Docker', link: '/运维/Docker/Docker'},
                    {text: 'Nginx', link: '/运维/Nginx/README'},
                    {text: 'Bash', link: '/运维/Bash/Bash'},
                ]
            },
            {
                text: '数据库专题',
                items: [
                    {
                        text: '🗄️ MySQL',
                        items: [
                            {text: 'MySQL 基础篇', link: '/数据库/MySQL/MySQL基础篇'},
                            {text: 'MySQL 架构篇', link: '/数据库/MySQL/MySQL架构篇'},
                            {text: 'MySQL 索引与调优篇', link: '/数据库/MySQL/MySQL索引和调优篇'},
                            {text: 'MySQL 日志与备份篇', link: '/数据库/MySQL/MySQL日志与备份篇'},
                            {text: 'MySQL 事务篇', link: '/数据库/MySQL/MySQL事务篇'}
                        ]
                    },
                    {
                        text: '🐘 PostgreSQL',
                        link: '/数据库/PostgreSQL/PostgreSQL'
                    },
                    {
                        text: '⚡ TDengine',
                        link: '/数据库/TDengine/TDengine'
                    },
                    {
                        text: '🔴 Redis',
                        link: '/面试题/Redis/README'
                    }
                ]
            },
            {
                text: '面试题专题',
                items: [
                    {text: 'MySQL', link: '/面试题/MySQL/README'},
                    {text: 'Redis', link: '/面试题/Redis/README'},
                    {text: 'Spring', link: '/面试题/Spring/README'},
                    {text: 'RocketMQ', link: '/面试题/RocketMQ/README'},
                    {text: 'Java基础', link: '/面试题/Java基础/README'},
                    {text: '并发编程', link: '/面试题/并发编程/README'}
                ]
            },
            {
                text: '工具',
                items: [
                    {text: 'APIFOX', link: '/工具/APIFOX/README'},
                    {text: 'VFOX', link: '/工具/VFOX/README'},
                    {text: 'Git', link: '/版本控制与协作/Git/README'}
                ]
            }
        ],
        sidebar: {
            '/开源项目/': [
                {
                    text: '☕ 后端项目',
                    items: [
                        {text: 'AWS S3 分片上传', link: '/开源项目/Java/aws-s3-upload'},
                        {text: 'Winter I18n', link: '/开源项目/Java/winter-i18n'},
                        {text: 'Winter Encrypt', link: '/开源项目/Java/winter-encrypt'},
                        {text: 'Winter Log', link: '/开源项目/Java/winter-log'},
                        {text: 'Winter Minio', link: '/开源项目/Java/winter-minio'},
                    ]
                },
                {
                    text: '🎨 前端项目',
                    items: [
                        {text: 'dadandiaoming-cli', link: '/开源项目/前端/dadandiaoming-cli'}
                    ]
                },
                {
                    text: '🔧 其他项目',
                    items: [
                        {text: 'Shortcut-Script', link: '/开源项目/其他/centos/centos'},
                        {text: '更多项目开发中...', link: '/开源项目/README'}
                    ]
                }
            ],
            '/后端/': [
                {
                    text: '☕ Java基础知识',
                    items: [
                        {text: '函数式接口', link: '/后端/Java基础知识/函数式接口/函数式接口'}
                    ]
                },
                {
                    text: '🍃 SpringBoot',
                    items: [
                        {text: 'Spring事务传播行为', link: '/后端/SpringBoot/Spring事务传播行为'}
                    ]
                },
                {
                    text: '🗄️ 持久层框架',
                    items: [
                        {text: 'MyBatis 自定义拦截器', link: '/后端/持久层框架/mybatis'},
                        {text: 'JdbcTemplate 详解', link: '/后端/持久层框架/jdbcTemplate'}
                    ]
                },
                {
                    text: '🎯 设计模式',
                    items: [
                        {text: 'Java 设计模式', link: '/后端/设计模式/README'}
                    ]
                },
                {
                    text: '☁️ SpringCloud',
                    items: [
                        {text: 'SpringCloud', link: '/后端/SpringCloud/README'}
                    ]
                },
                {
                    text: '🔗 中间件',
                    items: [
                        {text: 'RocketMQ', link: '/后端/中间件/RocketMQ/README'},
                        {text: 'Kafka', link: '/后端/中间件/Kafka/README'},
                        {text: 'Elasticsearch', link: '/后端/中间件/Elasticsearch/README'},
                        {text: 'XXL-JOB', link: '/后端/中间件/XXL-JOB/README'},
                        {text: 'Minio', link: '/后端/中间件/Minio/README'},
                        {text: 'Netty', link: '/后端/中间件/Netty/Netty'}
                    ]
                }
            ],
            '/前端/': [
                {
                    text: '⚛️ React',
                    items: [
                        {text: 'React 组件通信方式', link: '/前端/React/React的通信方式'}
                    ]
                },
                {
                    text: '💚 Vue',
                    items: [
                        {text: 'Vue 基础', link: '/前端/Vue/README'}
                    ]
                }
            ],
            '/运维/': [
                {
                    text: '🔧 运维技术',
                    items: [
                        {text: 'Docker', link: '/运维/Docker/Docker'},
                        {text: 'Nginx', link: '/运维/Nginx/README'},
                        {text: 'Bash', link: '/运维/Bash/Bash'}
                    ]
                }
            ],
            '/数据库/': [
                {
                    text: '🗄️ MySQL',
                    items: [
                        {text: 'MySQL', link: '/数据库/MySQL/README'}
                    ]
                },
                {
                    text: '🐘 PostgreSQL',
                    items: [
                        {text: 'PostgreSQL', link: '/数据库/PostgreSQL/PostgreSQL'}
                    ]
                },
                {
                    text: '⚡ TDengine',
                    items: [
                        {text: 'TDengine', link: '/数据库/TDengine/TDengine'}
                    ]
                },
                {
                    text: '🔴 Redis',
                    items: [
                        {text: 'Redis', link: '/数据库/Redis/README'}
                    ]
                }
            ],
            '/版本控制与协作/': [
                {
                    text: '📚 Git',
                    items: [
                        {text: 'Git', link: '/版本控制与协作/Git/README'}
                    ]
                }
            ],
            '/工具/': [
                {
                    text: '🔧 API工具',
                    items: [
                        {text: 'APIFOX', link: '/工具/APIFOX/README'}
                    ]
                },
                {
                    text: '📦 版本管理',
                    items: [
                        {text: 'VFOX', link: '/工具/VFOX/README'}
                    ]
                }
            ],
            '/面试题/': [
                {
                    text: '🎯 面试题专题',
                    items: [
                        {text: 'MySQL', link: '/面试题/MySQL/README'},
                        {text: 'Redis', link: '/面试题/Redis/README'},
                        {text: 'Spring', link: '/面试题/Spring/README'},
                        {text: 'RocketMQ', link: '/面试题/RocketMQ/README'},
                        {text: 'Java基础', link: '/面试题/Java基础/README'},
                        {text: '并发编程', link: '/面试题/并发编程/README'}
                    ]
                }
            ],
            '/面试题/MySQL/': [
                {
                    text: '🗄️ MySQL 专题',
                    items: [
                        {text: 'MySQL 基础篇', link: '/面试题/MySQL/MySQL基础篇'},
                        {text: 'MySQL 架构篇', link: '/面试题/MySQL/MySQL架构篇'},
                        {text: 'MySQL 索引与调优篇', link: '/面试题/MySQL/MySQL索引和调优篇'},
                        {text: 'MySQL 日志与备份篇', link: '/面试题/MySQL/MySQL日志与备份篇'},
                        {text: 'MySQL 事务篇', link: '/面试题/MySQL/MySQL事务篇'}
                    ]
                }
            ],
            '/面试题/Redis/': [
                {
                    text: '🔴 Redis 专题',
                    items: [
                        {text: 'Redis', link: '/面试题/Redis/README'}
                    ]
                }
            ],
        },

        socialLinks: [
            {
                icon: {
                    svg: '<svg t="1755693372630" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17524" width="128" height="128"><path d="M512 832c-19.2 0-38.4-10.667-57.6-29.867-8.533-8.533-8.533-21.333 0-27.733 8.533-8.533 21.333-8.533 27.733 0 12.8 12.8 21.334 19.2 29.867 19.2 8.533 0 17.067-6.4 29.867-19.2 8.533-8.533 21.333-8.533 27.733 0 8.533 8.533 8.533 21.333 0 27.733C550.4 821.333 531.2 832 512 832zM0 524.8c0 51.2 4.267 96 12.8 136.533 8.533 40.534 21.333 76.8 36.267 104.534 14.933 29.866 34.133 57.6 57.6 78.933 23.466 23.467 49.066 40.533 76.8 55.467 27.733 14.933 59.733 25.6 96 36.266 36.266 8.534 72.533 14.934 108.8 19.2C426.667 957.867 467.2 960 512 960s85.333-2.133 121.6-6.4c36.267-4.267 72.533-10.667 108.8-19.2 36.267-8.533 68.267-21.333 96-36.267 27.733-14.933 53.333-32 76.8-55.466s42.667-49.067 59.733-78.934c14.934-29.866 27.734-64 36.267-104.533 8.533-40.533 12.8-85.333 12.8-136.533 0-89.6-27.733-166.4-83.2-230.4 2.133-8.534 6.4-19.2 8.533-29.867s4.267-27.733 6.4-46.933c2.134-21.334 2.134-42.667-2.133-70.4-4.267-25.6-10.667-53.334-21.333-81.067h-8.534c-4.266-2.133-14.933 0-25.6 2.133-12.8 2.134-25.6 4.267-42.666 10.667C838.4 81.067 819.2 91.733 793.6 104.533c-25.6 12.8-53.333 32-81.067 53.334-49.066-17.067-115.2-32-200.533-32S360.533 140.8 311.467 155.733c-27.734-21.333-55.467-38.4-81.067-51.2-25.6-14.933-46.933-23.466-61.867-29.866C153.6 70.4 138.667 66.133 125.867 64h-25.6c-4.267 0-6.4 2.133-8.534 2.133C81.067 93.867 74.667 121.6 70.4 147.2c-4.267 25.6-4.267 49.067-2.133 70.4 2.133 19.2 4.266 36.267 6.4 46.933 2.133 10.667 6.4 21.334 8.533 29.867C27.733 358.4 0 435.2 0 524.8zM136.533 640c0-57.6 21.334-110.933 64-157.867 12.8-14.933 27.734-25.6 44.8-32 17.067-6.4 36.267-10.666 57.6-12.8H364.8c19.2 2.134 44.8 4.267 72.533 6.4C465.067 445.867 490.667 448 512 448s46.933-2.133 74.667-4.267c29.866-2.133 53.333-4.266 72.533-6.4 19.2-2.133 40.533-2.133 61.867 0 21.333 0 40.533 4.267 57.6 12.8 17.066 6.4 32 19.2 44.8 32 42.666 46.934 64 100.267 64 157.867 0 34.133-4.267 64-10.667 91.733-6.4 25.6-17.067 49.067-27.733 66.134-10.667 17.066-25.6 34.133-44.8 44.8-19.2 12.8-38.4 21.333-57.6 27.733-19.2 6.4-42.667 12.8-70.4 14.933-29.867 4.267-55.467 6.4-76.8 6.4C576 896 546.133 896 512 896c-34.133 0-64 0-87.467-2.133-23.466 0-49.066-2.134-76.8-6.4-29.866-4.267-53.333-8.534-70.4-14.934-19.2-6.4-36.266-17.066-57.6-27.733-19.2-12.8-34.133-27.733-44.8-44.8s-19.2-40.533-27.733-66.133C140.8 704 136.533 674.133 136.533 640zM256 608c0 53.333 27.733 96 64 96s64-42.667 64-96-27.733-96-64-96-64 42.667-64 96z m384 0c0 53.333 27.733 96 64 96s64-42.667 64-96-27.733-96-64-96-64 42.667-64 96z m0 0" fill="#333333" p-id="17525"></path></svg>'
                }, link: 'https://github.com/vuejs/vitepress'
            },
            {
                icon: {
                    svg: '<svg t="1755692786019" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3357" width="128" height="128"><path d="M512 0c282.784 0 512 229.216 512 512s-229.216 512-512 512S0 794.784 0 512 229.216 0 512 0z m189.952 752l11.2-108.224c-31.904 9.536-100.928 16.128-147.712 16.128-134.464 0-205.728-47.296-195.328-146.304 11.584-110.688 113.152-145.696 232.64-145.696 54.784 0 122.432 8.8 151.296 18.336L768 272.704C724.544 262.24 678.272 256 599.584 256c-203.2 0-388.704 94.88-406.4 263.488C178.336 660.96 303.584 768 535.616 768c80.672 0 138.464-6.432 166.336-16z" fill="#CE000D" p-id="3358"></path>CSDN</svg>'
                },
                link: 'https://blog.csdn.net/qq_45886944?spm=1000.2115.3001.5343',
            },
            {
                icon: {
                    svg: '<svg t="1755692911062" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4369" width="128" height="128"><path d="M129.36 208c131.28-4.88 760.4 0 760.4 0s122.88 25.6 126.16 160.4c-1.6 134.8 0 404.16 0 404.16s-6.8 131.6-124.56 152.48c-50.48-1.68-67.2 0-67.2 0s-3.36 55.36-52.96 56.16c-49.76 0.72-57.2-38.56-58.88-52.96-28.48 0-352.88 1.44-390.16 1.6h-3.52s-6 51.36-55.6 51.36c-49.76 0-52.16-42.56-55.52-51.28-32 0-75.68-0.8-75.68-0.8s-109.6-21.6-123.76-157.2c1.84-130.4 0.24-383.12 0.08-402.32v-1.28C7.84 362.88 1.04 242.56 129.36 208z m745.92 98.4H158.96c-21.76 0-39.44 17.28-39.44 38.56v452.4c0 21.36 17.68 38.56 39.44 38.56h716.32c21.76 0 39.36-17.28 39.36-38.56V344.88c0-21.28-17.6-38.48-39.36-38.48zM527.92 610.96c49.92 108.56 105.04 28.8 105.04 28.8l31.28 20.4s-58.48 94.16-135.6 22.96c-65.2 71.28-133.76-22.64-133.76-22.64l34.8-22.32 0.24 0.48c3.92 6.56 48.56 78.56 98-27.68zM413.68 399.68l16 79.76-210.08 40.72-17.76-79.76 211.84-40.72z m235.44 0l211.76 40.72-17.84 79.76-210.16-40.72 16.24-79.76z m85.6-337.92c8.4-6 9.68-15.6 34.32 6 21.76 19.2 12.96 36.48 10.56 40.24l-0.48 0.8-93.12 97.04H596.24S726.4 67.84 734.72 61.76zM328 58.16c8.32 6 138.48 144.08 138.48 144.08H376.72L283.68 105.2s-14.56-19.28 10-41.04c24.8-21.6 26-12 34.32-6z m0 0" fill="#F14767" p-id="4370"></path>bilibili</svg>',
                },
                link: 'https://space.bilibili.com/554769681?spm_id_from=333.1007.0.0',
            },
        ]
    }
}))
