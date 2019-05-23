import React, { Component } from 'react'
import compose from 'recompose/compose'
import { Link } from 'gatsby'
import _ from 'lodash'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    color: theme.palette.text.secondary,
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  docInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontSize: '14px',
  },
  editPage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    fontSize: '12px',
  },
})

class DocInfo extends Component {
  render() {
    const {
      formattedDate,
      title,
      category,
      classes,
      isPreview,
      timeToRead,
      slug,
      width,
    } = this.props

    const ADMIN_EDIT_PAGE_URL = '/admin/#/collections/docs/entries/'

    return (
      <div className={classes.root}>
        <div className={classes.docInfo}>
          <Typography
            className={classes.title}
            variant="h4"
            color="inherit"
            style={{ display: isWidthUp('sm', width) ? 'none' : 'flex' }}
            noWrap
          >
            {title}
          </Typography>
          <Typography color="textSecondary">
            {`Published on ${formattedDate} - ${timeToRead} min read`}
          </Typography>
          {isPreview ? (
            <Typography color="textSecondary" gutterBottom>
              In Category <b>{category}</b>
            </Typography>
          ) : (
            <Link
              className="category-link"
              to={`/categories/${_.kebabCase(category)}`}
            >
              <Typography color="textSecondary" gutterBottom>
                In Category <b>{category}</b>
              </Typography>
            </Link>
          )}
        </div>
        <div className={classes.editPage}>
          <Tooltip title="Edit this Doc" placement="top">
            <IconButton
              href={`${ADMIN_EDIT_PAGE_URL}${slug}`}
              target="_blank"
              aria-label="EditDoc"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    )
  }
}

DocInfo.propTypes = {
  formattedDate: PropTypes.string,
  category: PropTypes.string,
}

export default compose(
  withWidth(),
  withStyles(styles)
)(DocInfo)
