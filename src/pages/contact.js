import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Container } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'

import Layout from '../components/Layout'
import contactData from './../data/contact'

class Contact extends React.Component {
  render() {
    return (
      <Layout title="Contact">
        <Container>
          <Typography variant="h4">Contact</Typography>
          <hr />
          <Grid container direction="column" spacing={2}>
            {Object.keys(contactData).map((key, i) => (
              <Grid item container key={i} spacing={3}>
                <Grid item component={Typography}>
                  {key}:{' '}
                </Grid>
                <Grid item>
                  {contactData[key].link ? (
                    <Link href={contactData[key].link} target="_blank">
                      {contactData[key].link}
                    </Link>
                  ) : (
                    <Typography>{contactData[key].text}</Typography>
                  )}
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Layout>
    )
  }
}

export default Contact
