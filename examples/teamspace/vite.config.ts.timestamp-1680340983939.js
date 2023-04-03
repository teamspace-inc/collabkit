var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});

// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
__require("dotenv").config();
var TLDRAW_SRC = resolve("/Users/nc/Workspace/collabkit/examples/teamspace", "../../packages/@teamspace/core/src");
var analyticsPlugin = () => {
  return {
    name: "html-transform",
    transformIndexHtml(html) {
      const key = process.env.SEGMENT_WRITE_KEY;
      return html.replace(
        /(<analytics>.*?<\/analytics>)/,
        key ? ` <script>
        !(function () {
          var analytics = (window.analytics = window.analytics || []);
          if (!analytics.initialize)
            if (analytics.invoked)
              window.console && console.error && console.error('Segment snippet included twice.');
            else {
              analytics.invoked = !0;
              analytics.methods = [
                'trackSubmit',
                'trackClick',
                'trackLink',
                'trackForm',
                'pageview',
                'identify',
                'reset',
                'group',
                'track',
                'ready',
                'alias',
                'debug',
                'page',
                'once',
                'off',
                'on',
                'addSourceMiddleware',
                'addIntegrationMiddleware',
                'setAnonymousId',
                'addDestinationMiddleware',
              ];
              analytics.factory = function (e) {
                return function () {
                  var t = Array.prototype.slice.call(arguments);
                  t.unshift(e);
                  analytics.push(t);
                  return analytics;
                };
              };
              for (var e = 0; e < analytics.methods.length; e++) {
                var key = analytics.methods[e];
                analytics[key] = analytics.factory(key);
              }
              analytics.load = function (key, e) {
                var t = document.createElement('script');
                t.type = 'text/javascript';
                t.async = !0;
                t.src = 'https://cdn.segment.com/analytics.js/v1/' + key + '/analytics.min.js';
                var n = document.getElementsByTagName('script')[0];
                n.parentNode.insertBefore(t, n);
                analytics._loadOptions = e;
              };
              analytics._writeKey = '${key}';
              analytics.SNIPPET_VERSION = '4.15.3';
              analytics.load('${key}');
              analytics.page();
            }
        })();
      <\/script>` : "<!-- not production analytics disabled -->"
      );
    }
  };
};
function getFaviconPath(mode) {
  if (mode === "development") {
    return "/src/favicon.development.svg";
  } else if (process.env.VERCEL_ENV === "preview") {
    return "/src/favicon.preview.svg";
  } else {
    return "/src/favicon.svg";
  }
}
var faviconPlugin = (mode) => {
  return {
    name: "replace-favicon",
    transformIndexHtml: {
      enforce: "pre",
      transform() {
        return [
          {
            tag: "link",
            attrs: {
              rel: "icon",
              type: "image/svg+xml",
              href: getFaviconPath(mode)
            },
            injectTo: "head"
          }
        ];
      }
    }
  };
};
var vite_config_default = defineConfig(({ mode }) => ({
  plugins: [react(), tsconfigPaths(), analyticsPlugin(), faviconPlugin(mode)],
  resolve: {
    alias: [
      {
        find: "@tldraw/core",
        replacement: TLDRAW_SRC
      },
      {
        find: "~components",
        replacement: resolve(TLDRAW_SRC, "components")
      },
      {
        find: "~hooks",
        replacement: resolve(TLDRAW_SRC, "hooks")
      },
      {
        find: "~inputs",
        replacement: resolve(TLDRAW_SRC, "inputs")
      },
      {
        find: "~shape-utils",
        replacement: resolve(TLDRAW_SRC, "shape-utils")
      },
      {
        find: "~types",
        replacement: resolve(TLDRAW_SRC, "types")
      },
      {
        find: "~utils",
        replacement: resolve(TLDRAW_SRC, "utils")
      }
    ]
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbInJlcXVpcmUoJ2RvdGVudicpLmNvbmZpZygpO1xuXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZywgUGx1Z2luIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHRzY29uZmlnUGF0aHMgZnJvbSAndml0ZS10c2NvbmZpZy1wYXRocyc7XG5cbmNvbnN0IFRMRFJBV19TUkMgPSByZXNvbHZlKFwiL1VzZXJzL25jL1dvcmtzcGFjZS9jb2xsYWJraXQvZXhhbXBsZXMvdGVhbXNwYWNlXCIsICcuLi8uLi9wYWNrYWdlcy9AdGVhbXNwYWNlL2NvcmUvc3JjJyk7XG5cbmNvbnN0IGFuYWx5dGljc1BsdWdpbiA9ICgpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAnaHRtbC10cmFuc2Zvcm0nLFxuICAgIHRyYW5zZm9ybUluZGV4SHRtbChodG1sOiBzdHJpbmcpIHtcbiAgICAgIGNvbnN0IGtleSA9IHByb2Nlc3MuZW52LlNFR01FTlRfV1JJVEVfS0VZO1xuICAgICAgcmV0dXJuIGh0bWwucmVwbGFjZShcbiAgICAgICAgLyg8YW5hbHl0aWNzPi4qPzxcXC9hbmFseXRpY3M+KS8sXG4gICAgICAgIGtleVxuICAgICAgICAgID8gYCA8c2NyaXB0PlxuICAgICAgICAhKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgYW5hbHl0aWNzID0gKHdpbmRvdy5hbmFseXRpY3MgPSB3aW5kb3cuYW5hbHl0aWNzIHx8IFtdKTtcbiAgICAgICAgICBpZiAoIWFuYWx5dGljcy5pbml0aWFsaXplKVxuICAgICAgICAgICAgaWYgKGFuYWx5dGljcy5pbnZva2VkKVxuICAgICAgICAgICAgICB3aW5kb3cuY29uc29sZSAmJiBjb25zb2xlLmVycm9yICYmIGNvbnNvbGUuZXJyb3IoJ1NlZ21lbnQgc25pcHBldCBpbmNsdWRlZCB0d2ljZS4nKTtcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBhbmFseXRpY3MuaW52b2tlZCA9ICEwO1xuICAgICAgICAgICAgICBhbmFseXRpY3MubWV0aG9kcyA9IFtcbiAgICAgICAgICAgICAgICAndHJhY2tTdWJtaXQnLFxuICAgICAgICAgICAgICAgICd0cmFja0NsaWNrJyxcbiAgICAgICAgICAgICAgICAndHJhY2tMaW5rJyxcbiAgICAgICAgICAgICAgICAndHJhY2tGb3JtJyxcbiAgICAgICAgICAgICAgICAncGFnZXZpZXcnLFxuICAgICAgICAgICAgICAgICdpZGVudGlmeScsXG4gICAgICAgICAgICAgICAgJ3Jlc2V0JyxcbiAgICAgICAgICAgICAgICAnZ3JvdXAnLFxuICAgICAgICAgICAgICAgICd0cmFjaycsXG4gICAgICAgICAgICAgICAgJ3JlYWR5JyxcbiAgICAgICAgICAgICAgICAnYWxpYXMnLFxuICAgICAgICAgICAgICAgICdkZWJ1ZycsXG4gICAgICAgICAgICAgICAgJ3BhZ2UnLFxuICAgICAgICAgICAgICAgICdvbmNlJyxcbiAgICAgICAgICAgICAgICAnb2ZmJyxcbiAgICAgICAgICAgICAgICAnb24nLFxuICAgICAgICAgICAgICAgICdhZGRTb3VyY2VNaWRkbGV3YXJlJyxcbiAgICAgICAgICAgICAgICAnYWRkSW50ZWdyYXRpb25NaWRkbGV3YXJlJyxcbiAgICAgICAgICAgICAgICAnc2V0QW5vbnltb3VzSWQnLFxuICAgICAgICAgICAgICAgICdhZGREZXN0aW5hdGlvbk1pZGRsZXdhcmUnLFxuICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICBhbmFseXRpY3MuZmFjdG9yeSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHZhciB0ID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgIHQudW5zaGlmdChlKTtcbiAgICAgICAgICAgICAgICAgIGFuYWx5dGljcy5wdXNoKHQpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGFuYWx5dGljcztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBmb3IgKHZhciBlID0gMDsgZSA8IGFuYWx5dGljcy5tZXRob2RzLmxlbmd0aDsgZSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGFuYWx5dGljcy5tZXRob2RzW2VdO1xuICAgICAgICAgICAgICAgIGFuYWx5dGljc1trZXldID0gYW5hbHl0aWNzLmZhY3Rvcnkoa2V5KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBhbmFseXRpY3MubG9hZCA9IGZ1bmN0aW9uIChrZXksIGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICAgICAgICAgIHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgICAgICAgICAgICAgIHQuYXN5bmMgPSAhMDtcbiAgICAgICAgICAgICAgICB0LnNyYyA9ICdodHRwczovL2Nkbi5zZWdtZW50LmNvbS9hbmFseXRpY3MuanMvdjEvJyArIGtleSArICcvYW5hbHl0aWNzLm1pbi5qcyc7XG4gICAgICAgICAgICAgICAgdmFyIG4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gICAgICAgICAgICAgICAgbi5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0LCBuKTtcbiAgICAgICAgICAgICAgICBhbmFseXRpY3MuX2xvYWRPcHRpb25zID0gZTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgYW5hbHl0aWNzLl93cml0ZUtleSA9ICcke2tleX0nO1xuICAgICAgICAgICAgICBhbmFseXRpY3MuU05JUFBFVF9WRVJTSU9OID0gJzQuMTUuMyc7XG4gICAgICAgICAgICAgIGFuYWx5dGljcy5sb2FkKCcke2tleX0nKTtcbiAgICAgICAgICAgICAgYW5hbHl0aWNzLnBhZ2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcbiAgICAgIDwvc2NyaXB0PmBcbiAgICAgICAgICA6ICc8IS0tIG5vdCBwcm9kdWN0aW9uIGFuYWx5dGljcyBkaXNhYmxlZCAtLT4nXG4gICAgICApO1xuICAgIH0sXG4gIH07XG59O1xuXG5mdW5jdGlvbiBnZXRGYXZpY29uUGF0aChtb2RlOiBzdHJpbmcpIHtcbiAgaWYgKG1vZGUgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICByZXR1cm4gJy9zcmMvZmF2aWNvbi5kZXZlbG9wbWVudC5zdmcnO1xuICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52LlZFUkNFTF9FTlYgPT09ICdwcmV2aWV3Jykge1xuICAgIHJldHVybiAnL3NyYy9mYXZpY29uLnByZXZpZXcuc3ZnJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJy9zcmMvZmF2aWNvbi5zdmcnO1xuICB9XG59XG5cbmNvbnN0IGZhdmljb25QbHVnaW4gPSAobW9kZTogc3RyaW5nKTogUGx1Z2luID0+IHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAncmVwbGFjZS1mYXZpY29uJyxcbiAgICB0cmFuc2Zvcm1JbmRleEh0bWw6IHtcbiAgICAgIGVuZm9yY2U6ICdwcmUnLFxuICAgICAgdHJhbnNmb3JtKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRhZzogJ2xpbmsnLFxuICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgcmVsOiAnaWNvbicsXG4gICAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9zdmcreG1sJyxcbiAgICAgICAgICAgICAgaHJlZjogZ2V0RmF2aWNvblBhdGgobW9kZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5qZWN0VG86ICdoZWFkJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdO1xuICAgICAgfSxcbiAgICB9LFxuICB9O1xufTtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpLCB0c2NvbmZpZ1BhdGhzKCksIGFuYWx5dGljc1BsdWdpbigpLCBmYXZpY29uUGx1Z2luKG1vZGUpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiBbXG4gICAgICAvLyB0bGRyYXcgYWxpYXNlc1xuICAgICAge1xuICAgICAgICBmaW5kOiAnQHRsZHJhdy9jb3JlJyxcbiAgICAgICAgcmVwbGFjZW1lbnQ6IFRMRFJBV19TUkMsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBmaW5kOiAnfmNvbXBvbmVudHMnLFxuICAgICAgICByZXBsYWNlbWVudDogcmVzb2x2ZShUTERSQVdfU1JDLCAnY29tcG9uZW50cycpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZmluZDogJ35ob29rcycsXG4gICAgICAgIHJlcGxhY2VtZW50OiByZXNvbHZlKFRMRFJBV19TUkMsICdob29rcycpLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZmluZDogJ35pbnB1dHMnLFxuICAgICAgICByZXBsYWNlbWVudDogcmVzb2x2ZShUTERSQVdfU1JDLCAnaW5wdXRzJyksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBmaW5kOiAnfnNoYXBlLXV0aWxzJyxcbiAgICAgICAgcmVwbGFjZW1lbnQ6IHJlc29sdmUoVExEUkFXX1NSQywgJ3NoYXBlLXV0aWxzJyksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBmaW5kOiAnfnR5cGVzJyxcbiAgICAgICAgcmVwbGFjZW1lbnQ6IHJlc29sdmUoVExEUkFXX1NSQywgJ3R5cGVzJyksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBmaW5kOiAnfnV0aWxzJyxcbiAgICAgICAgcmVwbGFjZW1lbnQ6IHJlc29sdmUoVExEUkFXX1NSQywgJ3V0aWxzJyksXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG59KSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7QUFFQSxTQUFTLGVBQWU7QUFFeEIsU0FBUyxvQkFBNEI7QUFDckMsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sbUJBQW1CO0FBTjFCLFVBQVEsVUFBVSxPQUFPO0FBUXpCLElBQU0sYUFBYSxRQUFRLG9EQUFvRCxvQ0FBb0M7QUFFbkgsSUFBTSxrQkFBa0IsTUFBTTtBQUM1QixTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixtQkFBbUIsTUFBYztBQUMvQixZQUFNLE1BQU0sUUFBUSxJQUFJO0FBQ3hCLGFBQU8sS0FBSztBQUFBLFFBQ1Y7QUFBQSxRQUNBLE1BQ0k7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUNBbUQyQjtBQUFBO0FBQUEsZ0NBRVA7QUFBQTtBQUFBO0FBQUE7QUFBQSxvQkFLcEI7QUFBQSxNQUNOO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQUVBLFNBQVMsZUFBZSxNQUFjO0FBQ3BDLE1BQUksU0FBUyxlQUFlO0FBQzFCLFdBQU87QUFBQSxFQUNULFdBQVcsUUFBUSxJQUFJLGVBQWUsV0FBVztBQUMvQyxXQUFPO0FBQUEsRUFDVCxPQUFPO0FBQ0wsV0FBTztBQUFBLEVBQ1Q7QUFDRjtBQUVBLElBQU0sZ0JBQWdCLENBQUMsU0FBeUI7QUFDOUMsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sb0JBQW9CO0FBQUEsTUFDbEIsU0FBUztBQUFBLE1BQ1QsWUFBWTtBQUNWLGVBQU87QUFBQSxVQUNMO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsY0FDTCxLQUFLO0FBQUEsY0FDTCxNQUFNO0FBQUEsY0FDTixNQUFNLGVBQWUsSUFBSTtBQUFBLFlBQzNCO0FBQUEsWUFDQSxVQUFVO0FBQUEsVUFDWjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQUdBLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsU0FBUyxDQUFDLE1BQU0sR0FBRyxjQUFjLEdBQUcsZ0JBQWdCLEdBQUcsY0FBYyxJQUFJLENBQUM7QUFBQSxFQUMxRSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFFTDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYTtBQUFBLE1BQ2Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhLFFBQVEsWUFBWSxZQUFZO0FBQUEsTUFDL0M7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhLFFBQVEsWUFBWSxPQUFPO0FBQUEsTUFDMUM7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhLFFBQVEsWUFBWSxRQUFRO0FBQUEsTUFDM0M7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhLFFBQVEsWUFBWSxhQUFhO0FBQUEsTUFDaEQ7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhLFFBQVEsWUFBWSxPQUFPO0FBQUEsTUFDMUM7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhLFFBQVEsWUFBWSxPQUFPO0FBQUEsTUFDMUM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
