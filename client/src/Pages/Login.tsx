import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../utils/auth'
import { IAppConfiguration } from '../utils/config'
import { ISetTokenFunction, IUser, IAppToken, ITokenReturned } from '../utils/types'

export type ILoginProps = {
  setToken: ISetTokenFunction
  appConfiguration: IAppConfiguration
  setUser: (user: IUser) => void
}

const Login: React.FC<ILoginProps> = ({ setToken, appConfiguration, setUser }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)
    const code = queryParams.get('code')

    if (code) {
      getToken(code, appConfiguration)
        .then((data) => {
          const tokenReturned: ITokenReturned = data

          if (!tokenReturned?.token?.access_token || !tokenReturned?.user?.name) {
            throw Error('Server successfully returned without token')
          }
          const currentToken = tokenReturned.token

          // coming from GitHub so must be valid
          currentToken.isValid = true
          currentToken.isAuthenticated = true

          setUser(tokenReturned.user as IUser)
          setToken(currentToken as IAppToken)
          navigate('/profile', { state: data })
        })
        .catch((err) => {
          console.log(`Login:can't exchange code for token`)
          console.log(`err.message = ${err.message}`)

          if (err.message.includes('Failed to fetch')) {
            navigate('/error', {
              state: Error('Login: failed to fetch from server. Is server running?')
            })
          }
          navigate('/error', { state: err })
        })
    }
  }, [appConfiguration, navigate, setToken, setUser])

  return (
    <div>
      <a href={appConfiguration.loginUrl} rel="noreferrer">
        {appConfiguration.provider} Login
      </a>
    </div>
  )
}

export default Login
