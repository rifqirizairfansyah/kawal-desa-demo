<template>
  <b-container class="mt-5">
    <b-alert show variant="danger" v-if="getRole !== 'company'" class="text-center">Perubahan profil desa hanya bisa dilakukan oleh akun desa</b-alert>
     <b-card header-tag="nav">
      <template v-slot:header>
        <b-nav card-header tabs>
          <b-nav-item active :disabled="getRole !== 'company'">Profil Desa</b-nav-item>
        </b-nav>
      </template>
      <div class="mt-10">
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-6">
            <div class="mt-2">
              <div role="group">
                <!-- Field Nama Pendaftar -->
                <label for="input-judul">Nama Pendaftar:</label>
                <b-form-group
                  label-for="input-formatter"
                  class="mb-0"
                >
                  <b-form-input
                    v-model="profile.registrant_name"
                    disabled
                    aria-describedby="input-live-help input-live-feedback-name"
                    placeholder="Nama Pendaftar Kawal Desa"
                    description="We will convert your name to lowercase instantly"
                    trim
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-live-feedback-name">
                    Masukkan paling sedikit 5 karakter dan kurang dari 50 karakter
                  </b-form-invalid-feedback>
                </b-form-group>
              </div>

              <div role="group">
                <!-- Field Phone -->
                <label for="input-judul">No. Telepon:</label>
                <b-form-group
                  label-for="input-formatter"
                  class="mb-0"
                >
                  <b-form-input
                    v-model="profile.phone"
                    type="number"
                    aria-describedby="input-live-help input-live-feedback-name"
                    placeholder="No Telepohone"
                    description="We will convert your name to lowercase instantly"
                    trim
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-live-feedback-name">
                    Masukkan paling sedikit 5 karakter dan kurang dari 50 karakter
                  </b-form-invalid-feedback>
                </b-form-group>
              </div>
              <div role="group">
                <!-- Field Institution -->
                <label for="input-judul">Instansi:</label>
                <b-form-group
                  label-for="input-formatter"
                  class="mb-0"
                >
                  <b-form-input
                    v-model="profile.institution"
                    aria-describedby="input-live-help input-live-feedback-name"
                    placeholder="Instansi"
                    description="We will convert your name to lowercase instantly"
                    trim
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-live-feedback-name">
                    Masukkan paling sedikit 5 karakter dan kurang dari 50 karakter
                  </b-form-invalid-feedback>
                </b-form-group>
              </div>
              <div role="group">
                <!-- Field Name -->
                <label for="input-judul">Nama Desa:</label>
                <b-form-input
                  v-model="profile.name"
                  :state="nameFieldState"
                  @input="slugChange"
                  :disabled="getRole !== 'company'"
                  aria-describedby="input-live-help input-live-feedback-name"
                  placeholder="Masukkan Judul"
                  trim
                ></b-form-input>
                <b-form-invalid-feedback id="input-live-feedback-name">
                  Masukkan paling sedikit 5 karakter dan kurang dari 40 karakter
                </b-form-invalid-feedback>
              </div>
              <div role="group">
                <!-- Field Slug -->
                <label for="input-judul">Slug:</label>
                <b-form-group
                  label-for="input-formatter"
                  :description="slugPreview"
                  class="mb-0"
                >
                  <b-form-input
                    v-model="slugText"
                    :state="slugFieldState"
                    disabled
                    aria-describedby="input-live-help input-live-feedback-name"
                    placeholder="Masukkan Slug"
                    description="We will convert your name to lowercase instantly"
                    trim
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-live-feedback-name">
                    Masukkan paling sedikit 5 karakter dan kurang dari 50 karakter
                  </b-form-invalid-feedback>
                </b-form-group>
              </div>
              <div role="group">
                <!-- Field Title -->
                <label for="input-judul">Deskripsi:</label>
                <b-form-textarea
                  v-model="profile.description"
                  :state="deskriptionFieldState"
                  :disabled="getRole !== 'company'"
                  aria-describedby="input-live-help input-live-feedback-deskription"
                  placeholder="Masukkan Judul"
                  rows="4"
                  trim
                ></b-form-textarea>
                <b-form-invalid-feedback id="input-live-feedback-deskription">
                  Masukkan paling sedikit 10 karakter dan kurang dari 300 karakter
                </b-form-invalid-feedback>
              </div>
              <div role="group">
                <!-- Field Image -->
                <label for="input-judul">Foto:</label>
                <b-form-file
                  accept=".jpg, .png"
                  v-model="profile.image"
                  :state="Boolean(profile.image)"
                  :disabled="getRole !== 'company'"
                  placeholder="Pilih file ..."
                ></b-form-file>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-6 mt-2 image-container">
            <span>Pratinjau:</span>
            <div v-if="previewBackground !== undefined" class="preview mt-2" :style="{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(http://absensi-selfie.pptik.id/data/profile/image/${previewBackground})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }" />
            <div v-else class="preview mt-2" />
            <div class="title-image-preview text-white">{{ profile.name }}</div>
            <div class="deskription-image-preview text-white">{{ profile.description }}</div>
          </div>
        </div>
        <b-button variant="success" class="mt-5" :disabled="getRole !== 'company'" v-on:click="updateProfile()">Simpan</b-button>
      </div>
    </b-card>
  </b-container>
