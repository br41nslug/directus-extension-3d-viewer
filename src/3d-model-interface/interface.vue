<template>
	<div class="model-container" v-if="fileId">
		<model-viewer v-bind="viewerAttrs"></model-viewer>
	</div>
	
	<component is="interface-input" v-if="!fileId" v-model="fileId" @update:model-value="handleChange2($event)"></component>

	<v-detail v-model="detailOpen" :start-open="false" class="group-detail">
		<template #activator="{ toggle, active }">
			<v-divider
				:class="{ active }"
				:inline-title="false"
				large
				@click="toggle"
			>
				<template v-if="group_label">
					<span class="title">{{ group_label }}</span>
				</template>
				<v-icon class="expand-icon" name="expand_more" />
			</v-divider>
		</template>

		<component is="interface-input" v-if="!fileId" v-model="fileId" @update:model-value="handleChange2($event)"></component>

		<component is="interface-boolean" label="$t:enable_select_button"></component>

		<component is="interface-boolean" label="$t:enable_select_button"></component>

		<component is="interface-input"></component>

		<component is="interface-input"></component>
	</v-detail>
	<v-form :model-value="value" :fields="[
		{
			field: 'camera_controls',
			name: 'Camera Controls',
			schema: {
				default_value: true,
			},
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
			schema: {
				default_value: true,
			},
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
			name: '3D Model Options',
			schema: null,
			meta: {
				field: 'advanced',
				special: ['alias', 'no-data', 'group'],
				interface: 'group-detail',
				options: { start: !fileId ? 'open' : 'closed' },
			},
		},
	]" @update:model-value="handleChange($event)"></v-form>
</template>

<script>
import { viewerAttributes } from '../utils/viewer-attributes';
import { getToken } from '../utils/get-token';
import { useApi } from '@directus/extensions-sdk';
import { toRefs, computed, unref, toRaw } from 'vue';
import { ref } from 'vue';

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
		// const {
		// 	value, /*folder, */camera_controls,
		// 	auto_rotate, shadow_intensity, scale, custom
		// } = toRefs(props);
		const fileId = ref(props.value?.file_id ?? null);
		const cameraControls = ref(props.value?.camera_controls ?? props.camera_controls);
		const autoRotate = ref(props.value?.auto_rotate ?? props.auto_rotate);
		const shadowIntensity = ref(props.value?.shadow_intensity ?? props.shadow_intensity);
		const modelScale = ref(props.value?.scale ?? props.scale);


		const viewerAttrs = computed(() => viewerAttributes(`/assets/${fileId.value}?access_token=${getToken(useApi())}`, {
			'camera-controls': cameraControls.value,
			'auto-rotate': autoRotate.value,
			'shadow-intensity': shadowIntensity.value,
			'scale': modelScale.value,
			...(props.custom ?? {}),
		}));

		return { viewerAttrs, fileId, cameraControls, autoRotate, shadowIntensity, modelScale, handleChange };

		function handleChange2(val) {
			console.log(val);
		}

		function handleChange(val) {
			// Object.keys(val).forEach(key => {
			// 	internalValue[key] = val[key];
			// })
			// console.log(val, toRaw(internalValue));
			emit('input', { ...props.value, ...val });
			// if (value.value) {
			// 	value.value.file_id = val;
			// } else {
			// 	value.value = { file_id: val };
			// }
			// emit('input', value.value);
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

/* .v-form {
	padding-top: calc(var(--form-vertical-gap) / 2);
} */

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