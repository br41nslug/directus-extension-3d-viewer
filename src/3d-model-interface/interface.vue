<template>
	<input :value="value?.file_id" placeholder="File UUID"  @input="handleChange($event.target.value)" />
	<div class="model-container">
		<model-viewer v-if="value?.file_id" v-bind="viewerAttrs"></model-viewer>
	</div>
</template>

<script>
import { viewerAttributes } from '../utils/viewer-attributes';
import { getToken } from '../utils/get-token';
import { useApi } from '@directus/extensions-sdk';
import { toRefs, computed, unref, toRaw } from 'vue';

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
		folder: {
			type: String
		},
	},
	emits: ['input'],
	setup(props, { emit }) {
		const {
			value, /*folder, */camera_controls,
			auto_rotate, shadow_intensity,
		} = toRefs(props);

		const viewerAttrs = computed(() => viewerAttributes(`/assets/${value.value?.file_id}?access_token=${getToken(useApi())}`, {
			'camera-controls': camera_controls.value ?? value.value?.camera_controls ?? true,
			'auto-rotate': auto_rotate.value ?? value.value?.auto_rotate ?? true,
			'shadow-intensity': shadow_intensity.value ?? value.value?.shadow_intensity ?? 1,
		}));
		
		console.log('interf', JSON.stringify(unref(viewerAttrs), null , 2));

		return { viewerAttrs, value, handleChange };

		function handleChange(value) {
			currentValue.file_id = value;
			emit('input', currentValue);
		}
	},
};
</script>
<style>
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