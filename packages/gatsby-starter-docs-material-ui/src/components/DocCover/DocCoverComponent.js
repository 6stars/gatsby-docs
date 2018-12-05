import React, { Component } from "react";
import Img from "gatsby-image";
import path from "path";

class DocCover extends Component {
  render() {
    const { fileEdges, docNode, coverHeight, coverClassName } = this.props;
    const doc = docNode.frontmatter ? docNode.frontmatter : docNode;
    const coverNodeList = fileEdges.filter(fileNode => {
      if (fileNode.node.childImageSharp === null) return false;

      if (
        fileNode.node.absolutePath.indexOf(
          path.join("/static/assets/", doc.cover)
        ) !== -1
      )
        return true;

      return false;
    });

    if (coverNodeList.length === 1) {
      return (
        <Img
          fluid={coverNodeList[0].node.childImageSharp.fluid}
          outerWrapperClassName={coverClassName}
          style={{ height: coverHeight, width: "100%" }}
        />
      );
    }

    /* eslint no-undef: "off" */
    const coverURL =
      doc.cover.substring(0, 1) === "/"
        ? __PATH_PREFIX__ + doc.cover
        : post.cover;
    return (
      <div
        style={{
          backgroundImage: `url(${coverURL})`,
          height: `${coverHeight}px`
        }}
        className={coverClassName}
      />
    );
  }
}

export default DocCover;
