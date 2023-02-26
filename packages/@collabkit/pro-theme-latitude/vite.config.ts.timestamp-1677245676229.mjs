// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "file:///Users/nc/Workspace/collabkit/node_modules/vite/dist/node/index.js";
import react from "file:///Users/nc/Workspace/collabkit/node_modules/@vitejs/plugin-react/dist/index.mjs";
import replace from "file:///Users/nc/Workspace/collabkit/node_modules/@rollup/plugin-replace/dist/es/index.js";
import { vanillaExtractPlugin } from "file:///Users/nc/Workspace/collabkit/node_modules/@vanilla-extract/vite-plugin/dist/vanilla-extract-vite-plugin.cjs.js";
var __vite_injected_original_dirname = "/Users/nc/Workspace/collabkit/packages/@collabkit/pro-theme-latitude";
var vite_config_default = defineConfig(({ mode }) => {
  const plugins = [react(), vanillaExtractPlugin()];
  if (mode === "production") {
    plugins.push(
      replace({ "process.env.NODE_ENV": JSON.stringify("production"), preventAssignment: true })
    );
  }
  return {
    plugins,
    build: {
      lib: {
        entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
        fileName: "collabkit-latitude",
        formats: ["es"]
      },
      rollupOptions: {
        external: ["react", "react-dom", "@collabkit/react"],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            react: "React",
            "react-dom": "ReactDOM"
          }
        }
      }
    },
    resolve: {
      alias: {
        "@collabkit/react": resolve(__vite_injected_original_dirname, "../react/src/index.ts")
      }
    },
    server: {
      port: 3003
    },
    envDir: resolve(__vite_injected_original_dirname, "../../../env")
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbmMvV29ya3NwYWNlL2NvbGxhYmtpdC9wYWNrYWdlcy9AY29sbGFia2l0L3Byby10aGVtZS1sYXRpdHVkZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL25jL1dvcmtzcGFjZS9jb2xsYWJraXQvcGFja2FnZXMvQGNvbGxhYmtpdC9wcm8tdGhlbWUtbGF0aXR1ZGUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL25jL1dvcmtzcGFjZS9jb2xsYWJraXQvcGFja2FnZXMvQGNvbGxhYmtpdC9wcm8tdGhlbWUtbGF0aXR1ZGUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgcmVwbGFjZSBmcm9tICdAcm9sbHVwL3BsdWdpbi1yZXBsYWNlJztcbmltcG9ydCB7IHZhbmlsbGFFeHRyYWN0UGx1Z2luIH0gZnJvbSAnQHZhbmlsbGEtZXh0cmFjdC92aXRlLXBsdWdpbic7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIGNvbnN0IHBsdWdpbnMgPSBbcmVhY3QoKSwgdmFuaWxsYUV4dHJhY3RQbHVnaW4oKV07XG5cbiAgaWYgKG1vZGUgPT09ICdwcm9kdWN0aW9uJykge1xuICAgIHBsdWdpbnMucHVzaChcbiAgICAgIHJlcGxhY2UoeyAncHJvY2Vzcy5lbnYuTk9ERV9FTlYnOiBKU09OLnN0cmluZ2lmeSgncHJvZHVjdGlvbicpLCBwcmV2ZW50QXNzaWdubWVudDogdHJ1ZSB9KVxuICAgICk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHBsdWdpbnMsXG4gICAgYnVpbGQ6IHtcbiAgICAgIGxpYjoge1xuICAgICAgICBlbnRyeTogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvaW5kZXgudHMnKSxcbiAgICAgICAgZmlsZU5hbWU6ICdjb2xsYWJraXQtbGF0aXR1ZGUnLFxuICAgICAgICBmb3JtYXRzOiBbJ2VzJ10sXG4gICAgICB9LFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICBleHRlcm5hbDogWydyZWFjdCcsICdyZWFjdC1kb20nLCAnQGNvbGxhYmtpdC9yZWFjdCddLFxuICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAvLyBQcm92aWRlIGdsb2JhbCB2YXJpYWJsZXMgdG8gdXNlIGluIHRoZSBVTUQgYnVpbGRcbiAgICAgICAgICAvLyBmb3IgZXh0ZXJuYWxpemVkIGRlcHNcbiAgICAgICAgICBnbG9iYWxzOiB7XG4gICAgICAgICAgICByZWFjdDogJ1JlYWN0JyxcbiAgICAgICAgICAgICdyZWFjdC1kb20nOiAnUmVhY3RET00nLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0Bjb2xsYWJraXQvcmVhY3QnOiByZXNvbHZlKF9fZGlybmFtZSwgJy4uL3JlYWN0L3NyYy9pbmRleC50cycpLFxuICAgICAgfSxcbiAgICB9LFxuXG4gICAgc2VydmVyOiB7XG4gICAgICBwb3J0OiAzMDAzLFxuICAgIH0sXG4gICAgZW52RGlyOiByZXNvbHZlKF9fZGlybmFtZSwgJy4uLy4uLy4uL2VudicpLFxuICB9O1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThYLFNBQVMsZUFBZTtBQUN0WixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFdBQVc7QUFDbEIsT0FBTyxhQUFhO0FBQ3BCLFNBQVMsNEJBQTRCO0FBSnJDLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFFBQU0sVUFBVSxDQUFDLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQztBQUVoRCxNQUFJLFNBQVMsY0FBYztBQUN6QixZQUFRO0FBQUEsTUFDTixRQUFRLEVBQUUsd0JBQXdCLEtBQUssVUFBVSxZQUFZLEdBQUcsbUJBQW1CLEtBQUssQ0FBQztBQUFBLElBQzNGO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxLQUFLO0FBQUEsUUFDSCxPQUFPLFFBQVEsa0NBQVcsY0FBYztBQUFBLFFBQ3hDLFVBQVU7QUFBQSxRQUNWLFNBQVMsQ0FBQyxJQUFJO0FBQUEsTUFDaEI7QUFBQSxNQUNBLGVBQWU7QUFBQSxRQUNiLFVBQVUsQ0FBQyxTQUFTLGFBQWEsa0JBQWtCO0FBQUEsUUFDbkQsUUFBUTtBQUFBO0FBQUE7QUFBQSxVQUdOLFNBQVM7QUFBQSxZQUNQLE9BQU87QUFBQSxZQUNQLGFBQWE7QUFBQSxVQUNmO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxvQkFBb0IsUUFBUSxrQ0FBVyx1QkFBdUI7QUFBQSxNQUNoRTtBQUFBLElBQ0Y7QUFBQSxJQUVBLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUEsSUFDQSxRQUFRLFFBQVEsa0NBQVcsY0FBYztBQUFBLEVBQzNDO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
