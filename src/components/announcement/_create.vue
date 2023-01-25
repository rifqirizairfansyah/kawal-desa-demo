<template>
  <b-form @submit="onSubmit">
    <b-form-group
        id="input-group-1"
        label="Judul"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.title"
          type="text"
          placeholder="Masukan Judul"
          required
        ></b-form-input>
    </b-form-group>
    <b-form-group
      id="input-group-2"
      label="Konten Pengumuman"
      label-for="input-2"
    >
      <b-form-textarea
        id="input-2"
        v-model="form.description"
        placeholder="Masukkan Konten Pengumuman"
        rows="3"
        max-rows="6"
        no-resize
      ></b-form-textarea>
    </b-form-group>
    <b-form-group
      id="input-group-3"
      label="Role"
      label-for="input-2"
    >
      <b-form-select v-model="form.role" :options="roleOptions"></b-form-select>
    </b-form-group>
    <b-button type="submit" variant="primary">Simpan</b-button>
  </b-form>
</template>
<script>
import AnnouncementService from '@/services/AnnouncementService'
export default {
  data () {
    return {
      form: {
        title: '',
        description: '',
        role: ''
      },
      roleOptions: ['aparat', 'warga']
    }
  },
  components: {},
  created () {},
  mounted () {},
  methods: {
    onSubmit: async function () {
      await AnnouncementService.add(this.form)
      this.$router.go(0)
    }
  }
}
</script>
