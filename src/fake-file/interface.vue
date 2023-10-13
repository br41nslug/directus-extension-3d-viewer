
<template>
	<div class="file">
		<v-menu attached :disabled="loading">
			<template #activator="{ toggle, active }">
				<div>
					<v-skeleton-loader v-if="loading" type="input" />
					<v-input
						v-else
						clickable
						readonly
						:active="active"
						:disabled="disabled"
						placeholder="No file selected"
						:model-value="file && file.title"
						@click="toggle"
					>
						<template #append>
							<template v-if="file">
								<v-icon v-if="!disabled" v-tooltip="'Deselect'" class="deselect" name="close" @click.stop="update(null)" />
							</template>
							<v-icon v-else name="attach_file" />
						</template>
					</v-input>
				</div>
			</template>

			<v-list>
				<template v-if="file">
					<v-list-item clickable :download="file.filename_download">
						<v-list-item-icon><v-icon name="get_app" /></v-list-item-icon>
						<v-list-item-content>Download file</v-list-item-content>
					</v-list-item>

					<v-divider v-if="!disabled" />
				</template>
				<template v-if="!disabled">
					<v-list-item clickable @click="activeDialog = 'upload'">
						<v-list-item-icon><v-icon name="phonelink" /></v-list-item-icon>
						<v-list-item-content>
							{{ file ? 'Replace from device' : 'Upload from device' }}
						</v-list-item-content>
					</v-list-item>

					<v-list-item clickable @click="activeDialog = 'choose'">
						<v-list-item-icon><v-icon name="folder_open" /></v-list-item-icon>
						<v-list-item-content>
							{{ file ? 'Replace from library' : 'Choose from library' }}
						</v-list-item-content>
					</v-list-item>

					<v-list-item clickable @click="activeDialog = 'url'">
						<v-list-item-icon><v-icon name="link" /></v-list-item-icon>
						<v-list-item-content>
							{{ file ? 'Replace from url' : 'Import from url' }}
						</v-list-item-content>
					</v-list-item>
				</template>
			</v-list>
		</v-menu>

		<v-dialog
			:model-value="activeDialog === 'upload'"
			@esc="activeDialog = null"
			@update:model-value="activeDialog = null"
		>
			<v-card>
				<v-card-title>{{ 'Upload from device' }}</v-card-title>
				<v-card-text>
					<v-upload from-url :folder="folder" @input="onUpload" />
				</v-card-text>
				<v-card-actions>
					<v-button secondary @click="activeDialog = null">{{ 'Cancel' }}</v-button>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<drawer-files
			v-if="activeDialog === 'choose'"
			:folder="folder"
			:active="activeDialog === 'choose'"
			@update:active="activeDialog = null"
			@input="setSelection"
		/>

		<v-dialog
			:model-value="activeDialog === 'url'"
			:persistent="urlLoading"
			@update:model-value="activeDialog = null"
			@esc="activeDialog = null"
		>
			<v-card>
				<v-card-title>{{ 'Import from URL' }}</v-card-title>
				<v-card-text>
					<v-input v-model="url" autofocus :placeholder="'URL'" :nullable="false" :disabled="urlLoading" />
				</v-card-text>
				<v-card-actions>
					<v-button :disabled="urlLoading" secondary @click="activeDialog = null">
						{{ 'Cancel' }}
					</v-button>
					<v-button :loading="urlLoading" :disabled="isValidURL === false" @click="importFromURL">
						{{ 'Import label' }}
					</v-button>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>
<script setup>
import { useApi } from '@directus/extensions-sdk';
import { watch, computed, ref } from 'vue';

const api = useApi();
const emit = defineEmits(['input']);

const props = defineProps({
	value: Object,
	disabled: {
		type: Boolean,
		required: false,
	},
	folder: {
		type: String,
		required: false,
	},
});

const file = ref(null);
const activeDialog = ref(null);

watch(() => props.value, init)
init(props.value);

const { url, isValidURL, loading: urlLoading, importFromURL } = useURLImport();

function init(value) {
	if (!value) return;
	getFileData(value).then(data => {
		file.value = data;
	});
}

async function getFileData(file_id) {
	if (!file_id) return null;
	const response = await api.get('/files/'+file_id, {
		params: {
			fields: ['id', 'title', 'type', 'filename_download'],
		}
	})
	return response.data.data;
}

async function update(file_id) {
	emit('input', file_id);
	if (file_id !== file.value?.id) {
		file.value = await getFileData(file_id);
	}
}

function setSelection(selection) {
	if (selection[0]) update(selection[0]);
}

function onUpload(fileInfo) {
	file.value = fileInfo;
	activeDialog.value = null;
	update(fileInfo.id);
}

function useURLImport() {
	const url = ref('');
	const loading = ref(false);

	const isValidURL = computed(() => {
		try {
			new URL(url.value);
			return true;
		} catch {
			return false;
		}
	});

	return { url, loading, isValidURL, importFromURL };

	async function importFromURL() {
		loading.value = true;

		try {
			const response = await api.post(`/files/import`, {
				url: url.value,
				data: {
					folder: props.folder,
				},
			});

			file.value = response.data.data;

			activeDialog.value = null;
			url.value = '';
			update(file.value?.id);
		} catch (err) {
		} finally {
			loading.value = false;
		}
	}
}
</script>
<style scoped>
.extension {
	color: var(--primary);
	font-weight: 600;
	font-size: 11px;
	text-transform: uppercase;
}

.deselect:hover {
	--v-icon-color: var(--danger);
}
</style>
