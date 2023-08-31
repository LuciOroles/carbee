/**
 * @summary Request body to be sent to /api/auth
 */
export type LoginRequestBody = {
    username: string
    password: string
}


export type LoginFormValues =  LoginRequestBody;

export type LoginResponse = {
    token: string
}