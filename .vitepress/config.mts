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
  title: "Winter 开源技术体系",
  description: "涵盖后端、前端、运维、数据库、工具等全栈技术的 Winter 系列开源项目与实用教程，助力开发者高效成长。",
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
          { 
            text: 'Java基础', 
            items: [
              { text: 'Spring事务传播行为', link: '/后端/SpringBoot/Spring事务传播行为' }
            ]
          },
          { text: 'SpringBoot', link: '/后端/SpringBoot/README' },
          { text: 'SpringCloud', link: '/后端/SpringCloud/README' },
          { text: '中间件', link: '/后端/中间件/RocketMQ/README' }
        ]
      },
      { 
        text: '前端技术', 
        items: [
          { 
            text: 'React', 
            items: [
              { text: 'React 组件通信', link: '/前端/React/React的通信方式' }
            ]
          },
          { 
            text: 'Vue', 
            items: [
              { text: 'Vue 基础', link: '/前端/Vue/README' }
            ]
          }
        ]
      },
      { 
        text: '运维技术', 
        items: [
          { text: 'Docker', link: '/容器/Docker/README' },
          { text: 'Nginx', link: '/代理/Nginx/README' },
          { text: '数据库', link: '/数据库/MySQL/README' }
        ]
      },
      { 
        text: '工具', 
        items: [
          { text: 'APIFOX', link: '/工具/APIFOX/README' },
          { text: 'VFOX', link: '/工具/VFOX/README' },
          { text: 'Git', link: '/版本控制与协作/Git/README' }
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
          text: '☕ Java基础知识',
          items: [
            
          ]
        },
        {
          text: '🍃 SpringBoot',
          items: [
            { text: 'Spring事务传播行为', link: '/后端/SpringBoot/Spring事务传播行为' }
          ]
        },
        {
          text: '☁️ SpringCloud',
          items: [
            { text: 'SpringCloud', link: '/后端/SpringCloud/README' }
          ]
        },
        {
          text: '🔗 中间件',
          items: [
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
          text: '⚛️ React',
          items: [
            { text: 'React 组件通信方式', link: '/前端/React/React的通信方式' }
          ]
        },
        {
          text: '💚 Vue',
          items: [
            { text: 'Vue 基础', link: '/前端/Vue/README' }
          ]
        }
      ],
      '/容器/': [
        {
          text: '🐳 Docker',
          items: [
            { text: 'Docker', link: '/容器/Docker/README' }
          ]
        }
      ],
      '/代理/': [
        {
          text: '🌐 Nginx',
          items: [
            { text: 'Nginx', link: '/代理/Nginx/README' }
          ]
        }
      ],
      '/数据库/': [
        {
          text: '🗄️ MySQL',
          items: [
            { text: 'MySQL', link: '/数据库/MySQL/README' }
          ]
        },
        {
          text: '🔴 Redis',
          items: [
            { text: 'Redis', link: '/数据库/Redis/README' }
          ]
        }
      ],
      '/版本控制与协作/': [
        {
          text: '📚 Git',
          items: [
            { text: 'Git', link: '/版本控制与协作/Git/README' }
          ]
        }
      ],
      '/工具/': [
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
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hahaha-zsq' }
    ]
  }
}))
