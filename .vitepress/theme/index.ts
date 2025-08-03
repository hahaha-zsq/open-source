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

// 3. simply set the theme of "import" to "export default"
export default Theme