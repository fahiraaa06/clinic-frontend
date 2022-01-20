<template>
  <div v-if="$store.state.serverError" class="bg-red-200 absolute right-20 bottom-20 rounded-md text-red-900">
    <div class="relative px-10 py-5">
      <button @click="_hidden" class="bg-white absolute top-1 right-1 rounded-full w-6 h-6 font-bold flex items-center justify-center">x</button>
      {{ $store.state.errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Warning',
  methods: {
    _hidden: function () {
      this.$store.dispatch('warning', {
        isError: false,
        message: ''
      })
    }
  },
}
</script>
