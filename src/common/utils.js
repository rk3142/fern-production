import {signIn} from "../api";

export const authenticateAccess = (history, path) => {
    const accessToken = localStorage.getItem("auth_token");
    if (accessToken && accessToken.length > 0) {
        signIn().then(() => {
            history.push(path)
        }).catch(() => history.push('/auth'))
    }
    else history.push('/auth')
}