import React, { Component } from "react";
import { StaticQuery, graphql } from "gatsby";
import DocCover from "./DocCoverComponent";

class queryWrapper extends Component {
  render() {
    const { docNode, coverHeight, coverClassName } = this.props;
    return (
      <div></div>
      // <StaticQuery
      //   query={graphql`
      //     query CoverQuery {
      //       allFile {
      //         edges {
      //           node {
      //             id
      //             absolutePath
      //             childImageSharp {
      //               id
      //               resolutions {
      //                 base64
      //                 tracedSVG
      //                 aspectRatio
      //                 width
      //                 height
      //                 src
      //                 srcSet
      //                 srcWebp
      //                 srcSetWebp
      //                 originalName
      //               }
      //               internal {
      //                 contentDigest
      //                 type
      //                 owner
      //               }
      //               fluid(maxWidth: 1240) {
      //                 ...GatsbyImageSharpFluid
      //                 originalName
      //               }
      //             }
      //           }
      //         }
      //       }
      //     }
      //  `
      // }
      //   render={data => (
      //     <DocCover
      //       fileEdges={data.allFile.edges}
      //       docNode={docNode}
      //       coverHeight={coverHeight}
      //       coverClassName={coverClassName}
      //     />
      //   )}
      // />
    );
  }
}

export default queryWrapper;
