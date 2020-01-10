import React from 'react'

import Layout from '../components/Layout'
import contactData from './../data/contact'

class Contact extends React.Component {
  render() {
    return (
      <Layout title="Contact">
        <h2>Contact</h2>
        <br />

        {Object.keys(contactData).map(key => {
          if (contactData[key]) {
            return (
              <p>
                <b>{key}: </b>
                <a href={contactData[key]} target="_new">
                  {contactData[key]}
                </a>
              </p>
            )
          }
        })}
      </Layout>
    )
  }
}

export default Contact