</template>
<script>
import CompanyService from '@/services/CompanyService'
export default {
  name: 'setting',
  computed: {
    nameFieldState () {
      if (this.profile.name.length >= 5 && this.profile.name.length <= 36) {
        return true
      } else {
        return false
      }
    },
    slugFieldState () {
      if (this.profile.slug.length >= 3 && this.profile.slug.length <= 50) {
        return true
      } else {
        return false
      }
    },
    deskriptionFieldState () {
      if (this.profile.description.length >= 10 && this.profile.description.length <= 300) {
        return true
      } else {
        return false
      }
    },
    getRole () {
      return this.$store.state.authentication.role
    }
  },
  components: {
  },
  data () {
    return {
      profile: {
        name: 'Nama Desa',
        slug: 'kawal',
        institution: '',
        description: 'Deskripsi Desa',
        image: null
      },
      company_guid: '',
      slugText: '',
      slugPreview: 'http://kawaldesa.pptik.id/#/landing-page/',
      previewBackground: undefined
    }
  },
  mounted () {
    this.getProfile()
  },
  methods: {
    slugChange (data) {
      let formatData = data.toLowerCase().replace(/\s/g, '-')
      this.profile.slug = formatData
      this.slugText = formatData
      this.slugPreview = `http://kawaldesa.pptik.id/#/landing-page/${formatData}/${this.company_guid}`
    },
    updateProfile: async function () {
      try {
        let formData = new FormData()
        for (let form in this.profile) {
          if (this.profile[form] !== null) {
            formData.append(form, this.profile[form])
          }
        }
        const response = await CompanyService.updateCompanyProfile(formData)
        if (response.data.code === 200) {
          this.$bvToast.toast('Profil Berhasil Diubah', {
            title: 'Profil berhasil diubah',
            variant: 'success',
            autoHideDelay: 5000
          })
        }
        this.getProfile()
      } catch (error) {
        this.$bvToast.toast('Profil Gagal Diubah', {
          title: 'Profil Gagal diubah',
          variant: 'error',
          autoHideDelay: 5000
        })
      }
    },
    getProfile: async function () {
      const response = await CompanyService.getCompanyProfile()
      if (response.data.data !== null) {
        this.slugChange(response.data.data.SLUG)
        this.profile.registrant_name = response.data.data.REGISTRANT_NAME
        this.profile.phone = response.data.data.PHONE
        this.profile.institution = response.data.data.INSTITUTION
        this.company_guid = response.data.data.COMPANY_GUID
        this.profile.name = response.data.data.NAME
        this.slugText = response.data.data.SLUG
        this.profile.description = response.data.data.DESCRIPTION
        this.previewBackground = response.data.data.IMAGE
        this.slugPreview = `${this.slugPreview}${this.company_guid}`
      }
    }
  }
}
</script>
<style scoped>
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
    max-width: 460px;
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
