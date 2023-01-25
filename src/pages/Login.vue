<template>
  <b-container>
    <div class="login-box">
      <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
      <b-card>
        <b-form v-on:submit.prevent="onSubmit">
          <b-form-group
            id="input-group-1"
            label="Email:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.EMAIL"
              type="text"
              required
              placeholder="Enter Email"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Password:" label-for="input-2">
            <b-form-input
              id="input-2"
              type="password"
              v-model="form.PASSWORD"
              required
              placeholder="Enter Password"
            ></b-form-input>
          </b-form-group>
          <b-spinner class="m-1" small v-if="true" variant="light" label="Text Centered"></b-spinner>
          <b-button v-else type="submit" variant="primary">Login</b-button>
          <b-button :disabled="loading === true" type="submit" block variant="primary" class="m10">
            <b-spinner class="m-1" small v-if="loading === true" variant="light" label="Text Centered"></b-spinner>
            <b v-else>Masuk</b>
          </b-button>
        </b-form>
      </b-card>
    </div>
  </b-container>
</template>
<script>
import AuthService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      form: {
        EMAIL: undefined,
        PASSWORD: undefined
      },
      submit: false,
      loading: false
    }
  },
  computed: {
    loggingIn () {
      return this.$store.state.authentication.status.loggingIn
    },
    alert () {
      return this.$store.state.alert
    },
    getCompany () {
      return this.$store.state.profile.name
    }
  },
  created () {
    this.$store.dispatch('clear')
    this.$store.dispatch('authentication/logout')
  },
  methods: {
    onSubmit (evt) {
      this.login()
    },
    login: async function () {
      try {
        const dataForm = {
          email: this.form.EMAIL,
          password: this.form.PASSWORD
        }
        this.loading = true
        const response = await AuthService.login(dataForm)
        if (response.status === 200 && this.loading === true) {
          const localToken = response.data.data.token
          const localRole = response.data.data.role
          this.$store.dispatch('authentication/login', { localToken, localRole })
          this.loading = false
        } else {
          this.$store.dispatch('authentication/failed', 'Email/Password Salah')
          this.loading = false
        }
      } catch (error) {
        this.$store.dispatch('authentication/failed', 'Email/Password Salah')
        this.loading = false
      }
    }
  }
}
</script>
<style>
  .login-box {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 350px;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  }
</style>
