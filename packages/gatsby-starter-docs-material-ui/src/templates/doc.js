import React from "react";
import PropTypes from 'prop-types';
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout/doc";
import DocTags from "../components/DocTags";
import DocInfo from "../components/DocInfo";
import config from "../../data/SiteConfig";
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { PageContext } from './pageContext';
import format from "date-fns/format";
import ReactMarkdown from "react-markdown";

const styles = theme => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: 500,
    fontSize: 14,
    color: theme.palette.text.primary,
    paddingBottom: '20px',
    '& .anchor': {     
      marginTop: '-99px', // Offset for the anchor.
      position: 'absolute',
      visibility: 'hidden',
    },
    '& pre, & pre[class*="language-"]': {
      margin: '12px 0',
      padding: '12px 18px',      
      borderRadius: theme.shape.borderRadius,
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
    },
    '& code': {
      display: 'inline-block',
      lineHeight: 1.4,
      fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
      padding: '3px 6px',
      fontSize: 12,
    },
    '& p code, & ul code, & pre code': {
      fontSize: 12,
      // lineHeight: 1.4,
    },
    '& a': {
      ...theme.typography.h6,
      // lineHeight: 1.4,
    },
    '& h1': {
      ...theme.typography.h3,
      color: theme.palette.text.secondary,
      fontWeight: theme.typography.fontWeightMedium,
      margin: '8px 0 4px',
    },
    '& .description': {
      ...theme.typography.headline,
      margin: '0 0 20px',
    },
    '& h2': {
      borderBottom: '1px solid #eee',
      ...theme.typography.h4,
      color: theme.palette.text.secondary,
      margin: '16px 0 12px',
    },
    '& h3': {
      ...theme.typography.h5,
      ...theme.typography.headline,
      color: theme.palette.text.secondary,
      margin: '16px 0 12px',
    },
    '& h4': {
      ...theme.typography.h6,
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

//DocContent

export const DocContent = ({
  content,
  bodyIsMarkdown,
  formattedDate,
  tags,
  title,
  category,
  classes,
  className
}) => {

  return (
    <div className={classNames(classes.root, 'markdown-body', className)}>
        <DocInfo formattedDate={formattedDate} category={category} />
        {bodyIsMarkdown ? (
          <ReactMarkdown className="pastMeetups-description" source={content} />
        ) : (
         <div dangerouslySetInnerHTML={{ __html: content }} />
        )}  
        <div className="doc-meta">
          <DocTags tags={tags} />
        </div>
  </div>
  )
}

DocContent.propTypes = {
  content: PropTypes.node.isRequired,
  formattedDate: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
  tags: PropTypes.array,
  bodyIsMarkdown: PropTypes.bool,
}

const DocTemplate = withStyles(styles)(DocContent);
export { DocTemplate };

export default class Doc extends React.Component {
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
    const doc = this.props.data.markdownRemark;
   
    if (!doc.frontmatter.id) {
      doc.frontmatter.id = slug;
    }
    if (!doc.category_id) {
      doc.frontmatter.category_id = config.docDefaultCategoryID;
    }
    const { data, location } = this.props;
    return (
      <PageContext.Provider value={{data}}>
        <Layout location={location} tableOfContents={doc.tableOfContents} title={doc.frontmatter.title} >        
          <Helmet>
            <title>{`${doc.frontmatter.title} | ${config.siteTitle}`}</title>
            <link rel="canonical" href={`${config.siteUrl}${doc.id}`} />
          </Helmet>
          <DocTemplate
            content={doc.html}
            isBodyMarkdown={false}
            formattedDate={format(doc.frontmatter.rawDate, "MMMM Do YYYY")}
            tags={doc.frontmatter.tags}
            category={doc.frontmatter.category}
            title={doc.frontmatter.title}
          />
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
    markdownRemark(
      fields: { route: { eq: $route } }
      ) {
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
`;