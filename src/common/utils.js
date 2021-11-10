import {signIn} from "../api";

// export const authenticateSignIn = (history, path) => {
//     const accessToken = localStorage.getItem("auth_token");
//     if (accessToken != null) signIn().then(() => history.push(path))
//     else history.push('/auth')
// }

export const authenticateAccess = (history, path) => {
    const accessToken = localStorage.getItem("auth_token");
    if (accessToken && accessToken.length > 0) signIn().then(() => history.push(path))
    else history.push('/auth')
}