<template>
<div>
  <div id="hero-area" class="hero-area-bg" :style="{ backgroundImage: `url(http://absensi-selfie.pptik.id/data/profile/image/${previewBackground})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }" >
    <div class="overlay"></div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 col-sm-12 text-center">
          <div class="contents">
            <h5 class="script-font wow fadeInUp">Selamat Datang Di</h5>
            <h2 class="head-title wow fadeInUp">{{profile.name}}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
  <section id="services" class="services section-padding">
    <h2 class="section-title wow flipInX" data-wow-delay="0.4s">Tentang Desa</h2>
    <div class="container">
      <div class="services-content">
        <p class="text-center blockquote" style="font-size: 15px">{{profile.description}}</p>
      </div>
    </div>
  </section>
  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-5">
    <h3 class="section-title wow flipInX">Berita Terbaru</h3>
    <div class="container">
      <div class="row">
        <div class="col-md-4 col-lg-4 col-sm-4" v-for="post in posts.slice(0,6)" v-bind:key="post.id">
          <b-card-group deck>
            <b-card v-if="post.feature_image !== null" :img-src="post.feature_image" img-alt="Card image" img-top>
              <b-card-title>
                 <router-link v-bind:to="`/news-detail/${slugVillage}/${post.slug}`" class="text-decoration-none">{{post.title}}</router-link>
              </b-card-title>
              <b-card-text>
                {{post.excerpt}}
              </b-card-text>
            </b-card>
            <b-card v-else img-src="https://via.placeholder.com/322x196" img-alt="Card image" img-top>
              <b-card-title>
                <router-link v-bind:to="`/news-detail/${slugVillage}/${post.slug}`" class="text-decoration-none">{{post.title}}</router-link>
              </b-card-title>
              <b-card-text>
                {{post.excerpt}}
              </b-card-text>
            </b-card>
          </b-card-group>
        </div>
      </div>
    </div>
  </div>
  <footer class="footer-area section-padding mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="footer-text text-center wow fadeInDown">
            <p>Copyright © 2021 PPTIK ITB</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>
</template>
<script>
import CompanyService from '@/services/CompanyService'
import ghost from '@/services/Ghost'
import id from 'date-fns/locale/id'
import { format } from 'date-fns'
export default {
  name: 'LandingPage',
  data () {
    return {
      posts: [],
      companyGuid: '',
      profile: {
        name: '',
        slug: '',
        description: ''
      },
      previewBackground: ''
    }
  },
  computed: {},
  mounted () {
    this.getCompanyProfile()
    this.getNews()
  },
  filters: {
    getDate: function (date) {
      const formattedDate = format(new Date(date), 'dd LLLL yyyy', { locale: id })
      return formattedDate
    }
  },
  methods: {
    getNews: async function () {
      try {
        this.slugVillage = this.$route.params.slugVillage
        this.posts = await ghost.posts.browse({ filter: `primary_author:${this.slugVillage}`, include: 'authors,tags' })
      } catch (error) {
        this.posts = []
      }
    },
    getCompanyProfile: async function () {
      try {
        this.companyGuid = this.$route.params.companyGuid
        const response = await CompanyService.getCompanyProfileByGuid({'company': this.companyGuid})
        if (response.data.data !== null) {
          this.profile.name = response.data.data.NAME
          this.profile.slug = response.data.data.SLUG
          this.profile.description = response.data.data.DESCRIPTION
          this.previewBackground = response.data.data.IMAGE
        } else {
          this.profile.name = ''
          this.profile.slug = 'kawal-desa'
          this.profile.description = ''
          this.previewBackground = ''
        }
      } catch (error) {
        this.profile.name = ''
        this.profile.slug = 'kawal-desa'
        this.profile.description = ''
        this.previewBackground = ''
      }
    }
  }
}
</script>
<style scoped>
  @import "../assets/css/main.css";
</style>
