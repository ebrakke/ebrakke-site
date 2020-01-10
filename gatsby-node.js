const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
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
  `)
  if (result.errors) {
    console.log(result.errors)
    return
  }

  const blogPosts = result.data.allMarkdownRemark.edges.filter(
    e => e.node.frontmatter.templateKey === 'blog-post'
  )
  const pages = result.data.allMarkdownRemark.edges.filter(
    e => e.node.frontmatter.templateKey !== 'blog-post'
  )

  pages.forEach((page, index) => {
    createPage({
      path: page.node.fields.slug,
      component: path.resolve(
        `src/templates/${page.node.frontmatter.templateKey}.js`
      ),
      context: {
        slug: page.node.fields.slug,
        id: page.node.id,
      },
    })
  })

  blogPosts.forEach((post, index) => {
    const previous =
      index === blogPosts.length - 1 ? null : blogPosts[index + 1].node
    const next = index === 0 ? null : blogPosts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: path.resolve(`src/templates/blog-post.js`),
      context: {
        slug: post.node.fields.slug,
        id: post.node.id,
        previous,
        next,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
