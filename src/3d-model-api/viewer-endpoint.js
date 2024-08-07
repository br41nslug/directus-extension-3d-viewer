import { viewerAttributes } from "../utils/viewer-attributes";

const renderPage = ({ title, options }) => `<html>
<head>
    <title>${title}</title>
    <script type="module" src="/3d-viewer/model-viewer.min.js"></script>
    <style>body { margin: 0; padding: 0; } model-viewer { width: 100%; height: 100%; }</style>
</head>
<body>
    <model-viewer ${Object.keys(options)
        .filter(k => !!options[k])
        .map(k => options[k] === true ? k : `${k}="${options[k]}"`)
        .join('\n')}>
    </model-viewer>
</body>
</html>`;

export function registerViewerEndpoint(router) {
    router.get('/viewer/:file_id', (req, res) => {
        const viewerOptions = viewerAttributes(`/assets/${req.params.file_id}`, {
            'camera-controls': 'camera_controls' in req.query ?? true,
            'auto-rotate': 'auto_rotate' in req.query ?? true,
            'shadow-intensity': req.query?.shadow_intensity ?? 1,
            'scale': req.query?.scale ?? '1 1 1',
        });
        const html = renderPage({
            title: 'TEST',
            options: viewerOptions
        });
        res.send(html);
    });
}
