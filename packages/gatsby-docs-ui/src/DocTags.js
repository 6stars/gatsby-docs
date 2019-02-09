import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'gatsby'
import Chip from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
  },
})

class DocTags extends Component {
  render() {
    const { tags, classes } = this.props

    return (
      <div className={classes.root}>
        {tags &&
          tags.map(tag => (
            <Link
              key={tag}
              style={{ textDecoration: 'none' }}
              to={`/tags/${_.kebabCase(tag)}`}
            >
              <Chip label={tag} className={classes.chip} />
            </Link>
          ))}
      </div>
    )
  }
}

export default withStyles(styles)(DocTags)
