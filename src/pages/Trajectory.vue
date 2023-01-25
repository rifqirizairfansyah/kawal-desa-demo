<template>
  <b-container>
    <div class="posts m10">
      <b-card title="Trajectory">
        <combobox-selected type="trajectory" />
        <b-row>
          <b-col md="4">
            <b-button :disabled="data.length === 0 && loading" type="submit" variant="primary" class="m10" v-on:click="onSubmit" style="width: 100px;">
              <b-spinner class="m-1" small v-if="data.length === 0 && loading" variant="light" label="Text Centered"></b-spinner>
              <b v-else>Cek Data</b>
            </b-button>
            <b-button v-if="routeName !== 'Map'" variant="success" :disabled="downloadStatus === true || combobox.selected.unit === undefined || combobox.selected.unit === null" v-on:click="getReportExcel()">
              <b-spinner class="m-1" small v-if="downloadStatus === true" variant="light" label="Text Centered"></b-spinner>
              <b v-else>Unduh Excel</b>
            </b-button>
          </b-col>
        </b-row>
        <br>
        <b-row
          v-if="data.length !== 0"
          class="m10">
          <b-col
            md="3" cols="6"
            class="p-1"
            col>
            <div class="info">
              <b-card
                class="text-center box-height">
                <b-card-title v-if="totalAttendees === undefined"><b-spinner variant="secondary" label="Text Centered"></b-spinner></b-card-title>
                <b-card-title v-else>{{ totalAttendees.day.toString() }}</b-card-title>
                <b-card-sub-title>Total Pengguna Hadir Hari Ini</b-card-sub-title>
              </b-card>
            </div>
          </b-col>
          <b-col
            md="3" cols="6"
            class="p-1"
            col>
            <div class="info">
              <b-card
                class="text-center box-height">
                <b-card-title v-if="totalAttendees === undefined"><b-spinner variant="secondary" label="Text Centered"></b-spinner></b-card-title>
                <b-card-title v-else>{{ totalAttendees.week.toString() }}</b-card-title>
                <b-card-sub-title>Total Pengguna Minggu Hari Ini</b-card-sub-title>
              </b-card>
            </div>
          </b-col>
          <b-col
            md="3" cols="6"
            class="p-1"
            col>
            <div class="info">
              <b-card
                class="text-center box-height">
                <b-card-title v-if="totalAttendees === undefined"><b-spinner variant="secondary" label="Text Centered"></b-spinner></b-card-title>
                <b-card-title v-else>{{ totalAttendees.month.toString() }}</b-card-title>
                <b-card-sub-title>Total Pengguna Hadir Bulan Ini</b-card-sub-title>
              </b-card>
            </div>
          </b-col>
          <b-col
            md="3" cols="6"
            class="p-1"
            col>
            <div class="info">
              <b-card
                class="text-center box-height">
                <b-card-title v-if="totalAttendees === undefined"><b-spinner variant="secondary" label="Text Centered"></b-spinner></b-card-title>
                <b-card-title v-else>{{ totalAttendees.year.toString() }}</b-card-title>
                <b-card-sub-title>Total Pengguna Hadir Tahun Ini</b-card-sub-title>
              </b-card>
            </div>
          </b-col>
        </b-row>
        <b-table striped hover responsive :fields="fields" :items="data" v-if="data.length != 0" class="mt-1">
          <template v-slot:head(NAME)>
            <div style="width: 168px">Nama</div>
          </template>
          <template v-slot:cell(NAME)="data">
            {{ data.item.NAME }}
          </template>
          <template v-slot:head(TIMESTAMP)>
            <div style="width: 118px">Tanggal</div>
          </template>
          <template v-slot:cell(TIMESTAMP)="data" >
            {{ data.item.TIMESTAMP | getDate }}
          </template>
          <template v-slot:head(DESCRIPTION)>
            <div style="width: 200px">Komentar</div>
          </template>
          <template v-slot:cell(DESCRIPTION)="data">
            {{ data.item.DESCRIPTION }}
          </template>
          <template v-slot:head(ADDRESS)>
            <div style="width: 200px">Lokasi</div>
          </template>
          <template v-slot:cell(ADDRESS)="data">
            <a :href="`https://www.google.com/maps?q=loc:${data.item.LAT},${data.item.LONG}`" target="_blank">{{ data.item.ADDRESS }}</a>
          </template>
          <template v-slot:head(ACTION)>
            <div style="width: 200px">ACTION</div>
          </template>
          <template v-slot:cell(ACTION)="data">
            <b-button variant="primary" :to="'/map/' + data.item._id ">Peta</b-button>
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
        <b-alert variant="danger" show v-if="data.length === 0 && loading === false" class="m10">Data tidak tersedia</b-alert>
      </b-card>
    </div>
    <b-modal ref="my-modal" size="lg" hide-footer title="Gambar">
      <div class="d-block text-center">
        <img :src="gambar" class="img-fluid">
      </div>
    </b-modal>
  </b-container>
