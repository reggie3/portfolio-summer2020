module.exports = {
  siteMetadata: {
    title: `Reginald Johnson's Portfolio`,
    description: `My Summer 2020 portfolio site`,
    author: `Reginald Johnson`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-workerize-loader",
      options: {
        preloads: ["performCalculations"],
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-remark-images`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 960,
            },
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: {
              showLineNumbers: true,
            },
          },
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
          `gatsby-remark-responsive-iframe`,
        ],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/src/content/blogPosts/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: { trackingId: "UA-79894782-1" },
    },
    {
      resolve: "gatsby-plugin-google-fonts",
      options: {
        fonts: ["roboto:400,400i,500,700"],
      },
    },

    {
      resolve: "gatsby-plugin-emoji-favicon",
      options: {
        emoji: "🛫",
      },
    },

    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
