<template>
	<div class="model-container" v-if="file_id">
		<model-viewer v-bind="viewerAttrs"></model-viewer>
	</div>
</template>
<script>
import { viewerAttributes } from '../utils/viewer-attributes';

export default {
	props: {
		file_id: {
			type: String,
			default: null,
		},
		camera_controls: {
			type: Boolean,
			default: true,
		},
		auto_rotate: {
			type: Boolean,
			default: true,
		},
		shadow_intensity: {
			type: Number,
			default: 1,
		},
		scale: {
			type: String,
			default: '1 1 1',
		},
		custom: {
			type: Object,
			default: {},
		},
	},
	setup(props) {
		const viewerAttrs = viewerAttributes(`/assets/${props.file_id}`, {
			'camera-controls': props.camera_controls,
			'auto-rotate': props.auto_rotate,
			'shadow-intensity': props.shadow_intensity,
			'scale': props.scale,
			...(props.custom ?? {}),
		})

		return { viewerAttrs };
	}
};
</script>
<style scoped>
.model-container {
  width: 100%;
  padding-bottom: 100%;
  position: relative;
}
.model-container > model-viewer {
	position: absolute;
	top: 0; left: 0;
	width: 100%;
	height: 100%;
}
</style>
