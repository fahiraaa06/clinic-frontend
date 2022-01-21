<template>
  <main class="w-full flex-grow p-6">
      <!-- @click="showModalPasien" -->
    <button
      @click="showModal('insert', null)"
      class="block px-3 h-9 hover:text-white focus:ring focus:ring-primary-default focus:ring-opacity-30 focus:outline-none rounded-md text-sm bg-app-default hover:bg-app-light text-white mb-3 font-bold">Tambah Pasien</button>

    <div class="w-full lg:w-1/4 pr-0 lg:pr-2">
      <input v-model="table.search" @keyup="searchSubscriber" type="text" class="w-full h-9 px-2 rounded-md border-2 border-gray-200 focus:outline-none focus:ring transition duration-200 mb-5" placeholder="Search name">
    </div>

    <div class="mt-2 mb-5">
      <table class="w-full mx-auto table-auto">
        <thead class="justify-between">
          <tr class="bg-gray-600">
            <th class="px-16 py-2">
              <span class="text-gray-100 font-semibold">No</span>
            </th>
            <th class="px-16 py-2">
              <span class="text-gray-100 font-semibold">Name</span>
            </th>
            <th class="px-16 py-2">
              <span class="text-gray-100 font-semibold">Tgl Lahir</span>
            </th>
            <th class="px-16 py-2">
              <span class="text-gray-100 font-semibold">Alamat</span>
            </th>
            <th class="px-16 py-2">
              <span class="text-gray-100 font-semibold">Options</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-gray-200">
          <tr v-for="item, index in pasien" :key="item.id" :class="[index % 2 !== 0 ? 'bg-gray-200' : '']" class="bg-white border-b-2 border-gray-200">
            <td class="px-16 py-2 text-center">
              {{ index + 1 }}
            </td>
            <td class="text-center">
              <span class="font-semibold">
                {{ item.name }}
              </span>
            </td>
            <td class="text-center">
              <span class="font-semibold">
                {{ item.bod }}
              </span>
            </td>
            <td class="text-center">
              <span class="font-semibold">
                {{ item.address }}
              </span>
            </td>
            <td class="">
              <div class="flex items-center justify-evenly">
                <button class="" type="button" @click="showModal(item)">
                  <fas icon="pencil-alt" class="text-app-default text-xl" />
                </button>
                <button class="" type="button" @click="showModalDestroy(item.id)">
                  <fas icon="trash-alt" class="text-red-600 text-xl" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
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
    </div>

    <!-- modal create -->
    <div v-if="modalPasien" class="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed">
      <div class="z-50 relative p-3 mx-auto my-0 max-w-full" style="width: 1000px;">
        <div class="bg-white rounded shadow-lg border flex flex-col overflow-hidden">
          <div class="flex flex-row border-b items-center justify-between">
            <div class="px-6 py-3 text-xl font-bold">Tambah Pasien</div>
            <div class="">
              <button @click.self="showModalPasien" class="font-3xl font-bold p-6">&times;</button>
            </div>
          </div>
          <div class="p-6 flex-grow">
            
            <div class="flex flex-wrap">
              <div class="w-full pr-0 lg:pr-2">
                <label class="font-semibold text-black opacity-80">Nama</label>
                <input
                  v-model="create.name"
                  @keyup="pasienNameChange"
                  type="text"
                  class="w-full h-9 px-2 rounded-md border-2 focus:outline-none focus:ring transition duration-200"
                  :class="[errors.name ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-200']"
                  placeholder="Name">
                <div class="text-sm text-red-600 mb-5">
                  {{ errors.name_msg }}
                </div>
              </div>
              <div class="w-full lg:w-1/2 pr-0 lg:pr-2 mb-3">
                <label class="font-semibold text-black opacity-80">Tanggal Lahir</label>
                <v-date-picker timezone="" v-model="create.bod" mode="date" is24hr>
                  <template v-slot="{ inputValue, inputEvents }">
                    <input
                      class="px-2 py-1 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-300 w-full"
                      :value="inputValue"
                      v-on="inputEvents"
                    />
                  </template>
                </v-date-picker>
              </div>
              <div class="w-full pr-0 lg:pr-2">
                <label class="font-semibold text-black opacity-80">Alamat</label>
                <textarea
                  v-model="create.address"
                  @keyup="pasienAddressChange"
                  rows="5"
                  class="w-full pl-3 pr-3 py-2 rounded-md border-2 focus:outline-none focus:ring transition duration-200"
                  :class="[errors.address ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-200']"
                  placeholder="Description">
                </textarea>
                <div class="text-sm text-red-600 mb-5">
                  {{ errors.address_msg }}
                </div>
              </div>
            </div>
          </div>
          <div class="px-6 py-3 border-t">
            <div class="flex justify-end">
              <button @click.self="showModalPasien" type="button" class="bg-gray-700 text-gray-100 rounded px-4 py-2 mr-1">Cancel</button>
              <button
                @click="registrasiPasien"
                type="button"
                class="bg-blue-600 text-gray-200 rounded px-4 py-2 w-32">
                {{ saveButton }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div @click.self="showModalPasien" class="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-black opacity-50"></div>
    </div>

    <!-- Modal destroy -->
    <div v-if="modalDestroy" class="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed flex items-center">
      <div class="z-50 relative p-3 mx-auto my-0 max-w-full" style="width: 400px;">
        <div class="bg-white rounded shadow-lg border flex flex-col overflow-hidden">
          <div class="flex flex-row border-b items-center justify-between">
            <div class="px-6 py-3 text-xl font-bold">Warning !</div>
            <div class="">
              <button @click.self="closeModalDestroy" class="font-3xl font-bold p-6">&times;</button>
            </div>
          </div>
          <div class="p-6 flex-grow">
            Are You Sure To Continue Delete This Floor
          </div>
          <div class="px-6 py-3 border-t">
            <div class="flex justify-end">
              <button @click.self="closeModalDestroy" type="button" class="bg-green-400 text-gray-100 rounded px-4 py-2 mr-1">Cancel</button>
              <button @click="deletePasien" type="button" class="bg-red-500 text-gray-200 rounded px-4 py-2 w-32">
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
      <div @click.self="closeModalDestroy" class="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-black opacity-50"></div>
    </div>

  </main>
</template>

<script>
  import API from '../../api';
  export default {
    name: 'Event',
    components: {
    },
		data() {
      return{
        id: null,
        modalDestroy: false,
        promoCategory: [],
        modalPasien: false,
        isVideoEdit: false,
        pasien: [],
        tenantList: [],
        errors: {
          event_images: false,
          event_carousel: false,
          event_images_msg: '',
          event_carousel_msg: '',
          name: false,
          name_msg: '',
          event_first_title: false,
          event_first_title_msg: '',
          event_first_description: false,
          event_first_description_msg: '',
          event_second_title: false,
          event_second_title_msg: '',
          address: false,
          address_msg: '',
          event_start: false,
          event_start_msg: '',
          bod: false,
          bod_msg: '',
          is_active: false,
          is_active_msg: '',
        },
        table: {
          current_page: 1,
          per_page: 10,
          search: '',
          total: 0,
        },
        avatar: {
          previewFileProduct: [],
          fileProduct: [],
          previewFileCarousel: null,
          fileCarousel: null,
        },
        create: {
          id: null,
          name: '',
          event_first_title: '',
          event_first_description: '',
          event_second_title: '',
          address: '',
          event_start: new Date(),
          bod: new Date(),
          is_active: true,
        },
        saveButton: 'Save',
      }
    },
    methods: {
      pasienNameChange: function (e) {
        this.create.name = e.target.value
        this.errors.name = false
        this.errors.name_msg = ''
      },
      pasienAddressChange: function (e) {
        this.create.address = e.target.value
        this.errors.address = false
        this.errors.address_msg = ''
      },
      showModalDestroy: function (id) {
        this.id = id
        this.modalDestroy = true
      },
      searchSubscriber: function () {
        this.current_page = 1
        this.per_page = 10
        this.findPasien()
      },
      nexPage: function () {
        this.table.current_page = this.table.current_page + 1
        this.findPasien()
      },
      previewPage: function () {
        this.table.current_page = this.table.current_page - 1
        this.findPasien()
      },
      findpage: function (page) {
        this.table.current_page = page
        this.findPasien()
      },
      showModalPasien: function (){
        this.create = {
          name: '',
          address: '',
          bod: new Date(),
        },
        this.modalPasien = !this.modalPasien
      },
      closeModalDestroy: function (){
        this.id = null
        this.modalDestroy = false
      },
      showModal: function (val){
        this.create = {
          id: val.id,
          name: val.name,
          address: val.address,
          bod: val.bod,
        }
        this.modalPasien = !this.modalPasien
      },
      findPasien: async function() {
        try {
          let res = await fetch(`${API}v1/pasien?current_page=${this.table.current_page}&per_page=${this.table.per_page}&search=${this.table.search}`, {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
            },
          });
          let respon = await res.json();
          if (respon.status !== 200) {
            this._error('internal server error')
            return
          }
          console.log(respon);
          this.pasien = respon.data.docs
          this.table.current_page = respon.data.paging.current_page
          this.table.per_page = respon.data.paging.per_page
          this.table.search = respon.data.paging.search
          this.table.total = respon.data.paging.total
        } catch (err) {
          this._error('internal server error')
        }
      },
      convertTZ: function(date, tzString) {
        return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
      },
      registrasiPasien: async function () {
        this.saveButton = 'Loading...'
        try {
          let res = await fetch(`${API}v1/pasien`, {
            method: 'POST',
            headers: {
              // "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
              "content-type": "application/json",
            },
            body: JSON.stringify({
              name: this.create.name,
              bird_of_date: this.create.bod,
              address: this.create.address,
            }),
          });
          const response = await res.json();
          if (response.status !== 200) {
            console.log(response);
            return
          }
          this.modalPasien = false
          this.saveButton = 'Save'
          this.findPasien();
        } catch (err) {
          this.saveButton = 'Save'
          this.modalPasien = false
          this._error('internal server error')
        }
      },
      deletePasien: async function () {
        this.deleteButton = 'Loading...'
        try {
          let res = await fetch(`${API}v1/pasien`, {
            method: 'DELETE',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({
              id: this.id,
            })
          });
          let respon = await res.json();
          if (respon.status !== 200) {
            this._error('internal server error')
            return;
          }
          this.modalDestroy = false
          // this.deleteButton = 'Delete'
          // this.$router.push(`/promo`);
          this.findPasien();
        } catch (err) {
          this.deleteButton = 'Delete'
          this.modalDestroy = false
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
    created: function(){
      this.findPasien()
    }
  }
</script>
