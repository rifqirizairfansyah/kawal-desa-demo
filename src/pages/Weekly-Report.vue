<template>
  <b-container>
    <div class="posts">
      <b-card title="File Laporan">
        <b-form-group>
          <b-row>
            <b-col :md="routeName === 'Map' ? '12': '12'" sm="12" cols="12">
              <label> Unit: </label>
              <vue-select
                v-model="selected.unit"
                :options="units"
                :reduce="unit => unit.UNIT_CODE"
                label="UNIT_NAME"
              />
            </b-col>
          </b-row>
          <b-row>
            <b-col :md="routeName === 'Map' ? '12': '6'" sm="12" cols="12">
              <label> Tanggal Awal: </label>
              <b-form-datepicker id="datepicker-start" v-model="hidden.date_start" @input="changeDateStart(hidden.date_start)" locale="id" class="mb-2"></b-form-datepicker>
              <b-form-datepicker id="datepicker-start" v-model="selected.additional.date_start" locale="id" class="mb-2 sr-only sr-only-focusable"></b-form-datepicker>
            </b-col>
            <b-col :md="routeName === 'Map' ? '12': '6'" sm="12" cols="12">
              <label> Tanggal Akhir: </label>
              <b-form-datepicker id="datepicker-end" v-model="hidden.date_end" @input="changeDateEnd(hidden.date_end)" locale="id" class="mb-2"></b-form-datepicker>
              <b-form-datepicker id="datepicker-end" v-model="selected.additional.date_end" locale="id" class="mb-2 sr-only sr-only-focusable"></b-form-datepicker>
            </b-col>
          </b-row>
        </b-form-group>
        <b-row>
          <b-col md="4">
            <b-button :disabled="data.length === 0 && loading" type="submit" variant="primary" class="m10" v-on:click="onSubmit" style="width: 100px;">
              <b-spinner class="m-1" small v-if="data.length === 0 && loading" variant="light" label="Text Centered"></b-spinner>
              <b v-else>Cek Data</b>
            </b-button>
          </b-col>
        </b-row>
        <br>
        <b-table striped hover responsive :fields="fields" :items="data" v-if="data.length != 0" class="mt-1">
          <template v-slot:head(UNIT)>
            <div style="width: 168px">Unit</div>
          </template>
          <template v-slot:cell(UNIT)="data">
            {{ data.item.UNIT }}
          </template>
          <template v-slot:head(DATE_START)>
            <div style="width: 118px">Tanggal Awal</div>
          </template>
          <template v-slot:cell(DATE_START)="data" >
            {{ data.item.DATE_START | convertDate   }}
          </template>
          <template v-slot:head(DATE_END)>
            <div style="width: 200px">Tanggal Akhir</div>
          </template>
          <template v-slot:cell(DATE_END)="data">
            {{ data.item.DATE_END | convertDate }}
          </template>
          <template v-slot:head(ACTION)>
            <div style="width: 200px">Aksi</div>
          </template>
          <template v-slot:cell(ACTION)="data">
            <b-button variant="success" v-on:click="getReportPDF(data.item.FILENAME)">
              <b>Unduh File</b>
            </b-button>
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
  </b-container>
</template>
<script>
import ReportService from '@/services/ReportService'
import UnitService from '@/services/UnitService'
import VueSelect from 'vue-select'
import { format, addDays } from 'date-fns'
import id from 'date-fns/locale/id'
import startOfWeek from 'date-fns/startOfWeek'
import endOfWeek from 'date-fns/endOfWeek'
import formatISO from 'date-fns/formatISO'

export default {
  name: 'weekly-report',
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
    VueSelect
  },
  created () {
    this.$store.dispatch('combobox/clear_selected')
  },
  data () {
    return {
      units: [],
      data: [],
      fields: [
        { key: 'UNIT', label: 'Unit' },
        { key: 'DATE_START', label: 'Tanggal Awal' },
        { key: 'DATE_END', label: 'Tanggal Akhir' },
        { key: 'ACTION', label: 'Aksi' }
      ],
      gambar: null,
      numberOfPages: 0,
      selected: {
        additional: {
          date_start: undefined,
          date_end: undefined,
          total_attendance: false
        },
        unit: undefined
      },
      hidden: {
        date_start: undefined,
        date_end: undefined
      },
      perPage: 10,
      loading: false,
      downloadStatus: false
    }
  },
  mounted () {
    // Get & Set Last Week
    const getLastWeek = new Date(formatISO(addDays(new Date(), -7), new Date()))
    this.hidden.date_start = format(startOfWeek(new Date(getLastWeek), { weekStartsOn: 1 }), 'yyyy-MM-dd')
    this.hidden.date_end = format(endOfWeek(new Date(getLastWeek), { weekStartsOn: 1 }), 'yyyy-MM-dd')
    // Set Date
    this.selected.additional.date_start = new Date(this.hidden.date_start).toISOString()
    this.selected.additional.date_end = new Date(this.hidden.date_end).toISOString()
    this.getUnits()
  },
  filters: {
    getDate: function (date) {
      date = date.toString().length === 10 ? parseInt(date) * 1000 : date
      const formattedDate = format(date, 'dd LLLL yyyy HH:mm:ss', { locale: id })
      return formattedDate
    },
    convertDate: function (date) {
      const formattedDate = format(new Date(date), 'dd LLLL yyyy HH:mm:ss', { locale: id })
      return formattedDate
    }
  },
  methods: {
    onSubmit: function () {
      this.data = []
      this.selected.additional.page = 1
      this.getReport()
    },
    changeDateStart (date) {
      this.selected.additional.date_start = new Date(date).toISOString()
    },
    changeDateEnd (date) {
      this.selected.additional.date_end = new Date(date).toISOString()
    },
    insertDataToArray: function (destArray, pos, arrayToInsert) {
      let emptyArray = []
      emptyArray.push(pos)
      emptyArray.push(0)
      emptyArray = emptyArray.concat(arrayToInsert)
      destArray.splice.apply(destArray, emptyArray)
    },
    getUnits: async function () {
      try {
        this.selected.unit = undefined
        this.units = []
        let response = await UnitService.getUnits(this.selected)
        const getResponseData = response.data.data
        getResponseData.forEach(unit => {
          const dataInsert = { UNIT_NAME: unit, UNIT_CODE: unit }
          this.units.push(dataInsert)
        })
        const arrayInsert = [{ UNIT_CODE: undefined, UNIT_NAME: 'Semua' }]
        this.insertDataToArray(this.units, 0, arrayInsert)
      } catch (error) {
        this.units = []
      }
    },
    getReportPDF: async function (nameFile) {
      try {
        this.downloadStatus = true
        this.downloadPDF(`http://absensi-selfie.pptik.id/data/kehadiran/export/${nameFile}`)
        this.downloadStatus = false
      } catch (error) {
        this.downloadStatus = false
      }
    },
    downloadPDF: function (url) {
      const link = document.createElement('a')
      document.body.appendChild(link)
      link.href = url
      link.click()
    },
    getReport: async function () {
      try {
        this.loading = true
        this.selected.additional.total_attendance = false
        const response = await ReportService.getReportWeekly(this.selected)
        this.data = response.data.data.exported_reports
        this.numberOfPages = response.data.data.number_of_pages
        this.data.length === 0 ? this.loading = false : this.loading = false
      } catch (error) {
        this.data = []
      }
    },
    changePage (pageNumber) {
      this.data = []
      this.selected.additional.page = pageNumber
      this.getReport()
    }
  }
}
</script>
