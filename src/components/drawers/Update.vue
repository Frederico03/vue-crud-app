<template>
    <form @submit.prevent="submitForm" id="drawer-update-contact" class="fixed top-0 left-0 z-50 w-full h-screen max-w-3xl p-4 overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800" tabindex="-1">
        <h5 id="drawer-label" class="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">Update Product</h5>
        <button type="button" @click="closeDrawer('drawer-update-contact')" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
            <span class="sr-only">Close menu</span>
        </button>
        <div class="space-y-4 sm:space-y-6">
            <!-- Nome -->
            <div>
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Contact Name
                </label>
                <input v-model="form.name" type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                    focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type contact name"
                    required />
            </div>

            <!-- Email -->
            <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                </label>
                <input v-model="form.email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                    focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type contact email"
                    required />
            </div>

            <!-- Telefone -->
            <div>
                <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Phone Number
                </label>
                <input v-model="form.phone" @input="applyPhoneMask" maxlength="15" type="text" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                    focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="(99) 99999-9999" required />
            </div>

            <!-- Imagem com Drag & Drop -->
            <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Contact Image
                </label>
                <div @dragover.prevent="isDragging = true" 
                    @dragleave.prevent="isDragging = false"
                    @drop.prevent="handleDrop"
                    :class="isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'"
                    class="flex items-center justify-center w-full">
                    <label for="dropzone-update-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        <div v-if="!imagePreview" class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"/>
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span class="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF (MAX. 2MB)</p>
                        </div>
                        <div v-else class="relative w-full h-full p-4">
                            <img :src="imagePreview" alt="Preview" class="w-full h-full object-contain rounded-lg" />
                            <button @click.prevent="removeImage" type="button" class="absolute top-6 right-6 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        <input @change="handleImageUpload" id="dropzone-update-file" type="file" accept="image/*" class="hidden" />
                    </label>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-2 gap-4 mt-6 sm:w-1/2">
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Contact</button>
        </div>
    </form>
</template>
<script setup lang="ts">
    import { ref, watch } from 'vue'
    import { drawerService } from '../../services/drawer-service'
    import { contactService } from '../../services/contacts-service'

    const props = defineProps<{
        contact: {
            id: string
            name: string
            email: string
            phone: string
            image: string
            image_url: string
            created_at: string
            updated_at: string
            user_id: number
        } | null
    }>()

    const form = ref({
        id: '',
        name: '',
        email: '',
        phone: '',
        image: null as File | string | null,
    })

    watch(
        () => props.contact,
        (newVal) => {
            if (newVal) {
                form.value = {
                    id: newVal.id,
                    name: newVal.name,
                    email: newVal.email,
                    phone: newVal.phone,
                    image: newVal.image_url,
                }
                imagePreview.value = form.value.image as string
            }
        },
        { immediate: true }
    )

    const loading = ref(false)
    const isDragging = ref(false)
    const imagePreview = ref<string | null>(null)

    function closeDrawer(id: string) {
        drawerService.closeDrawer(id)
    }

    function handleImageUpload(event: Event) {
        console.log((event.target as HTMLInputElement).files?.[0])
        const file = (event.target as HTMLInputElement).files?.[0]
        console.log(file)
        if (file) {
            processFile(file)
        }
    }

    function handleDrop(event: DragEvent) {
        isDragging.value = false
        const file = event.dataTransfer?.files?.[0]
        if (file && file.type.startsWith('image/')) {
            processFile(file)
        }
    }

    function processFile(file: File) {
        console.log(file)
        form.value.image = file
        const reader = new FileReader()
        reader.onload = (e) => {
            imagePreview.value = e.target?.result as string
        }
        reader.readAsDataURL(file)
    }

    function removeImage() {
        imagePreview.value = null
        console.log(imagePreview.value)
        form.value.image = null
        const input = document.getElementById('dropzone-update-file') as HTMLInputElement
        if (input) input.value = ''
    }

    function applyPhoneMask(e: Event) {
        const input = e.target as HTMLInputElement
        let value = input.value.replace(/\D/g, '')

        if (value.length > 11) value = value.slice(0, 11)

        if (value.length <= 10)
            input.value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
        else input.value = value.replace(/^(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3')

        form.value.phone = input.value
    }

    async function submitForm() {
        loading.value = true
        await contactService.updateContact(form.value.id, form)
        loading.value = false
        closeDrawer('drawer-update-contact')
        window.location.reload()
    }
</script>
