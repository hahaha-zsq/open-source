// 1. 导入 defineConfigWithTheme 函数
import { defineConfigWithTheme } from 'vitepress'
// 2. 导入需要继承的配置对象
import escookConfig from '@escook/vitepress-theme/config'
// 3. 导入 mermaid 插件
import { withMermaid } from 'vitepress-plugin-mermaid'
// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfigWithTheme({
  // 3. 通过 extends 指定要继承的配置
  extends: escookConfig,
  title: "winter",
  description: "winter系列开源说明",
  // 添加 base 配置，用于 GitHub Pages 部署
  base: '/open-source/',
  // 添加自定义样式和图标
  head: [
    ['link', { rel: 'stylesheet', href: '/theme/custom.css' }],
    ['link', { rel: 'icon', href: '/open-source/favicon.svg' }],
    ['link', { rel: 'alternate icon', href: '/open-source/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#5f67ee' }]
  ],
  // 启用 mermaid 支持
  markdown: {
    config: (md) => {
      // 其他 markdown 配置
    }
  },
  // 忽略死链接检查
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { 
        text: '开源项目', 
        items: [
          { text: '项目总览', link: '/开源项目/README' },
          { text: 'Winter Encrypt', link: '/开源项目/Java/winter-encrypt' },
          { text: 'Winter Log', link: '/开源项目/Java/winter-log' }
        ]
      },
      { 
        text: '后端技术', 
        items: [
          { text: '后端总览', link: '/后端/README' },
          { text: 'Java基础', link: '/后端/Java基础知识/README' },
          { text: 'SpringBoot', link: '/后端/SpringBoot/README' },
          { text: 'SpringCloud', link: '/后端/SpringCloud/README' },
          { text: '中间件', link: '/后端/中间件/README' }
        ]
      },
      { 
        text: '前端技术', 
        items: [
          { text: '前端总览', link: '/前端/README' },
          { text: 'React', link: '/前端/React/README' },
          { text: 'Vue', link: '/前端/Vue/README' }
        ]
      },
      { 
        text: '运维技术', 
        items: [
          { text: '容器技术', link: '/容器/README' },
          { text: '代理技术', link: '/代理/README' },
          { text: '数据库', link: '/数据库/README' }
        ]
      },
      { 
        text: '工具', 
        items: [
          { text: '开发工具', link: '/工具/README' },
          { text: '版本控制', link: '/版本控制与协作/README' }
        ]
      },
      { 
        text: '博客', 
        items: [
          { text: '博客首页', link: '/blog/' },
          { text: '技术博客', link: '/blog/technical/spring-boot-autoconfiguration' },
          { text: '使用教程', link: '/blog/tutorials/winter-encrypt-quickstart' },
          { text: '项目动态', link: '/blog/news/winter-encrypt-v0032-release' }
        ]
      }
    ],

    sidebar: {
      '/开源项目/': [
        {
          text: '📦 开源项目',
          items: [
            { text: '项目总览', link: '/开源项目/README' }
          ]
        },
        {
          text: '☕ Java项目',
          items: [
            { text: 'Winter Encrypt', link: '/开源项目/Java/winter-encrypt' },
            { text: 'Winter Log', link: '/开源项目/Java/winter-log' }
          ]
        }
      ],
      '/后端/': [
        {
          text: '🎯 后端技术',
          items: [
            { text: '后端总览', link: '/后端/README' }
          ]
        },
        {
          text: '☕ Java基础知识',
          items: [
            { text: 'Java基础概览', link: '/后端/Java基础知识/README' }
          ]
        },
        {
          text: '🍃 SpringBoot',
          items: [
            { text: 'SpringBoot概览', link: '/后端/SpringBoot/README' }
          ]
        },
        {
          text: '☁️ SpringCloud',
          items: [
            { text: 'SpringCloud概览', link: '/后端/SpringCloud/README' }
          ]
        },
        {
          text: '🔗 中间件',
          items: [
            { text: '中间件概览', link: '/后端/中间件/README' },
            { text: 'RocketMQ', link: '/后端/中间件/RocketMQ/README' },
            { text: 'Kafka', link: '/后端/中间件/Kafka/README' },
            { text: 'Elasticsearch', link: '/后端/中间件/Elasticsearch/README' },
            { text: 'XXL-JOB', link: '/后端/中间件/XXL-JOB/README' },
            { text: 'Minio', link: '/后端/中间件/Minio/README' }
          ]
        }
      ],
      '/前端/': [
        {
          text: '🎨 前端技术',
          items: [
            { text: '前端总览', link: '/前端/README' }
          ]
        },
        {
          text: '⚛️ React',
          items: [
            { text: 'React概览', link: '/前端/React/README' }
          ]
        },
        {
          text: '💚 Vue',
          items: [
            { text: 'Vue概览', link: '/前端/Vue/README' }
          ]
        }
      ],
      '/容器/': [
        {
          text: '📦 容器技术',
          items: [
            { text: '容器总览', link: '/容器/README' }
          ]
        },
        {
          text: '🐳 Docker',
          items: [
            { text: 'Docker概览', link: '/容器/Docker/README' }
          ]
        }
      ],
      '/代理/': [
        {
          text: '🔀 代理技术',
          items: [
            { text: '代理总览', link: '/代理/README' }
          ]
        },
        {
          text: '🌐 Nginx',
          items: [
            { text: 'Nginx概览', link: '/代理/Nginx/README' }
          ]
        }
      ],
      '/数据库/': [
        {
          text: '💾 数据库技术',
          items: [
            { text: '数据库总览', link: '/数据库/README' }
          ]
        },
        {
          text: '🗄️ MySQL',
          items: [
            { text: 'MySQL概览', link: '/数据库/MySQL/README' }
          ]
        },
        {
          text: '🔴 Redis',
          items: [
            { text: 'Redis概览', link: '/数据库/Redis/README' }
          ]
        }
      ],
      '/版本控制与协作/': [
        {
          text: '🔄 版本控制与协作',
          items: [
            { text: '协作总览', link: '/版本控制与协作/README' }
          ]
        },
        {
          text: '📚 Git',
          items: [
            { text: 'Git概览', link: '/版本控制与协作/Git/README' }
          ]
        }
      ],
      '/工具/': [
        {
          text: '🛠️ 开发工具',
          items: [
            { text: '工具总览', link: '/工具/README' }
          ]
        },
        {
          text: '🔧 API工具',
          items: [
            { text: 'APIFOX', link: '/工具/APIFOX/README' }
          ]
        },
        {
          text: '📦 版本管理',
          items: [
            { text: 'VFOX', link: '/工具/VFOX/README' }
          ]
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hahaha-zsq' }
    ]
  }
}))
