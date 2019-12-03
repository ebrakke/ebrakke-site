const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(
    `
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                templateKey
              }
            }
          }
        }
      }
    `
  )
  // Create blog posts pages.
  const pages = result.data.allMarkdownRemark.edges

  pages.forEach(page => {
    createPage({
      path: page.node.fields.slug,
      component: path.resolve(
        `${__dirname}/src/templates/${page.node.frontmatter.templateKey}.js`
      ),
      context: {
        id: page.node.id,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  fmImagesToRelative(node)

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
