import dotenv from 'dotenv';
dotenv.config({ path: '../../env/.env.local' });
import { resolve } from 'path';

import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

const TLDRAW_SRC = resolve(__dirname, '../../packages/@teamspace/core/src');

const analyticsPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html: string) {
      const key = process.env.SEGMENT_WRITE_KEY;
      return html.replace(
        /(<analytics>.*?<\/analytics>)/,
        key
          ? ` <script>
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
      </script>`
          : '<!-- not production analytics disabled -->'
      );
    },
  };
};

function getFaviconPath(mode: string) {
  if (mode === 'development') {
    return '/src/favicon.development.svg';
  } else if (process.env.VERCEL_ENV === 'preview') {
    return '/src/favicon.preview.svg';
  } else {
    return '/src/favicon.svg';
  }
}

const faviconPlugin = (mode: string): Plugin => {
  return {
    name: 'replace-favicon',
    transformIndexHtml: {
      enforce: 'pre',
      transform() {
        return [
          {
            tag: 'link',
            attrs: {
              rel: 'icon',
              type: 'image/svg+xml',
              href: getFaviconPath(mode),
            },
            injectTo: 'head',
          },
        ];
      },
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tsconfigPaths(), analyticsPlugin(), faviconPlugin(mode)],
  resolve: {
    alias: [
      // tldraw aliases
      {
        find: '@tldraw/core',
        replacement: TLDRAW_SRC,
      },
      {
        find: '~components',
        replacement: resolve(TLDRAW_SRC, 'components'),
      },
      {
        find: '~hooks',
        replacement: resolve(TLDRAW_SRC, 'hooks'),
      },
      {
        find: '~inputs',
        replacement: resolve(TLDRAW_SRC, 'inputs'),
      },
      {
        find: '~shape-utils',
        replacement: resolve(TLDRAW_SRC, 'shape-utils'),
      },
      {
        find: '~types',
        replacement: resolve(TLDRAW_SRC, 'types'),
      },
      {
        find: '~utils',
        replacement: resolve(TLDRAW_SRC, 'utils'),
      },
    ],
  },
}));
