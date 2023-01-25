<template>
  <b-form-group>
    <b-row>
      <b-col :md="routeName === 'Map' ? '12': '6'" sm="12" cols="12">
        <label> Unit: </label>
        <vue-select
          v-model="selected.unit"
          @input="store()"
          :options="units"
          :reduce="unit => unit.UNIT_CODE"
          label="UNIT_NAME"
        />
      </b-col>
      <b-col :md="routeName === 'Map' ? '12': '6'" sm="12" cols="12">
        <label> Tipe Report: </label>
        <vue-select
          v-model="selected.additional.report_type"
          :options="reportTypes"
          :reduce="reportTypes => reportTypes.CODE"
          @input="store()"
          label="NAME"
        />
      </b-col>
      <b-col :md="routeName === 'Map' ? '12': '6'" sm="12" cols="12">
        <label> Tanggal: </label>
        <b-form-datepicker id="datepicker-sm" v-model="selected.additional.date" locale="id" @input="store()" class="mb-2"></b-form-datepicker>
      </b-col>
    </b-row>
  </b-form-group>
</template>
<script>
import VueSelect from 'vue-select'
import { format } from 'date-fns'
import ReportService from '@/services/ReportService'
import 'vue-select/dist/vue-select.css'
export default {
  data () {
    return {
      areaData: [],
      selected: {
        unit: undefined,
        additional: {
          report_type: null,
          totalAttendees: false,
          date: undefined,
          page: 1
        }
      },
      units: [],
      reportTypes: []
    }
  },
  components: {
    VueSelect
  },
  props: ['type', 'reportRole'],
  mounted () {
    this.getReportType()
    this.getUnits()
    this.selected.additional.date = format(new Date(), 'yyyy-MM-dd')
    this.store()
  },
  computed: {
    routeName () {
      return this.$router.currentRoute.name
    },
    role () {
      return this.$store.state.authentication.role
    },
    getApplicationTypes () {
      return this.$store.state.getApplicationType.appType
    }
  },
  methods: {
    store () {
      this.$store.dispatch('combobox/store_selected', { data: this.selected, type: this.role, ...(this.routeName === 'Map') && { minified: true } })
    },
    getUnits: async function () {
      try {
        this.selected.unit = undefined
        this.units = []
        this.store()
        const response = await this.$store.dispatch('unit/getUnits', this.selected)
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
    getReportType: async function () {
      try {
        const role = this.reportRole
        this.selected.additional.role = role
        this.selected.additional.app_type = this.getApplicationTypes
        const response = await ReportService.reportTypes({role, app_type: this.getApplicationTypes, type: this.type})
        this.reportTypes = response.data.data
      } catch (error) {
        this.reportTypes = []
      }
    },
    insertDataToArray: function (destArray, pos, arrayToInsert) {
      let emptyArray = []
      emptyArray.push(pos)
      emptyArray.push(0)
      emptyArray = emptyArray.concat(arrayToInsert)
      destArray.splice.apply(destArray, emptyArray)
    }
  }
}
</script>
