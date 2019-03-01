import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Hemlet from 'react-helmet'

import Layout from '../components/Layout'
import DisplayImage from './../assets/images/main_image.jpg'

class SiteIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )

    return (
      <Layout>
        <Hemlet>
          <title>{siteTitle}</title>
          <meta name="description" content={siteDescription} />
        </Hemlet>
        <p>I'm Erik Brakke - Full Stack Engineer</p>
        <p>Boston University Computer Science - Class of 2016</p>
        <p>
          I currently work at Carbonite, creating a unified platform to manage
          all Carbonite products.
        </p>
        <hr />
        <p>
          <b>Languages</b>: Javascript, Python, Elm, C#, Haskell, Java, SQL
        </p>
        <p>
          <b>Web Technologies</b>: React.js, Redux, Node.js, Express, Flask,
          .Net Core
        </p>
        <p>
          <b>Misc</b>: Docker, Kubernetes, Jenkins, git
        </p>
        <img src={DisplayImage} alt={siteTitle} />
      </Layout>
    )
  }
}

export default SiteIndex

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
