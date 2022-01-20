<template>
  <table>
    
  </table>
  <!-- <div class="mb-5">
    <table class="w-full mx-auto table-auto">
      <thead class="justify-between">
        <tr class="bg-gray-600">
          <th class="px-16 py-2" style="width: 10%;">
            <span class="text-gray-100 font-semibold">No</span>
          </th>
          <th class="px-16 py-2">
            <span class="text-gray-100 font-semibold">Email</span>
          </th>
          <th class="px-16 py-2" style="width: 10%;">
            <span class="text-gray-100 font-semibold">Option</span>
          </th>
        </tr>
      </thead>
      <tbody class="bg-gray-200">
        <tr v-for="sos, index in rows" :key="sos.id" :class="[index % 2 !== 0 ? 'bg-gray-200' : '']" class="bg-white border-b-2 border-gray-200">
          <td class="px-16 py-2 text-center">
            {{ table.current_page === 1 ? index + 1 : (index + 1) + ((table.current_page - 1) * table.per_page) }}
          </td>
          <td class="text-center">
            <span class="font-semibold">
              {{ sos.email }}
            </span>
          </td>
          <td class="">
            <div class="flex items-center justify-evenly">
              -
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div> -->

  <!-- <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
    <div>
      <p class="text-sm text-gray-700">
        Showing
        <span class="font-medium">
          {{ (table.current_page * table.per_page) - table.per_page + 1 }}
        </span>
        to
        <span class="font-medium">
          {{ table.current_page * table.per_page }}
        </span>
        of
        <span class="font-medium">{{ table.total }}</span>
        results
      </p>
    </div>
    <div>
      <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        <button type="button" @click="previewPage" :disabled="table.current_page === 1" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
          <span class="sr-only">Previous</span>
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
        <div v-if="Math.ceil(table.total / table.per_page) < 5" class="">
          <button v-for="pg in Math.ceil(table.total / table.per_page)" :key="pg" @click="findpage(pg)" type="button" aria-current="page" class="z-10 border-indigo-500 relative inline-flex items-center px-4 py-2 border text-sm font-medium" :class="[table.current_page === pg ? 'bg-app-default text-white' : 'bg-white text-black']">
            {{ pg }}
          </button>
        </div>
        <div v-else class="">
          <button @click="findpage(1)" type="button" aria-current="page" class="z-10 border-indigo-500 relative inline-flex items-center px-4 py-2 border text-sm font-medium" :class="[table.current_page === 1 ? 'bg-app-default text-white' : 'bg-white text-black']">
            1
          </button>

          <button
            @click="findpage(
              table.current_page === 1 ? 2 
              : table.current_page === 2 ? 2
              : table.current_page === Math.ceil(table.total / table.per_page) ? table.current_page - 3
              : table.current_page === Math.ceil(table.total / table.per_page) - 1  ? table.current_page - 2
              : table.current_page - 1
            )"
            type="button"
            aria-current="page"
            :disabled="Math.ceil(table.total / table.per_page) - 1 === table.current_page"
            class="z-10 border-indigo-500 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            :class="[
            table.current_page === 1 ? 'bg-white text-black' :
            table.current_page === 2 ? 'bg-app-default text-white' : 'bg-white text-black'
            ]">
            {{
              table.current_page === 1 ? 2 
              : table.current_page === 2 ? 2
              : table.current_page === Math.ceil(table.total / table.per_page) ? table.current_page - 3
              : table.current_page === Math.ceil(table.total / table.per_page) - 1  ? table.current_page - 2
              : table.current_page - 1
            }}
          </button>

          <button
            @click="findpage(
              table.current_page === 1 ? 3 
              : table.current_page === 2 ? 3
              : table.current_page === Math.ceil(table.total / table.per_page) - 1 ? table.current_page - 1
              : table.current_page === Math.ceil(table.total / table.per_page) ? table.current_page - 2
              : table.current_page
            )"
            type="button"
            aria-current="page"
            :disabled="Math.ceil(table.total / table.per_page) - 1 === table.current_page"
            class="z-10 border-indigo-500 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            :class="[
              table.current_page === Math.ceil(table.total / table.per_page) - 1 ? 'bg-white text-black'
              : table.current_page === Math.ceil(table.total / table.per_page) ? 'bg-white text-black'
              : table.current_page === 1 ? 'bg-white text-black'
              : table.current_page === 2 ? 'bg-white text-black'
              : 'bg-app-default text-white'
            ]">
            {{
              table.current_page === 1 ? 3 
              : table.current_page === 2 ? 3
              : table.current_page === Math.ceil(table.total / table.per_page) - 1 ? table.current_page - 1
              : table.current_page === Math.ceil(table.total / table.per_page) ? table.current_page - 2
              : table.current_page
            }}
          </button>

          <button
            @click="findpage(
              table.current_page === 1 ? 4 
              : table.current_page === 2 ? 4
              : table.current_page === Math.ceil(table.total / table.per_page) - 1 ? Math.ceil(table.total / table.per_page) - 1
              : table.current_page === Math.ceil(table.total / table.per_page) ? table.current_page - 1
              : table.current_page + 1
            )"
            type="button"
            aria-current="page"
            :disabled="Math.ceil(table.total / table.per_page) - 1 === table.current_page"
            class="z-10 border-indigo-500 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            :class="[
              table.current_page === Math.ceil(table.total / table.per_page) - 2 ? 'bg-white text-black'
              : table.current_page === Math.ceil(table.total / table.per_page) - 3 ? 'bg-white text-black'
              : table.current_page === Math.ceil(table.total / table.per_page) ? 'bg-white text-black' 
              : table.current_page > 1 && table.current_page < Math.ceil(table.total / table.per_page) - 1 ? 'bg-white text-black'
              : table.current_page === 1 ? 'bg-white text-black'
              : 'bg-app-default text-white'
            ]">
            {{
              table.current_page === 1 ? 4 
              : table.current_page === 2 ? 4
              : table.current_page === Math.ceil(table.total / table.per_page) - 1 ? Math.ceil(table.total / table.per_page) - 1
              : table.current_page === Math.ceil(table.total / table.per_page) ? table.current_page - 1
              : table.current_page + 1
            }}
          </button>

          <button @click="findpage(Math.ceil(table.total / table.per_page))" type="button" aria-current="page" class="z-10 border-indigo-500 relative inline-flex items-center px-4 py-2 border text-sm font-medium" :class="[table.current_page === Math.ceil(table.total / table.per_page) ? 'bg-app-default text-white' : 'bg-white text-black']">
            {{ Math.ceil(table.total / table.per_page) }}
          </button>
        </div>
        
        <button type="button" @click="nexPage" :disabled="Math.ceil(table.total / table.per_page) === table.current_page"  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
          <span class="sr-only">Next</span>
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
      </nav>
    </div>
  </div> -->

</template>

<script>
export default {
  name: 'Table',
  props: [
    'rows',
    'table',
  ],
  data(){
    return{
      keword: '',
    }
  }
}
</script>