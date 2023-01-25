<template>
  <b-container>
    <div class="posts m10">
      <b-card title="Warga">
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Monitoring Laporan" active>
              <monitoring-panel />
            </b-tab>
            <b-tab title="Manajemen Warga" lazy>
              <management-panel />
            </b-tab>
            <b-tab title="Tambah Warga" lazy>
              <create-user-panel />
            </b-tab>
          </b-tabs>
        </b-card>
      </b-card>
    </div>
  </b-container>
</template>

<script>
import VueSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import _Monitoring from '@/components/institution/_monitoring.vue'
import _Management from '@/components/institution/_management.vue'
import _CreateUser from '@/components/institution/_createUser.vue'
import { format } from 'date-fns'
import id from 'date-fns/locale/id'
export default {
  name: 'Village',
  data () {
    return {
      form: {
        NAME: '',
        EMAIL: '',
        PHONE_NUMBER: '',
        UNIT: '',
        ID_CARD: '',
        IMAGE: null
      },
      selected: {
        additional: {
          date: undefined,
          total_attendance: false
        }
      },
      units: []
    }
  },
  computed: {
    nameFieldState () {
      if (this.form.NAME.length >= 5) {
        return true
      } else {
        return false
      }
    },
    emailFieldState () {
      if (this.form.EMAIL.length >= 5) {
        return true
      } else {
        return false
      }
    },
    phoneNumberFieldState () {
      if (this.form.PHONE_NUMBER.length >= 5) {
        return true
      } else {
        return false
      }
    },
    unitFieldState () {
      if (this.form.UNIT.length >= 5) {
        return true
      } else {
        return false
      }
    },
    idCardFieldState () {
      if (this.form.ID_CARD.length >= 5) {
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
    'monitoring-panel': _Monitoring,
    'management-panel': _Management,
    'create-user-panel': _CreateUser,
    VueSelect
  },
  created () {
    this.$store.dispatch('combobox/clear_selected')
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
