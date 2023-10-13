import InterfaceComponent from './interface.vue';

export default {
	id: 'fake-file',
	name: 'Fake File',
	description: 'Select or upload a file',
	icon: 'note_add',
	component: InterfaceComponent,
	types: ['uuid'],
	options: [
		{
			field: 'folder',
			name: '$t:interfaces.system-folder.folder',
			type: 'uuid',
			meta: {
				width: 'full',
				interface: 'system-folder',
				note: '$t:interfaces.system-folder.field_hint',
			},
		},
	],
}
