import React, { Component, Fragment } from "react";
import { Link } from "gatsby";
import moment from "moment";
import _ from "lodash";
import config from "../../data/SiteConfig";
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.text.secondary,
    fontWeight: 500,
    fontSize: '1rem',
    color: theme.palette.text.primary,
  }
});

class DocInfo extends Component {
  render() {
    const { docNode, classes } = this.props;
    const doc = docNode.frontmatter;
    return (
        <div className={classes.root}>
          <Typography color="textSecondary">
          {`Published on ${moment(docNode.fields.date).format(config.dateFormat)}`}
          </Typography>
          <Link
            className="category-link"
            to={`/categories/${_.kebabCase(doc.category)}`}
          >
          <Typography color="textSecondary" gutterBottom>
            In Category <b>{doc.category}</b>
          </Typography>
          </Link>
        </div>
    );
  }
}

export default withStyles(styles)(DocInfo);
