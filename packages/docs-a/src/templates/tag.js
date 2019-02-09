import React from 'react'
import Helmet from 'react-helmet'
import { DocListing, PageContext } from '@m00n/gatsby-docs-ui'
import Layout from '../layout'
import { graphql } from 'gatsby'
import config from '../../data/SiteConfig'

export class TagTemplate extends React.Component {
  render() {
    const { tag, config } = this.props.pageContext
    const { data } = this.props
    const docEdges = data.allMarkdownRemark.edges

    return (
      <PageContext.Provider value={{ data, config }}>
        <Layout
          location={this.props.location}
          title={`Tagged in ${tag.charAt(0).toUpperCase() + tag.slice(1)}`}
        >
          <div className="tag-container">
            <Helmet>
              <title>{`Docs tagged as "${tag}" | ${config.siteTitle}`}</title>
              <link rel="canonical" href={`${config.siteUrl}/tags/${tag}`} />
            </Helmet>
            <DocListing docEdges={docEdges} />
          </div>
        </Layout>
      </PageContext.Provider>
    )
  }
}

export const pageQuery = graphql`
  query TagPage($route: String!, $tag: String) {
    ...navTree
    allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            route
            slug
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

export default TagTemplate
