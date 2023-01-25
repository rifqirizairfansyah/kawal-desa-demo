<template>
  <div class="posts m10">
    <b-table striped hover responsive :fields="fields" :items="announcement" v-if="announcement.length != 0" class="mt-1">
      <template v-slot:head(TITLE)>
        <div style="width: 168px">Judul</div>
      </template>
      <template v-slot:cell(TITLE)="data">
        {{ data.item.TITLE }}
      </template>
      <template v-slot:head(DESCRIPTION)>
        <div style="width: 168px">Deskripsi</div>
      </template>
      <template v-slot:cell(DESCRIPTION)="data">
        {{ data.item.DESCRIPTION }}
      </template>
      <template v-slot:head(ROLE)>
        <div style="width: 168px">Role</div>
      </template>
      <template v-slot:cell(ROLE)="data">
        {{ data.item.ROLE }}
      </template>
      <template v-slot:head(CREATED_AT)>
        <div style="width: 168px">Tanggal</div>
      </template>
      <template v-slot:cell(CREATED_AT)="data">
        {{ data.item.CREATED_AT | getDate }}
      </template>
      <template v-slot:cell(ACTION)="data">
        <b-button v-b-modal.announcement-edit v-on:click="editPanel(data.item)">Edit</b-button>
        <b-button @click="showDeleteModal(data.item.GUID)" variant="danger">Delete</b-button>
      </template>
    </b-table>
    <b-alert variant="danger" show v-if="announcement.length === 0 && loading === false" class="m10">Data tidak tersedia</b-alert>
    <b-modal id="alert-modal" ref="alert-modal" centered hide-footer>
      <template #modal-title>
        Yakin akan menghapus data?
      </template>
      <b-row cols="2">
        <b-col><b-button class="mt-6" variant="danger" block @click="deleteAnnouncement()">Ya</b-button></b-col>
        <b-col><b-button class="mt-6" variant="success" block @click="$bvModal.hide('alert-modal')">Tidak</b-button></b-col>
      </b-row>
    </b-modal>
    <b-modal id="announcement-edit" size="lg" ref="announcement-modal" hide-footer>
      <b-row>
        <b-col>
          <div role="group">
            <!-- Field Title -->
            <label for="input-name">Judul</label>
            <b-form-input
              v-model="form.TITLE"
              placeholder="Judul"
              trim
            ></b-form-input>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div role="group">
            <!-- Field Description -->
            <label for="input-description">Deskripsi:</label>
            <b-form-input
              v-model="form.DESCRIPTION"
              placeholder="Masukkan Deskripsi"
              trim
            ></b-form-input>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div role="group">
            <!-- Field Role -->
            <label for="input-role">Role:</label>
            <b-form-select v-model="form.ROLE" :options="roleOptions"></b-form-select>
          </div>
        </b-col>
      </b-row>
      <b-button class="mt-2" variant="success" v-on:click="editAnnouncement()" block>Simpan</b-button>
    </b-modal>
  </div>
</template>
<script>
import AnnouncementService from '@/services/AnnouncementService'
import { format, parseISO } from 'date-fns'
import id from 'date-fns/locale/id'
export default {
  name: 'announcement-panel',
  data () {
    return {
      select: '',
      announcement: [],
      form: {
        TITLE: '',
        DESCRIPTION: '',
        ROLE: ''
      },
      loading: false,
      fields: [
        { key: 'TITLE', label: 'Judul' },
        { key: 'DESCRIPTION', label: 'Deskripsi' },
        { key: 'ROLE', label: 'Role' },
        { key: 'CREATED_AT', label: 'Tanggal' },
        'ACTION'
      ],
      roleOptions: ['aparat', 'warga']
    }
  },
  mounted () {
    this.getAnnouncement()
  },
  created () {
  },
  filters: {
    getDate: function (date) {
      const formattedDate = format(parseISO(date), 'dd LLLL yyyy HH:mm:ss', { locale: id })
      return formattedDate
    }
  },
  methods: {
    getAnnouncement: async function () {
      try {
        const response = await AnnouncementService.get()
        this.announcement = response.data.data
      } catch (error) {
        this.announcement = []
      }
    },
    deleteAnnouncement: async function () {
      try {
        await AnnouncementService.delete(this.select)
        this.getAnnouncement()
        this.hideDeleteModal()
      } catch (error) {
        this.getAnnouncement()
        this.hideDeleteModal()
      }
    },
    editPanel: async function (data) {
      const response = await AnnouncementService.getById(data.GUID)
      this.select = response.data.data.GUID
      this.form = data
    },
    editAnnouncement: async function () {
      try {
        let form = {
          title: this.form.TITLE,
          description: this.form.DESCRIPTION,
          role: this.form.ROLE
        }
        const response = await AnnouncementService.update(this.select, form)
        if (response.data.code === 200) {
          this.$bvToast.toast('Data Berhasil Diubah', {
            title: 'Berhasil Diubah',
            variant: 'success',
            autoHideDelay: 5000
          })
          this.$refs['announcement-modal'].hide()
          this.getAnnouncement()
        }
      } catch (error) {
        this.$bvToast.toast('Data Gagal Diubah', {
          title: 'Gagal Diubah',
          variant: 'danger',
          autoHideDelay: 5000
        })
      }
    },
    showDeleteModal: function (id) {
      this.select = id
      this.$refs['alert-modal'].show()
    },
    hideDeleteModal: function () {
      this.$refs['alert-modal'].hide()
    }
  },
  computed: {}
}
</script>
