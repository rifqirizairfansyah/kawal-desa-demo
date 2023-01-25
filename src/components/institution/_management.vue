<template>
  <div>
    <b-table striped hover responsive :fields="fieldsManagement" :items="data" v-if="data.length != 0" class="mt-1">
      <template v-slot:head(IMAGE)>
        <div style="width: 202px">Gambar</div>
      </template>
      <template v-slot:cell(IMAGE)="data">
        <img :src="'http://absensi-selfie.pptik.id/data/kehadiran/image/' + data.item.IMAGE" width="70px" v-on:click="showModal('http://absensi-selfie.pptik.id/data/kehadiran/image/' + data.item.IMAGE)">
      </template>
      <template v-slot:head(IDENTITY_CARD_IMAGE)>
        <div style="width: 202px">Kartu Identitas</div>
      </template>
      <template v-slot:cell(IDENTITY_CARD_IMAGE)="data">
        <img :src="'http://absensi-selfie.pptik.id/data/kehadiran/image/' + data.item.IDENTITY_CARD_IMAGE" width="70px" v-on:click="showModal('http://absensi-selfie.pptik.id/data/kehadiran/image/' + data.item.IDENTITY_CARD_IMAGE)">
      </template>
      <template v-slot:head(FAMILY_CARD_IMAGE)>
        <div style="width: 202px">Kartu Keluarga</div>
      </template>
      <template v-slot:cell(FAMILY_CARD_IMAGE)="data">
        <img :src="'http://absensi-selfie.pptik.id/data/kehadiran/image/' + data.item.FAMILY_CARD_IMAGE" width="70px" v-on:click="showModal('http://absensi-selfie.pptik.id/data/kehadiran/image/' + data.item.FAMILY_CARD_IMAGE)">
      </template>
      <template v-slot:head(ACTION)>
        <div style="width: 220px">Action</div>
      </template>
      <template v-slot:cell(ACTION)="data">
        <b-button v-b-modal.institution-edit v-on:click="editPanelManagement(data.item)">Edit</b-button>
        <b-button @click="showDeleteModal(data.item.GUID)" variant="danger">Delete</b-button>
      </template>
    </b-table>
    <b-pagination
      v-model="selected.additional.page"
      v-if="data.length !== 0"
      :total-rows="perPage * numberOfPages"
      :per-page="perPage"
      @input="changePage"
      align="right"
      show/>
    <b-modal ref="my-modal" size="lg" hide-footer title="Gambar">
      <div class="d-block text-center">
        <img :src="gambar" class="img-fluid">
      </div>
    </b-modal>
    <b-alert variant="danger" show v-if="data.length === 0 && loading === false" class="m10">Data tidak tersedia</b-alert>
    <b-modal id="institution-edit" size="lg" ref="insitution-modal" hide-footer>
      <b-row>
        <b-col>
          <div role="group">
            <!-- Field Name -->
            <label for="input-name">Nama</label>
            <b-form-input
              v-model="selectedInstitution.name"
              :state="nameFieldState"
              aria-describedby="input-live-help input-live-feedback-name"
              placeholder="NAME"
              trim
            ></b-form-input>
            <b-form-invalid-feedback id="input-live-feedback-name">
              Masukkan paling sedikit 3 huruf
            </b-form-invalid-feedback>
          </div>
        </b-col>
        <b-col>
          <div role="group">
            <!-- Field Email -->
            <label for="input-email">Email:</label>
            <b-form-input
              v-model="selectedInstitution.email"
              :state="emailFieldState"
              aria-describedby="input-live-help input-live-feedback-email"
              placeholder="Masukkan Email"
              trim
            ></b-form-input>
            <b-form-invalid-feedback id="input-live-feedback-email">
              Masukkan paling sedikit 10 huruf
            </b-form-invalid-feedback>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div role="group">
            <!-- Field Unit -->
            <label for="input-passowrd">Kata Sandi:</label>
            <b-form-input
              v-model="selectedInstitution.password"
              :state="passwordFieldState"
              type="password"
              aria-describedby="input-live-help input-live-feedback-passowrd"
              placeholder="Masukkan Kata Sandi"
              trim
            ></b-form-input>
            <b-form-invalid-feedback id="input-live-feedback-passowrd">
              Masukkan paling sedikit 5 huruf
            </b-form-invalid-feedback>
          </div>
        </b-col>
        <b-col>
          <div role="group">
            <!-- Field Unit -->
            <label for="input-idcard">Kartu ID:</label>
            <b-form-input
              v-model="selectedInstitution.id_card"
              :state="idCardFieldState"
              aria-describedby="input-live-help input-live-feedback-idcard"
              placeholder="Masukkan Kartu ID"
              trim
            ></b-form-input>
            <b-form-invalid-feedback id="input-live-feedback-passowrd">
              Masukkan paling sedikit 5 huruf
            </b-form-invalid-feedback>
          </div>
        </b-col>
      </b-row>
      <div role="group">
        <!-- Field Phone Number -->
        <label for="input-phone-number">Nomer Telephone:</label>
        <b-form-input
          type="number"
          v-model="selectedInstitution.phone_number"
          :state="phoneNumberFieldState"
          aria-describedby="input-live-help input-live-feedback-phone-number"
          placeholder="Masukkan Nomer Telephone"
          trim
        ></b-form-input>
        <b-form-invalid-feedback id="input-live-feedback-phone-number">
          Masukkan paling sedikit 8 angka
        </b-form-invalid-feedback>
      </div>
      <b-row>
        <b-col>
          <div role="group">
            <!-- Field Unit -->
            <label for="input-company">Instansi:</label>
            <vue-select
              v-model="selected.company"
              :options="companies"
              label="COMPANY_NAME"
              @input="getUnits()"
              :reduce="company => company.COMPANY_GUID"/>
            <b-form-input
              class="sr-only"
              v-model="selectedInstitution.company"
            />
          </div>
        </b-col>
        <b-col>
          <div role="group">
            <!-- Field Unit -->
            <label for="input-unit">Unit:</label>
            <vue-select
              v-model="selected.unit"
              @input="setHiddenFieldUnit()"
              :options="units"
              :reduce="unit => unit.UNIT_CODE"
              label="UNIT_NAME"
            />
            <b-form-input
              class="sr-only"
              v-model="selectedInstitution.unit"
            />
          </div>
        </b-col>
      </b-row>
      <div role="group">
        <!-- Field Position -->
        <label for="input-position">Position:</label>
        <b-form-input
          v-model="selectedInstitution.position"
          :state="positionFieldState"
          aria-describedby="input-live-help input-live-feedback-position"
          placeholder="Masukkan Position"
        ></b-form-input>
        <b-form-invalid-feedback id="input-live-feedback-position">
          Masukkan paling sedikit 2 huruf
        </b-form-invalid-feedback>
      </div>
      <b-button class="mt-2" variant="success" :disabled="!isEmptyTask" v-on:click="updateManagementUser()" block>Simpan</b-button>
    </b-modal>
    <b-modal id="alert-modal" ref="alert-modal" centered hide-footer>
      <template #modal-title>
        Yakin akan menghapus data?
      </template>
      <b-row cols="2">
        <b-col><b-button class="mt-6" variant="danger" block @click="deleteUser()">Ya</b-button></b-col>
        <b-col><b-button class="mt-6" variant="success" block @click="$bvModal.hide('alert-modal')">Tidak</b-button></b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
