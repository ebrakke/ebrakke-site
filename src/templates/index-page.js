import React from 'react'
import { graphql } from 'gatsby'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Img from 'gatsby-image'
import { makeStyles } from '@material-ui/core/styles'

import Layout from '../components/Layout'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  headerImage: {
    maxHeight: 300,
    marginLeft: theme.spacing(-3),
    marginRight: theme.spacing(-3),
    overflow: 'hidden',
    marginBottom: theme.spacing(2),
  },
  aboutImage: {
    maxWidth: 400,
    align: 'center',
  },
}))

const SiteIndex = props => {
  const classes = useStyles()
  const {
    description,
    headerImage,
    about,
  } = props.data.markdownRemark.frontmatter
  const { html } = props.data.markdownRemark
  return (
    <Layout title="Home" description={description}>
      <div className={classes.headerImage}>
        <Img fluid={headerImage.childImageSharp.fluid} />
      </div>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </Grid>
          <Grid item container xs={12} spacing={3}>
            <Grid item component={Typography} variant="h5" xs={12}>
              About Me
            </Grid>
            <Grid item className={classes.aboutImage} md={6} xs={12}>
              <Img fluid={about.image.childImageSharp.fluid} />
            </Grid>
            <Grid item md xs={12}>
              <Typography>{about.text}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
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
        about {
          text
          image {
            childImageSharp {
              fluid(maxWidth: 1200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
        headerImage {
          childImageSharp {
            fluid(maxWidth: 2400) {
              ...GatsbyImageSharpFluid
            }
          }
        }
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
