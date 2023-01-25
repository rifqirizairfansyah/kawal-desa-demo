<template>
  <div>
    <div class="box">
      <h4 class="text-center pt-5"></h4>
      <b-card title="Daftar" border-variant="light" class="outer-box">
        <b-row>
          <b-col>
            <b-form-group
              id="fieldset-registrant-name"
              label="Nama Pendaftar"
              label-for="input-registrant-name"
              :state="registrantField"
            >
              <b-form-input id="input-registrant-name" v-model="profile.registrant_name" :state="registrantField" trim></b-form-input>
              <b-form-invalid-feedback :state="registrantField">
                Masukkan Nama Pendaftar
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
              id="fieldset-email"
              type="email"
              label="Email"
              label-for="input-email"
              :state="emailField"
            >
              <b-form-input id="input-email" v-model="email" :state="emailField" trim></b-form-input>
              <b-form-invalid-feedback :state="emailField">
                Masukan Email
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
              id="fieldset-password"
              label="Password"
              label-for="input-password"
              valid-feedback="Password Valid"
              :state="passwordField"
            >
              <b-form-input type="password" id="input-password" v-model="password" :state="passwordField" trim></b-form-input>
              <b-form-invalid-feedback :state="passwordField">
                Masukkan Password
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
              id="fieldset-phone"
              label="No. Telepon"
              label-for="input-phone"
              :state="phoneField"
            >
              <b-form-input type="number" id="input-phone" v-model="profile.phone" :state="phoneField" trim></b-form-input>
              <b-form-invalid-feedback :state="phoneField">
                Masukan Nomer Telephone
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
              id="fieldset-institution"
              label="Instansi"
              label-for="input-institution"
              :state="institutionField"
            >
              <b-form-input id="input-institution" v-model="profile.institution" :state="institutionField" trim></b-form-input>
              <b-form-invalid-feedback :state="institutionField">
                Masukkan Nama Instansi
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
      </b-card>
      <b-card title="Desa" border-variant="light" class="outer-box">
        <b-row>
          <b-col>
            <b-form-group
              id="fieldset-company-name"
              label="Nama Desa"
              label-for="input-company-name"
              :state="companyNameField"
            >
              <b-form-input id="input-company-name" :formatter="formatter" @input="villageNameChange" v-model="company_name" :state="companyNameField" trim></b-form-input>
              <b-form-invalid-feedback :state="companyNameField">
                Masukan Nama Desa
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col :md="routeName === 'Map' ? '12': '6'" sm="12" cols="12">
            Area:
            <vue-select
              v-model="company_area"
              :options="areaData"
              label="AREA"
              :key="areaData.AREA"
              :reduce="AREA => AREA.AREA_VALUE"
            />
          </b-col>
          <b-col :md="routeName === 'Map' ? '12': '6'" sm="12" cols="12">
            Sub-Area:
            <vue-select
              v-model="company_district"
              :options="subArea[company_area]"
              label="DISTRICT_NAME"
              :reduce="DISTRICT_NAME => DISTRICT_NAME.DISTRICT_CODE"
              @input="getCompanies()"/>
          </b-col>
        </b-row>
        <b-row v-for="(units, index) in units" v-bind:key="index">
          <b-col cols="12" md="8">
            <b-form-group
              id="fieldset-unit"
              :label="'Units ' + (index + 1)"
              label-for="input-units"
            >
              <b-form-input id="input-unit" placeholder="contoh: aparat/warga/RT/RW" v-model="units.NAME" trim></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="6" md="2" class="addunit">
            <b-button block @click="addNewSection()">+</b-button>
          </b-col>
          <b-col cols="6" md="2" class="addunit">
            <b-button block @click="deleteSelection(index)">-</b-button>
          </b-col>
        </b-row>
      </b-card>
      <b-card title="Profile Desa" border-variant="light" class="outer-box">
        <b-row>
          <b-col>
            <b-form-group
              id="fieldset-slug"
              label="URL Profil Desa"
              label-for="input-slug"
            >
              <b-form-input
                v-model="slugText"
                disabled
                @input="slugChange"
                aria-describedby="input-live-help input-live-feedback-name"
                placeholder="Masukkan Slug"
                description="We will convert your name to lowercase instantly"
                trim
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
              id="fieldset-deskripsi"
              label="Deskripsi"
              label-for="input-deskripsi"
              rows="4"
              :state="deskriptionField"
            >
              <b-form-textarea id="input-deskripsi" v-model="profile.description" :state="deskriptionField" trim></b-form-textarea>
              <b-form-invalid-feedback :state="deskriptionField">
                Masukan Deskripsi Desa
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
              id="fieldset-wallpaper"
              label="Gambar Desa"
              label-for="input-wallpaper"
            >
              <b-form-file
                accept=".jpg, .png"
                v-model="profile.image"
                :state="Boolean(profile.image)"
                placeholder="Pilih file ..."
              ></b-form-file>
            </b-form-group>
          </b-col>
        </b-row>
        <div class="col-sm-12 col-md-12 col-lg-12 mt-2 image-container">
          <div v-if="previewBackground !== undefined" class="preview mt-2" :style="{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(http://absensi-selfie.pptik.id/data/profile/image/${previewBackground})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }" />
          <div v-else class="preview mt-2" />
          <div class="title-image-preview text-white">{{ profile.name }}</div>
          <div class="deskription-image-preview text-white">{{ profile.description }}</div>
        </div>
      </b-card>
      <div class="mx-auto" style="width: 100px;"><b-button block pill variant="primary" :disabled="isEmptyTask" @click="createAdminAccount()" class="text-center">Daftar</b-button></div>
    </div>
    <b-modal centered hide-footer no-close-on-esc no-close-on-backdrop id="modal">
      <div class="text-center d-block">
        <h4>Kode Registrasi</h4>
        <span class="m-2">Gunakan kode berikut untuk melakukan pendaftaran pengguna desa melalui aplikasi android. <span class="text-danger font-weight-bold">Jangan lupa simpan kode registrasi desamu!</span></span>
        <h4><b-badge pill variant="info" class="m-2">{{company_code}}</b-badge></h4>
        <b-link :href="slugPreview" class="text-success font-weight-bold">Profil</b-link>
        <b-link href="/#/login" class="font-weight-bold">Kembali</b-link>
      </div>
    </b-modal>
  </div>
