import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { AppFrame, AppContent } from '@m00n/gatsby-docs-ui'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    marginBottom: 100,
  },
  markdownElement: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    padding: `0 ${theme.spacing.unit}px`,
  },
})

const DocLayout = ({
  children,
  classes,
  tableOfContents,
  title,
  timeToRead,
}) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={({ data }) => {
      return (
        <AppFrame
          tableOfContents={tableOfContents}
          title={title}
          timeToRead={timeToRead}
        >
          <Helmet
            title={title}
            meta={[
              { name: 'description', content: 'Sample' },
              { name: 'keywords', content: 'sample, something' },
            ]}
          >
            <html lang="en" />
          </Helmet>

          <AppContent className={classes.root}>
            <div>{children}</div>
          </AppContent>
        </AppFrame>
      )
    }}
  />
)

export default withStyles(styles)(DocLayout)
