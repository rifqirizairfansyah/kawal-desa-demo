<template>
  <div>
    <div role="group">
      <!-- Field Title -->
      <label for="input-name">Nama:</label>
      <b-form-input
        v-model="form.name"
        :state="nameFieldState"
        aria-describedby="input-live-help input-live-feedback-title"
        placeholder="Masukkan Nama"
        trim
      ></b-form-input>
      <b-form-invalid-feedback id="input-live-feedback-title">
        Masukkan paling sedikit 5 karakter
      </b-form-invalid-feedback>
    </div>
    <div role="group">
      <!-- Field email -->
      <label for="input-name">Email:</label>
      <b-form-input
        v-model="form.email"
        type="email"
        :state="emailFieldState"
        aria-describedby="input-live-help input-live-feedback-email"
        placeholder="Masukkan Email"
        trim
      ></b-form-input>
      <b-form-invalid-feedback id="input-live-feedback-email">
        Masukkan paling sedikit 5 karakter
      </b-form-invalid-feedback>
    </div>
    <div role="group">
      <!-- Field Title -->
      <label for="input-name">Password:</label>
      <b-form-input
        type="password"
        v-model="form.password"
        :state="passwordFieldState"
        aria-describedby="input-live-help input-live-feedback-password"
        placeholder="Masukkan Password"
        trim
      ></b-form-input>
      <b-form-invalid-feedback id="input-live-feedback-password">
        Masukkan paling sedikit 5 karakter
      </b-form-invalid-feedback>
    </div>
    <div role="group">
      <!-- Field Position -->
      <label for="input-name">Posisi Pengguna:</label>
      <b-form-input
        v-model="form.position"
        :state="positionFieldState"
        aria-describedby="input-live-help input-live-feedback-position"
        placeholder="Masukkan Posisi (Contoh: Siswa)"
        trim
      ></b-form-input>
      <b-form-invalid-feedback id="input-live-feedback-position">
        Masukkan paling sedikit 3 karakter
      </b-form-invalid-feedback>
    </div>
    <div role="group">
      <!-- Field Title -->
      <label for="input-name">Nomor Identitas:</label>
      <b-form-input
        type="text"
        v-model="form.id_card"
        :state="idCardFieldState"
        aria-describedby="input-live-help input-live-feedback-title"
        placeholder="Masukkan No Identitas"
        trim
      ></b-form-input>
      <b-form-invalid-feedback id="input-live-feedback-title">
        Masukkan paling sedikit 5 karakter
      </b-form-invalid-feedback>
    </div>
    <div role="group">
      <!-- Field Title -->
      <label for="input-name">No Telephone:</label>
      <b-form-input
        v-model="form.phone_number"
        type="number"
        :state="phoneNumberFieldState"
        aria-describedby="input-live-help input-live-feedback-phone-number"
        placeholder="Masukkan Nomor Telephone"
        trim
      ></b-form-input>
      <b-form-invalid-feedback id="input-live-feedback-phone-number">
        Masukkan paling sedikit 8 nomor
      </b-form-invalid-feedback>
    </div>
    <div role="group">
      <!-- Field Title -->
      <label for="input-name">Foto:</label>
      <b-form-file
        v-model="form.image"
        :state="Boolean(form.image)"
        accept=".jpg, .png"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
      ></b-form-file>
    </div>
    <div role="group">
      <!-- Field Title -->
      <label for="input-name">Gambar Kartu Identitas:</label>
      <b-form-file
        v-model="form.identity_card_image"
        :state="Boolean(form.identity_card_image)"
        accept=".jpg, .png"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
      ></b-form-file>
    </div>
    <div role="group">
      <!-- Field Title -->
      <label for="input-name">Gambar Kartu Keluarga:</label>
      <b-form-file
        v-model="form.family_card_image"
        :state="Boolean(form.family_card_image)"
        accept=".jpg, .png"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
      ></b-form-file>
    </div>
    <div role="group">
      <label for="input-name">Instansi:</label>
      <vue-select
        v-model="selected.company"
        :options="companies"
        label="COMPANY_NAME"
        @input="getUnits()"
        :reduce="company => company.COMPANY_GUID"/>
        <label for="input-name">Unit:</label>
        <vue-select
          v-model="form.unit"
          @input="store()"
          :options="units"
          :reduce="unit => unit.UNIT_CODE"
          label="UNIT_NAME"
        />
    </div>
    <div role="group" class="md-3">
      <b-row>
        <b-col cols="12" md="6">
          <label for="input-name">Lokasi Pengguna:</label>
          <!-- Field user_location_long user_location_lat -->
          <l-map class="mini-map" :zoom.sync="zoom_user_location" :center="[center[1], center[0]]" :max-zoom="maxZoom" @click="addMarkerUserLocation">
            <l-tile-layer url="http://vectormap.pptik.id/styles/klokantech-basic/{z}/{x}/{y}.png"></l-tile-layer>
            <!-- :icon di l marker ga bisa pake file .svg, entah kenapa -->
            <l-marker v-for="marker in map_user_location" :key="marker._id" :lat-lng="[marker.lat, marker.lng]">
              <l-icon
                :icon-size="dynamicSize"
                :icon-anchor="dynamicAnchor"
                icon-url="../../static/pin_human.png" >
              </l-icon>
            </l-marker>
          </l-map>
        </b-col>
        <b-col cols="12" md="6">
          <label for="input-name">Lokasi Rumah:</label>
          <l-map class="mini-map" :zoom.sync="zoom_property_location" :center="[center[1], center[0]]" :max-zoom="maxZoom" @click="addMarkerPropertyLocation">
            <l-tile-layer url="http://vectormap.pptik.id/styles/klokantech-basic/{z}/{x}/{y}.png"></l-tile-layer>
            <!-- :icon di l marker ga bisa pake file .svg, entah kenapa -->
            <l-marker v-for="marker in map_property_location" :key="marker._id" :lat-lng="[marker.lat, marker.lng]">
              <l-icon
                :icon-size="dynamicSize"
                :icon-anchor="dynamicAnchor"
                icon-url="../../static/pin_house.png" >
              </l-icon>
            </l-marker>
          </l-map>
        </b-col>
      </b-row>
    </div>
    <div role="group" class="sr-only">
      <!-- Field Title -->
      <label for="input-name">Role:</label>
      <b-form-input
        v-model="form.role"
        aria-describedby="input-live-help input-live-feedback-title"
        placeholder="Masukkan Judul"
        trim
      ></b-form-input>
    </div>
    <div role="group">
      <!-- Field Title -->
      <label for="input-name">Alamat:</label>
      <b-form-textarea
        v-model="form.user_location_address"
        type="text"
        rows="3"
        :state="addressFieldsState"
        aria-describedby="input-live-help input-live-feedback-address"
        placeholder="Masukkan Alamat"
        trim
      ></b-form-textarea>
      <b-form-invalid-feedback id="input-live-feedback-address">
        Masukkan paling sedikit 10 karakter
      </b-form-invalid-feedback>
    </div>
    <b-button variant="success" class="mt-3" :disabled="!isEmptyTask" @click="createUser()">Simpan</b-button>
  </div>
