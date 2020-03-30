import React from 'react'
import { Helmet } from 'react-helmet-async'
import Navigation from '../../components/Navigation'

export default function ContactPage(props) {
  return (
    <>
      <>
        <h1>Contact</h1>
        <p>
          There isn't really a way to contact this example generator. Feel free
          to fork the project though.
        </p>
        <hr />
        <Navigation />
      </>
      <Helmet>
        <title>Fun Contact Page</title>
      </Helmet>
    </>
  )
}
