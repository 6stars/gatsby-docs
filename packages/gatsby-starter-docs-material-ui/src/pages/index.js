import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import DocListing from "../components/DocListing";
import config from "../../data/SiteConfig";
import { PageContext } from '../templates/pageContext';

class Index extends React.Component {
  render() {
    const { data } = this.props;
    const docEdges = data.allMarkdownRemark.edges;
   
    return (
      <PageContext.Provider value={{data}}>
        <Layout location={this.props.location}>
          <div className="index-container">
            <Helmet title={config.siteTitle} />
            <DocListing docEdges={docEdges} />
          </div>
        </Layout>
      </PageContext.Provider>
    );
  }  
}

export default Index;

export const pageQuery = graphql`	
  query IndexQuery($slug: String) {
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
`;
