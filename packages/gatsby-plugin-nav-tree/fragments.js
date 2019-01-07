import { graphql } from 'gatsby'

export const navTreeFragement = graphql`
  fragment navTree on Query {
    currentPage: allSitePage(filter: {path: {eq:$route}}) {
        edges {
          node {
            tree
            path
            context {
              title
              category
              slug
              route
            }
          }
        }
      }
  }
`