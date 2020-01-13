import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import Layout from '../components/Layout'

const Portfolio = ({ data }) => {
  const { description, title, projects } = data.markdownRemark.frontmatter
  return (
    <Layout title="Portfolio" description={description}>
      <Container maxSize="md">
        <Typography variant="h4">{title}</Typography>
        <hr />
        <Grid container spacing={5}>
          {projects.map((p, i) => (
            <Grid item container key={i} xs={12} spacing={3}>
              <Grid item component={Typography} variant="h5" xs={12}>
                <a href={p.url} target="_blank">
                  {p.title}
                </a>
              </Grid>
              <Grid item md={6} xs={12}>
                <Box boxShadow={2}>
                  <Img fluid={p.image.childImageSharp.fluid} />
                </Box>
              </Grid>
              <Grid item container md={6} xs={12}>
                <Typography>{p.description}</Typography>
                <Typography>{p.projectDescription}</Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}

export default Portfolio

export const query = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        description
        projects {
          title
          description
          image {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          url
          projectDescription
        }
      }
    }
  }
`
