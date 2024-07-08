
export function getToken(api) {
    // return "wy4yWWOXxnTNbxRdqPryXSeNbQ5Fg1kw"
    return (api.defaults.headers.common['Authorization'])?.split(' ')[1] || null;
}