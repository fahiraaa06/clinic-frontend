<template>
  <main class="w-full flex-grow p-6">
    <div class="flex justify-between items-center">
      <div class="">
        <h1 class="text-3xl font-bold text-app-default">Detail</h1>
      </div>
      <div class="flex">
        <!-- <div @click="showModalDestroy" class="mr-5 cursor-pointer">
          <fas icon="trash-alt" class="text-red-600 text-2xl" />
        </div> -->
      </div>
    </div>

    <div class="w-full lg:w-full my-6 pr-0 lg:pr-2">
      <div class="leading-loose">
        <div class="p-5 bg-white rounded shadow-xl">
          <div class="flex justify-between border-b-2 mb-5 pb-5">
            <div class="font-bold text-2xl">Pasien</div>
            <div @click="showModalEditContentTenant" class="mr-5 cursor-pointer">
              <fas icon="pencil-alt" class="text-app-default text-2xl" />
            </div>
          </div>
          <div class="font-semibold">Name</div>
          <div v-if="content.tenant_name !== ''" class="ml-5">{{ content.name }}</div>
          <div v-else class="ml-5">-</div>
          <div class="font-semibold">dokter_name</div>
          <div v-if="content.dokter_name !== ''" class="ml-5">{{ content.dokter_name }}</div>
          <div v-else class="ml-5">-</div>
          <div class="font-semibold">status</div>
          <div v-if="content.status !== ''" class="ml-5">{{ content.status }}</div>
          <div v-else class="ml-5">-</div>
        </div>
      </div>
    </div>

    <div class="w-full lg:w-full my-6 pr-0 lg:pr-2">
      <div class="leading-loose">
        <div class="p-5 bg-white rounded shadow-xl">
          <div class="flex justify-between border-b-2 mb-5 pb-5">
            <div class="font-bold text-2xl">Medical Record</div>
            <div @click="showModalEvent" class="mr-5 cursor-pointer">
              <fas icon="pencil-alt" class="text-app-default text-2xl" />
            </div>
          </div>
          <div v-for="pr in medicalRecord" :key="pr.id" class="rounded-md p-2 mb-4 border-b-2">
            <div class="font-semibold">createdAt</div>
            <div v-if="pr.createdAt !== ''" class="ml-5">{{ pr.createdAt }}</div>
            <div v-else class="ml-5">-</div>
            <div class="font-semibold">checkup</div>
            <div v-if="pr.checkup !== ''" class="ml-5">{{ pr.checkup }}</div>
            <div v-else class="ml-5">-</div>
            <div class="font-semibold">medical_record</div>
            <div v-if="pr.medical_record !== ''" class="ml-5">{{ pr.medical_record }}</div>
            <div v-else class="ml-5">-</div>
            <div class="font-semibold">obat_name</div>
            <div v-for="ob in pr.obats" :key="ob.id" class="rounded-md p-1 mb-1">
              <div v-if="ob.obat_name !== ''" class="ml-5">{{ ob.obat_name }}</div>
              <div v-else class="ml-5">-</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal destroy -->
    <div v-if="modalDestroy" class="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed flex items-center">
      <div class="z-50 relative p-3 mx-auto my-0 max-w-full" style="width: 400px;">
        <div class="bg-white rounded shadow-lg border flex flex-col overflow-hidden">
          <div class="flex flex-row border-b items-center justify-between">
            <div class="px-6 py-3 text-xl font-bold">Warning !</div>
            <div class="">
              <button @click.self="showModalDestroy" class="font-3xl font-bold p-6">&times;</button>
            </div>
          </div>
          <div class="p-6 flex-grow">
            Are you sure to Continue delete this Tenant
          </div>
          <div class="px-6 py-3 border-t">
            <div class="flex justify-end">
              <button @click.self="showModalDestroy" type="button" class="bg-green-400 text-gray-100 rounded px-4 py-2 mr-1">Cancel</button>
              <button @click="destroyTenant" type="button" class="bg-red-500 text-gray-200 rounded px-4 py-2 w-32">
                {{ deleteButton }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div @click.self="showModalDestroy" class="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-black opacity-50"></div>
    </div>

    <!-- Modal Location -->
    <div v-if="modalTenantInfo" class="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed flex items-center">
      <div class="z-50 relative p-3 mx-auto my-0 max-w-full" style="width: 800px;">
        <div class="bg-white rounded shadow-lg border flex flex-col overflow-hidden">
          <div class="flex flex-row border-b items-center justify-between">
            <div class="px-6 py-3 text-xl font-bold">Update Denah Location (1200 px X 500 px)</div>
            <div class="">
              <button @click.self="showModalUpdateLocation" class="font-3xl font-bold p-6">&times;</button>
            </div>
          </div>
          <div class="p-6 flex-grow">
            <div class="w-full pr-0 lg:pr-2">
              <label class="font-semibold text-black opacity-80">{{ update.status_name }}</label>
              <div class="flex flex-row items-center h-9 mb-5">
                <div class="relative cursor-pointer" @click="togleStatus">
                  <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner items-center p-1 duration-300 ease-in-out" :class="{ 'bg-app-default': update.is_active}"></div>
                  <div class="absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition transform duration-300 ease-in-out" :class="{ 'translate-x-6': update.is_active,}"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="px-6 py-3 border-t">
            <div class="flex justify-end">
              <button @click.self="showModalUpdateLocation" type="button" class="bg-gray-700 text-gray-100 rounded px-4 py-2 mr-1">Close</button>
              <button :disabled="avatar.previewLocation === null" @click="updateDenahLocation" type="button" class="bg-blue-600 text-gray-200 rounded px-4 py-2 w-32">
                {{ saveButton }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div @click.self="showModalUpdateLocation" class="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-black opacity-50"></div>
    </div>

    <!-- modal create -->
    <div v-if="modalpromotion" class="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed">
      <div class="z-50 relative p-3 mx-auto my-0 max-w-full" style="width: 1000px;">
        <div class="bg-white rounded shadow-lg border flex flex-col overflow-hidden">
          <div class="flex flex-row border-b items-center justify-between">
            <div class="px-6 py-3 text-xl font-bold">Tambah Rekam Medis</div>
            <div class="">
              <button @click.self="showModalEvent" class="font-3xl font-bold p-6">&times;</button>
            </div>
          </div>
          <div class="p-6 flex-grow">
            <div class="flex flex-wrap">
              <div class="w-full pr-0 lg:pr-2">
                <label class="font-semibold text-black opacity-80">Keluhan</label>
                <textarea
                  v-model="create.event_first_description"
                  @keyup="eventFirstDescriptionChange"
                  rows="5"
                  class="w-full pl-3 pr-3 py-2 rounded-md border-2 focus:outline-none focus:ring transition duration-200"
                  :class="[errors.event_first_description ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-200']"
                  placeholder="Description">
                </textarea>
                <div class="text-sm text-red-600 mb-5">
                  {{ errors.event_first_description_msg }}
                </div>
              </div>
              <div class="w-full pr-0 lg:pr-2">
                <label class="font-semibold text-black opacity-80">Diagnosa</label>
                <textarea
                  v-model="create.event_second_description"
                  @keyup="eventSecondDescriptionChange"
                  rows="5"
                  class="w-full pl-3 pr-3 py-2 rounded-md border-2 focus:outline-none focus:ring transition duration-200"
                  :class="[errors.event_second_description ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-200']"
                  placeholder="Description">
                </textarea>
                <div class="text-sm text-red-600 mb-5">
                  {{ errors.event_second_description_msg }}
                </div>
              </div>
              <div class="w-full pr-0 lg:pr-2">
                <label class="font-semibold text-black opacity-80">Resep Obat</label>
                <textarea
                  v-model="create.event_second_description"
                  @keyup="eventSecondDescriptionChange"
                  rows="5"
                  class="w-full pl-3 pr-3 py-2 rounded-md border-2 focus:outline-none focus:ring transition duration-200"
                  :class="[errors.event_second_description ? 'border-red-400 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-200']"
                  placeholder="Description">
                </textarea>
                <div class="text-sm text-red-600 mb-5">
                  {{ errors.event_second_description_msg }}
                </div>
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

    <Warning />

  </main>
</template>

<script>
  import API from '../../api';
  import Warning from '../../components/Warning.vue'
  // import Select from '../../components/Select.vue';
  export default {
    name: 'TenantDetail',
    components: {
      // Select,
      Warning,
    },
		data() {
      return{
        content: {},
        medicalRecord: [],
        createdAt: null,
        modalDestroy: false,
        modalTenantInfo: false,
        modalUploadAvatar: false,
        modalpromotion: false,
        errors: {
          user_id: false,
          tenant_image: false,
          tenant_denah_position: false,
          tenan_category_id: false,
          tenant_name: false,
          tenant_telephone: false,
          tenant_email: false,
          tenant_website: false,
          tenant_website_mall_to_go: false,
          tenant_description: false,
          tenant_floor_location: false,
          is_active: false,
          user_id_msg: '',
          tenant_image_msg: '',
          tenant_denah_position_msg: '',
          tenan_category_id_msg: '',
          tenant_name_msg: '',
          tenant_telephone_msg: '',
          tenant_email_msg: '',
          tenant_website_msg: '',
          tenant_website_mall_to_go_msg: '',
          tenant_description_msg: '',
          tenant_floor_location_msg: '',
          is_active_msg: '',
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
        dropDown: {
          isOpen: false,
          dataSelect: [],
          title: 'Tenant Category',
          selected: 'pilih sesuatu',
        },
        floorDropDown: {
          isOpen: false,
          dataSelect: [],
          title: 'Floor Location',
          selected: 'pilih sesuatu',
        },
        avatar: {
          previewAvatar: null,
          fileAvatar: null,
        },
        location: {
          previewLocation: null,
          fileLocation: null,
        },
        update: {
          is_active: true,
          status_name: '',
          // tenant_name: '',
          // tenant_telephone: '',
          // tenant_email: '',
          // tenant_website: '',
          // tenant_website_mall_to_go: '',
          // tenant_description: '',
          // tenant_floor_location: null,
          // tenan_category_id: null,
        },
        saveButton: 'Save',
        deleteButton: 'Delete',
        modalDenahLocation: false,
      }
    },
    methods: {
      tenantNameChange: function (e) {
        this.update.tenant_name = e.target.value
        this.errors.tenant_name = false
        this.errors.tenant_name_msg = ''
      },
      tenantTelephoneChange: function (e) {
        this.update.tenant_telephone = e.target.value
        this.errors.tenant_telephone = false
        this.errors.tenant_telephone_msg = ''
      },
      tenantEmailChange: function (e) {
        this.update.tenant_email = e.target.value
        this.errors.tenant_email = false
        this.errors.tenant_email_msg = ''
      },
      tenantWebsiteChange: function (e) {
        this.update.tenant_website = e.target.value
        this.errors.tenant_website = false
        this.errors.tenant_website_msg = ''
      },
      tenantWebsiteMallToGoChange: function (e) {
        this.update.tenant_website_mall_to_go = e.target.value
        this.errors.tenant_website_mall_to_go = false
        this.errors.tenant_website_mall_to_go_msg = ''
      },
      tenantDescriptionChange: function (e) {
        this.update.tenant_description = e.target.value
        this.errors.tenant_description = false
        this.errors.tenant_description_msg = ''
      },
      openSelect: function () {
        this.dropDown.isOpen = !this.dropDown.isOpen
      },
      selectItem: function (val) {
        this.dropDown.isOpen = false
        this.update.tenan_category_id = val.id
        this.errors.tenan_category_id = false
        this.errors.tenan_category_id_msg = ''
        this.dropDown.selected = val.name
      },
      floorOpenSelect: function () {
        this.floorDropDown.isOpen = !this.floorDropDown.isOpen
      },
      floorSelectItem: function (val) {
        this.floorDropDown.isOpen = false
        this.update.tenant_floor_location = val.id
        this.errors.tenant_floor_location_msg = ''
        this.errors.tenant_floor_location = false
        this.floorDropDown.selected = val.name
      },
      showModalEvent: function (){
        // this.create = {
        //   event_name: '',
        //   event_first_title: '',
        //   event_first_description: '',
        //   event_second_title: '',
        //   event_second_description: '',
        //   event_start: new Date(),
        //   event_end: new Date(),
        //   is_active: true,
        // },
        this.modalpromotion = !this.modalpromotion
      },
      chooseFileAvatar: function() {
        document.getElementById("avatar_file").click()
      },
      chooseLocationleFile: function() {
        document.getElementById("location_file").click()
      },
      removeAvatarPreview: function () {
        this.avatar.fileAvatar = null;
        this.avatar.previewAvatar = null;
      },
      removeLocationleFile: function () {
        this.location.previewLocation = null
        this.location.imageLocation = null
      },
      previewTenantAvatar: function(event) {
        let input = event.target;
        if (input.files) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.avatar.previewAvatar = e.target.result;
          }
          this.avatar.fileAvatar = input.files[0];
          reader.readAsDataURL(input.files[0]);
        }
        this.errors.tenant_image = false
        this.errors.tenant_image_msg = ''
      },
      previewDenahLocation: function(event) {
        let input = event.target;
        if (input.files) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.location.previewLocation = e.target.result;
          }
          this.location.fileLocation = input.files[0];
          reader.readAsDataURL(input.files[0]);
        }
        this.errors.tenant_denah_position = false
        this.errors.tenant_denah_position_msg = ''
      },
      showModalDestroy: function () {
        this.modalDestroy = !this.modalDestroy
      },
      showModalUpdateAvatar: function () {
        this.saveButton = 'Save'
        this.avatar.fileAvatar = null;
        this.avatar.previewAvatar = null;
        this.modalUploadAvatar = !this.modalUploadAvatar
      },
      showModalUpdateLocation: function () {
        this.saveButton = 'Save'
        // this.location.previewLocation = null
        // this.location.imageLocation = null
        this.modalTenantInfo = !this.modalTenantInfo
      },
      showModalEditContentTenant: function () {
        this.update.is_active = false
        this.update.status_name = this.content.status
        // this.update.tenant_name = this.content.tenant_name
        // this.update.tenant_telephone = this.content.tenant_telephone
        // this.update.tenant_email = this.content.tenant_email
        // this.update.tenant_website = this.content.tenant_website
        // this.update.tenant_website_mall_to_go = this.content.tenant_website_mall_to_go
        // this.update.tenant_description = this.content.tenant_description
        // this.update.tenant_floor_location = this.content.tenant_floor_location
        // this.floorDropDown.selected = this.content.floor_name
        // this.update.tenan_category_id = this.content.tenan_category_id
        // this.dropDown.selected = this.content.tenan_category_name
        this.modalTenantInfo = !this.modalTenantInfo
      },
      destroyTenant: async function () {
        this.deleteButton = 'Loading...'
        try {
          let res = await fetch(`${API}v1/tenant`, {
            method: 'DELETE',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: JSON.stringify({
              id: this.content.id,
            })
          });
          let respon = await res.json();
          if (respon.status !== 200) {
            this._error('internal server error')
            return;
          }
          this.modalDestroy = false
          this.deleteButton = 'Delete'
          this.$router.push(`/tenant`);
        } catch (err) {
          this.deleteButton = 'Delete'
          this.modalDestroy = false
          this._error('internal server error')
        }
      },
      togleStatus: function () {
        console.log(this.update.is_active);
        
        if (!this.update.is_active) {
          this.update.is_active = true
          this.update.status_name = 'checked'
        } else {
          this.update.is_active = false
          this.update.status_name = this.content.status
        }
        // update.is_active = !update.is_active
      },
      updateTenantAvatar: async function () {
        this.saveButton = 'Loading...'
        let formdata = new FormData();
        formdata.append("tenant_image", this.avatar.fileAvatar);
        formdata.append("id", this.content.id);
        try {
          let res = await fetch(`${API}v1/tenant/avatar`, {
            method: 'PUT',
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: formdata,
          });
          const response = await res.json();
          if (response.status !== 200) {
            if (response.message === 'ERR_FORM') {
              response.data.map((item) => {
                if (item.key === 'tenant_image') {
                  this.errors.tenant_image = true
                  this.errors.tenant_image_msg = item.message
                }
                if (item.key === 'user_id'){
                  this.errors.user_id = true
                  this.errors.user_id_msg = item.message
                }
              })
              this.saveButton = 'Save'
              return
            }
            this.saveButton = 'Save'
            return
          }
          this.modalUploadAvatar = false
          this.saveButton = 'Save'
          this.detailTenant()
        } catch (err) {
          this.modalUploadAvatar = false
          this.saveButton = 'Save'
          this._error('internal server error')
        }
      },
      updateDenahLocation: async function () {
        this.saveButton = 'Loading...bos'
        let formdata = new FormData();
        formdata.append("tenant_denah_position", this.location.fileLocation);
        formdata.append("id", this.content.id);
        try {
          let res = await fetch(`${API}v1/tenant/avatar-location`, {
            method: 'PUT',
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
            },
            body: formdata,
          });
          const response = await res.json();
          if (response.status !== 200) {
            if (response.message === 'ERR_FORM') {
              response.data.map((item) => {
                if (item.key === 'tenant_denah_position') {
                  this.errors.tenant_denah_position = true
                  this.errors.tenant_denah_position_msg = item.message
                }
                if (item.key === 'user_id'){
                  this.errors.user_id = true
                  this.errors.user_id_msg = item.message
                }
              })
              this.saveButton = 'Save'
              return
            }
            this.saveButton = 'Save'
            return
          }
          this.modalDenahLocation = false
          this.saveButton = 'Save'
          this.detailTenant()
        } catch (err) {
          this.modalDenahLocation = false
          this.saveButton = 'Save'
          this._error('internal server error')
        }
      },
      updateInfoTenant: async function () {
        this.saveButton = 'Loading...'
        try {
          let res = await fetch(`${API}v1/tenant`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
          },
          body: JSON.stringify({
            id: this.content.id,
            user_id: this.$store.state.profile.id === undefined ? 1 : this.$store.state.profile.id,
            is_active: this.update.is_active,
            tenant_name: this.update.tenant_name,
            tenant_telephone: this.update.tenant_telephone,
            tenant_email: this.update.tenant_email,
            tenant_website: this.update.tenant_website,
            tenant_website_mall_to_go: this.update.tenant_website_mall_to_go,
            tenant_description: this.update.tenant_description,
            tenant_floor_location: this.update.tenant_floor_location,
            tenan_category_id: this.update.tenan_category_id,
          }),
        });
        const response = await res.json();
        if (response.status !== 200) {
          if (response.message === 'ERR_FORM') {
            response.data.map((item) => {
              if (item.key === 'user_id'){
                this.errors.user_id = true
                this.errors.user_id_msg = item.message
              }
              if (item.key === 'tenan_category_id'){
                this.errors.tenan_category_id = true
                this.errors.tenan_category_id_msg = item.message
              }
              if (item.key === 'tenant_name'){
                this.errors.tenant_name = true
                this.errors.tenant_name_msg = item.message
              }
              if (item.key === 'tenant_telephone'){
                this.errors.tenant_telephone = true
                this.errors.tenant_telephone_msg = item.message
              }
              if (item.key === 'tenant_email'){
                this.errors.tenant_email = true
                this.errors.tenant_email_msg = item.message
              }
              if (item.key === 'tenant_website'){
                this.errors.tenant_website = true
                this.errors.tenant_website_msg = item.message
              }
              if (item.key === 'tenant_website_mall_to_go'){
                this.errors.tenant_website_mall_to_go = true
                this.errors.tenant_website_mall_to_go_msg = item.message
              }
              if (item.key === 'tenant_description'){
                this.errors.tenant_description = true
                this.errors.tenant_description_msg = item.message
              }
              if (item.key === 'tenant_floor_location'){
                this.errors.tenant_floor_location = true
                this.errors.tenant_floor_location_msg = item.message
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
        this.modalTenantInfo = false
        this.detailTenant()
        this.saveButton = 'Save'
        } catch (err) {
          this.modalTenantInfo = false
          this.saveButton = 'Save'
          this._error('internal server error')
        }
      },
      handleImages(files){
        this.images = files
      },
      detailTenant: async function () {
        try {
          let res = await fetch(`${API}v1/dokter/visitor/${this.$route.params.id}`, {
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
          this.content = respon.data.pasien
          this.medicalRecord = respon.data.records
          console.log(respon.data);
        } catch (err) {
          this._error('internal server error')
        }
      },
      findCategoryTenant: async function() {
        try {
          let res = await fetch(`${API}v1/tenant-category`, {
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
          this.dropDown.dataSelect = respon.data.map((itm) => {
            return {
              id: itm.id,
              name: itm.tenan_category_name,
            }
          })
        } catch (err) {
          this._error('internal server error')
        }
      },
      findFloors: async function() {
        try {
          let res = await fetch(`${API}v1/floors`, {
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
          this.floorDropDown.dataSelect = respon.data.map((itm) => {
            return {
              id: itm.id,
              name: itm.floor_name,
            }
          })
        } catch (err) {
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
    created() {
      this.detailTenant()
      // this.findCategoryTenant()
      // this.findFloors()
    }
  }
</script>
