import DisplayComponent from './display.vue';

export default {
	id: '3d-model-display',
	name: '3D Model Viewer',
	icon: 'box',
	description: 'This is my custom display!',
	component: DisplayComponent,
	options: [
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
			},
		},
		{
			field: 'shadow_intensity',
			name: 'Shadow Intensity',
			type: 'integer',
			schema: {
				default_value: 1,
				placeholder: 1,
			},
			meta: {
				interface: 'input',
				placeholder: 1,
			},
		},
		{
			field: 'scale',
			name: 'Scale',
			type: 'string',
			schema: {
				default_value: '2 2 2',
				default_value: '2 2 2',
			},
			meta: {
				interface: 'input',
				placeholder: '2 2 2',
			},
		},
		{
			field: 'custom',
			name: 'Custom Properties',
			type: 'json',
			schema: {
				default_value: '{}',
			},
			meta: {
				interface: 'input-code',
			},
		},
	],
	types: ['json'],
};
