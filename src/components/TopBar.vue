<template>
  <header class="w-full items-center bg-white py-2 px-6 hidden sm:flex">
    <div class="w-1/2"></div>
    <div class="relative w-1/2 flex justify-end">
      <button @click="isOpen = !isOpen" class="realtive z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
        <img v-if="$store.state.profile.user_avatar !== ''" :src="$store.state.profile.user_avatar">
      </button>
      <button v-show="isOpen" @click="isOpen = false" class="h-full w-full fixed inset-0 cursor-default"></button>
      <div v-show="isOpen" class="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16">
        <button @click="doLogout" class="hover:bg-app-light hover:text-white px-4 py-2 w-full">{{ btnTitle }}</button>
        <button @click="doProfile" class="hover:bg-app-light hover:text-white px-4 py-2 w-full">{{ btnTitle }}</button>
      </div>
    </div>
  </header>

  <header class="w-full bg-app-light py-5 px-6 sm:hidden">
    <div class="flex items-center justify-between">
      <a href="index.html" class="text-white text-3xl font-semibold uppercase hover:text-gray-300">Admin</a>
      <button @click="isOpen = !isOpen" class="text-white text-3xl focus:outline-none">
        <fas v-if="!isOpen" icon="bars" />
        <fas v-if="isOpen" icon="times" />
      </button>
    </div>

    <nav :class="isOpen ? 'flex': 'hidden'" class="flex flex-col pt-4">
      <div @click="doProfile" class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item cursor-pointer">
        <fas icon="sign-out-alt" class="mr-3" />
        Profile
      </div>
      <div @click="doLogout" class="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item cursor-pointer">
        <fas icon="sign-out-alt" class="mr-3" />
        Sign Out
      </div>
      
    </nav>
  </header>
</template>

<script>
  // import API from '../api';
  export default {
    name: 'TopBar',
		data() {
      return{
        isOpen: false,
        profile: {},
        btnTitle: 'Sign Out'
      }
    },
    methods: {
      doLogout: async function () {
        this.btnTitle = 'Loading...'
        await localStorage.removeItem('access_token')
        // await localStorage.removeItem('refresh_token')
        await this.$store.dispatch('login', false)
        // await this.$store.dispatch('role', null)
        this.$router.push('/login');
      },
      doProfile: async function () {
        this.btnTitle = 'Loading...'
        await localStorage.removeItem('access_token')
        await localStorage.removeItem('refresh_token')
        await this.$store.dispatch('login', false)
        await this.$store.dispatch('role', null)
        this.$router.push('/login');
      },
    },
    created: function(){
      // this.findProfile()
      // console.log(this.$store.state);
    }
  }
</script>