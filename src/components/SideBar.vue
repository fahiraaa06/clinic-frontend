<template>
  <aside class="relative bg-app-light h-screen w-64 hidden sm:block shadow-xl overflow-y-scroll">
    <div class="pl-6 pr-6 pt-6">
      <router-link to="/" class="text-white font-semibold uppercase hover:text-gray-300">
      {{this.$store.state.role.replace("_", " ")}}
      </router-link>
    </div>
    <nav class="text-white text-base font-semibold pt-3">
      <div v-for="(menu, index) in menuList" :key="menu.title"  class="flex items-center text-white hover:bg-app-default py-3 pl-6 nav-item cursor-pointer" :class="{ 'bg-app-default': menu.link === active}" @click="selectItem(index, menu.link)">
        <fas :icon="menu.icon" class="mr-3" />
        {{ menu.title }}
      </div>
    </nav>
  </aside>
</template>

<script>
  export default {
    name: 'SideBar',
		data() {
      return{
        menuList: [
          {
            title: 'Dashbord',
            icon: 'sticky-note',
            link: `/`,
            role: null,
          },
          {
            title: 'Resepsionis',
            icon: 'sticky-note',
            link: `/resepsionis`,
            role: 'resepsionis',
          },
          {
            title: 'Dokter',
            icon: 'sticky-note',
            link: `/dokter`,
            role: 'dokter',
          },
          {
            title: 'Kasir',
            icon: 'code-branch',
            link: `/transaction`,
            role: 'kasir',
          },
        ],
        active: `/`,
      }
    },
    beforeMount: async function () {
      let arrPath = this.$route.path.split("/");
      // let originpath = `/${arrPath[1]}/${arrPath[2]}`;
      let originpath = `/${arrPath[1]}`;
      this.active = originpath;
    },
    created: function () {
      // filter role
      console.log(this.$store.state.role);
      console.log(this.$store.state.isAdmin);
      if(!this.$store.state.isAdmin){
        this.menuList = this.menuList.filter((item)=> item.role === this.$store.state.role || item.role === null)
      }
    },
    methods: {
      selectItem(i, link) {
        if (this.$route.path !== link) {
          this.$router.push(link)
        }
        this.active = link;
      },
    },
  }
</script>
