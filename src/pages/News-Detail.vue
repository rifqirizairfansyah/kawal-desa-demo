<template>
<b-container>
  <div class="about-area mt-3">
    <div class="flash-news-banner">
    <b-breadcrumb>
      <b-breadcrumb-item :href="`/#/news/${slugVillage}`">
        Beranda
      </b-breadcrumb-item>
      <b-breadcrumb-item active>{{post.title}}</b-breadcrumb-item>
    </b-breadcrumb>
    </div>
    <div class="row">
      <div class="col-lg-8">
          <!-- Trending Tittle -->
          <div class="about-right mb-90">
              <div class="section-title mb-3">
                  <h1>{{post.title}}</h1>
              </div>
              <div class="about-img">
                <img v-if="post.feature_image !== null" :src="post.feature_image" alt="">
                <img v-else src="https://via.placeholder.com/770x465" alt="">
              </div>
              <div class="about-prea">
                <p class="about-pera1 mb-25" v-html="post.html"></p>
              </div>
          </div>
        </div>
          <!-- From -->
      <div class="col-lg-4">
          <!-- Section Tittle -->
          <div class="section-tittle mb-40">
              <h3>Berita Terbaru</h3>
          </div>
          <!-- Flow Socail -->
          <div class="mb-45">
              <div>
                <b-card no-body v-for="post in posts" v-bind:key="post.id" class="m-2">
                <div>
                  <div class="float-left">
                    <b-card-img v-if="post.feature_image !== null" :src="post.feature_image" img-left class="update-news"></b-card-img>
                    <b-card-img v-else src="https://via.placeholder.com/770x465" class="update-news"></b-card-img>
                  </div>
                  <div class="float-right">
                      <router-link v-bind:to="`/news-detail/${slugVillage}/${post.slug}`" class="text-decoration-none text-left description">{{post.title}}</router-link>
                  </div>
                </div>
                </b-card>
              </div>
          </div>
      </div>
  </div>
</div>
</b-container>
</template>
<script>
import ghost from '@/services/Ghost'
import { format } from 'date-fns'
export default {
  data () {
    return {
      slug: '',
      slugvillage: '',
      posts: [],
      post: {
        published_at: new Date(),
        title: '',
        authors: [{ name: '' }],
        tags: [{ name: '' }],
        html: '',
        excerpt: ''
      }
    }
  },
  mounted () {
    this.getDetailNews()
    this.getNews()
  },
  methods: {
    getDetailNews: async function () {
      this.slug = this.$route.params.slug
      const slug = this.slug
      this.post = await ghost.posts.read({ slug, include: 'authors, tags' })
    },
    getNews: async function () {
      try {
        this.slugVillage = this.$route.params.slugvillage
        this.posts = await ghost.posts.browse({ limit: 3, filter: `primary_author:${this.slugVillage}`, include: 'authors,tags' })
      } catch (error) {
        this.posts = []
      }
    }
  },
  filters: {
    formatDates (date) {
      return format(new Date(date), 'dd MMMM yyyy')
    }
  }
}
</script>

<style scoped>
  @import "../assets/css/style.css";
  .update-news {
    display: inline-block;
    width: 120px;
    height: auto;
  }
  .description {
    display: inline-block;
    width: 75%;
  }
  ::v-deep(.kg-image) {
    max-width: 100%;
    height: auto;
  }
  >>> .kg-image {
    max-width: 100%;
    height: auto;
  }
  >>> .kg-bookmark-container{
    display: flex;
    text-decoration: none!important;
    background: hsla(0,0%,100%,.6);
    border-radius: 5px;
    box-shadow: 0 2px 6px -2px rgb(0 0 0 / 10%), 0 0 1px rgb(0 0 0 / 40%);
    overflow: hidden;
  }
  >>> .kg-bookmark-title {
    font-size: .7rem;
    line-height: .7em;
    font-weight: 600;
    color: #15171a;
  }
  >>> .kg-bookmark-description {
    display: -webkit-box;
    font-size: .7rem;
    line-height: 1.5em;
    margin-top: 3px;
    color: #626d79;
    font-weight: 400;
    max-height: 44px;
    overflow-y: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  >>> .kg-bookmark-content {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 100%;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 20px;
  }
  >>> .fluid-width-video-container {
    flex-grow: 1;
    width: 100%;
  }
  >>> .kg-embed-card iframe {
    width:100%;
    height: 300px;
  }
  >>> .fluid-width-video-wrapper {
    width: 100%;
    position: relative;
    padding: 0;
  }
  >>> .kg-bookmark-metadata {
    display: flex;
    align-items: center;
    margin-top: 22px;
    width: 100%;
    color: #394047;
    font-size: .7rem;
    font-weight: 500;
  }
  >>> .kg-bookmark-icon {
    width: 20px;
    height: 20px;
    margin-right: 6px;
  }
  >>> .kg-bookmark-author {
    display: inline;
  }
  >>> .kg-bookmark-card {
    position: relative;
    width: 100%;
  }
  >>> .kg-bookmark-thumbnail {
    position: relative;
    flex-grow: 1;
    min-width: 33%;
  }
  >>> .kg-bookmark-thumbnail img {
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 0 4px 4px 0;
  }
  >>> .kg-gallery-image img {
    max-width: 100%;
    height: auto;
  }
  .profile-pic {
    display: inline;
    margin: 0 auto;
    margin-left: -25%;
    height: 100%;
    width: auto;
  }
  >>> .ytp-cued-thumbnail-overlay-image {
      background-size: cover;
      -moz-background-size: cover;
      -webkit-background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      width: 100%;
      height: 100%;
      position: absolute;
  }
</style>
