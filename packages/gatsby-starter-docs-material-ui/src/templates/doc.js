import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import classNames from 'classnames'
import format from 'date-fns/format'
import { DocTags, DocInfo, PageContext, DocContent } from '@m00n/gatsby-docs-ui'
import DocLayout from '../layout/doc'

export default class DocTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mobile: true,
    }
    this.handleResize = this.handleResize.bind(this)
  }

  handleResize() {
    if (window && window.innerWidth >= 640) {
      this.setState({ mobile: false })
    } else {
      this.setState({ mobile: true })
    }
  }

  render() {
    const { data, location, pageContext } = this.props

    const { slug, config } = pageContext
    const doc = this.props.data.markdownRemark

    if (!doc.frontmatter.id) {
      doc.frontmatter.id = slug
    }
    if (!doc.category_id) {
      doc.frontmatter.category_id = config.docDefaultCategoryID
    }

    return (
      <PageContext.Provider value={{ data, config }}>
        <DocLayout
          location={location}
          tableOfContents={doc.tableOfContents}
          title={doc.frontmatter.title}
        >
          <Helmet>
            <title>{`${doc.frontmatter.title} | ${config.siteTitle}`}</title>
            <link rel="canonical" href={`${config.siteUrl}${doc.id}`} />
          </Helmet>
          <DocContent
            content={doc.html}
            timeToRead={doc.timeToRead}
            isPreview={false}
            formattedDate={format(doc.frontmatter.rawDate, 'MMMM Do YYYY')}
            tags={doc.frontmatter.tags}
            category={doc.frontmatter.category}
            title={doc.frontmatter.title}
            slug={doc.fields.slug}
          />
        </DocLayout>
      </PageContext.Provider>
    )
  }
}

export const pageQuery = graphql`
  query DocByRoute($route: String!) {
    ...navTree
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { route: { eq: $route } }) {
      html
      tableOfContents(pathToSlugField: "fields.route")
      timeToRead
      excerpt
      frontmatter {
        title
        rawDate: date
        category
        tags
      }
      fields {
        route
        slug
      }
    }
  }
`
