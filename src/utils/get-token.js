
export function getToken(api) {
    return (api.defaults.headers.common['Authorization'])?.split(' ')[1] || null;
}