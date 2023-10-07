<template>
	<model-viewer v-if="value?.file_id" v-bind="viewerAttrs"></model-viewer>
</template>

<script>
import { viewerAttributes } from '../utils/viewer-attributes';
import { getToken } from '../utils/get-token';
import { unref, toRaw } from 'vue';
import { useApi } from '@directus/extensions-sdk';

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
	},
	setup(props) {
		const viewerAttrs = viewerAttributes(`/assets/${props.value?.file_id}?access_token=${getToken(useApi())}`, {
			'camera-controls': props.value?.camera_controls ?? props.camera_controls ?? true,
			'auto-rotate': props.value?.auto_rotate ?? props.auto_rotate ?? true,
			'shadow-intensity': props.value?.shadow_intensity ?? props.shadow_intensity ?? 1,
		})
		console.log('disp', toRaw(unref(props)), viewerAttrs);
		return { viewerAttrs };
	}
};
</script>
<style>
model-viewer {
	width: 100%;
	height: 100%;
}
</style>
