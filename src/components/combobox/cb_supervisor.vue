<template>
  <b-form-group>
    <b-row>
      <b-col :md="routeName === 'Map' ? '12': '6'" sm="12" cols="12">
        Area:
        <vue-select
          v-model="selected.area"
          :options="areaData"
          label="AREA"
          :reduce="AREA => AREA.AREA_VALUE"
          @input="getDistricts()" />
          <p class="alert-area" v-if="routeName === 'Map' && selected.area !== null && selected.district === null">Browser kemungkinan akan mengalami <i>hang/freeze</i> jika hanya <b>Area</b> yang dipilih</p>
      </b-col>
      <b-col :md="routeName === 'Map' ? '12': '6'" sm="12" cols="12">
        Sub-Area:
        <vue-select
          v-model="selected.district"
          :options="subArea[selected.area]"
          label="DISTRICT_NAME"
          :reduce="DISTRICT_NAME => DISTRICT_NAME.DISTRICT_CODE"
          @input="getCompanies()"/>
      </b-col>
      <b-col :md="routeName === 'Map' ? '12': '6'" sm="12" cols="12">
        Instansi:
        <vue-select
          v-model="selected.company"
          :options="companies"
          label="COMPANY_NAME"
          @input="getUnits()"
          :reduce="company => company.COMPANY_GUID"/>
      </b-col>
      <b-col :md="routeName === 'Map' ? '12': '6'" sm="12" cols="12">
        Unit:
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
        Tanggal:
        <b-form-datepicker id="datepicker-sm" v-model="selected.additional.date" locale="id" @input="store()" class="mb-2"></b-form-datepicker>
      </b-col>
    </b-row>
  </b-form-group>
</template>
<script>
import { format } from 'date-fns'
import VueSelect from 'vue-select'
import ReportService from '@/services/ReportService'
import SupervisorService from '@/services/SupervisorService'
import 'vue-select/dist/vue-select.css'
export default {
  data () {
    return {
      subArea: [],
      areaData: [],
      selected: {
        area: undefined,
        district: undefined,
        unit: undefined,
        company: undefined,
        additional: {
          report_type: null,
          role: undefined,
          date: undefined,
          page: 1
        }
      },
      reportTypes: [],
      companies: [],
      units: []
    }
  },
  mounted () {
    this.getReportType()
    this.getArea()
    this.selected.additional.date = format(new Date(), 'yyyy-MM-dd')
    this.store()
  },
  components: {
    VueSelect
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
    getDistricts () {
      this.companies = []
      this.units = []
      this.selected.district = null
      this.selected.company = null
      this.selected.unit = null
      this.store()
    },
    props: ['type'],
    store () {
      this.$store.dispatch('combobox/store_selected', { data: this.selected, type: this.role, ...(this.routeName === 'Map') && { minified: true } })
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
          const arrayInsert = [{ UNIT_CODE: undefined, UNIT_NAME: 'Semua' }]
          this.insertDataToArray(this.units, 0, arrayInsert)
        } else {
          this.units = []
        }
        this.store()
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
        this.store()
      } catch (error) {
        this.reportTypes = []
      }
    },
    getArea: async function () {
      // SETTING AREA
      const response = await SupervisorService.getArea()
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
        this.selected.unit = null
        this.selected.company = null
        this.units = []
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
    }
  }
}
</script>

<style>
  .alert-area {
    margin-top: 5px;
    color: #856404;
  }
</style>
