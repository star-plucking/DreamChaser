import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
// 配置仓库名称（如果使用 <username>.github.io，可以设为 '/'）
const repositoryName = 'DreamChaser' // 改为你的 GitHub 仓库名

export default defineConfig({
  base: `/${repositoryName}/`,
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use "@/styles/variables.scss" as *;`
      }
    }
  }
})
