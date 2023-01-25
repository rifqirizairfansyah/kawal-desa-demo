<template>
  <div>
    <b-navbar toggleable type="light" variant="light">
        <b-navbar-brand v-if="getCompany !== null" to="/">{{ getCompany }}</b-navbar-brand>
        <b-navbar-brand v-else to="/">Kawal Desa</b-navbar-brand>
        <b-nav pills left v-if="token !== null">
          <b-nav-item to="/map">
           Peta
          </b-nav-item>
          <b-nav-item to="/weekly-report">
            File Laporan
          </b-nav-item>
          <b-nav-item to="/institution">
            Aparat
          </b-nav-item>
          <b-nav-item to="/village">
            Warga
          </b-nav-item>
          <b-nav-item to="/announcement">
            Pengumuman
          </b-nav-item>
          <b-nav-item to="/trajectory">
            Trajectory
          </b-nav-item>
          <b-nav-item to="/setting">
            Pengaturan
          </b-nav-item>
          <b-nav-item active v-on:click="logout()">
            Keluar
          </b-nav-item>
        </b-nav>
        <b-nav v-else>
          <b-nav-item target="_blank" href="https://1drv.ms/b/s!AscxZIjmF6VzntU7VvIOL3mskp0AMA?e=AmOZK0">
            Panduan
          </b-nav-item>
          <b-nav-item to="/login">
            Masuk
          </b-nav-item>
        </b-nav>
    </b-navbar>
    <div id="app">
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  mounted () {
  },
  computed: {
    token () {
      return this.$store.state.authentication.token
    },
    getRole () {
      return this.$store.state.authentication.role
    },
    getCompany () {
      return this.$store.state.profile.name
    }
  },
  methods: {
    logout: async function () {
      this.$store.dispatch('authentication/logout')
    }
  }
}
</script>
