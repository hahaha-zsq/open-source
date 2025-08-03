// 1. 导入 defineConfigWithTheme 函数
import { defineConfigWithTheme } from 'vitepress'
// 2. 导入需要继承的配置对象
import escookConfig from '@escook/vitepress-theme/config'
// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme({
  // 3. 通过 extends 指定要继承的配置
  extends: escookConfig,
  title: "winter",
  description: "winter系列开源说明",
  themeConfig: {
    // 4. 通过此配置项，启用背景音乐的小组件
    musicBall: {
      src: 'https://lu-sycdn.kuwo.cn/3fab101a4b91db8ce61540bbe60467bb/688f6dbc/resource/a3/90/48/3631134829.aac'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
