import { NextApiRequest, NextApiResponse } from "next";
import sessionGetter from "@/lib/getSession";
import { LoginResponse } from "@/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const getSession = sessionGetter();
        const session = await getSession(req, res);
        try {
            const reqBody: LoginResponse = req.body;
            if (reqBody.token) {
                session['token'] = reqBody.token;
                res.json({
                    status: 'ok'
                });
            } else {
                res.end(400);
            }
        } catch (error) {
            console.error(error);
            res.end(400);
        }

    } else {
        res.end(400);
    }
}


export const config = {
    api: {
        externalResolver: true,
    },
};
