import { registerScriptEndpoint } from "./script-endpoint";
import { registerViewerEndpoint } from "./viewer-endpoint";

export default {
	id: '3d-viewer',
	handler: (router) => {
		// GET /3d-viewer/script
		registerScriptEndpoint(router);

		// GET /3d-viewer/viewer
		registerViewerEndpoint(router);
	}
}