</template>

<script>
// module
import VueSelect from 'vue-select'
import { LMap, LTileLayer, LMarker, LIcon } from 'vue2-leaflet'
import 'vue-select/dist/vue-select.css'
import L from 'leaflet'
// service
import CompanyService from '@/services/CompanyService'
import ManagementService from '@/services/ManagementService'
// map
L.Icon.Default.imagePath = ''
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})
export default {
  name: 'createuser',
  created () {
    this.$store.dispatch('combobox/clear_selected')
  },
  mounted () {
    this.getCompanies()
    this.form.role = this.getTabRole
  },
  components: {
    VueSelect,
    'l-map': LMap,
    'l-tile-layer': LTileLayer,
    'l-marker': LMarker,
    LIcon
  },
  data () {
    return {
      zoom_user_location: 8,
      zoom_property_location: 8,
      minZoom: 8,
      maxZoom: 18,
      center: [107.668887, -7.090911],
      url: 'http://vectormap.pptik.id/styles/klokantech-basic/{z}/{x}/{y}.png',
      form: {
        name: '',
        email: '',
        password: '',
        position: '',
        id_card: '',
        company: null,
        unit: '',
        phone_number: '',
        image: null,
        identity_card_image: null,
        family_card_image: null,
        user_location_address: '',
        user_location_long: '',
        user_location_lat: '',
        user_property_location_long: '',
        user_property_location_lat: '',
        role: ''
      },
      map_user_location: [],
      map_property_location: [],
      companies: [],
      units: [],
      selected: {
        area: undefined,
        district: undefined,
        additional: {
          date: undefined,
          total_attendance: false
        }
      },
      iconSize: 32
    }
  },
  computed: {
    nameFieldState () {
      if (this.form.name.length >= 5) {
        return true
      } else {
        return false
      }
    },
    passwordFieldState () {
      if (this.form.password.length >= 5) {
        return true
      } else {
        return false
      }
    },
    emailFieldState () {
      if (this.form.email.length >= 5) {
        return true
      } else {
        return false
      }
    },
    idCardFieldState () {
      if (this.form.id_card.length >= 5) {
        return true
      } else {
        return false
      }
    },
    phoneNumberFieldState () {
      if (this.form.phone_number.length >= 8) {
        return true
      } else {
        return false
      }
    },
    addressFieldsState () {
      if (this.form.user_location_address.length >= 10) {
        return true
      } else {
        return false
      }
    },
    positionFieldState () {
      if (this.form.position.length >= 3) {
        return true
      } else {
        return false
      }
    },
    isEmptyTask () {
      if (
        this.nameFieldState &&
        this.passwordFieldState &&
        this.emailFieldState &&
        this.idCardFieldState &&
        this.phoneNumberFieldState &&
        this.addressFieldsState &&
        (this.form.unit !== undefined || this.form.unit !== null) &&
        (this.form.company !== undefined || this.form.company !== null) &&
        this.form.image !== null &&
        this.form.identity_card_image !== null &&
        this.form.family_card_image !== null &&
        this.form.user_location_long !== undefined &&
        this.form.user_location_lat !== undefined &&
        this.form.user_property_location_long !== undefined &&
        this.form.user_property_location_lat !== undefined
      ) {
        return true
      } else {
        return false
      }
    },
    routeName () {
      return this.$router.currentRoute.name
    },
    role () {
      return this.$store.state.authentication.role
    },
    getTabRole () {
      const role = this.routeName === 'Institution' ? 'aparat' : ((this.routeName === 'Village') ? 'warga' : undefined)
      return role
    },
    dynamicSize () {
      return [this.iconSize, this.iconSize * 1.15]
    },
    dynamicAnchor () {
      return [this.iconSize / 2, this.iconSize * 1.15]
    }
  },
  methods: {
    store () {
      this.$store.dispatch('combobox/store_selected', { data: this.selected, type: this.role, ...(this.routeName === 'Map') && { minified: true } })
    },
    createUser: async function () {
      try {
        const formData = new FormData()
        formData.append('name', this.form.name)
        formData.append('email', this.form.email)
        formData.append('password', this.form.email)
        formData.append('position', this.form.position)
        formData.append('id_card', this.form.id_card)
        formData.append('company', this.form.company)
        formData.append('unit', this.form.unit)
        formData.append('phone_number', this.form.phone_number)
        formData.append('image', this.form.image)
        formData.append('identity_card_image', this.form.identity_card_image)
        formData.append('family_card_image', this.form.family_card_image)
        formData.append('user_location_address', this.form.user_location_address)
        formData.append('user_location_long', this.form.user_location_long)
        formData.append('user_location_lat', this.form.user_location_lat)
        formData.append('user_property_location_long', this.form.user_property_location_long)
        formData.append('user_property_location_lat', this.form.user_property_location_lat)
        formData.append('role', this.form.role)
        const response = await ManagementService.createUser(formData)
        if (response.data.code === 200) {
          this.$bvToast.toast('Pengguna Berhasil Ditambahkan', {
            title: 'Pengguna berhasil ditambahkan',
            variant: 'success',
            autoHideDelay: 5000
          })
        }
      } catch (error) {
        this.$bvToast.toast('Pengguna Gagal Ditambahkan', {
          title: 'Pengguna gagal ditambahkan',
          variant: 'danger',
          autoHideDelay: 5000
        })
      }
    },
    getUnits: async function () {
      try {
        this.selected.unit = null
        this.units = []
        if (this.selected.company !== null && this.selected.company !== undefined) {
          const response = await this.$store.dispatch('unit/getUnits', this.selected)
          const getResponseData = response.data.data
          getResponseData.forEach(unit => {
            const dataInsert = { UNIT_NAME: unit, UNIT_CODE: unit }
            this.units.push(dataInsert)
          })
          this.form.company = this.selected.company
        } else {
          this.units = []
        }
        this.store()
      } catch (error) {
        this.units = []
      }
    },
    getCompanies: async function () {
      try {
        const response = await CompanyService.getPartialCompanies(this.selected)
        this.companies = response.data.data
      } catch (error) {
        this.companies = []
      }
    },
    addMarkerUserLocation (location) {
      this.map_user_location = []
      this.form.user_location_long = location.latlng.lng
      this.form.user_location_lat = location.latlng.lat
      this.map_user_location.push(location.latlng)
    },
    addMarkerPropertyLocation (location) {
      this.map_property_location = []
      this.form.user_property_location_long = location.latlng.lng
      this.form.user_property_location_lat = location.latlng.lat
      this.map_property_location.push(location.latlng)
    }
  }
}
</script>

<style scoped>
@import "leaflet/dist/leaflet.css";
.mini-map {
  width: 300px;
  height: 200px !important;
}
</style>
