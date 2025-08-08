import { footnote } from '@mdit/plugin-footnote';
import { ruby } from '@mdit/plugin-ruby';
import VueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath } from 'node:url';
import Unocss from 'unocss/vite';
import { defineConfig } from 'vitepress';
import { generateSidebar, VitePressSidebarOptions } from 'vitepress-sidebar';
import imgPlugin from './plugins/imgPlugin';

const rootLocale = 'en-US';
const commonSidebarConfigs: Partial<VitePressSidebarOptions> = {
  useTitleFromFrontmatter: true,
  useFolderTitleFromIndexFile: true,
  useFolderLinkFromIndexFile: true,
  useTitleFromFileHeading: true,
  collapsed: true,
};

const supportedLocales = [rootLocale, 'zh-CN'] as const;

const sidebarConfigs = supportedLocales.map((lang) => {
  return {
    ...commonSidebarConfigs,
    ...(rootLocale === lang ? {} : { basePath: `/${lang}/` }), // If using `rewrites` option
    documentRootPath: `content/${lang}`,
    resolvePath: rootLocale === lang ? '/' : `/${lang}/`,
  };
});

// https://vitepress.dev/reference/site-config
const vitePressConfig = defineConfig({
  title: 'Blossom Selves',
  description:
    'A community for East-Asian and East-Asian Canadian transgender and gender diverse people. An Ontario registered not-for-profit corporation.',
  cleanUrls: true,
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: {},
    },
    'zh-CN': {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        nav: [
          { text: '关于我们', link: '/zh-CN/about' },
          { text: '联系·支持', link: '/zh-CN/contact' },
          { text: '文档资源', link: '/zh-CN/docs' },
          { text: '活动日历', link: '/zh-CN/events' },
          { text: '团队成员', link: '/zh-CN/people' },
          { text: '通知公告', link: '/zh-CN/posts' },
        ],
        footer: {
          message:
            '若无特殊说明，本站内容以 <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">知识共享 署名 4.0</a> 协议授权',
          copyright: '2025-NOW Blossom Selves Support',
        },
      },
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'About', link: '/about' },
      { text: 'Contact & Support', link: '/contact' },
      { text: 'Docs & Resources', link: '/docs' },
      { text: 'Events', link: '/events' },
      { text: 'People', link: '/people' },
      { text: 'Announcements', link: '/posts' },
    ],
    logo: '/assets/blsv-logo.png',

    sidebar: generateSidebar(sidebarConfigs),

    footer: {
      message:
        'Licensed under <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a> unless otherwise specified',
      copyright: '2025-NOW Blossom Selves Support',
    },

    socialLinks: [
      { icon: 'instagram', link: 'https://instagram.com/', ariaLabel: 'Instagram' },
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.1117 4.49449C23.4296 2.94472 21.9074 1.65683 20.4317 2.227L2.3425 9.21601C0.694517 9.85273 0.621087 12.1572 2.22518 12.8975L6.1645 14.7157L8.03849 21.2746C8.13583 21.6153 8.40618 21.8791 8.74917 21.968C9.09216 22.0568 9.45658 21.9576 9.70712 21.707L12.5938 18.8203L16.6375 21.8531C17.8113 22.7334 19.5019 22.0922 19.7967 20.6549L23.1117 4.49449ZM3.0633 11.0816L21.1525 4.0926L17.8375 20.2531L13.1 16.6999C12.7019 16.4013 12.1448 16.4409 11.7929 16.7928L10.5565 18.0292L10.928 15.9861L18.2071 8.70703C18.5614 8.35278 18.5988 7.79106 18.2947 7.39293C17.9906 6.99479 17.4389 6.88312 17.0039 7.13168L6.95124 12.876L3.0633 11.0816ZM8.17695 14.4791L8.78333 16.6015L9.01614 15.321C9.05253 15.1209 9.14908 14.9366 9.29291 14.7928L11.5128 12.573L8.17695 14.4791Z"/></svg>',
        },
        link: 'https://t.me/s/',
        ariaLabel: 'Telegram',
      },
      {
        icon: 'twitter',
        link: 'https://x.com/',
        ariaLabel: 'X/Formerly Twitter',
      },
      { icon: 'youtube', link: 'https://www.youtube.com/@', ariaLabel: 'YouTube' },
      { icon: 'github', link: 'https://github.com/blossom-selves', ariaLabel: 'GitHub' },
    ],
  },
  rewrites: {
    'en-US/:rest*': ':rest*',
  },

  vite: {
    plugins: [VueJsx(), Unocss()],
    server: { host: '0.0.0.0' },
    css: { preprocessorOptions: { sass: { api: 'modern' } } },
    resolve: {
      alias: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('../', import.meta.url)),
        },
        {
          find: /^.*\/VPHome\.vue$/,
          replacement: fileURLToPath(new URL('./theme/OurHome.vue', import.meta.url)),
        },
      ],
    },
  },
  markdown: {
    config: (md) => {
      md.use(imgPlugin);
      md.use(footnote);
      md.use(ruby);
    },
  },
});

// http://localhost:5173/content/zh-CN/posts/statement-linux-foundation
// http://localhost:5173/zh-CN/posts/statement-linux-foundation
export default vitePressConfig;
