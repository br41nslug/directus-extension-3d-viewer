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
		scale: {
			type: String,
			default: '1 1 1',
		},
		folder: {
			type: String
		},
		custom: {
			type: Object,
			default: {},
		},
	},
	emits: ['input'],
	setup(props, { emit }) {
		const {
			value, /*folder, */camera_controls,
			auto_rotate, shadow_intensity, scale, custom
		} = toRefs(props);

		const viewerAttrs = computed(() => viewerAttributes(`/assets/${value.value?.file_id}?access_token=${getToken(useApi())}`, {
			'camera-controls': camera_controls.value ?? value.value?.camera_controls,
			'auto-rotate': auto_rotate.value ?? value.value?.auto_rotate,
			'shadow-intensity': shadow_intensity.value ?? value.value?.shadow_intensity,
			'scale': value?.scale ?? scale.value,
			...(custom.value ?? {}),
		}));
		
		console.log('interf', JSON.stringify(unref(viewerAttrs), null , 2), props.custom);

		return { viewerAttrs, value, handleChange };

		function handleChange(val) {
			if (value.value) {
				value.value.file_id = val;
			} else {
				value.value = { file_id: val };
			}
			emit('input', value.value);
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