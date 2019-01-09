import React from 'react';
import PropTypes from 'prop-types';
import { DocTemplate } from '../../src/templates/doc';
 
const DocPreview = ({ content, tags, date, title, category }) => {
  return (
    <DocTemplate
      content={content}
      tags={tags}
      title={title}
      date={date}
      category={category}
    />
  );
}

DocPreview.propTypes = {
  content: PropTypes.node.isRequired,
  date: PropTypes.string,
  title: PropTypes.string,
  category: PropTypes.string,
  tags: PropTypes.array,
}

export default DocPreview;
