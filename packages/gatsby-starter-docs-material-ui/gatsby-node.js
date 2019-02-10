const path = require('path')
const _ = require('lodash')
const moment = require('moment')
const siteConfig = require('./data/SiteConfig')
require('babel-polyfill')
const postNodes = []
let GatsbyNode = {}

GatsbyNode.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  let slug, route, description
  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent)
    const parsedFilePath = path.parse(fileNode.relativePath)

    if (Object.prototype.hasOwnProperty.call(node, 'frontmatter')) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'slug'))
        slug = node.frontmatter.slug
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'route'))
        route = node.frontmatter.route
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'description'))
        description = node.frontmatter.description
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, 'date')) {
        const date = moment(node.frontmatter.date, siteConfig.dateFromFormat)
        if (!date.isValid)
          console.warn(`WARNING: Invalid date.`, node.frontmatter)

        createNodeField({
          node,
          name: 'date',
          value: date.toISOString(),
        })
      }
    }
    createNodeField({ node, name: 'slug', value: slug })
    createNodeField({ node, name: 'route', value: route })
    postNodes.push(node)
  }
}

const createMarkdownPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const docPage = path.resolve('src/templates/doc.js')
  let result = await graphql(
    `
      {
        allMarkdownRemark {
          edges {
            node {
              tableOfContents(pathToSlugField: "fields.route")
              fields {
                route
                slug
              }
              frontmatter {
                title
                description
                tags
                category
              }
            }
          }
        }
      }
    `
  )
  for (let page of result.data.allMarkdownRemark.edges.map(x => x.node)) {
    createPage({
      path: page.fields.route,
      component: docPage,
      context: {
        route: page.fields.route,
        slug: page.fields.slug,
        title: page.frontmatter.title,
        category: page.frontmatter.category,
        tags: page.frontmatter.tags,
        config: siteConfig,
      },
    })
  }

  return result
}

GatsbyNode.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const homePage = path.resolve('src/pages/index.js')
  const tagPage = path.resolve('src/templates/tag.js')
  const categoryPage = path.resolve('src/templates/category.js')

  // create home page
  createPage({
    path: '/',
    component: homePage,
    context: {
      slug: '/',
      route: '/',
      title: siteConfig.siteTitle,
      config: siteConfig,
    },
  })

  // create markdown doc pages
  let result = await createMarkdownPages({ actions, graphql })
  if (result.errors) {
    /* eslint no-console: "off" */
    reject(result.errors)
  }

  const tagSet = new Set()
  const categorySet = new Set()
  result.data.allMarkdownRemark.edges.forEach(edge => {
    if (edge.node.frontmatter.tags) {
      edge.node.frontmatter.tags.forEach(tag => {
        tagSet.add(tag)
      })
    }

    if (edge.node.frontmatter.category) {
      categorySet.add(edge.node.frontmatter.category)
    }
  })

  const tagList = Array.from(tagSet)
  tagList.forEach(tag => {
    var path = `/tags/${_.kebabCase(tag)}/`
    createPage({
      path: path,
      component: tagPage,
      context: {
        route: path,
        title: tag,
        tag,
        config: siteConfig,
      },
    })
  })

  const categoryList = Array.from(categorySet)
  categoryList.forEach(category => {
    let path = `/categories/${_.kebabCase(category)}/`
    createPage({
      path: path,
      component: categoryPage,
      context: {
        route: path,
        title: category,
        category,
        config: siteConfig,
      },
    })
  })
}

module.exports = GatsbyNode
