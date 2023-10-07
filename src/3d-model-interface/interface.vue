<template>
	<input :value="currentValue?.file_id" placeholder="File UUID"  @input="handleChange($event.target.value)" />
	<model-viewer v-if="currentValue?.file_id" v-bind="viewerAttributes">
	</model-viewer>
</template>

<script>
import { useApi } from '@directus/extensions-sdk';
import { computed } from 'vue';
import { watch } from 'vue';
import { reactive } from 'vue';

export default {
	props: {
		value: { type: Object },
		camera_controls: { type: Boolean },
		auto_rotate: { type: Boolean },
		shadow_intensity: { type: Number },
		folder: { type: String },
	},
	emits: ['input'],
	setup(props, { emit }) {
		const currentValue = reactive({
			file_id: props.value?.file_id ?? null,
			camera_controls: props.value?.camera_controls ?? props.camera_controls ?? true,
			auto_rotate: props.value?.auto_rotate ?? props.auto_rotate ?? true,
			shadow_intensity: props.value?.shadow_intensity ?? props.shadow_intensity ?? 1,
			folder: props.folder ?? null,
		});

		const cleanObj = (o) => Object.fromEntries(Object.entries(o).filter(([_k, v]) => !!v));

		const viewerAttributes = computed(() => {
			const x = cleanObj({
				src: `/assets/${currentValue.file_id}?access_token=admin`,
				'camera-controls': currentValue.camera_controls ?? true,
				'auto-rotate': currentValue.auto_rotate ?? true,
				'shadow-intensity': currentValue.shadow_intensity ?? true,
			});
			console.log(x)
			return x
		});

		watch(() => props.value, (value) => {
			Object.keys(value).forEach((key) => {
				currentValue[key] = value[key];
			});
		});

		console.log('interf', props.value, currentValue);
		const api = useApi();

		console.log(api);

		return { viewerAttributes, currentValue, handleChange };

		function handleChange(value) {
			currentValue.file_id = value;
			emit('input', currentValue);
		}
	},
};
</script>
