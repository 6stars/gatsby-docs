import React from "react";
import PropTypes from 'prop-types';
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import format from "date-fns/format";
import ReactMarkdown from "react-markdown";
import docTemplateStyles from './styles/docTemplate';
import DocInfo from './DocInfo';
import DocTags from './DocTags';

class DocContent extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      const {
        content,
        isPreview,
        timeToRead,
        formattedDate,
        tags,
        title,
        category,
        slug,
        classes,
        className
      } = this.props;
  
      if (isPreview) {
        return (
          <div className={classNames(classes.root, 'markdown-body', className ? className : '')}>
            <Typography className={classes.title} variant="h4" color="inherit" noWrap>{title}</Typography>
            <DocInfo formattedDate={formattedDate} timeToRead={timeToRead ? timeToRead : 0 } category={category} isPreview={isPreview} />
            <ReactMarkdown source={content} className='markdown-body' escapeHtml={false} />
            <div className="doc-meta">
              <DocTags tags={tags} isPreview={isPreview} />
            </div>
          </div>
        );
      }
      else {
        return (
          <div className={classNames(classes.root, 'markdown-body', className)}>
            <DocInfo formattedDate={formattedDate} timeToRead={timeToRead} category={category} slug={slug} />
            <div dangerouslySetInnerHTML={{ __html: content }} />
            <div className="doc-meta">
              <DocTags tags={tags} isPreview={isPreview} />
            </div>
          </div>
        );
      }
  
    }
  }
  
  DocContent.propTypes = {
    content: PropTypes.node.isRequired,
    formattedDate: PropTypes.string,
    title: PropTypes.string,
    category: PropTypes.string,
    tags: PropTypes.array,
    isPreview: PropTypes.bool,
  }
  
  export default withStyles(docTemplateStyles)(DocContent);