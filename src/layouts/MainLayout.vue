<template>
  <div class="bg-gray-100 font-family-karla flex">

    <div class="relative w-full flex flex-col h-screen overflow-y-hidden">

      <TopBar />

      <div class="w-full h-screen overflow-x-hidden border-t flex flex-col">

        <router-view/>
        
        <BottomBar />

      </div>
    </div>

  </div>
</template>

<script>
  import TopBar from '../components/TopBar'
  import BottomBar from '../components/BottomBar'
  export default {
    name: 'Home',
    components: {
      TopBar,
      BottomBar
    },
		data() {
      return{
      }
    },
  }
</script>