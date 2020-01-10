import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'

const SEO = ({ title, description }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
          }
        }
      }
    `
  )

  return (
    <Helmet>
      <title>
        {title} | {data.site.siteMetadata.author}
      </title>
      <meta name="description" content={description} />
    </Helmet>
  )
}

export default SEO
