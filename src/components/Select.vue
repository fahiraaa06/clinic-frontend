<template>
  <div class="w-full pr-0 lg:pr-2 relative">
    <label class="font-semibold text-black opacity-80">{{ title }}</label>
    <div
      @click="openSelect"
      :class="[isError ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-200']"
      class="w-full h-9 rounded-md border-2 mb-1 cursor-pointer px-2 flex flex-row items-center justify-between">
      <div class="">
        {{ selected }}
      </div>
      <fas v-if="open" icon="angle-up" class="mr-3" />
      <fas v-else icon="angle-down" class="mr-3" />
    </div>
    <div class="text-sm text-red-600 mb-5">
      {{ errorMessage }}
    </div>
    <div
      v-if="open"
      :class="[isError ? '-mt-10' : '-mt-4']"
      class="bg-white rounded-md w-full p-2 absolute border-2 z-10">
      <input v-if="inputSearch" v-model="keword" @keyup="search(keword)" type="text" class="w-full h-9 px-2 rounded-md border-2 border-gray-200 focus:outline-none focus:ring transition duration-200 mb-2" placeholder="Search">
      <div class="rounded-md max-h-72 overflow-x-hidden">
        <div
          v-for="select in data"
          :key="select.id"
          @click="selectItem(select)"
          class="h-9 pl-2 flex items-center cursor-pointer hover:bg-app-default hover:text-white"
          :class="[id === select.id ? 'bg-app-default text-white' : 'bg-gray-200']">
          {{ select.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: [
    'data',
    'selectItem',
    'title',
    'open',
    'openSelect',
    'selected',
    'search',
    'id',
    'inputSearch',
    'isError',
    'errorMessage',
  ],
  data(){
    return{
      keword: '',
    }
  }
}
</script>