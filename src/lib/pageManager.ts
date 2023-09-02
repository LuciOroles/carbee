
import { WithProps, HomePageProps, PageRedirect, PropsPageManager, WithRedirect } from '../types';

export class MainPageManager implements PropsPageManager<HomePageProps, PageRedirect> {
    handleSessionToken(token: string | null): WithProps<HomePageProps> | WithRedirect<PageRedirect> {
        if (token) {

            return {
                props: {
                    data: {
                        token,
                    }
                }
            }
        }

        return {
            redirect: {
                destination: '/login',
                statusCode: 307
            }
        }
    }
}

export class LoginPageManager implements PropsPageManager<{}, PageRedirect> {

    handleSessionToken(token: string | null) {
        if (token) {
            return {
                redirect: {
                    destination: '/',
                    statusCode: 307
                }
            }
        }

        return {
            props: {}
        }
    }

}
