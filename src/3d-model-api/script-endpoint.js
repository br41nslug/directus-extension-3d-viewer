const MODEL_VIEWER_SRC_URL = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.1.1/model-viewer.min.js";
const MODEL_VIEWER_MAP_URL = `${MODEL_VIEWER_SRC_URL}.map`;

export function registerScriptEndpoint(router) {
    // load the script once on startup
    const cachedScript = fetch(MODEL_VIEWER_SRC_URL).then(resp => resp.text());
    const cachedMap = fetch(MODEL_VIEWER_MAP_URL).then(resp => resp.text());
    // return the cached script
    router.get('/model-viewer.min.js', async (_req, res) => {
        res.set('Content-Type', 'application/javascript');
        res.send(await cachedScript);
    });
    router.get('/model-viewer.min.js.map', async (_req, res) => {
        res.set('Content-Type', 'application/json');
        res.send(await cachedMap);
    });
}
