
import { GetServerSidePropsContext } from "next";
import sessionGetter from "./getSession";
import {PropsPageManager} from '../types';
import { LoginPageManager, MainPageManager } from './pageManager'

export default async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
    const getSession = sessionGetter();
    const session = await getSession(req, res);

    // using this class instead of a middleware
    let pageManager: PropsPageManager<any, any>;
    if (req.url === '/login') {
        pageManager = new LoginPageManager();
    } else {
        pageManager = new MainPageManager();
    }

    const response = pageManager.handleSessionToken(session['token'] || null)
    return response;
}


export const config = {
    api: {
        externalResolver: true,
    },
};