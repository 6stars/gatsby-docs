import { graphql } from 'gatsby'

export const navTreeFragement = graphql`
  fragment navTree on Query {
    currentPage: allSitePage(filter: {path: {eq:$slug}}) {
        edges {
          node {
            tree
            path
            context {
              title
              category
              slug
            }
          }
        }
      }
  }
`