import React from 'react'
import { Link, graphql } from 'gatsby'
import { Grid, Row, Col } from 'react-flexbox-grid'

import Layout from '../../components/Layout'
import portfolioData from './../../data/portfolio'

const PortfolioIndex = ({ data }) => {
  return (
    <Layout title="Portfolio">
      <h2>Portfolio</h2>
      <br />
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <Grid fluid>
          <Row>
            {portfolioData.map(p => (
              <Col xs={12} sm={12} md={6} lg={6} key={p.title}>
                <Link to={'/portfolio/view'} state={p} key={p.title}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: 250,
                        height: 200,
                        margin: 10,
                        background: `url(${p.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                      }}
                    />
                    <p>{p.title}</p>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
        </Grid>
      </div>
    </Layout>
  )
}

export default PortfolioIndex

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
