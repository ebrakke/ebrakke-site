import React from 'react'
import SEO from './Seo'

import { rhythm } from '../utils/typography'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = props => {
  const { children } = props
  const importedStyle = props.style
  const defaultStyle = {
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
  }

  const finalStyle = {
    ...defaultStyle,
    ...importedStyle,
  }
  return (
    <div style={finalStyle}>
      <SEO title={props.title} description={props.description} />
      <Navbar />
      <br />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