</template>
<script>
import VueSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import SupervisorService from '@/services/SupervisorService'
import AuthenticationService from '@/services/AuthenticationService'
import CompanyService from '@/services/CompanyService'
export default {
  components: {
    VueSelect
  },
  computed: {
    routeName () {
      return this.$router.currentRoute.name
    },
    roleAuth () {
      return this.$store.state.authentication.role
    },
    getApplicationTypes () {
      return this.$store.state.getApplicationType.appType
    },
    emailField () {
      if (this.email.length >= 5) {
        return true
      } else {
        return false
      }
    },
    passwordField () {
      if (this.password.length >= 5) {
        return true
      } else {
        return false
      }
    },
    companyNameField () {
      if (this.company_name.length >= 5) {
        return true
      } else {
        return false
      }
    },
    phoneField () {
      if (this.profile.phone.length >= 10) {
        return true
      } else {
        return false
      }
    },
    institutionField () {
      if (this.profile.institution.length >= 3) {
        return true
      } else {
        return false
      }
    },
    invalidFeedback () {
      if (this.email.length > 0 || this.password.length > 0 || this.company_name.length > 0) {
        return 'Masukan Minimal 4 Karakter.'
      }
      return 'Masukkan Data.'
    },
    deskriptionField () {
      if (this.profile.description.length >= 10 && this.profile.description.length <= 300) {
        return true
      } else {
        return false
      }
    },
    registrantField () {
      if (this.profile.registrant_name.length >= 3) {
        return true
      } else {
        return false
      }
    },
    isEmptyTask () {
      if (this.emailField && this.passwordField && this.companyNameField && this.institutionField && this.phoneField && this.deskriptionField && this.registrantField && Boolean(this.profile.image)) {
        return false
      } else {
        return true
      }
    }
  },
  data () {
    return {
      subArea: [],
      areaData: [],
      companies: [],
      email: '',
      password: '',
      role: 'company',
      type: 'kawal-desa',
      company_name: '',
      company_area: '',
      company_district: '',
      units: [
        {
          NAME: '',
          IS_ACTIVE: true
        }
      ],
      company_guid: '',
      company_code: '',
      profile: {
        name: 'Nama Desa',
        slug: 'kawal',
        registrant_name: '',
        phone: '',
        institution: '',
        description: 'Deskripsi Desa',
        image: null
      },
      slugText: 'http://kawaldesa.pptik.id/#/landing-page/kawal/kawal',
      slugPreview: 'http://kawaldesa.pptik.id/#/landing-page/kawal/kawal',
      previewBackground: undefined
    }
  },
  mounted () {
    window.scrollTo(0, 0)
    this.getArea()
  },
  methods: {
    villageNameChange (data) {
      this.slugChange(data)
      this.profile.name = data
    },
    slugChange (data) {
      let formatData = data.toLowerCase().replace(/\s/g, '-')
      this.profile.slug = formatData
      this.slugPreview = `http://kawaldesa.pptik.id/#/landing-page/${formatData}/${this.company_guid}`
      this.slugText = this.slugPreview
    },
    getArea: async function () {
      // SETTING AREA
      const response = await SupervisorService.getAreaByUsers('kawal-desa')
      this.areaData = response.data.data.areas
      const newAreaData = []
      this.areaData.forEach(area => {
        newAreaData.push({ DISTRICTS: area.DISTRICTS, AREA: area.AREA, AREA_VALUE: area.AREA })
      })
      const arrayInsert = [{ DISTRICTS: [], AREA: 'Semua', AREA_VALUE: undefined }]
      this.insertDataToArray(newAreaData, 0, arrayInsert)
      this.areaData = newAreaData
      // SETTING SUB-AREA
      this.subArea = newAreaData.reduce((obj, item) => {
        const itemDistricts = item.DISTRICTS
        const districtArray = []
        itemDistricts.forEach(district => {
          districtArray.push({ DISTRICT_NAME: district, DISTRICT_CODE: district })
        })
        this.insertDataToArray(districtArray, 0, { DISTRICT_NAME: 'Semua', DISTRICT_CODE: undefined })
        obj[item.AREA] = districtArray
        return obj
      }, {})
    },
    getCompanies: async function () {
      try {
        if (this.selected.district !== undefined && this.selected.district !== null) {
          const response = await SupervisorService.getCompanies(this.selected)
          this.companies = response.data.data
          const arrayInsert = [{ COMPANY_GUID: undefined, COMPANY_NAME: 'Semua' }]
          this.insertDataToArray(this.companies, 0, arrayInsert)
        } else {
          this.companies = []
        }
        this.store()
      } catch (error) {
        this.companies = []
      }
    },
    insertDataToArray: function (destArray, pos, arrayToInsert) {
      let emptyArray = []
      emptyArray.push(pos)
      emptyArray.push(0)
      emptyArray = emptyArray.concat(arrayToInsert)
      destArray.splice.apply(destArray, emptyArray)
    },
    addNewSection () {
      this.units.push({
        NAME: '',
        IS_ACTIVE: true
      })
    },
    formatter (value) {
      return value.toLowerCase()
    },
    deleteSelection (id) {
      if (this.units.length > 1) {
        this.units.splice(id, 1)
      }
    },
    createProfile: async function () {
      try {
        let formData = new FormData()
        formData.append('company_guid', this.company_guid)
        for (let form in this.profile) {
          if (this.profile[form] !== null) {
            formData.append(form, this.profile[form])
          }
        }
        await CompanyService.createCompanyProfile(formData)
      } catch (error) {
        let data = ''
        if (error.response.data.data !== null) {
          data = error.response.data.data
        }
        this.toast('Gagal Mendaftar', 'danger', error.response.data.message + ' ' + data.path)
      }
    },
    createAdminAccount: async function () {
      let response
      try {
        /* eslint-disable camelcase */
        const { email, password, role, type, company_name, company_area, company_district, units } = this
        const form = { email, password, role, type, company_name, company_area, company_district, units }
        response = await AuthenticationService.registration(form)
        this.company_guid = response.data.data.company_guid
        const getCompanyCode = await CompanyService.getCompanyByCompanyGuid(this.company_guid)
        this.company_code = getCompanyCode.data.data.COMPANY_CODE
        this.slugPreview = `http://kawaldesa.pptik.id/#/landing-page/${this.profile.slug}/${this.company_guid}`
        this.$bvModal.show('modal')
        this.createProfile()
        this.clearForm()
      } catch (error) {
        let data = ''
        if (error.response.data.data !== null) {
          data = error.response.data.data
        }
        this.toast('Gagal Mendaftar', 'danger', error.response.data.message + ' ' + data.path)
      }
    },
    toast: function (title, variant, description) {
      this.$bvToast.toast(description, {
        title: title,
        variant: variant,
        autoHideDelay: 5000
      })
    },
    clearForm () {
      this.email = ''
      this.password = ''
      this.company_name = ''
      this.company_area = ''
      this.company_district = ''
      this.units = []
    }
  }
}
</script>

