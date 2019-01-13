import React, { Component } from "react";
import _ from "lodash";
import { Link } from "gatsby";
import Chip from '@material-ui/core/Chip';

class PostTags extends Component {
  render() {
    const { tags, isPreview } = this.props;
    return (
      <div className="post-tag-container">
        {tags &&
          tags.map(tag => {
            isPreview ? 
            <Chip label={tag} className="post-preview-tags" /> : 
            <Link
              key={tag}
              style={{ textDecoration: "none" }}
              to={`/tags/${_.kebabCase(tag)}`}
            >
              <Chip label={tag} className="post-preview-tags" />
            </Link>
          }
          )}
      </div>
    );
  }
}

export default PostTags;
