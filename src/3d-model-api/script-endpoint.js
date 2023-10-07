const MODEL_VIEWER_URL = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.1.1/model-viewer.min.js";

export function registerScriptEndpoint(router) {
    // load the script once on startup
    const cachedScript = fetch(MODEL_VIEWER_URL).then(resp => resp.text());
    // return the cached script
    router.get('/script', async (_req, res) => {
        res.set('Content-Type', 'application/javascript');
        res.send(await cachedScript);
    });
}
