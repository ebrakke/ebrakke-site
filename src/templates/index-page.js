import React from 'react'
import { graphql } from 'gatsby'
import Grid from '@material-ui/core/Grid'
import Img from 'gatsby-image'

import Layout from '../components/Layout'

const SiteIndex = props => {
  const { description, image } = props.data.markdownRemark.frontmatter
  const { html } = props.data.markdownRemark
  return (
    <Layout title="Home" description={description}>
      <Grid container spacing={3} justify="center">
        <Grid item style={{ minWidth: '300px' }}>
          <Img fluid={image.childImageSharp.fluid} />
        </Grid>
        <Grid item>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </Grid>
      </Grid>
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
