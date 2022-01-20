<template>
  <div class="flex flex-1 items-center justify-center bg-app-default text-white h-screen text-2xl">
    Loading...
  </div>
</template>

<script>
  // import API from '../api';
  export default {
    name: 'splashScreen',
    methods: {
      // doLogout (){
      //   localStorage.removeItem('access_token')
      //   localStorage.removeItem('refresh_token')
      //   this.$store.dispatch('login', false)
      //   this.$router.push('/login');
      // },
      // refreshToken: async function () {
      //   try {
      //     let res = await fetch(`${API}v1/user/token-refresh`, {
      //       method: 'GET',
      //       headers: {
      //         "Content-Type": "application/json",
      //         "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
      //       },
      //     });
      //     let respon = await res.json();
      //     if (respon.status !== 200) {
      //       this.doLogout()
      //       return
      //     }
      //     localStorage.setItem('access_token', respon.data.access_token)
      //     localStorage.setItem('refresh_token', respon.data.refresh_token)
      //     this.$store.dispatch('loading', false)
      //   } catch (err) {
      //     this.doLogout()
      //   }
      // },
    },
    created: function(){
      // this.refreshToken()
    },
    beforeMount: function () {
      // this.$store.dispatch('loading', true)
    }
  }
</script>