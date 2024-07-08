const previewScript = `
// use the current token for fetching the file
const elem = document.getElementsByTagName('model-viewer')[0];
fetch('/auth/refresh', { method: 'POST', credentials: 'include' })
    .then(res => res.json()).then(({ data: { access_token } }) => access_token)
    .then(token => { 
        if(token){
            elem.setAttribute('src', elem.getAttribute('src') + '?access_token=' + token);
        } else {
            elem.setAttribute('src', elem.getAttribute('src') );
        }

    })
`;

export function registerPreviewScriptEndpoint(router) {
    router.get('/live-preview.js', (_req, res) => {
        res.set('Content-Type', 'application/javascript');
        res.send(previewScript);
    })
}