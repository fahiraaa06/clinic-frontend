<template>
  <div v-if="!isLoading" class="bg-gray-100 font-family-karla flex">

    <SideBar />

    <div class="relative w-full flex flex-col h-screen overflow-y-hidden">

      <TopBar />

      <div class="w-full h-screen overflow-x-hidden border-t flex flex-col">
        
        <router-view/>
        
        <BottomBar />

      </div>
    </div>

  </div>
  <SplashScreen v-else />
</template>

<script>
  import API from '../api';
  import SideBar from '../components/SideBar'
  import TopBar from '../components/TopBar'
  import BottomBar from '../components/BottomBar'
  import SplashScreen from '../components/SplashScreen.vue'
  export default {
    name: 'Dashboard',
    components: {
      SideBar,
      TopBar,
      BottomBar,
      SplashScreen,
    },
		data() {
      return{
        isLoading: false,
      }
    },
    methods: {
      refreshToken: async function () {
        try {
          let res = await fetch(`${API}v1/user/token-refresh`, {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
            },
          });
          let respon = await res.json();
          if (respon.status !== 200) {
            this.doLogout()
            return
          }
          // console.log(respon.data.access_token);
          localStorage.setItem('access_token', respon.data.access_token)
          localStorage.setItem('refresh_token', respon.data.refresh_token)
          this.isLoading = false
          // this.$store.dispatch('loading', false)
        } catch (err) {
          this.doLogout()
        }
      },
      findProfile: async function () {
        try {
          let res = await fetch(`${API}v1/user/profile`, {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
            },
          });
          let respon = await res.json();
          if (respon.status !== 200) {
            this.doLogout()
            return
          }
          // console.log(respon.data.role);
          if (respon.data.role === 'super_admin'){
            await this.$store.dispatch('admin', true)
          } else {
            await this.$store.dispatch('admin', false)
          }
          // await this.$store.dispatch('admin', false)
          await this.$store.dispatch('profile', respon.data)
          this.refreshToken()
        } catch (err) {
          this.doLogout()
        }
      },
      doLogout (){
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        this.$store.dispatch('login', false)
        this.$router.push('/login');
      },
    },
    created: function () {
      // this.findProfile()
    }
  }
</script>