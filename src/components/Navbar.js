import React, { Component } from 'react'
import { Link } from 'gatsby'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

export class Navbar extends Component {
  render() {
    return (
      <Grid container justify="center" spacing={1}>
        <Grid item component={Typography} variant="h4">
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Erik Brakke
          </Link>
        </Grid>
        <Grid item container justify="center" spacing={4}>
          <Grid item component={Link} to="/">
            Home
          </Grid>
          <Grid item component={Link} to="/portfolio">
            Portfolio
          </Grid>
          <Grid item component={Link} to="/contact">
            Contact
          </Grid>
          <Grid item component={Link} to="/blog">
            Blog
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default Navbar
