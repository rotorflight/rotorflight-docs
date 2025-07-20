// @ts-check

import { themes } from "prism-react-renderer";
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
export default {
  title: "Rotorflight",
  tagline: "Open-source Helicopter flight controller",
  favicon: "img/rffavicon.ico",

  url: "https://github.com/",
  baseUrl: "/",
  trailingSlash: false,

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],

  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      /** @type {import('@docusaurus/plugin-client-redirects').Options} */
      ({
        fromExtensions: ["html", "htm"],
        toExtensions: ["exe", "zip"],
        redirects: [
          //Redirect Rotorflight v2.0 configurator links to new website links
          {
            from: "/docs/Tutorial-Setup/Configuration",
            to: "/docs/2.0.0/Wiki/Configurator/Configuration",
          },
          {
            from: "/docs/Tutorial-Setup/Receiver",
            to: "/docs/2.0.0/Wiki/Configurator/Receiver",
          },
          {
            from: "/docs/Tutorial-Setup/Failsafe",
            to: "/docs/2.0.0/Wiki/Configurator/Failsafe",
          },
          {
            from: "/docs/Tutorial-Setup/Beepers",
            to: "/docs/2.0.0/Wiki/Configurator/Beepers",
          },
          {
            from: "/docs/Tutorial-Setup/Power",
            to: "/docs/2.0.0/Wiki/Configurator/Power",
          },
          {
            from: "/docs/Tutorial-Setup/RPM-Filters",
            to: "/docs/2.0.0/Wiki/Tutorial-Setup/RPM-Filters",
          },
          {
            from: "/docs/Tutorial-Setup/Motor-and-Esc",
            to: "/docs/2.0.0/Wiki/Configurator/Motor-and-Esc",
          },
          {
            from: "/docs/Tutorial-Setup/Servos",
            to: "/docs/2.0.0/Wiki/Configurator/Servos",
          },
          {
            from: "/docs/Tutorial-Setup/Mixer",
            to: "/docs/2.0.0/Wiki/Configurator/Mixer",
          },
          {
            from: "/docs/Tutorial-Setup/Rates",
            to: "/docs/2.0.0/Wiki/Configurator/Rates",
          },
          {
            from: "/docs/Tutorial-Setup/Profiles",
            to: "/docs/2.0.0/Wiki/Configurator/Profiles",
          },
          {
            from: "/docs/Tutorial-Setup/Modes",
            to: "/docs/2.0.0/Wiki/Configurator/Modes",
          },
          {
            from: "/docs/Tutorial-Setup/Adjustments",
            to: "/docs/2.0.0/Wiki/Configurator/Adjustments",
          },
          {
            from: "/docs/Tutorial-Setup/Sensors",
            to: "/docs/2.0.0/Wiki/Configurator/Sensors",
          },
          {
            from: "/docs/Tutorial-Setup/Blackbox",
            to: "/docs/2.0.0/Wiki/Configurator/Blackbox",
          },
          {
            from: "/docs/Tutorial-Setup/CLI",
            to: "/docs/2.0.0/Wiki/Configurator/CLI",
          },

          //Redirect for Radio setups to point to downloads
          {
            from: "/docs/next/setup/radio-setup/radio-setup-edgetx/lua-RF2",
            to: "/docs/download/edge-tx-Lua",
          },
        ],

        createRedirects(existingPath) {
          if (existingPath.includes("/docs/Wiki")) {
            return [existingPath.replace("/docs/Wiki", "/docs/2.0.0/Wiki")];
          }

          if (existingPath.includes("/docs/configurator")) {
            return [
              existingPath.replace(
                "/docs/configurator",
                "/docs/2.2.0/configurator",
              ),
            ];
          }

          if (existingPath.includes("/docs/next")) {
            return [existingPath.replace("/docs/next", "/docs/2.3.0")];
          }
        },
      }),
    ],
    "docusaurus-lunr-search",
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/rotorflight/rotorflight-docs/tree/main",
        },
        blog: {
          routeBasePath: "announcement",
          path: "./announcement",
          showReadingTime: true,
          onUntruncatedBlogPosts: "ignore",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      announcementBar: {
        id: "Announcement",
        content:
          "ROTORFLIGHT 2 Official Release 2.2.0 is now available. See downloads tab",
        backgroundColor: "#FE9900",
        textColor: "#000000",
        isCloseable: false,
      },

      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Rotorflight",
        logo: {
          alt: "My Site Logo",
          src: "img/Rotorflight_outline.svg",
          srcDark: "img/Rotorflight_outline_dark.svg",
        },
        items: [
          { to: "/announcement", label: "Announcements", position: "left" },
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Tutorial",
          },
          {
            type: "docSidebar",
            sidebarId: "ControllerSidebar",
            position: "left",
            label: "Download",
          },
          {
            type: "docSidebar",
            sidebarId: "manufactSidebar",
            position: "left",
            label: "Manufacturers",
          },
          {
            type: "docSidebar",
            sidebarId: "tuningSidebar",
            position: "left",
            label: "Tuning",
          },
          {
            type: "docSidebar",
            sidebarId: "developSidebar",
            position: "left",
            label: "Contributing",
          },
          {
            type: "docsVersionDropdown",
            position: "right",
          },
          {
            href: "https://www.rotorflight.org/donate",
            label: "Support Us",
            position: "right",
          },
          {
            href: "https://github.com/rotorflight",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        logo: {
          src: "img/Rotorflight_outline.png",
          width: 90,
          height: 50,
        },
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/examples",
              },
              {
                label: "Download",
                to: "/docs/download/configurator",
              },
              {
                label: "Manufacturers",
                to: "/docs/Manufacturers/intro",
              },
              {
                label: "Tuning",
                to: "/docs/Tuning/First-Flight-Filter-Tuning",
              },
              {
                label: "Contributing",
                to: "/docs/Contributing/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discord.gg/6QUySXdEvd",
              },
              {
                label: "RC Groups",
                href: "https://www.rcgroups.com/forums/showthread.php?4000345-Rotorflight-Flight-Control-%28FBL%29-Software-Official-discussion",
              },
            ],
          },
          {
            title: "Support Us",
            items: [
              {
                label: "Donate to Rotorflight",
                href: "https://www.rotorflight.org/donate",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/rotorflight",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Team Rotorflight. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};
