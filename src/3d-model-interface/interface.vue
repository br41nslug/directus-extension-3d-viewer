<template>
	<input :value="value?.file_id" placeholder="File UUID"  @input="handleChange($event.target.value)" />
	<model-viewer v-if="value?.file_id" v-bind="viewerAttrs"></model-viewer>
</template>

<script>
import { viewerAttributes } from '../utils/viewer-attributes';
import { useApi } from '@directus/extensions-sdk';
import { toRefs, computed, unref, toRaw, watch } from 'vue';

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
			value, folder, camera_controls,
			auto_rotate, shadow_intensity,
		} = toRefs(props);

		const viewerAttrs = computed(() => viewerAttributes(value.value?.file_id, {
			'camera-controls': camera_controls.value ?? value.value?.camera_controls ?? true,
			'auto-rotate': auto_rotate.value ?? value.value?.auto_rotate ?? true,
			'shadow-intensity': shadow_intensity.value ?? value.value?.shadow_intensity ?? 1,
		}));
		
		const api = useApi();
		console.log(api.interceptors.request);
		console.log('interf', toRaw(unref(props)), unref(viewerAttrs));

		return { viewerAttrs, value, handleChange };

		function handleChange(value) {
			currentValue.file_id = value;
			emit('input', currentValue);
		}
	},
};
</script>
