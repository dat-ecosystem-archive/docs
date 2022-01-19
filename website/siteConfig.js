/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://dat-logo-small.pngdocs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
// const users = [
//   {
//     caption: 'User1',
//     // You will need to prepend the image path with your baseUrl
//     // if it is not '/', like: '/test-site/img/dat-logo-small.png'.
//     image: '/img/dat-logo-small.png',
//     infoLink: 'https://datproject.org',
//     pinned: true,
//   },
// ];

const siteConfig = {
  title: 'Dat Docs', // Title for your website.
  tagline: 'User Docs for the Dat Ecosystem',
  url: 'https://docs.datproject.org', // Your website URL
  baseUrl: '/', // Base URL for your project */

  // Used for publishing and more
  projectName: 'dat-docs',
  organizationName: 'datproject',

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'intro', label: 'Docs'},
    {doc: 'install', label: 'Install'},
    {page: 'help', label: 'Help'},
    {href: 'https://blog.dat-ecosystem.org', label: 'Blog'}
  ],

  // If you have users set above, you add it here:
  // users,

  /* path to images for header/footer */
  headerIcon: 'img/dat-logo-small.png',
  footerIcon: 'img/dat-logo-small.png',
  favicon: 'img/favicon.ico',

  /* Colors for website */
  colors: {
    primaryColor: '#045943',
    secondaryColor: '#293648',
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Dat Project Contributors`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/dat-logo-small.png',
  twitterImage: 'img/dat-logo-small.png',

  // base url to edit files
  editUrl: 'https://github.com/datproject/docs/edit/master/docs/',

  // Show documentation's last contributor's name.
  enableUpdateBy: true,

  // Show documentation's last update time.
  enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  repoUrl: 'https://github.com/datproject/dat',
};

module.exports = siteConfig;
