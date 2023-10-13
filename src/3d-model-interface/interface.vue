<template>
	<div class="model-container" v-if="fileId">
		<model-viewer v-bind="viewerAttrs"></model-viewer>
	</div>
	
	<v-form :model-value="value" :fields="[
		{
			field: 'file_id',
			name: 'Model File',
			meta: {
				interface: 'fake-file',
				options: { folder: folder },
				group: 'advanced',
			}
		},
		{
			field: 'camera_controls',
			name: 'Camera Controls',
			meta: {
				interface: 'boolean',
				options: {
					label: '$t:enable_select_button',
				},
				width: 'half',
				group: 'advanced',
			},
		},
		{
			field: 'auto_rotate',
			name: 'Auto Rotate',
			meta: {
				interface: 'boolean',
				options: {
					label: '$t:enable_select_button',
				},
				width: 'half',
				group: 'advanced',
			},
		},
		{
			field: 'shadow_intensity',
			name: 'Shadow Intensity',
			type: 'integer',
			schema: {
				default_value: 1,
			},
			meta: {
				interface: 'input',
				width: 'half',
				group: 'advanced',
			},
		},
		{
			field: 'scale',
			name: 'Scale',
			type: 'string',
			schema: {
				default_value: '1 1 1',
			},
			meta: {
				interface: 'input',
				width: 'half',
				group: 'advanced',
			},
		},
		{
			field: 'advanced',
			type: 'alias',
			name: group_label,
			schema: null,
			meta: {
				field: 'advanced',
				special: ['alias', 'no-data', 'group'],
				interface: 'group-detail',
				options: { start: settingsOpen },
			},
		},
	]" @update:model-value="handleChange($event)"></v-form>
</template>

<script>
import { viewerAttributes } from '../utils/viewer-attributes';
import { getToken } from '../utils/get-token';
import { useApi } from '@directus/extensions-sdk';
import { ref, computed, } from 'vue';
import { watch } from 'vue';

export default {
	props: {
		value: {
			type: Object,
			default: null,
		},
		group_label: {
			type: String,
			default: '3D Model Options',
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
		const fileId = ref(props.value?.file_id ?? null);
		const cameraControls = ref(props.value?.camera_controls ?? props.camera_controls);
		const autoRotate = ref(props.value?.auto_rotate ?? props.auto_rotate);
		const shadowIntensity = ref(props.value?.shadow_intensity ?? props.shadow_intensity);
		const modelScale = ref(props.value?.scale ?? props.scale);

		watch(() => props.value, (val) => {
			if ('file_id' in val) fileId.value = val.file_id;
			if ('camera_controls' in val) cameraControls.value = val.camera_controls;
			if ('auto_rotate' in val) autoRotate.value = val.auto_rotate;
			if ('shadow_intensity' in val) shadowIntensity.value = val.shadow_intensity;
			if ('scale' in val) modelScale.value = val.scale;
		});

		const viewerAttrs = computed(() => viewerAttributes(`/assets/${fileId.value}?access_token=${getToken(useApi())}`, {
			'camera-controls': cameraControls.value,
			'auto-rotate': autoRotate.value,
			'shadow-intensity': shadowIntensity.value,
			'scale': modelScale.value,
			...(props.custom ?? {}),
		}));

		const settingsOpen = computed(() => !fileId.value ? 'open' : 'closed')

		return { viewerAttrs, fileId, settingsOpen, handleChange };

		function handleChange(val) {
			emit('input', { ...props.value, ...val });
		}
	},
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

.v-form {
	padding-top: var(--content-padding);
}

.v-divider {
	cursor: pointer;
}

.v-divider .expand-icon {
	float: right;
	transform: rotate(90deg) !important;
	transition: transform var(--fast) var(--transition);
}

.v-divider.active .expand-icon {
	transform: rotate(0) !important;
}

.v-divider :deep(.type-text) {
	position: relative;
}

.header-icon {
	margin-right: 12px !important;
}
</style>