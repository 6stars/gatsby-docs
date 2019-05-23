# @m00n/gatsby-plugin-nav-tree

Provide drop-in support for automated generation of a nested Page Navigation Tree for each page. Automatically discovers your nested path stucture to provide the data needed to generate a proper nested Nagivation Tree Component

## Install

`npm install --save @m00n/gatsby-plugin-nav-tree`

## How to use

Add the plugin to your `gatsby-config.js`.

```javascript
plugins: [
  {
    resolve: '@m00n/gatsby-plugin-nav-tree',
    options: {
      ignorePaths: [
        '/categories',
        '/tags',
        '/404',
        '/offline-plugin-app-shell-fallback',
        '/dev-404-page',
      ],
    },
  },
]
```

## Example Usage

### Including `navTree` graphQL Fragment into a Page Component

###### Notice the ...navTree fragment reference in the the Page graphql query

```javascript
import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../layout'
import DocListing from '../components/DocListing'
import config from '../../data/SiteConfig'
import { PageContext } from '../templates/pageContext'

class Index extends React.Component {
  render() {
    const { data } = this.props
    const docEdges = data.allMarkdownRemark.edges

    return (
      <PageContext.Provider value={{ data }}>
        <Layout location={this.props.location}>
          <div className="index-container">
            <Helmet title={config.siteTitle} />
            <DocListing docEdges={docEdges} />
          </div>
        </Layout>
      </PageContext.Provider>
    )
  }
}

export default Index

export const pageQuery = graphql`
  query IndexPageQuery($slug: String) {
    ...navTree
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          frontmatter {
            title
            tags
            date
          }
        }
      }
    }
  }
`
```

### Using navTree Data to Generate a Left Nav Component
