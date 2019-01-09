import React, { Component } from "react";
import { Link } from "gatsby";
import moment from "moment";
import _ from "lodash";
import PropTypes from 'prop-types';
import config from "../../data/SiteConfig";
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
    const { date, category, classes } = this.props;
    return (
        <div className={classes.root}>
          <Typography color="textSecondary">
          {`Published on ${moment(date).format(config.dateFormat)}`}
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
  date: PropTypes.string,
  category: PropTypes.string,
}

export default withStyles(styles)(DocInfo);
