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

export type HomePageProps = {
    data: {
        token: string
    }
}

export type PageRedirect = {
    destination: string;
    statusCode: number
}

export type PageProps = {
    props: HomePageProps
}


export type WithProps<T> = {
    props: T
}

export type WithRedirect<T> = {
    redirect: T
}

export interface PropsPageManager<T, K> {
    handleSessionToken(token: string | null): WithProps<T> | WithRedirect<K>
}

