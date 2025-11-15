<template>
    <section class="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5 antialiased">
        <div class="mx-auto max-w-screen-2xl px-4 lg:px-12">
            <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg">
                <div class="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div class="w-full md:w-1/2">
                        <form class="flex items-center">
                            <label for="simple-search" class="sr-only">Search</label>
                            <div class="relative w-full">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <input type="text" v-model="search" @input="searchInList"  id="simple-search" name="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search">
                            </div>
                        </form>
                    </div>
                    <div class="flex flex-row items-center justify-between md:justify-end md:space-x-3 flex-shrink-0">
                        <div class="flex items-center space-x-3">
                            <button type="button" @click="openDrawer('drawer-create-contact')" class="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                <svg class="h-5 w-5 mr-2 flex-shrink-0 hidden md:inline" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                </svg>
                                Add Contact
                            </button>
                        </div>
                    </div>
                </div>
                <div class="overflow-x-auto mx-4 space-y-4">
                    <div v-for="(contact, index) in contactsToList" :key="index" href="#" class="w-full flex flex-col md:flex-row md:items-center relative p-3 md:space-x-6 hover:bg-gray-50 dark:hover:bg-gray-600 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-600">
                        <img :src="contact.image_url ?? ''" alt="" class="w-20 h-auto">
                        <div class="flex flex-col md:justify-between">
                            <div class="grid grid-cols-2 md:grid-cols-6 w-full gap-2">
                                <div class="flex flex-col justify-between h-full col-span-3">
                                    <h3 class="text-lg font-semibold text-gray-700 dark:text-white mb-2 md:mb-3">{{contact.name}}</h3>
                                    <div>
                                        <h6 class="text-sm font-normal text-gray-500 dark:text-gray-400">Número</h6>
                                        <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ contact.phone }}</p>
                                    </div>
                                </div>
                                <div class="col-span-1">
                                    <h6 class="text-sm font-normal text-gray-500 dark:text-gray-400">Email</h6>
                                    <p class="text-sm font-semibold text-gray-900 dark:text-white">{{ contact.email }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="absolute top-3 right-3">
                            <button :id="`dropdown-button-${index}`" type="button" :data-dropdown-toggle="`dropdown-${index}`" class="inline-flex items-center p-1.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100">
                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                </svg>
                            </button>
                            <div :id="`dropdown-${index}`" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-600 dark:divide-gray-500">
                                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button-0">
                                    <li>
                                        <button type="button" @click="openDrawer('drawer-update-contact', contact)" class="w-full flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white text-gray-700 dark:text-gray-200">
                                            <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                                            </svg>
                                            Edit
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" @click="openDrawer('drawer-view-contact', contact)" class="w-full flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white text-gray-700 dark:text-gray-200">
                                            <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                            Preview
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" @click="openModal('deleteModal', contact)" class="w-full flex items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white text-red-600 dark:text-red-500">
                                            <svg class="w-5 h-5 mr-2" viewbox="0 0 14 15" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 4.80078C8.56052 4.80078 8.33161 4.8956 8.16282 5.06439C7.99404 5.23317 7.89922 5.46209 7.89922 5.70078V11.1008C7.89922 11.3395 7.99404 11.5684 8.16282 11.7372C8.33161 11.906 8.56052 12.0008 8.79922 12.0008C9.03791 12.0008 9.26683 11.906 9.43561 11.7372C9.6044 11.5684 9.69922 11.3395 9.69922 11.1008V5.70078C9.69922 5.46209 9.6044 5.23317 9.43561 5.06439C9.26683 4.8956 9.03791 4.80078 8.79922 4.80078Z" />
                                            </svg>
                                            Delete
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <nav class="flex flex-col items-center justify-center space-y-3 py-5" v-if="pagination">
                        <div class="text-xs font-normal text-gray-500 dark:text-gray-400">
                            Showing
                            <span class="font-semibold">{{ pagination.from }}</span>
                            to
                            <span class="font-semibold">{{ pagination.to }}</span>
                            of
                            <span class="font-semibold">{{ pagination.total }}</span>
                            entries
                        </div>

                        <ul class="inline-flex items-stretch -space-x-px">

                            <!-- Prev -->
                            <li>
                                <button
                                    @click="prevPage"
                                    :disabled="pagination.current_page === 1"
                                    class="flex text-sm w-20 items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white border rounded-l-lg 
                                        hover:bg-blue-100 hover:text-blue-700 disabled:opacity-40 dark:bg-gray-800 dark:text-gray-400">
                                    Prev
                                </button>
                            </li>

                            <!-- Next -->
                            <li>
                                <button
                                    @click="nextPage"
                                    :disabled="pagination.current_page === pagination.last_page"
                                    class="flex text-sm w-20 items-center justify-center h-full py-1.5 px-3 text-gray-500 bg-white border rounded-r-lg 
                                        hover:bg-blue-100 hover:text-blue-700 disabled:opacity-40 dark:bg-gray-800 dark:text-gray-400">
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </section>

    <Create :contact="selectedContact" />
    <Update :contact="selectedContact" />
    <View :contact="selectedContact" />
    <Delete :contact="selectedContact" />
</template>
<script setup lang="ts">
    import { initFlowbite } from 'flowbite'
    import { nextTick, onMounted, ref } from 'vue'
    import { drawerService } from '../services/drawer-service'
    import { modalService } from '../services/modal-service';
    import { contactService } from '../services/contacts-service';
    import Create from './drawers/Create.vue'
    import Update from './drawers/Update.vue';
    import View from './drawers/View.vue';
    import Delete from './drawers/Delete.vue';
    import { Contact } from '../types/contactTypes';


    onMounted(() => {
        getContacts()
    })

    let contacts = ref<Contact[]>([])
    let contactsToList = ref<Contact[]>([])
    let pagination = ref<any>(null)
    let selectedContact = ref(null)
    let currentPage = ref(1)
    let search = ref('');

    onMounted(() => {
        getContacts()
    })

    async function getContacts(page = 1) {
        const response = await contactService.readContacts(page)

        if (!response) return

        contacts.value = response.data
        contactsToList.value = contacts.value
        pagination.value = response
        currentPage.value = response.current_page

        await nextTick()
        initFlowbite()
    }

    function nextPage() {
        if (!pagination.value) return

        if (pagination.value.current_page < pagination.value.last_page) {
            getContacts(pagination.value.current_page + 1)
        }
    }

    function prevPage() {
        if (!pagination.value) return

        if (pagination.value.current_page > 1) {
            getContacts(pagination.value.current_page - 1)
        }
    }

    function openDrawer(id: string, contact: any = null) {
        drawerService.openDrawer(id)
        selectedContact.value = contact
    }

    function openModal(id: string, contact: any = null) {
        modalService.openModal(id)
        selectedContact.value = contact
    }

    function searchInList() {
        contactsToList.value = contactService.searchInList(search.value, contacts.value)
    }
</script>
