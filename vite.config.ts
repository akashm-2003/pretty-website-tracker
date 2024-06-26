import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import copy from 'rollup-plugin-copy';
import { defineConfig } from 'vite';
import webExtension, { readJsonFile } from 'vite-plugin-web-extension';

const APPID_CHROME = 'hhfnghjdeddcfegfekjeihfmbjenlomm';
const browser = process.env.TARGET || 'chrome';

function generateManifest() {
  const manifest = readJsonFile('src/manifest.json');
  const pkg = readJsonFile('package.json');
  return {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    ...manifest,
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    assetsInlineLimit: 1024,
    rollupOptions: {
      output: {
        assetFileNames: assetInfo => {
          let extType = assetInfo.name.split('.').at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'icons';
          }
          return `assets/${extType}/[name][extname]`;
        },
      },
    },

    emptyOutDir: false,
    sourcemap: mode === 'development' ? 'inline' : false,
    minify: mode === 'development' ? false : true,
  },
  define: {
    'process.env': process.env,
    __EXTENSION_MODE__: JSON.stringify(mode),
    __DEV__: mode === 'development',
    __PROD__: mode === 'production',
    __APP_ID__: JSON.stringify(APPID_CHROME),
    __BROWSER__: JSON.stringify(browser),
  },
  plugins: [
    vue(),
    VueI18nPlugin({
      include: path.resolve(__dirname, '..', 'src/assets/_locales/*'),
    }),
    webExtension({
      manifest: generateManifest,
      watchFilePaths: ['package.json', 'manifest.json'],
      additionalInputs: ['src/block.html', 'src/dashboard.html'],
    }),
    copy({
      targets: [
        { src: 'src/_locales', dest: 'dist' },
       
      ],
    }),
  ],
  optimizeDeps: {
    include: ['vue', 'webextension-polyfill'],
  },
}));
