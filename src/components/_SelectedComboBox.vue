<template>
  <div>
    <b-form>
      <!-- Company -->
      <cb-company :type="type" :reportRole="reportRole" v-if="role === 'company'" />
      <!-- Partial Supervisor -->
      <cb-partial-supervisor :type="type" v-else-if="role === 'partial-supervisor'" />
      <!-- Supervisor -->
      <cb-supervisor :type="type" v-else />
    </b-form>
  </div>
</template>
<script>
import ComboboxPartialSupervisor from '../components/combobox/cb_partial_supervisor'
import ComboboxCompany from '../components/combobox/cb_company'
import ComboboxSupervisor from '../components/combobox/cb_supervisor'
import VueSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

export default {
  name: 'reports',
  data () {
    return {
      areaData: [],
      selected: {
        area: undefined,
        district: undefined,
        unit: undefined,
        company: undefined,
        additional: {
          date: undefined,
          page: 1
        }
      },
      companies: [],
      units: []
    }
  },
  mounted () {
  },
  components: {
    VueSelect,
    'cb-partial-supervisor': ComboboxPartialSupervisor,
    'cb-company': ComboboxCompany,
    'cb-supervisor': ComboboxSupervisor
  },
  computed: {
    routeName () {
      return this.$router.currentRoute.name
    },
    role () {
      return this.$store.state.authentication.role
    }
  },
  props: ['type', 'reportRole'],
  methods: {
  }
}
</script>
