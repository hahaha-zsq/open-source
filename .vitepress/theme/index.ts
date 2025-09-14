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
// 4. 导入自定义样式
import './custom.css'

// 4. 配置音乐播放列表
const playlist = [
  {
    name: '再飞行',
    author: '逃跑计划',
    file: '/open-source/music/逃跑计划-再飞行.aac', // 包含base路径的完整路径
  },
  {
    name: 'Nobody',
    author: 'AI',
    file: '/open-source/music/AI-Nobody.mp3', // 包含base路径的完整路径
  },
  {
    name: 'home in my heart',
    author: 'nathan rivers',
    file: '/open-source/music/nathan rivers-home in my heart.mp3', // 包含base路径的完整路径
  },
  {
    name: '泪桥',
    author: 'AI',
    file: '/open-source/music/AI-泪桥.mp3', // 包含base路径的完整路径
  },
    {
    name: '赛勒斯的爱',
    author: '张敬轩',
    file: '/open-source/music/张敬轩-赛勒斯的爱.mp3', // 包含base路径的完整路径
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