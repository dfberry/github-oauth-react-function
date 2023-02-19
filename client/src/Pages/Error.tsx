import React from 'react'
import { useRouteError, useLocation } from 'react-router-dom'

// Use only for globally catastrophic errors
const ErrorPage: React.FC = () => {
  const { state } = useLocation()

  console.log(`state error: ${JSON.stringify(state)}}`)

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{state.message}</i>
      </p>
    </div>
  )
}

export default ErrorPage
