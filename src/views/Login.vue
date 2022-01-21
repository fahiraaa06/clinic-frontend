<template>
  <div class="bg-gray-100 w-screen h-screen flex items-center justify-center">
    <div class="bg-white p-8 flex flex-col rounded-lg border-2 border-gray-300 border-opacity-50">
      <div class="text-center mb-5 text-3xl text-black">Login</div>
      <div v-if="isError" class="bg-red-200 mb-5 p-2 rounded-md text-red-600">{{ message }}</div>
      <input
        v-model="email"
        type="text"
        @keyup="emailChange"
        class="w-72 h-9 px-2 rounded-md border-2 focus:outline-none focus:ring transition duration-200 text-xs"
        :class="[errors.email ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-200']"
        placeholder="email">
        <div class="text-sm text-red-600 mb-5">
          {{ errors.email_msg }}
        </div>
      <input
        v-model="password"
        type="password"
        class="w-72 h-9 px-2 rounded-md border-2 border-gray-200 focus:outline-none focus:ring transition duration-200 text-xs"
        @keyup="passwordChange"
        :class="[errors.password ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-200']"
        placeholder="password">
        <div class="text-sm text-red-600 mb-5">
          {{ errors.password_msg }}
        </div>
      <button
        @click="doLogin"
        class="w-72 block px-3 h-9 hover:text-white focus:ring focus:ring-primary-default focus:ring-opacity-30 focus:outline-none rounded-md text-sm bg-app-default hover:bg-app-light text-white">
        {{ loginBtn }}
        </button>
    </div>
  </div>
</template>

<script>
  import API from '../api';
	export default {
		name: 'Login',
		data() {
      return{
        email: 'admin@email.com',
        password: 'testing123',
        // email: 'konang@email.com',
        // password: '',
        // email: '',
        errors: {
          email: false,
          email_msg: '',
          password: false,
          password_msg: '',
        },
        isError: false,
        message: null,
        loginBtn: 'Login',
      }
    },
    methods: {
      emailChange: function (e) {
        this.email = e.target.value
        this.errors.email = false
        this.errors.email_msg = ''
      },
      passwordChange: function (e) {
        this.password = e.target.value
        this.errors.password = false
        this.errors.password_msg = ''
      },
      doLogin: async function(){
        this.loginBtn = 'Loading...'
        try {
          let res = await fetch(`${API}v1/user/login`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password,
            }),
          });
          let respon = await res.json();
          console.log(respon.data.token);
          await localStorage.setItem('access_token', respon.data.token)
          // await localStorage.setItem('refresh_token', respon.data.refresh_token)
          await this.$store.dispatch('login', true)
          if (respon.data.role === 'super_user'){
            await this.$store.dispatch('admin', true)
          } else {
            await this.$store.dispatch('admin', false)
          }
          await this.$store.dispatch('role', respon.data.role)
          this.$router.push('/');
        } catch (e) {
          this.loginBtn = 'Login'
          this.isError = true
          this.message = e.message
          this._error('internal server error')
        }
      },
      _error: function (message) {
        this.$store.dispatch('warning', {
          isError: true,
          message: message
        })
        setTimeout(() => {
          this.$store.dispatch('warning', {
          isError: false,
          message: ''
        })
        }, 5000)
      }
    },
    created: function () {
      if (localStorage.getItem('access_token') !== null) {
        this.$router.push('/');
      }
    },
    beforeMount () {
    },
	}
</script>
