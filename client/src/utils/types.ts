export type ITokenReturned = {
    token: Record<string, any>,//IToken,
    user: Record<string, any>,
    headers: Record<string, any>
}
export type IToken = {
    access_token:string;
    scope:string;
    token_type: string;
}
export type ISetTokenFunction = (token:IToken)=>{}
