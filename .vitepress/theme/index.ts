// // https://vitepress.dev/guide/custom-theme
// import { h } from 'vue'
// import type { Theme } from 'vitepress'
// import DefaultTheme from 'vitepress/theme'
// import './style.css'
//
// export default {
//   extends: DefaultTheme,
//   Layout: () => {
//     return h(DefaultTheme.Layout, null, {
//       // https://vitepress.dev/guide/extending-default-theme#layout-slots
//     })
//   },
//   enhanceApp({ app, router, siteData }) {
//     // ...
//   }
// } satisfies Theme
// 1. import vitepress theme
import Theme from '@escook/vitepress-theme'
// 2. import matching CSS styles (this step cannot be omitted)
import '@escook/vitepress-theme/style.css'
// 3. import vitepress-plugin-music
import vitepressMusic from 'vitepress-plugin-music'
import 'vitepress-plugin-music/lib/css/index.css'

// 4. 配置音乐播放列表
const playlist = [
  {
    name: '再飞行',
    author: '逃跑计划',
    file: '/open-source/music/逃跑计划-再飞行.aac', // 包含base路径的完整路径
  }
]

// 5. 扩展主题并集成音乐插件
export default {
  ...Theme,
  enhanceApp: (ctx) => {
    // 如果原主题有enhanceApp，先调用它
    if (Theme.enhanceApp) {
      Theme.enhanceApp(ctx)
    }
    // 初始化音乐插件
    vitepressMusic(playlist)
  }
}