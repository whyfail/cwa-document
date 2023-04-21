//@ts-check
//注意：类型注释允许类型检查和IDE自动完成

const lightCodeTheme = require("prism-react-renderer/themes/github")
const darkCodeTheme = require("prism-react-renderer/themes/dracula")

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "create-wl-app",
  tagline: "一个开箱即用的脚手架",
  favicon: "img/favicon.ico",

  // 在此处设置网站的生产网址
  url: "http://whyfail.gitee.io",
  //设置为您的站点提供服务的/<baseUrl>/路径名
  //对于GitHub页面部署，通常是'/<project ectName>/'
  baseUrl: "/cwa-document/",

  //GitHub页面部署配置。
  //如果您不使用GitHub页面，则不需要这些。
  organizationName: "wu lei", // 通常是您的GitHub组织/用户名。
  projectName: "cwa-document", // 通常您的回购名称

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  //即使不使用内部化，也可以使用该字段设置有用
  //像html lang这样的元数据。例如，如果你的网站是中文的，你可能需要
  //将“en”替换为“zh-Hans”。
  i18n: {
    defaultLocale: "zh-Hans",
    locales: ["zh-Hans"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          //请将其更改为您的repo。
          //删除它以删除“编辑此页面”链接。
          editUrl: "https://gitee.com/whyfail/cwa-document/tree/master/",
        },
        blog: {
          showReadingTime: true,
          //请将其更改为您的repo。
          //删除它以删除“编辑此页面”链接。
          editUrl: "https://gitee.com/whyfail/cwa-document/tree/master/",
          blogSidebarTitle: "近期更新",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // 替换为您项目的社交卡
      image: "https://foruda.gitee.com/avatar/1677070687074089995/6553774_python_golang_1584013029.png!avatar100",
      navbar: {
        title: "create-wl-app",
        logo: {
          alt: "create-wl-app",
          src: "https://foruda.gitee.com/avatar/1677070687074089995/6553774_python_golang_1584013029.png!avatar100",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "主要功能",
          },
          { to: "/blog", label: "更新日志", position: "left" },
          {
            href: "https://gitee.com/whyfail",
            label: "GitTree",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "文档",
            items: [
              {
                label: "教程",
                to: "/docs/intro",
              },
              {
                label: "更新日志",
                to: "/blog",
              },
            ],
          },
          {
            title: "社区",
            items: [
              {
                label: "CSDN",
                href: "https://why404.blog.csdn.net/",
              },
            ],
          },
          {
            title: "更多",
            items: [
              {
                label: "GitTee",
                href: "https://gitee.com/whyfail",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} create-wl-app, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config
