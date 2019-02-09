import React from 'react'
import PropTypes from 'prop-types'
import DocContent from './DocContent'
import format from 'date-fns/format'

const DocPreview = ({ content, tags, rawDate, title, category }) => {
  return (
    <DocContent
      content={content}
      isPreview={true}
      tags={tags}
      title={title}
      formattedDate={format(rawDate, 'MMMM Do YYYY')}
      category={category}
    />
  )
}

DocPreview.propTypes = {
  content: PropTypes.node.isRequired,
  rawDate: PropTypes.instanceOf(Date),
  title: PropTypes.string,
  category: PropTypes.string,
  tags: PropTypes.array,
}

export default DocPreview
