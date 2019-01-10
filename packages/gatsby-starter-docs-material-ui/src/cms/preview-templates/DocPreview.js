import React from 'react';
import PropTypes from 'prop-types';
import { DocTemplate } from '../../templates/doc';
import format from "date-fns/format";
 
const DocPreview = ({ content, tags, rawDate, title, category }) => {
  
  return (
    <DocTemplate
      content={content}
      isBodyMarkdown={true}
      tags={tags}
      title={title}
      formattedDate={format(rawDate, "MMMM Do YYYY")}
      category={category}
    />
  );
}

DocPreview.propTypes = {
  content: PropTypes.node.isRequired,
  rawDate: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
  tags: PropTypes.array,
}

export default DocPreview;
