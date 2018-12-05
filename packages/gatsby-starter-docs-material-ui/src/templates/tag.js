import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import DocListing from "../components/DocListing";
import config from "../../data/SiteConfig";
import withRoot from '../withRoot';
import { PageContext } from './pageContext';

export class TagTemplate extends React.Component {
  render() {
    const { tag } = this.props.pageContext;   
    const { data } = this.props;
    const docEdges = data.allMarkdownRemark.edges;

    return (
      <PageContext.Provider value={{data}}>
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
    );
  }
}

export const pageQuery = graphql`
  query TagPage($slug: String!, $tag: String) {
    ...pageTree
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            date
          }
        }
      }
    }
  }
`;

export default withRoot(TagTemplate);
