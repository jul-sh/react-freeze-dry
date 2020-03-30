import React from 'react'
import { Helmet } from 'react-helmet-async'
import Navigation from '../../components/Navigation'

export default function IndexPage(props) {
  return (
    <>
      <>
        <h1>Hello! Welcome to the HTML generation madness</h1>
        <p>
          Writing this small generator seemed like a fun distraction from
          coronavirus.
        </p>
        <hr />
        <Navigation />
      </>
      <Helmet>
        <title>Fun Example Page</title>
      </Helmet>
    </>
  )
}
