import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import DocTags from "../components/DocTags";
import DocInfo from "../components/DocInfo";
import config from "../../data/SiteConfig";
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { PageContext } from './pageContext';

const styles = theme => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 500,
    fontSize: 16,
    color: theme.palette.text.primary,
    paddingBottom: '20px',
    '& .anchor-link': {
      marginTop: -96, // Offset for the anchor.
      position: 'absolute',
    },
    '& pre, & pre[class*="language-"]': {
      margin: '12px 0',
      padding: '12px 18px',
      // backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
    },
    '& code': {
      display: 'inline-block',
      lineHeight: 1.4,
      fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
      padding: '3px 6px',
      // color: theme.palette.text.primary,
      // backgroundColor: theme.palette.background.paper,
      fontSize: 12,
    },
    '& p code, & ul code, & pre code': {
      fontSize: 12,
      lineHeight: 1.4,
    },
    '& h1': {
      ...theme.typography.h4,
      color: theme.palette.text.secondary,
      fontWeight: theme.typography.fontWeightMedium,
      margin: '8px 0 4px',
    },
    '& .description': {
      ...theme.typography.headline,
      margin: '0 0 20px',
    },
    '& h2': {
      ...theme.typography.h6,
      color: theme.palette.text.secondary,
      margin: '16px 0 12px',
    },
    '& h3': {
      ...theme.typography.headline,
      color: theme.palette.text.secondary,
      margin: '16px 0 12px',
    },
    '& h4': {
      ...theme.typography.h5,
      color: theme.palette.text.secondary,
      margin: '12px 0 8px',
    },
    '& p, & ul, & ol': {
      lineHeight: 1.6,
    },
    '& h1, & h2, & h3, & h4': {
      '& code': {
        fontSize: 'inherit',
        lineHeight: 'inherit',
        // Remove scroll on small screens.
        wordBreak: 'break-word',
      },
      '& .anchor-link-style': {
        opacity: 0,
        // To prevent the link to get the focus.
        display: 'none',
      },
      '&:hover .anchor-link-style': {
        display: 'inline-block',
        opacity: 1,
        padding: '0 8px',
        color: theme.palette.text.hint,
        '&:hover': {
          color: theme.palette.text.secondary,
        },
        '& svg': {
          width: '0.55em',
          height: '0.55em',
          fill: 'currentColor',
        },
      },
    },
    '& table': {
      width: '100%',
      display: 'block',
      overflowX: 'auto',
      WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
      borderCollapse: 'collapse',
      borderSpacing: 0,
      overflow: 'hidden',
      '& .prop-name': {
        fontSize: 13,
        fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
      },
      '& .required': {
        color: theme.palette.type === 'light' ? '#006500' : '#9bc89b',
      },
      '& .prop-type': {
        fontSize: 13,
        fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
        color: theme.palette.type === 'light' ? '#932981' : '#dbb0d0',
      },
      '& .prop-default': {
        fontSize: 13,
        // fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
        borderBottom: `1px dotted ${theme.palette.text.hint}`,
      },
    },
    '& thead': {
      fontSize: 14,
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.secondary,
    },
    '& tbody': {
      fontSize: 14,
      lineHeight: 1.5,
      color: theme.palette.text.primary,
    },
    '& td': {
      borderBottom: `1px solid ${theme.palette.divider}`,
      padding: '8px 16px 8px 8px',
      textAlign: 'left',
    },
    '& td:last-child': {
      paddingRight: 24,
    },
    '& td compact': {
      paddingRight: 24,
    },
    '& td code': {
      fontSize: 13,
      lineHeight: 1.6,
    },
    '& th': {
      whiteSpace: 'pre',
      borderBottom: `1px solid ${theme.palette.divider}`,
      fontWeight: theme.typography.fontWeightMedium,
      padding: '0 16px 0 8px',
      textAlign: 'left',
    },
    '& th:last-child': {
      paddingRight: 24,
    },
    '& tr': {
      height: 48,
    },
    '& thead tr': {
      height: 64,
    },
    '& strong': {
      fontWeight: theme.typography.fontWeightMedium,
    },
    '& blockquote': {
      borderLeft: `5px solid ${theme.palette.text.hint}`,
      backgroundColor: theme.palette.background.paper,
      padding: '4px 24px',
      margin: '24px 0',
    },
    '& a, & a code': {
      // Style taken from the Link component
      color: theme.palette.secondary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    '& img': {
      maxWidth: '100%',
    },
  },
});

export class DocTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: true
    };
    this.handleResize = this.handleResize.bind(this);
  }

  handleResize() {
    if (window && window.innerWidth >= 640) {
      this.setState({ mobile: false });
    } else {
      this.setState({ mobile: true });
    }
  }

  render() {
    const { slug } = this.props.pageContext;
    const docNode = this.props.data.markdownRemark;
    const doc = docNode.frontmatter;

    if (!doc.id) {
      doc.id = slug;
    }
    if (!doc.category_id) {
      doc.category_id = config.docDefaultCategoryID;
    }
    const { classes, className, data, location } = this.props;
    
    return (
      <PageContext.Provider value={{data}}>
        <Layout location={location}>        
          <Helmet>
            <title>{`${doc.title} | ${config.siteTitle}`}</title>
            <link rel="canonical" href={`${config.siteUrl}${doc.id}`} />
          </Helmet>
          <div className={classNames(classes.root, 'markdown-body', className)}>
              <DocInfo docNode={docNode} />
              <div dangerouslySetInnerHTML={{ __html: docNode.html }} />
              <div className="doc-meta">
                <DocTags tags={doc.tags} />
              </div>
         </div>
        </Layout>
      </PageContext.Provider>
      
    );
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
      timeToRead
      excerpt
      frontmatter {
        title
        date
        category
        tags
      }
      fields {
        route
        slug
        date
      }
    }
  }
`;

export default withStyles(styles)(DocTemplate);