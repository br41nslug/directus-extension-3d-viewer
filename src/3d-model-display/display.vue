<template>
	<model-viewer
		v-if="value?.file_id"
		:src="'/assets/'+value.file_id+'?access_token=admin'"
		:camera-controls="!!value.camera_controls"
		:auto-rotate="!!value.auto_rotate"
		:shadow-intensity="+value.shadow_intensity">
	</model-viewer>
</template>

<script>
import { unref, toRaw } from 'vue';

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
		console.log('disp', toRaw(unref(props)));
	}
};
</script>
