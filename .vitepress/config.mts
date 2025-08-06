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
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'alternate icon', href: '/favicon.ico' }],
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
    // 4. 通过此配置项，启用背景音乐的小组件
    musicBall: {
      src: 'https://lu-sycdn.kuwo.cn/3fab101a4b91db8ce61540bbe60467bb/688f6dbc/resource/a3/90/48/3631134829.aac'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '项目', items: [
        { text: '项目概览', link: '/projects/overview' },
        { text: 'Winter Encrypt', link: '/projects/winter-encrypt' },
        { text: 'Winter Log', link: '/projects/winter-log' }
      ]},
      { text: '博客', items: [
        { text: '博客首页', link: '/blog/' },
        { text: '技术博客', link: '/blog/technical/spring-boot-autoconfiguration' },
        { text: '使用教程', link: '/blog/tutorials/winter-encrypt-quickstart' },
        { text: '项目动态', link: '/blog/news/winter-encrypt-v0032-release' }
      ]}
    ],

    sidebar: {
      '/': [
        {
          text: '项目介绍',
          items: [
            { text: '项目概览', link: '/projects/overview' },
            { text: 'Winter Encrypt', link: '/projects/winter-encrypt' },
            { text: 'Winter Log', link: '/projects/winter-log' }
          ]
                }
        ],
        '/blog/': [
          {
            text: '📝 博客专栏',
            items: [
              { text: '博客首页', link: '/blog/' }
            ]
          },
          {
            text: '🔧 技术博客',
            items: [
              { text: 'Spring Boot 自动配置原理', link: '/blog/technical/spring-boot-autoconfiguration' },
              { text: 'AES 加密算法详解', link: '/blog/technical/aes-encryption-guide' },
              { text: '日志系统设计最佳实践', link: '/blog/technical/logging-best-practices' }
            ]
          },
          {
            text: '📖 使用教程',
            items: [
              { text: 'Winter Encrypt 快速上手', link: '/blog/tutorials/winter-encrypt-quickstart' },
              { text: 'Winter Log 集成教程', link: '/blog/tutorials/winter-log-integration' },
              { text: '前后端加解密方案', link: '/blog/tutorials/frontend-backend-encryption' }
            ]
          },
          {
            text: '📰 项目动态',
            items: [
              { text: 'v0.0.32 发布说明', link: '/blog/news/winter-encrypt-v0032-release' },
              { text: '社区贡献指南', link: '/blog/news/community-contribution-guide' },
              { text: 'Roadmap 2024', link: '/blog/news/roadmap-2024' }
            ]
          }
        ]
 
      },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hahaha-zsq' }
    ]
  }
}))
