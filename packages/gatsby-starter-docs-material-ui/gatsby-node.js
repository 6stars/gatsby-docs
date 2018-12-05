const path = require("path");
const _ = require("lodash");
const moment = require("moment");
const siteConfig = require("./data/SiteConfig");
require("babel-polyfill");

const postNodes = [];
let GatsbyNode = {};

GatsbyNode.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);
   
    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
        slug = node.frontmatter.slug;//`/${_.kebabCase(node.frontmatter.slug)}`;
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
        const date = moment(node.frontmatter.date, siteConfig.dateFromFormat);
        if (!date.isValid)
          console.warn(`WARNING: Invalid date.`, node.frontmatter);

        createNodeField({
          node,
          name: "date",
          value: date.toISOString()
        });
      }
    }
    createNodeField({ node, name: "slug", value: slug });
    postNodes.push(node);
  }
};

// GatsbyNode.setFieldsOnGraphQLNodeType = ({ type, actions }) => {
//   // const { name } = type;
//   // const { createNodeField } = actions;
//   // if (name === "MarkdownRemark") {
//   //   addSiblingNodes(createNodeField);
//   // }
// };

const createMarkdownPages = async ({actions, graphql}) => {
  const { createPage } = actions;
  const docPage = path.resolve("src/templates/doc.js");
  let result = await graphql(
  `
  {     
      allMarkdownRemark {
          edges {
              node {
                  fields {
                      slug
                  }
                  frontmatter {
                      title
                      tags
                      category
                  }
              }
          }
      }
  }
  `
  );
  
  for (let page of (result.data.allMarkdownRemark.edges).map(x => x.node)) {
      createPage({
          path: page.fields.slug,
          component: docPage,
          context: {              
              slug: page.fields.slug,
              title: page.frontmatter.title,
              category: page.frontmatter.category
          }
      });
  }

  return result;
};

GatsbyNode.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  const homePage =  path.resolve("src/pages/index.js");
  const tagPage = path.resolve("src/templates/tag.js");
  const categoryPage = path.resolve("src/templates/category.js");

  // create home page
  createPage({
    path: '/',
    component: homePage,
    context: {
      slug: "/",
      title: "Docs Home",      
    }
  });


  // create markdown doc pages
  let result = await createMarkdownPages({actions, graphql});
        if (result.errors) {
          /* eslint no-console: "off" */
          console.log(result.errors);
          //reject(result.errors);
        }

        const tagSet = new Set();
        const categorySet = new Set();
        result.data.allMarkdownRemark.edges.forEach(edge => {
          if (edge.node.frontmatter.tags) {
            edge.node.frontmatter.tags.forEach(tag => {
              tagSet.add(tag);
            });
          }

          if (edge.node.frontmatter.category) {
            categorySet.add(edge.node.frontmatter.category);
          }
        });

        const tagList = Array.from(tagSet);
        tagList.forEach(tag => {
          var path = `/tags/${_.kebabCase(tag)}/`;
          createPage({
            path: path,
            component: tagPage,
            context: {
              slug: path,
              title: tag,
              tag
            }
          });
        });

        const categoryList = Array.from(categorySet);
        categoryList.forEach(category => {
          let path =  `/categories/${_.kebabCase(category)}/`;
          createPage({
            path: path,
            component: categoryPage,
            context: {
              slug: path,
              title: category,
              category
            }
          });
        });
};


module.exports = GatsbyNode;