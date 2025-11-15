<template>
    <div class="antialiased h-screen bg-gray-50 dark:bg-gray-900">
    <nav class="bg-blue-600 border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
      <div class="flex flex-wrap justify-between items-center">
        <div class="flex justify-start items-center">
          <a href="https://crm.betabit.com.br/" class="flex items-center justify-between mr-4">
            <img
              :src=logo
              class="mr-3 h-8"
              alt="Flowbite Logo"
            />
          </a>
        </div>
        <div class="flex items-center lg:order-2">
          <button
            type="button"
            class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="dropdown"
          >
            <span class="sr-only">Open user menu</span>
            <img
                class="w-8 h-8 rounded-full"
                :src=user?.avatar
                alt="user photo"
            />
          </button>
          <!-- Dropdown menu -->
          <div
            class="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl"
            id="dropdown"
          >
            <div class="py-3 px-4">
              <span
                class="block text-sm font-semibold text-gray-900 dark:text-white"
                >{{ user?.name }}</span
              >
              <span
                class="block text-sm text-gray-900 truncate dark:text-white"
                >{{ user?.email }}</span
              >
            </div>
            <ul
              class="py-1 text-gray-700 dark:text-gray-300"
              aria-labelledby="dropdown"
            >
              <li>
                <button
                  @click="logout()"
                  class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >Sign out</button
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <main class="p-4 h-auto pt-20">
        <List />
    </main>
  </div>
</template>
<script setup lang="ts">
    import List from '../components/List.vue';
    import logo from '../assets/betabit_logo.png'
    import { onMounted, ref } from 'vue';
    import { authService } from '../services/auth-service';
    import { User } from '../types/authTypes';
    import { useAuthStore } from '../storage/auth';

    const user = ref<User | null>(null)
    const storageAuth = useAuthStore()

    onMounted(async () => {
        user.value = await authService.getUser()
    })

    async function logout() {
        await authService.logout()
        storageAuth.logout()
        window.location.reload()
    }
</script>

