<template>
	<div class="model-container">
		<model-viewer v-if="value?.file_id" v-bind="viewerAttrs"></model-viewer>
	</div>
</template>
<script>
import { viewerAttributes } from '../utils/viewer-attributes';

export default {
	props: {
		value: {
			type: Object,
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
			default: '2 2 2',
		},
		custom: {
			type: Object,
			default: {},
		},
	},
	setup(props) {
		const viewerAttrs = viewerAttributes(`/assets/${props.value?.file_id}`, {
			'camera-controls': props.value?.camera_controls ?? props.camera_controls,
			'auto-rotate': props.value?.auto_rotate ?? props.auto_rotate,
			'shadow-intensity': props.value?.shadow_intensity ?? props.shadow_intensity,
			'scale': props.value?.scale ?? props.scale,
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
