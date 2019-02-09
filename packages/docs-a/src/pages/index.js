import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { DocListing, PageContext } from '@m00n/gatsby-docs-ui'
import Layout from '../layout'
import config from '../../data/SiteConfig'

class Index extends React.Component {
  render() {
    const { data } = this.props
    const docEdges = data.allMarkdownRemark.edges
    return (
      <PageContext.Provider value={{ data, config }}>
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
  query IndexQuery($route: String) {
    ...navTree
    allMarkdownRemark(limit: 2000) {
      edges {
        node {
          fields {
            slug
            route
          }
          excerpt
          timeToRead
          frontmatter {
            title
            description
            tags
            category
            rawDate: date
            cover
          }
        }
      }
    }
  }
`
