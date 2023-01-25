<template>
  <div>
    <div class="content-wrapper">
      <div class="container">
        <div class="row">
          <div class="col-xl-8 stretch-card grid-margin">
            <div class="position-relative">
              <div v-if="post.length != 0">
                <img v-if="post.feature_image !== null" :src="post.feature_image" alt="banner" class="img-fluid">
                <img v-else-if="post.feature_image === undefined" src="https://via.placeholder.com/724x435" alt="">
                <img v-else src="https://via.placeholder.com/724x435" alt="">
                <div class="banner-content">
                  <div class="badge badge-danger fs-12 font-weight-bold mb-3">
                    Berita terbaru
                  </div>
                  <h1 class="mb-0"><router-link v-bind:to="`/news-detail/${slugVillage}/${post.slug}`" class="text-white text-decoration-none">{{post.title}}</router-link></h1>
                    <div class="fs-12 mb-2">
                      <span class="mr-2">{{ post.published_at | getDate }} </span>
                      {{ post.reading_time }} Menit Baca
                    </div>
                </div>
              </div>
              <div v-else>
                <img src="https://via.placeholder.com/724x435" alt="">
              </div>
            </div>
          </div>
          <div class="col-xl-4 stretch-card grid-margin">
            <div class="card bg-dark text-white">
              <div class="card-body">
                <h2>Berita Terbaru</h2>
                <div
                  class="d-flex border-bottom-blue pt-3 pb-4 align-items-center justify-content-between"
                  v-for="post in posts.slice(0, 3)"
                  v-bind:key="post.id"
                >
                  <div class="pr-3">
                    <h5><router-link v-bind:to="`/news-detail/${slugVillage}/${post.slug}`" class="text-white text-decoration-none">{{post.title}}</router-link></h5>
                    <div class="fs-12">
                      <span class="mr-2">{{ post.published_at | getDate }} </span>
                      {{ post.reading_time }} Menit Baca
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12 stretch-card grid-margin">
          <div style="width:100%">
            <div class="card">
              <div class="card-body">
                <div v-if="posts.length != 0">
                <div class="row" v-for="post in posts" v-bind:key="post.id">
                  <div class="col-sm-4 grid-margin">
                    <div class="position-relative">
                      <div class="rotate-img">
                        <img
                          v-if="post.feature_image !== null"
                          :src="post.feature_image"
                          alt="thumb"
                          class="img-fluid"
                        />
                        <img v-else src="https://via.placeholder.com/322x196" alt="">
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-8  grid-margin">
                    <h2 class="mb-2 font-weight-600">
                    <router-link v-bind:to="`/news-detail/${slugVillage}/${post.slug}`" class="text-decoration-none">{{post.title}}</router-link>
                    </h2>
                    <div class="fs-13 mb-2">
                      <span class="mr-2">{{ post.published_at | getDate }} </span>
                      {{ post.reading_time }} Menit Baca
                    </div>
                    <p class="mb-0">
                      {{post.excerpt}}
                    </p>
                  </div>
                </div>
                </div>
                <div class="mw-100" v-else>
                  <p class="text-center">Berita Tidak Tersedia</p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ghost from '@/services/Ghost'
import id from 'date-fns/locale/id'
import { format } from 'date-fns'
export default {
  data () {
    return {
      posts: [],
      slugVillage: '',
      post: {
        published_at: new Date(),
        title: '',
        feature_image: null,
        authors: [{ name: '' }],
        tags: [{ name: '' }],
        html: '',
        excerpt: ''
      }
    }
  },
  filters: {
    getDate: function (date) {
      const formattedDate = format(new Date(date), 'dd LLLL yyyy', { locale: id })
      return formattedDate
    }
  },
  mounted () {
    this.getNews()
  },
  methods: {
    getNews: async function () {
      try {
        this.slugVillage = this.$route.params.slugvillage
        this.posts = await ghost.posts.browse({ filter: `primary_author:${this.slugVillage}`, include: 'authors,tags' })
        this.post = this.posts[0]
      } catch (error) {
        this.posts = []
      }
    }
  }
}
</script>
<style scoped>
  @import "../assets/css/style.css";
</style>
