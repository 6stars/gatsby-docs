import React from 'react'
import PropTypes from 'prop-types'
import { DocTemplate } from '../../templates/doc'

const DocPreview = ({ entry, widgetFor }) => (
  <DocTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
  />
)

DocPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default DocPreview
