import React from 'react'
import { graphql } from 'gatsby'
import Grid from '@material-ui/core/Grid'

import Layout from '../components/Layout'
import DisplayImage from './../assets/images/main_image.jpg'

const SiteIndex = props => {
  const { description } = props.data.markdownRemark.frontmatter
  const { html } = props.data.markdownRemark

  return (
    <Layout title="Home" description={description}>
      <Grid container spacing={3} justify="center">
        <Grid item style={{ maxWidth: '400px' }}>
          <img src={DisplayImage} />
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
      }
    }
  }
`
