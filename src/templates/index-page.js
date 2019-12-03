//@ts-check
import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Row, Col } from 'react-flexbox-grid'

import Layout from '../components/Layout'
import SEO from '../components/seo'

const SiteIndex = ({ data }) => {
  const {
    markdownRemark: { html, frontmatter },
  } = data

  return (
    <Layout>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      <Row around="sm">
        <Col md={4} sm={12}>
          <Img fluid={frontmatter.image.childImageSharp.fluid} />
        </Col>
        <Col md={6} sm={12}>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Col>
      </Row>
    </Layout>
  )
}

export default SiteIndex

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        description
        image {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
