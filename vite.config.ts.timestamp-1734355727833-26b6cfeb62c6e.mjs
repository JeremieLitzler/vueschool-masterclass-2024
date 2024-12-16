// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Git/GitHub/vueschool-masterclass-2024/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Git/GitHub/vueschool-masterclass-2024/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueDevTools from "file:///C:/Git/GitHub/vueschool-masterclass-2024/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import VueRouter from "file:///C:/Git/GitHub/vueschool-masterclass-2024/node_modules/unplugin-vue-router/dist/vite.js";
import { VueRouterAutoImports } from "file:///C:/Git/GitHub/vueschool-masterclass-2024/node_modules/unplugin-vue-router/dist/index.js";
import tailwind from "file:///C:/Git/GitHub/vueschool-masterclass-2024/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///C:/Git/GitHub/vueschool-masterclass-2024/node_modules/autoprefixer/lib/autoprefixer.js";
import AutoImport from "file:///C:/Git/GitHub/vueschool-masterclass-2024/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///C:/Git/GitHub/vueschool-masterclass-2024/node_modules/unplugin-vue-components/dist/vite.js";
var __vite_injected_original_import_meta_url = "file:///C:/Git/GitHub/vueschool-masterclass-2024/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    VueRouter(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (element) => element.startsWith("iconify-icon")
        }
      }
    }),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/,
        // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/,
        // .vue
        /\.md$/
        // .md
      ],
      imports: [
        // presets
        "vue",
        VueRouterAutoImports,
        {
          pinia: ["defineStore", "storeToRefs", "acceptHMRUpdate"]
        }
      ],
      // Filepath to generate corresponding .d.ts file.
      // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
      // Set `false` to disable.
      dts: true,
      // Include auto-imported packages in Vite's `optimizeDeps` options
      // Recommend to enable
      viteOptimizeDeps: true,
      dirs: ["src/stores"]
    }),
    Components({}),
    vueDevTools()
  ],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxHaXRcXFxcR2l0SHViXFxcXHZ1ZXNjaG9vbC1tYXN0ZXJjbGFzcy0yMDI0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxHaXRcXFxcR2l0SHViXFxcXHZ1ZXNjaG9vbC1tYXN0ZXJjbGFzcy0yMDI0XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9HaXQvR2l0SHViL3Z1ZXNjaG9vbC1tYXN0ZXJjbGFzcy0yMDI0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB2dWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG5cbmltcG9ydCBWdWVSb3V0ZXIgZnJvbSAndW5wbHVnaW4tdnVlLXJvdXRlci92aXRlJ1xuaW1wb3J0IHsgVnVlUm91dGVyQXV0b0ltcG9ydHMgfSBmcm9tICd1bnBsdWdpbi12dWUtcm91dGVyJ1xuXG5pbXBvcnQgdGFpbHdpbmQgZnJvbSAndGFpbHdpbmRjc3MnXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcidcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuXG4vLyBodHRwczovL3ZpdGUuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICBWdWVSb3V0ZXIoKSxcbiAgICB2dWUoe1xuICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgY29tcGlsZXJPcHRpb25zOiB7XG4gICAgICAgICAgaXNDdXN0b21FbGVtZW50OiAoZWxlbWVudCkgPT4gZWxlbWVudC5zdGFydHNXaXRoKCdpY29uaWZ5LWljb24nKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICAvLyB0YXJnZXRzIHRvIHRyYW5zZm9ybVxuICAgICAgaW5jbHVkZTogW1xuICAgICAgICAvXFwuW3RqXXN4PyQvLCAvLyAudHMsIC50c3gsIC5qcywgLmpzeFxuICAgICAgICAvXFwudnVlJC8sXG4gICAgICAgIC9cXC52dWVcXD92dWUvLCAvLyAudnVlXG4gICAgICAgIC9cXC5tZCQvLCAvLyAubWRcbiAgICAgIF0sXG4gICAgICBpbXBvcnRzOiBbXG4gICAgICAgIC8vIHByZXNldHNcbiAgICAgICAgJ3Z1ZScsXG4gICAgICAgIFZ1ZVJvdXRlckF1dG9JbXBvcnRzLFxuICAgICAgICB7XG4gICAgICAgICAgcGluaWE6IFsnZGVmaW5lU3RvcmUnLCAnc3RvcmVUb1JlZnMnLCAnYWNjZXB0SE1SVXBkYXRlJ10sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgLy8gRmlsZXBhdGggdG8gZ2VuZXJhdGUgY29ycmVzcG9uZGluZyAuZC50cyBmaWxlLlxuICAgICAgLy8gRGVmYXVsdHMgdG8gJy4vYXV0by1pbXBvcnRzLmQudHMnIHdoZW4gYHR5cGVzY3JpcHRgIGlzIGluc3RhbGxlZCBsb2NhbGx5LlxuICAgICAgLy8gU2V0IGBmYWxzZWAgdG8gZGlzYWJsZS5cbiAgICAgIGR0czogdHJ1ZSxcbiAgICAgIC8vIEluY2x1ZGUgYXV0by1pbXBvcnRlZCBwYWNrYWdlcyBpbiBWaXRlJ3MgYG9wdGltaXplRGVwc2Agb3B0aW9uc1xuICAgICAgLy8gUmVjb21tZW5kIHRvIGVuYWJsZVxuICAgICAgdml0ZU9wdGltaXplRGVwczogdHJ1ZSxcbiAgICAgIGRpcnM6IFsnc3JjL3N0b3JlcyddLFxuICAgIH0pLFxuICAgIENvbXBvbmVudHMoe30pLFxuICAgIHZ1ZURldlRvb2xzKCksXG4gIF0sXG4gIGNzczoge1xuICAgIHBvc3Rjc3M6IHtcbiAgICAgIHBsdWdpbnM6IFt0YWlsd2luZCgpLCBhdXRvcHJlZml4ZXIoKV0sXG4gICAgfSxcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICB9LFxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1QsU0FBUyxlQUFlLFdBQVc7QUFFclYsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8saUJBQWlCO0FBRXhCLE9BQU8sZUFBZTtBQUN0QixTQUFTLDRCQUE0QjtBQUVyQyxPQUFPLGNBQWM7QUFDckIsT0FBTyxrQkFBa0I7QUFDekIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFad0ssSUFBTSwyQ0FBMkM7QUFlaFAsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsVUFBVTtBQUFBLElBQ1YsSUFBSTtBQUFBLE1BQ0YsVUFBVTtBQUFBLFFBQ1IsaUJBQWlCO0FBQUEsVUFDZixpQkFBaUIsQ0FBQyxZQUFZLFFBQVEsV0FBVyxjQUFjO0FBQUEsUUFDakU7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUE7QUFBQSxNQUVULFNBQVM7QUFBQSxRQUNQO0FBQUE7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBO0FBQUEsUUFDQTtBQUFBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsU0FBUztBQUFBO0FBQUEsUUFFUDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsVUFDRSxPQUFPLENBQUMsZUFBZSxlQUFlLGlCQUFpQjtBQUFBLFFBQ3pEO0FBQUEsTUFDRjtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BSUEsS0FBSztBQUFBO0FBQUE7QUFBQSxNQUdMLGtCQUFrQjtBQUFBLE1BQ2xCLE1BQU0sQ0FBQyxZQUFZO0FBQUEsSUFDckIsQ0FBQztBQUFBLElBQ0QsV0FBVyxDQUFDLENBQUM7QUFBQSxJQUNiLFlBQVk7QUFBQSxFQUNkO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxTQUFTLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
