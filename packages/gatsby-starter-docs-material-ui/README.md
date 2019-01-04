<div align="center">
    <img src="https://6star.pw/ios/ios-appicon-76-76.png" alt="6star logo" width="76" style="margin-right: 20px;">
    <img src="https://material-ui.com/static/images/material-ui-logo.svg" alt="Material-UI logo" width="76" style="padding-right: 20px;">
    <img src="https://raw.githubusercontent.com/jsstyles/logo/master/logo.png" alt="JSS logo" width="76" style="padding-right: 20px;">
</div>

# Gatsby Documentation Site Starter with Material-UI
NOTE: This project is not officially associated with Material-UI or Gatsby in any way. It is just a helpful boilerplate arranged by me.

A [Gatsby V2](https://github.com/gatsbyjs/gatsby/) Documentation Site Starter using [Material-UI](https://material-ui.com) and [JSS](https://cssinjs.org).

[Demo website.](https://6star.pw)

## GatsbyJS V2

This starter is based on GatsbyJS V2, which brings progressive web app features such as automatic code and data splitting (by route), prefetching, with service worker/offline-first support and PRPL pattern.

## Features

- Blazing fast loading times thanks to pre-rendered HTML and automatic chunk loading of JS files
- [material-ui](https://material-ui.com) for Material design
- [NetlifyCMS](https://www.netlifycms.org/docs/intro/) support for creating/editing posts via admin panel

- Full PWA Support. 100 PWA score with Lighthouse
- Docs in Markdown
  - Code syntax highlighting
  - Embedded YouTube videos
  - Embedded Sequence Diagrams
- Tags
  - Separate page for docs under each tag
- Categories
  - Separate page for docs under each category
- Responsive design
- RSS feeds
- Loading progress for slow networks
- Offline support
- Web App Manifest support
- Automatic image transformation and size optimization
- Netlify deploy configuration
- Google Analytics support
- Development tools
  - ESLint for linting
  - Prettier for code style
  - Remark-Lint for linting Markdown
  - write-good for linting English prose

## Getting Started

Install this starter (assuming [Gatsby](https://github.com/gatsbyjs/gatsby/) is installed and updated) by running from your CLI:

```sh
gatsby new YourProjectName https://github.com/6stars/gatsby-docs
npm install # or yarn install
npm run develop # or gatsby develop
```

Or you can fork the project, make your changes there and merge new features when needed.

Alternatively:

```sh
git clone https://github.com/6stars/gatsby-docs YourProjectName # Clone the project
cd YourProjectname
rm -rf .git # So you can have your own changes stored in VCS.
npm install # or yarn install
npm run develop # or gatsby develop
```

## Configuration

Edit the export object in `data/SiteConfig`:

```jsmodule.exports = {
  siteTitle: '****** DOCS', // Site title.
  siteTitleShort: '6star DOCS', // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.  
  siteTitleAlt: '****** DOCS', // Alternative site title for SEO.
  siteDescription: "for ******",
  siteLogo: 'https://s.gravatar.com/avatar/cb868bd3f76af9631aa55aca22615673?size=1024', // Logo used for SEO and manifest.
  siteUrl: 'https://6stars.netlify.com', // Domain of your website without pathPrefix.
  siteRss: '/rss.xml', // Path to the RSS file.
  pathPrefix: '/', // Prefixes all links.
  siteGATrackingID: '', // Tracking code ID for google analytics.
  defaultCategoryID: 'api', // Default category for docs.
  dateFromFormat: 'MM-DD-YYYY', // Date format used in the frontmatter.
  dateFormat: 'MM/DD/YYYY', // Date format for display.
  userName: '******-user', // Username to display in the author segment.
  copyright: 'Copyright © 2018. ******', // Copyright string for the footer of the website and RSS feed.
};
```

You can also optionally set `pathPrefix`:

```js
module.exports = {
  // Note: it must *not* have a trailing slash.
  pathPrefix: "/docs" // Prefixes all links. For cases when deployed to example.github.io/docs/.
};
```

NOTE: `user*`, `copyright` are optional and won't render if omitted.

WARNING: Make sure to edit `static/robots.txt` to include your domain for the sitemap!

## NetlifyCMS

First of all, make sure to edit `static/admin/config.yml` and add your [GitHub/GitLab/NetlifyId credentials](https://www.netlifycms.org/docs/authentication-backends/):

```yml
backend:
  name: git-gateway  # Refer to https://www.netlifycms.org/docs/authentication-backends/ for auth backend list and instructions
  branch: master  # Branch to update

media_folder: static/assets
public_folder: assets

collections:
  - name: "doc"
    label: "****** Doc"
    folder: "content"
    create: true
    slug: "{{slug}}.md"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Publish Date", name: "date", widget: "datetime"}
      - {label: "Slug", name: "slug", widget: "string"}
      - {label: "Category", name: "category", widget: "string"}
      - {label: "Tags", name: "tags", widget: "list"}
      - {label: "Body", name: "body", widget: "markdown"}
```

You can visit `/admin/` after and will be greeted by a login dialog (depending on the auth provider you ave chosen above).

For NetlifyCMS specific issues visit the [official documentation](https://www.netlifycms.org/docs/intro/).
