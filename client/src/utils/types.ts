export type ITokenReturned = {
  token: Record<string, any> //IToken,
  user: Record<string, any>
  headers: Record<string, any>
}
export type IToken = {
  access_token: string
  scope: string
  token_type: string
}
export type IAppTokenProperties = {
  isValid: boolean
  isAuthenticated: boolean
  // TBD: isExpired
}

export type IAppTokenHoc = {
  token: IAppToken | null
  setToken: ISetTokenFunction
}
export type IAppToken = IToken & IAppTokenProperties
export type ISetTokenFunction = (token: IAppToken) => void
export type IUser = Record<string, any>

export function isToken(data: any): data is IToken {
  return (
    typeof data?.access_token === 'string' &&
    data?.scope === 'string' &&
    data?.token_type === 'string'
  )
}
