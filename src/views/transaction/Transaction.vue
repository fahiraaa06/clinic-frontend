<template>
  <main class="w-full flex-grow p-6">
    <button
      @click="showModalEvent"
      class="block px-3 h-9 hover:text-white focus:ring focus:ring-primary-default focus:ring-opacity-30 focus:outline-none rounded-md text-sm bg-app-default hover:bg-app-light text-white mb-3 font-bold">Tambah Transaksi</button>

    <div class="w-full lg:w-1/4 pr-0 lg:pr-2">
      <input v-model="table.search" @keyup="searchSubscriber" type="text" class="w-full h-9 px-2 rounded-md border-2 border-gray-200 focus:outline-none focus:ring transition duration-200 mb-5" placeholder="Search name">
    </div>

    <div class="mt-2 mb-5">
      <table class="w-full mx-auto table-auto">
        <thead class="justify-between">
          <tr class="bg-gray-600">
            <th class="px-5 py-2">
              <span class="text-gray-100 font-semibold">No</span>
            </th>
            <th class="px-16 py-2">
              <span class="text-gray-100 font-semibold">Name</span>
            </th>
            <th class="px-16 py-2">
              <span class="text-gray-100 font-semibold">Avatar</span>
            </th>
            <th class="px-16 py-2">
              <span class="text-gray-100 font-semibold">Option</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-gray-200">
          <tr v-for="sos, index in promotions" :key="sos.id" :class="[index % 2 !== 0 ? 'bg-gray-200' : '']" class="bg-white border-b-2 border-gray-200">
            <td class="px-5 py-2 text-center">
              {{ table.current_page === 1 ? index + 1 : (index + 1) + ((table.current_page - 1) * table.per_page) }}
            </td>
            <td class="text-center">
              <span class="font-semibold">
                {{ sos.event_name }}
              </span>
            </td>
            <td class="p-2">
              <div class="flex items-center justify-center">
                <img v-if="sos.event_images.length" class="w-10 h-10" :src="sos.event_images[0]" alt="23paskal" />
              </div>
            </td>
            <td class="">
              <div class="flex items-center justify-evenly">
                <button class="" type="button" @click="detailContent(sos.id)">
                  <span class="font-bold text-app-default">
                    More
                  </span>
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
          <!-- <button v-for="pg in Math.ceil(table.total / table.per_page)" :key="pg" @click="findpage(pg)" type="button" aria-current="page" class="z-10 border-indigo-500 relative inline-flex items-center px-4 py-2 border text-sm font-medium" :class="[table.current_page === pg ? 'bg-app-default text-white' : 'bg-white text-black']">
            {{ pg }}
          </button> -->

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
    <div v-if="modalpromotion" class="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed">
      <div class="z-50 relative p-3 mx-auto my-0 max-w-full" style="width: 1000px;">
        <div class="bg-white rounded shadow-lg border flex flex-col overflow-hidden">
          <div class="flex flex-row border-b items-center justify-between">
            <div class="px-6 py-3 text-xl font-bold">Tambah Transaksi</div>
            <div class="">
              <button @click.self="showModalEvent" class="font-3xl font-bold p-6">&times;</button>
            </div>
          </div>
          <div class="p-6 flex-grow">
            
            <div class="flex flex-wrap">
              <div class="w-full pr-0 lg:pr-2">
                <label class="font-semibold text-black opacity-80">Nama Barang</label>
                <input
                  v-model="create.event_name"
                  @keyup="eventNameChange"
                  type="text"
                  class="w-full h-9 px-2 rounded-md border-2 focus:outline-none focus:ring transition duration-200"
                  :class="[errors.event_name ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-200']"
                  placeholder="Name">
                <div class="text-sm text-red-600 mb-5">
                  {{ errors.event_name_msg }}
                </div>
              </div>
              <div class="w-full lg:w-1/2 pr-0 lg:pr-2">
                <label class="font-semibold text-black opacity-80">Total </label>
                <input
                  v-model="create.event_first_title"
                  @keyup="eventFirstTitleChange"
                  type="text"
                  class="w-full h-9 px-2 rounded-md border-2 focus:outline-none focus:ring transition duration-200"
                  :class="[errors.event_first_title ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-200']"
                  placeholder="Name">
                <div class="text-sm text-red-600 mb-5">
                  {{ errors.event_first_title_msg }}
                </div>
              </div>
              <div class="w-full lg:w-1/2 pr-0 lg:pr-2">
                <label class="font-semibold text-black opacity-80">Tanggal Transaksi</label>
                <v-date-picker timezone="" v-model="create.event_end" mode="date" is24hr>
                  <template v-slot="{ inputValue, inputEvents }">
                    <input
                      class="px-2 py-1 border-2 border-gray-200 rounded focus:outline-none focus:border-blue-300 w-full"
                      :value="inputValue"
                      v-on="inputEvents"
                    />
                  </template>
                </v-date-picker>
              </div>
            </div>
          </div>
          <div class="px-6 py-3 border-t">
            <div class="flex justify-end">
              <button @click.self="showModalEvent" type="button" class="bg-gray-700 text-gray-100 rounded px-4 py-2 mr-1">Cancel</button>
              <button
                @click="createEvent"
                type="button"
                class="bg-blue-600 text-gray-200 rounded px-4 py-2 w-32">
                {{ saveButton }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div @click.self="showModalEvent" class="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-black opacity-50"></div>
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
        promoCategory: [],
        modalpromotion: false,
        isVideoEdit: false,
        promotions: [],
        tenantList: [],
        errors: {
          event_images: false,
          event_carousel: false,
          event_images_msg: '',
          event_carousel_msg: '',
          event_name: false,
          event_name_msg: '',
          event_first_title: false,
          event_first_title_msg: '',
          event_first_description: false,
          event_first_description_msg: '',
          event_second_title: false,
          event_second_title_msg: '',
          event_second_description: false,
          event_second_description_msg: '',
          event_start: false,
          event_start_msg: '',
          event_end: false,
          event_end_msg: '',
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
          event_name: '',
          event_first_title: '',
          event_first_description: '',
          event_second_title: '',
          event_second_description: '',
          event_start: new Date(),
          event_end: new Date(),
          is_active: true,
        },
        saveButton: 'Save',
      }
    },
    methods: {
      eventNameChange: function (e) {
        this.create.event_name = e.target.value
        this.errors.event_name = false
        this.errors.event_name_msg = ''
      },
      eventFirstTitleChange: function (e) {
        this.create.event_first_title = e.target.value
        this.errors.event_first_title = false
        this.errors.event_first_title_msg = ''
      },
      eventFirstDescriptionChange: function (e) {
        this.create.event_first_description = e.target.value
        this.errors.event_first_description = false
        this.errors.event_first_description_msg = ''
      },
      eventSecondTitleChange: function (e) {
        this.create.event_second_title = e.target.value
        this.errors.event_second_title = false
        this.errors.event_second_title_msg = ''
      },
      eventSecondDescriptionChange: function (e) {
        this.create.event_second_description = e.target.value
        this.errors.event_second_description = false
        this.errors.event_second_description_msg = ''
      },
      searchSubscriber: function () {
        this.current_page = 1
        this.per_page = 10
        this.findEvent()
      },
      nexPage: function () {
        this.table.current_page = this.table.current_page + 1
        this.findEvent()
      },
      previewPage: function () {
        this.table.current_page = this.table.current_page - 1
        this.findEvent()
      },
      findpage: function (page) {
        this.table.current_page = page
        this.findEvent()
      },
      detailContent: function (id) {
        this.$router.push(this.$route.path + "/" + id)
      },
      chooseSingleFile: function() {
        document.getElementById("product_file").click()
      },
      removeProductEvent: function () {
        this.avatar.previewFileProduct = [];
        this.avatar.fileProduct = [];
      },
      chooseFileLocation: function() {
        document.getElementById("carousel_file").click()
      },
      removeCarouselEvent: function () {
        this.avatar.fileCarousel = null;
        this.avatar.previewFileCarousel = null;
      },
      previewProductEvent: function(event) {
        let input = event.target;
        let count = input.files.length;
        let index = 0;
        if (input.files) {
          while(count --) {
            let reader = new FileReader();
            reader.onload = (e) => {
              this.avatar.previewFileProduct.push(e.target.result);
            }
            this.avatar.fileProduct.push(input.files[index]);
            reader.readAsDataURL(input.files[index]);
            index ++;
          }
        }
        this.errors.event_images = false
        this.errors.event_images_msg = ''
      },
      previewCarouselEvent: function(event) {
        let input = event.target;
        if (input.files) {
          if (this.isVideoExtension(input.files[0].name)) {
            this.isVideoEdit = true
          } else {
            this.isVideoEdit = false
          }
          let reader = new FileReader();
          reader.onload = (e) => {
            this.avatar.previewFileCarousel = e.target.result;
          }
          this.avatar.fileCarousel = input.files[0];
          reader.readAsDataURL(input.files[0]);
        }
        this.errors.event_carousel = false
        this.errors.event_carousel_msg = ''
      },
      showModalEvent: function (){
        this.avatar = {
          previewFileProduct: [],
          fileProduct: [],
          previewFileCarousel: null,
          fileCarousel: null,
        },
        this.create = {
          event_name: '',
          event_first_title: '',
          event_first_description: '',
          event_second_title: '',
          event_second_description: '',
          event_start: new Date(),
          event_end: new Date(),
          is_active: true,
        },
        this.modalpromotion = !this.modalpromotion
      },
      findEvent: async function() {
        try {
          let res = await fetch(`${API}v1/admin/events?current_page=${this.table.current_page}&per_page=${this.table.per_page}&search=${this.table.search}`, {
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
          this.promotions = respon.data.events
          this.table.current_page = respon.data.current_page
          this.table.per_page = respon.data.per_page
          // this.table.search = respon.data.search
          this.table.total = respon.data.total
        } catch (err) {
          this._error('internal server error')
        }
      },
      convertTZ: function(date, tzString) {
        return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
      },
      createEvent: async function () {
        this.saveButton = 'Loading...'
        let formdata = new FormData();
        formdata.append("event_name", this.create.event_name);
        formdata.append("event_first_title", this.create.event_first_title);
        formdata.append("event_first_description", this.create.event_first_description);
        formdata.append("event_second_title", this.create.event_second_title);
        formdata.append("event_second_description", this.create.event_second_description);
        formdata.append("event_start", this.create.event_start);
        formdata.append("event_end", this.create.event_end);
        formdata.append("is_active", this.create.is_active);
        this.avatar.fileProduct.map((product) => {
          formdata.append("event_images", product);
        });
        formdata.append("event_carousel", this.avatar.fileCarousel);
        try {
          let res = await fetch(`${API}v1/event`, {
            method: 'POST',
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: formdata,
          });
          const response = await res.json();
          if (response.status !== 200) {
            if (response.message === 'ERR_FORM') {
              response.data.map((item) => {
                if (item.key === 'event_images'){
                  this.errors.event_images = true
                  this.errors.event_images_msg = item.message
                }
                if (item.key === 'event_carousel'){
                  this.errors.event_carousel = true
                  this.errors.event_carousel_msg = item.message
                }
                if (item.key === 'event_name'){
                  this.errors.event_name = true
                  this.errors.event_name_msg = item.message
                }
                if (item.key === 'event_first_title'){
                  this.errors.event_first_title = true
                  this.errors.event_first_title_msg = item.message
                }
                if (item.key === 'event_first_description'){
                  this.errors.event_first_description = true
                  this.errors.event_first_description_msg = item.message
                }
                if (item.key === 'event_second_title'){
                  this.errors.event_second_title = true
                  this.errors.event_second_title_msg = item.message
                }
                if (item.key === 'event_second_description'){
                  this.errors.event_second_description = true
                  this.errors.event_second_description_msg = item.message
                }
                if (item.key === 'event_start'){
                  this.errors.event_start = true
                  this.errors.event_start_msg = item.message
                }
                if (item.key === 'event_end'){
                  this.errors.event_end = true
                  this.errors.event_end_msg = item.message
                }
                if (item.key === 'is_active'){
                  this.errors.is_active = true
                  this.errors.is_active_msg = item.message
                }
              })
              this.saveButton = 'Save'
              return
            }
            this.saveButton = 'Save'
            return
          }
          this.modalpromotion = false
          this.saveButton = 'Save'
          this.findEvent();
        } catch (err) {
          this.saveButton = 'Save'
          this.modalpromotion = false
          this._error('internal server error')
        }
      },
      isVideoExtension: function (nameFile) {
        const imageFormat = ['jpg', 'png', 'jpeg', 'gif']
        const videoFormat = ['mp4', '3gp']
        let regexExtension = '[^.]+$'
        let extension = nameFile.toLowerCase().match(regexExtension)
        if (imageFormat.includes(extension[0])) {
          return false
        }
        if (videoFormat.includes(extension[0])) {
          return true
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
      // this.findEvent()
    }
  }
</script>
