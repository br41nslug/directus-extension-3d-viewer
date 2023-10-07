export default function ({ embed }) {
	// load the webcomponent into the page
	embed('head', '<script type="module" src="/3d-viewer/model-viewer.min.js"></script>');
}
