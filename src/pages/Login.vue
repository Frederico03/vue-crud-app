<template>
  <div class="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center px-6 py-8">
    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
      <img
        class="w-60 bg-blue-600 rounded-lg p-4 mr-2"
        :src=logo
        alt="logo"
      />
    </a>
    <div
      class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
        >
          Sign in to your account
        </h1>

        <!-- Form -->
        <form class="space-y-4 md:space-y-6" @submit.prevent="onSubmit">
          <!-- Email -->
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          <!-- Submit -->
        <button 
            type="submit"
            :disabled="loading"
            class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
        {{ loading ? 'Signing in...' : 'Sign in' }}     
        </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'
    import { authService } from '../services/auth-service'
    import { useAuthStore } from '../storage/auth'
    import logo from '../assets/betabit_logo.png'


    const router = useRouter()

    // Campos do formulário
    const email = ref('')
    const password = ref('')
    const remember = ref(false)
    const loading = ref(false)
    const storageAuth = useAuthStore()

    async function onSubmit() {
        if (!email.value || !password.value) return

        loading.value = true

        try {
            const response = await authService.login({
                email: email.value,
                password: password.value,
            })

            storageAuth.login(response.token)

            const user = await authService.getUser()
            
            storageAuth.setUser(user)

            router.push('/dashboard')
        } catch (error: any) {
            console.error(error)
        }

        loading.value = false
    }
</script>