</template>
<script>
import ComboboxSelected from '@/components/_SelectedComboBox.vue'
import ReportService from '@/services/ReportService'
import { format } from 'date-fns'
import id from 'date-fns/locale/id'

export default {
  name: 'reports',
  computed: {
    routeName () {
      return this.$router.currentRoute.name
    },
    role () {
      return this.$store.state.authentication.role
    },
    combobox () {
      return this.$store.state.combobox
    }
  },
  components: {
    'combobox-selected': ComboboxSelected
  },
  created () {
    this.$store.dispatch('combobox/clear_selected')
  },
  data () {
    return {
      units: [],
      data: [],
      fields: [
        { key: 'NAME', label: 'Nama' },
        { key: 'TIMESTAMP', label: 'Tanggal' },
        { key: 'DESCRIPTION', label: 'Keterangan' },
        { key: 'ADDRESS', label: 'Lokasi' },
        'ACTION'
      ],
      gambar: null,
      numberOfPages: 0,
      people: [],
      selected: {
        additional: {
          date: undefined,
          total_attendance: false
        }
      },
      totalAttendees: undefined,
      perPage: 10,
      loading: false,
      downloadStatus: false
    }
  },
  mounted () {
    this.selected.additional.date = format(new Date(), 'yyyy-MM-dd')
  },
  filters: {
    getDate: function (date) {
      date = date.toString().length === 10 ? parseInt(date) * 1000 : date
      const formattedDate = format(date, 'dd LLLL yyyy HH:mm:ss', { locale: id })
      return formattedDate
    }
  },
  methods: {
    onSubmit: function () {
      this.data = []
      this.selected.additional.page = 1
      this.selected = this.$store.state.combobox.selected
      this.getReport()
      this.getTotalAttendees()
    },
    getReportExcel: async function () {
      try {
        this.downloadStatus = true
        const response = await ReportService.reportExcel(this.combobox.selected, this.role)
        const nameFile = response.data.data.filename
        this.downloadExcel(`http://absensi-selfie.pptik.id/data/kehadiran/export/${nameFile}`)
        this.downloadStatus = false
      } catch (error) {
        this.downloadStatus = false
      }
    },
    downloadExcel: function (url) {
      const link = document.createElement('a')
      document.body.appendChild(link)
      link.href = url
      link.click()
    },
    getReport: async function () {
      try {
        this.loading = true
        this.selected.additional.total_attendance = false
        const response = await ReportService.getReports(this.selected, this.role)
        this.data = response.data.data.reports
        this.numberOfPages = response.data.data.number_of_pages
        this.data.length === 0 ? this.loading = false : this.loading = false
      } catch (error) {
        this.data = []
      }
    },
    getTotalAttendees: async function () {
      try {
        this.totalAttendees = undefined
        const getSelectedCombobox = this.$store.state.combobox.selected
        getSelectedCombobox.additional.total_attendance = true
        const response = await ReportService.getReports(getSelectedCombobox, this.role)
        this.totalAttendees = response.data.data
      } catch (error) {
        this.totalAttendees = undefined
      }
    },
    showModal: function (gambar) {
      this.gambar = gambar
      this.$refs['my-modal'].show()
    },
    changePage (pageNumber) {
      this.data = []
      this.selected.additional.page = pageNumber
      this.getReport()
    }
  }
}
</script>
<style>
  .box-height {
    height: 125px;
  }
  .loadingTotalAttend {
    margin: 0;
    position: absolute;
    top:35%;
    width: 3rem;
    height: 3rem;
  }
</style>
