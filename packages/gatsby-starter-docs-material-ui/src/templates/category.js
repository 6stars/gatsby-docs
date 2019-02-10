import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import { DocListing, PageContext } from '@m00n/gatsby-docs-ui'
import Layout from '../layout'

export class CategoryTemplate extends React.Component {
  render() {
    const { category, config } = this.props.pageContext
    const { data } = this.props
    const docEdges = data.allMarkdownRemark.edges
    return (
      <PageContext.Provider value={{ data, config }}>
        <Layout
          location={this.props.location}
          title={category.charAt(0).toUpperCase() + category.slice(1)}
        >
          <div className="category-container">
            <Helmet>
              <title>
                {`Docs in category "${category}" | ${config.siteTitle}`}
              </title>
              <link
                rel="canonical"
                href={`${config.siteUrl}/categories/${category}`}
              />
            </Helmet>
            <DocListing docEdges={docEdges} />
          </div>
        </Layout>
      </PageContext.Provider>
    )
  }
}

export const pageQuery = graphql`
  query CategoryPage($route: String!, $category: String) {
    ...navTree
    allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { category: { eq: $category } } }
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

export default CategoryTemplate