<style scoped>
  .box {
    background-color: #f9f9f9;
    display: block;
    border-radius: 20px;
    margin: 50px;
    padding-bottom: 30px;
  }
  .outer-box {
    margin: 5% 25% 5% 25%;
  }
  .addunit {
    margin-top: 30px;
  }
  @font-face {
    font-family: 'RobotoBold';
    src: url('../../static/font/Roboto-Bold.ttf');
  }
  @font-face {
    font-family: 'RobotoRegular';
    src: url('../../static/font/Roboto-Regular.ttf');
  }
  .image-container {
    position: relative;
  }
  .inputGroupMigration {
    margin-top: 50px;
  }
  .btnMigrasi {
    float: right;
  }
  .example-image-form {
    max-width: 100%;
    height: auto;
  }
  .title-image-preview {
    font-family: 'RobotoBold';
    position: absolute;
    max-width: 400px;
    font-size: 1.3em;
    top: 120px;
    left: 50px;
    color: black;
  }
  .preview {
    background-color: #DEE2E6;
    display: block;
    height: 300px;
  }
  .deskription-image-preview {
    position: absolute;
    font-family: 'RobotoRegular';
    max-width: 260px;
    height: 100px;
    top: 160px;
    font-size: 10px;
    left: 50px;
    color: black;
  }
</style>
