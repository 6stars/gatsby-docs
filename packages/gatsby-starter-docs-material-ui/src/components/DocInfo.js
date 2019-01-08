import React, { Component, Fragment } from "react";
import { Link } from "gatsby";
import moment from "moment";
import _ from "lodash";
import config from "../../data/SiteConfig";
import Typography from '@material-ui/core/Typography';

class DocInfo extends Component {
  render() {
    const { docNode } = this.props;
    const doc = docNode.frontmatter;
    return (
        <Fragment>
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
        </Fragment>
    );
  }
}

export default DocInfo;
