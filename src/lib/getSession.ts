import nextSession from "next-session";
import { expressSession, promisifyStore } from "next-session/lib/compat";
import path from "path";

let getSession: ReturnType<typeof nextSession>;

(()=> { 
    var SQLiteStore = require("connect-sqlite3")(expressSession);
    
    let dir = path.resolve(__dirname,'../../../tmp');
    
    // local strategy, not to use in prod:
    if (dir.indexOf('.next') > -1) {
        dir = path.resolve(process.cwd(), './tmp')
    }

    const sessionStore = promisifyStore(new SQLiteStore({
        dir,
        db: 'sessions.db',
        table: 'token'
    }));
    
    getSession = nextSession({
        name: 'token-cookie',
        store: sessionStore,
        cookie: {
            maxAge: 30*60*1000
        }
    });
})();


export default function sessionGetter (): ReturnType<typeof nextSession> { 
    return getSession;
}