// module
import VueSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import { format } from 'date-fns'
import id from 'date-fns/locale/id'
// service
import ManagementService from '@/services/ManagementService'
import CompanyService from '@/services/CompanyService'
export default {
  name: 'management',
  data () {
    return {
      selectUserId: undefined,
      selectedInstitution: {
        name: '',
        email: '',
        password: '',
        position: '',
        id_card: '',
        company: '',
        unit: '',
        phone_number: ''
      },
      fieldsManagement: [
        { key: 'NAME', label: 'Nama' },
        { key: 'PHONE_NUMBER', label: 'Nomor Telephone' },
        { key: 'EMAIL', label: 'Email' },
        { key: 'POSITION', label: 'Position' },
        { key: 'ID_CARD', label: 'Kartu ID' },
        { key: 'IMAGE', label: 'Foto' },
        { key: 'UNIT', label: 'Unit' },
        { key: 'GUID', label: 'GUID' },
        { key: 'IDENTITY_CARD_IMAGE', label: 'Kartu Identitas' },
        { key: 'FAMILY_CARD_IMAGE', label: 'Kartu Keluarga' },
        'ACTION'
      ],
      gambar: null,
      data: [],
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
      numberOfPages: 0,
      totalAttendees: undefined,
      perPage: 10,
      loading: false
    }
  },
  computed: {
    nameFieldState () {
      if (this.selectedInstitution.name.length >= 3) {
        return true
      } else {
        return false
      }
    },
    passwordFieldState () {
      if (this.selectedInstitution.password.length >= 5) {
        return true
      } else {
        return false
      }
    },
    emailFieldState () {
      if (this.selectedInstitution.email.length >= 5) {
        return true
      } else {
        return false
      }
    },
    idCardFieldState () {
      if (this.selectedInstitution.id_card.length >= 5) {
        return true
      } else {
        return false
      }
    },
    phoneNumberFieldState () {
      if (this.selectedInstitution.phone_number.length >= 8) {
        return true
      } else {
        return false
      }
    },
    positionFieldState () {
      if (this.selectedInstitution.position.length >= 2) {
        return true
      } else {
        return false
      }
    },
    isEmptyTask () {
      if (this.nameFieldState &&
        this.emailFieldState &&
        this.idCardFieldState &&
        this.phoneNumberFieldState &&
        this.positionFieldState &&
        this.selectedInstitution.unit !== '' &&
        this.selectedInstitution.company !== ''
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
    reportRole () {
      return this.$store.state.combobox.selected.additional.role
    },
    combobox () {
      return this.$store.state.combobox
    }
  },
  components: {
    VueSelect
  },
  created () {
    this.$store.dispatch('combobox/clear_selected')
  },
  mounted () {
    this.getCompanies()
    this.onSubmit()
  },
  filters: {
    getDate: function (date) {
      date = date.toString().length === 10 ? parseInt(date) * 1000 : date
      const formattedDate = format(date, 'dd LLLL yyyy HH:mm:ss', { locale: id })
      return formattedDate
    }
  },
  methods: {
    store () {
      this.$store.dispatch('combobox/store_selected', { data: this.selected, type: this.role, ...(this.routeName === 'Map') && { minified: true } })
    },
    onSubmit: function () {
      this.data = []
      this.selected.additional.page = 1
      this.selected = this.$store.state.combobox.selected
      this.getUsers()
    },
    downloadExcel: function (url) {
      const link = document.createElement('a')
      document.body.appendChild(link)
      link.href = url
      link.click()
    },
    getUsers: async function () {
      try {
        this.loading = true
        const role = this.routeName === 'Institution' ? 'aparat' : ((this.routeName === 'Village') ? 'warga' : undefined)
        this.selected.additional.role = role
        this.selected.additional.total_attendance = false
        const response = await ManagementService.getUsers(this.selected)
        this.data = response.data.data.users
        this.numberOfPages = response.data.data.number_of_pages
        this.data.length === 0 ? this.loading = false : this.loading = false
      } catch (error) {
        this.data = []
      }
    },
    editPanelManagement: async function (data) {
      this.selectUserId = data.GUID
      const response = await ManagementService.getUserById(data.GUID)
      let user = response.data.data
      this.selectedInstitution.name = user.NAME
      this.selectedInstitution.email = user.EMAIL
      this.selectedInstitution.position = user.POSITION
      this.selectedInstitution.id_card = user.ID_CARD
      this.selectedInstitution.company = user.COMPANY
      this.selectedInstitution.unit = user.UNIT
      this.selectedInstitution.phone_number = user.PHONE_NUMBER
      // change selected
      this.selected.unit = user.UNIT
      this.selected.company = user.COMPANY
    },
    getUnits: async function () {
      try {
        this.selected.unit = null
        this.selectedInstitution.company = this.selected.company
        this.units = []
        if (this.selected.company !== null && this.selected.company !== undefined) {
          const response = await this.$store.dispatch('unit/getUnits', this.selected)
          const getResponseData = response.data.data
          getResponseData.forEach(unit => {
            const dataInsert = { UNIT_NAME: unit, UNIT_CODE: unit }
            this.units.push(dataInsert)
          })
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
    changePage (pageNumber) {
      this.data = []
      this.selected.additional.page = pageNumber
      this.getUsers()
    },
    showModal: function (gambar) {
      this.gambar = gambar
      this.$refs['my-modal'].show()
    },
    showDeleteModal: function (id) {
      this.selectUserId = id
      this.$refs['alert-modal'].show()
    },
    insertDataToArray: function (destArray, pos, arrayToInsert) {
      let emptyArray = []
      emptyArray.push(pos)
      emptyArray.push(0)
      emptyArray = emptyArray.concat(arrayToInsert)
      destArray.splice.apply(destArray, emptyArray)
    },
    setHiddenFieldUnit: function () {
      this.selectedInstitution.unit = this.selected.unit
    },
    deleteUser: async function () {
      try {
        const response = await ManagementService.deleteUser(this.selectUserId)
        if (response.data.code === 200) {
          this.$bvToast.toast('Data Berhasil Dihapus', {
            title: 'Berhasil Dihapus',
            variant: 'success',
            autoHideDelay: 5000
          })
          this.$refs['alert-modal'].hide()
          this.getUsers()
        }
      } catch (error) {
        this.$bvToast.toast('Data Gagal Dihapus', {
          title: 'Gagal Dihapus',
          variant: 'danger',
          autoHideDelay: 5000
        })
      }
    },
    updateManagementUser: async function () {
      try {
        let dataPostUpdate = this.selectedInstitution
        if (!this.passwordFieldState) {
          delete dataPostUpdate['password']
        }
        const response = await ManagementService.updateUser(this.selectUserId, this.selectedInstitution)
        if (response.data.code === 200) {
          this.$bvToast.toast('Data Berhasil Diubah', {
            title: 'Berhasil Diubah',
            variant: 'success',
            autoHideDelay: 5000
          })
          this.$refs['insitution-modal'].hide()
          this.getUsers()
        }
      } catch (error) {
        this.$bvToast.toast('Data Gagal Diubah', {
          title: 'Gagal Diubah',
          variant: 'danger',
          autoHideDelay: 5000
        })
      }
    }
  }
}
</script>
