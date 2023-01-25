<template>
  <b-container>
    <div class="posts m10">
      <b-card title="Pengumuman">
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Pengumuman" active lazy>
              <announcement-panel />
            </b-tab>
            <b-tab title="Tambah Pengumuman" lazy>
              <create-panel />
            </b-tab>
          </b-tabs>
        </b-card>
      </b-card>
    </div>
  </b-container>
</template>
<script>
import _Announcement from '@/components/announcement/_announcement.vue'
import _CreateAnnouncement from '@/components/announcement/_create.vue'
export default {
  name: 'Announcement',
  data () {
    return {}
  },
  components: {
    'announcement-panel': _Announcement,
    'create-panel': _CreateAnnouncement
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>
