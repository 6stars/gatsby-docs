import React, { Component } from "react";
import { Link } from "gatsby";
import _ from "lodash";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    color: theme.palette.text.secondary,
    fontWeight: 500,
    fontSize: '1rem',
    color: theme.palette.text.primary,
  }
});

class DocInfo extends Component {
  render() {
    const { formattedDate, category, classes } = this.props;
    
    // console.log("date:");
    // console.log(formattedDate);

    return (
        <div className={classes.root}>
          <Typography color="textSecondary">
          {`Published on ${formattedDate}`}
          </Typography>
          <Link
            className="category-link"
            to={`/categories/${_.kebabCase(category)}`}
          >
          <Typography color="textSecondary" gutterBottom>
            In Category <b>{category}</b>
          </Typography>
          </Link>
        </div>
    );
  }
}

DocInfo.propTypes = {
  formattedDate: PropTypes.string,
  category: PropTypes.string,
}

export default withStyles(styles)(DocInfo);
