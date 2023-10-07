import { registerPreviewScriptEndpoint } from "./preview";
import { registerScriptEndpoint } from "./script-endpoint";
import { registerViewerEndpoint } from "./viewer-endpoint";

export default {
	id: '3d-viewer',
	handler: (router) => {
		// GET /3d-viewer/model-viewer.min.js[.map]
		registerScriptEndpoint(router);

		// GET /3d-viewer/live-preview.js
		registerPreviewScriptEndpoint(router);

		// GET /3d-viewer/viewer
		registerViewerEndpoint(router);

	}
}
