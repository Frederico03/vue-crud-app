<template>
    <div id="drawer-view-contact" class="overflow-y-auto fixed top-0 left-0 z-50 p-4 w-full max-w-lg h-screen bg-white transition-transform -translate-x-full dark:bg-gray-800" tabindex="-1" >
        <div>
            <h4 id="drawer-label" class="mb-1.5 leading-none text-xl font-semibold text-gray-900 dark:text-white">View Contact</h4>
        </div>
        <button type="button" @click="closeDrawer('drawer-view-contact')" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
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

            <div>
                <img :src="form.image" id="image" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                    focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="(99) 99999-9999" required />
            </div>
        </div>
    </div>  
</template>
<script setup lang="ts">
    import { ref, watch } from 'vue'
    import { drawerService } from '../../services/drawer-service'

    const props = defineProps<{
        contact: {
            id: number
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
        name: '',
        email: '',
        phone: '',
        image: '',
    })

    watch(
        () => props.contact,
        (newVal) => {
            if (newVal) {
                form.value = {
                    name: newVal.name,
                    email: newVal.email,
                    phone: newVal.phone,
                    image: newVal.image_url,
                }
            }
        },
        { immediate: true }
    )

    function closeDrawer(id: string) {
        drawerService.closeDrawer(id)
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
</script>
