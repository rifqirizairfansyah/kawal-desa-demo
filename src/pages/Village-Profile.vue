<template>
  <div>
    <section id="hero">
      <div class="container" style="height: 630px">
        <div class="row">
          <div class="col-lg-7 pt-5 pt-lg-0 order-2 order-lg-1 d-flex align-items-center">
            <div data-aos="zoom-out">
              <h1>Kawal Desa</h1>
              <h2>Aplikasi/platform yang dipergunakan untuk kebutuhan tatakelola di desa maupun interaksi antara warga dan aparat</h2>
              <div class="text-center text-lg-left">
                <a href="#" v-b-modal.my-modal class="btn-get-started scrollto">Unduh Aplikasi</a>
              </div>
            </div>
          </div>
          <b-modal centered hide-footer hide-header size="xl" id="my-modal">
          <h5 class="modal-title text-center">Unduh Kawal Desa</h5>
            <div class="row">
              <div class="col-md-6 mt-3 mb-3">
                <b-card title="Aparat">
                  <b-card-text>
                    Memiliki fitur presensi aparat dan melaporkan kegiatan harian fitur desiminasi program, jurnal kawal desa,<i> market place</i>, buku tamu, dokumentasi pariwisata
                  </b-card-text>
                  <b-button href="https://play.google.com/store/apps/details?id=id.pptik.kawal_desa_aparat" variant="outline-success">Unduh</b-button>
                </b-card>
              </div>
              <div class="col-md-6 mt-3 mb-3">
                <b-card title="Warga">
                  <b-card-text>
                    Diperuntukan bagi warga desa yang ingin berinteraksi dan melaporkan kegiatan di desa, dokumentasi otomatis, dan langsung masuk ke webiste dan sosial media, buku tamu desa
                  </b-card-text>
                  <b-button href="https://play.google.com/store/apps/details?id=id.pptik.kawaldesa" variant="outline-success">Unduh</b-button>
                </b-card>
              </div>
            </div>
          </b-modal>
          <div class="col-lg-5 order-1 order-lg-2 hero-img" data-aos="zoom-out" data-aos-delay="300">
            <img src="../../static/hero-image-2.png" class="img-fluid animated" alt="">
          </div>
        </div>
      </div>
    </section><!-- End Hero -->
    <main id="main">
      <!-- ======= About Section ======= -->
      <section id="about" class="about">
        <div class="container-fluid">

          <div class="row">
            <div class="col-xl-5 col-lg-6 d-flex justify-content-center align-items-stretch" data-aos="fade-right">
              <div class="video-box">
                <a href="#" v-b-modal.modal-center class="venobox play-btn mb-4" data-vbtype="video" data-autoplay="true"></a>
              </div>
            </div>

            <b-modal id="modal-center" hide-footer hide-header centered title="BootstrapVue">
              <b-button block href="https://www.youtube.com/watch?v=Wif9VNzkWSk&list=PLxZsz6gfD39lRwxGlw0EHMA8bIyeeZsZb&index=2" variant="primary">Kawal Desa Warga</b-button>
              <b-button block href="https://www.youtube.com/watch?v=m-WpOJ9ZFd0&list=PLxZsz6gfD39lRwxGlw0EHMA8bIyeeZsZb&index=1" variant="primary">Kawal Desa Aparat</b-button>
              <b-button block href="https://www.youtube.com/watch?v=4JeidU7GJaw&list=PLxZsz6gfD39lRwxGlw0EHMA8bIyeeZsZb&index=3" variant="primary">Implementasi Kawal Desa</b-button>
            </b-modal>

            <div class="col-xl-7 col-lg-6 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5" data-aos="fade-left">
              <h3>Keunggulan Kawal Desa</h3>
              <p>Aplikasi ini sangat memudahkan aparat desa untuk menyebarkan informasi terkait desa di dalam aplikasi sehingga interaksi antara warga dan aparat semakin praktis.</p>

              <div class="icon-box" data-aos="zoom-in" data-aos-delay="100">
                <div class="icon"><i class="bx bx-camera"></i></div>
                <h4 class="title"><a href="">Presensi</a></h4>
                <p class="description">Memudahkan para aparat untuk mengisi data kehadiran setiap harinya.</p>
              </div>

              <div class="icon-box" data-aos="zoom-in" data-aos-delay="200">
                <div class="icon"><i class="bx bx-data"></i></div>
                <h4 class="title"><a href="">Laporan Warga</a></h4>
                <p class="description">Ketika ada acara di sebuah desa, warga bisa mengirinkan dokumentasi kegiatanya di dalam aplikasi yang nantinya bisa dilihat oleh aparat di dalam website kawal desa.</p>
              </div>

              <div class="icon-box" data-aos="zoom-in" data-aos-delay="300">
                <div class="icon"><i class="bx bx-user-check"></i></div>
                <h4 class="title"><a href="">Manajemen Desa</a></h4>
                <p class="description">Aplikasi ini bisa juga digunakan untuk tata kelola lahan di desa.</p>
              </div>

            </div>
          </div>

        </div>
      </section><!-- End About Section -->
      <section id="features" class="features">
      <div class="container">

        <div class="section-title" data-aos="fade-up">
          <h2>Fitur</h2>
          <p>Fitur Kawal Desa</p>
        </div>

        <div class="row" data-aos="fade-left">
          <div class="col-lg-3 col-md-4">
            <div class="icon-box" data-aos="zoom-in" data-aos-delay="50">
              <i class="bx bx-camera-home" style="color: #ffbb2c;"></i>
              <h3>Presensi Warga</h3>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 mt-4 mt-md-0">
            <div class="icon-box" data-aos="zoom-in" data-aos-delay="100">
              <i class="bx bx-data" style="color: #5578ff;"></i>
              <h3>Laporan Warga</h3>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 mt-4 mt-md-0">
            <div class="icon-box" data-aos="zoom-in" data-aos-delay="150">
              <i class="bx bx-location-plus" style="color: #e80368;"></i>
              <h3>Lokasi Presensi</h3>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 mt-4 mt-lg-0">
            <div class="icon-box" data-aos="zoom-in" data-aos-delay="200">
              <i class="bx bx-user-check" style="color: #e361ff;"></i>
              <h3>Manajemen Warga</h3>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 mt-4">
            <div class="icon-box" data-aos="zoom-in" data-aos-delay="250">
              <i class="bx bx-user-check" style="color: #47aeff;"></i>
              <h3>Manajemen Aparat</h3>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 mt-4">
            <div class="icon-box" data-aos="zoom-in" data-aos-delay="300">
              <i class="bx bx-building-house" style="color: #ffa76e;"></i>
              <h3>Lokasi Rumah Warga</h3>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 mt-4">
            <div class="icon-box" data-aos="zoom-in" data-aos-delay="350">
              <i class="bx bx-map-alt" style="color: #11dbcf;"></i>
              <h3>Batas Desa</h3>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 mt-4">
            <div class="icon-box" data-aos="zoom-in" data-aos-delay="400">
              <i class="bx bx-mobile" style="color: #29cc61;"></i>
              <h3>Monitoring</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Features Section -->
    <!-- ======= Counts Section ======= -->
    <section id="counts" class="counts">
      <div class="container">
        <div class="row" data-aos="fade-up">
          <div class="col-lg-4 col-md-6">
            <div class="count-box">
              <i class="bx bx-building-house"></i>
              <span data-toggle="counter-up">7</span>
              <p>Desa</p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 mt-5 mt-md-0">
            <div class="count-box">
              <div class="icon"><i class="bx bx-user-check"></i></div>
              <span data-toggle="counter-up">2.107</span>
              <p>Pengguna</p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 mt-5 mt-lg-0">
            <div class="count-box">
              <i class="bx bx-camera-home" style="color: #fff;"></i>
              <span data-toggle="counter-up">75.055</span>
              <p>Presensi</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- End Counts Section -->
    <section id="Desa" class="gallery">
      <div class="container">
        <div class="section-title" data-aos="fade-up">
          <h2>Desa</h2>
          <p>Daftar Desa</p>
        </div>
        <vue-select
        class="mb-5"
        v-model="selectedCompany"
        :options="listRegisteredCompany"
        label="COMPANY_NAME"
        :reduce="COMPANY => COMPANY.COMPANY_GUID"
        @input="getCompanyProfile()"
        />
        <b-row>
          <b-col>
            <div class="col-sm-12 image-container">
              <div v-if="previewBackground !== undefined" class="preview" :style="{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(http://absensi-selfie.pptik.id/data/profile/image/${previewBackground})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }" />
              <div v-else class="preview" />
              <div class="title-image-preview text-white">{{ profile.name }}</div>
              <div class="deskription-image-preview text-white">{{ profile.description }}</div>
            </div>
          </b-col>
          <b-col>
            <div>
              <h2>{{ profile.name }}</h2>
              <p>{{profile.description}}</p>
              <router-link :to="`/landing-page/${profile.slug}/${profile.guid}`" class="btn btn-primary text-decoration-none">Jelajahi Desa</router-link>
            </div>
          </b-col>
        </b-row>
      </div>
    </section><!-- End Gallery Section -->
    <!-- ======= F.A.Q Section ======= -->
    <section id="faq" class="faq section-bg">
      <div class="container">

        <div class="section-title" data-aos="fade-up">
          <h2>F.A.Q</h2>
          <p>Pertanyaan Kawal Desa</p>
        </div>
        <div class="faq-list">
          <ul>
            <li data-aos="fade-up">
              <i class="bx bx-help-circle icon-help"></i>
              <a v-b-toggle.collapse-1 href="#faq-list-1">Bagaiman cara mendapatkan kode <i><b>registrasi</b></i>? <i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i></a>
              <b-collapse id="collapse-1">
                <p>
                  Silahkan mengubungi admin di nomor +62 896-8114-4333.
                </p>
              </b-collapse>
            </li>

            <li data-aos="fade-up" data-aos-delay="100">
              <i class="bx bx-help-circle icon-help"></i>
              <a v-b-toggle.collapse-2>Bagaimana jika hasil <i>report</i> <b>tidak terkirim</b>? <i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i></a>
              <b-collapse id="collapse-2">
                <p>
                  - Cek koneksi internet anda <br>
                  - Jika masih belum bisa terkirim silahkan <i>update</i> aplikasi di playstore. <br>
                  - Hubungi Admin di nomor +62 896-8114-4333
                </p>
              </b-collapse>
            </li>

            <li data-aos="fade-up" data-aos-delay="200">
              <i class="bx bx-help-circle icon-help"></i>
              <a v-b-toggle.collapse-3>Bagaimana jika saat akan mengirimkan <i>report</i> tapi kolom “<i><b>type repot</b></i>” tidak muncul? <i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i></a>
              <b-collapse id="collapse-3">
                <p>
                  Silahkan update aplikasi di google playstore.
                </p>
              </b-collapse>
            </li>

            <li data-aos="fade-up" data-aos-delay="300">
              <i class="bx bx-help-circle icon-help"></i>
              <a v-b-toggle.collapse-4>Bagaimana jika hasil <i><b>report</b></i> tidak muncul di <i><b>histori</b></i> ? <i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i></a>
              <b-collapse id="collapse-4">
                <p>
                  Tunggu hingga 2 menit.
                </p>
              </b-collapse>
            </li>

            <li data-aos="fade-up" data-aos-delay="400">
              <i class="bx bx-help-circle icon-help"></i>
              <a v-b-toggle.collapse-5>Bagimana <i><b>registrasi</b></i> <b>gagal</b>? <i class="bx bx-chevron-down icon-show"></i><i class="bx bx-chevron-up icon-close"></i></a>
              <b-collapse id="collapse-5">
                <p>
                  - Check kembali kode <i>registrasi</i> yang diberikan <br>
                  - Pastikan sudah memilih unitnya
                </p>
              </b-collapse>
            </li>

          </ul>
        </div>

      </div>
    </section><!-- End F.A.Q Section -->
    <!-- ======= Testimonials Section ======= -->
    <section id="testimonials" class="testimonials">
      <div class="container">
        <div class="owl-carousel testimonials-carousel" data-aos="zoom-in">
          <div class="testimonial-item">
            <h3>DAFTAR DESA</h3>
            <p>
              <i class="bx bxs-quote-alt-left quote-icon-left"></i>
                Rasakan kenyamanan saat mengatur desa, berita desa serta batas desa
              <i class="bx bxs-quote-alt-right quote-icon-right"></i>
            </p>
            <b-button pill to="/registration">Daftar Sekarang</b-button>
          </div>
        </div>
      </div>
    </section>
    <!-- End Testimonial Section -->
    <!-- ======= Contact Section ======= -->
    <section id="contact" class="contact">
      <div class="container">

        <div class="section-title" data-aos="fade-up">
          <h2>Kontak</h2>
          <p>Kontak Kami</p>
        </div>

        <div class="row">

          <div class="col-lg-4" data-aos="fade-right" data-aos-delay="100">
            <div class="info">
              <div class="address">
                <i class="bx bx-map" style="color: #3f43fd;"></i>
                <h4>Location:</h4>
                <p>Jl. Punclut No.516 Ciumbuleuit, Kec. Cidadap, Kota Bandung, Jawa Barat 40142</p>
              </div>

              <div class="email">
                <i class="bx bx-mail-send" style="color: #3f43fd;"></i>
                <h4>Email:</h4>
                <p>itb.pptik@gmail.com</p>
              </div>

              <div class="phone">
                <i class="bx bx-phone-call" style="color: #3f43fd;"></i>
                <h4>Call:</h4>
                <p>+62 896 8114 4333 (WhatsApp)</p>
              </div>

            </div>

          </div>

          <div class="col-lg-8 mt-5 mt-lg-0" @submit.prevent="onSubmit" data-aos="fade-left" data-aos-delay="200">
            <form role="form" class="php-email-form">
              <div class="form-row">
                <div class="col-md-6 form-group">
                  <input type="text" name="from_name" class="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" />
                  <div class="validate"></div>
                </div>
                <div class="col-md-6 form-group">
                  <input type="email" name="email" class="form-control" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" />
                  <div class="validate"></div>
                </div>
              </div>
              <div class="form-group">
                <textarea class="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea>
                <div class="validate"></div>
              </div>
              <input type="hidden" class="form-control" name="to_name" value="PPTIK ITB"/>
              <div class="mb-3">
                <div class="loading">Loading</div>
                <div class="error-message"></div>
                <div class="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div class="text-center"><button v-b-modal.success type="submit" value="Send">Kirim</button></div>
            </form>
          </div>
        </div>
      </div>
    </section><!-- End Contact Section -->
    </main>
    <b-modal centered hide-footer hide-header id="success">Berhasil Kirim Email!</b-modal>
  </div>
</template>
<script>
import CompanyService from '@/services/CompanyService'
import emailjs from 'emailjs-com'
import AOS from 'aos'
import VueSelect from 'vue-select'
import 'aos/dist/aos.css'
import 'vue-select/dist/vue-select.css'
export default {
  created () {
    AOS.init()
    this.getRegisteredCompany()
  },
  components: {
    VueSelect
  },
  data () {
    return {
      listRegisteredCompany: [],
      selectedCompany: undefined,
      selected: {
        additional: {
          'app-type': 'kawal-desa'
        }
      },
      profile: {
        name: 'Nama Desa',
        guid: '',
        description: 'Deskripsi Desa',
        image: null,
        slug: 'kawal-desa'
      },
      previewBackground: undefined,
      contactUs: {
        to_name: 'PPTIK ITB',
        email: null,
        from_name: null,
        message: null
      }
    }
  },
  computed: {
  },
  methods: {
    getRegisteredCompany: async function () {
      try {
        const response = await CompanyService.getRegisteredCompany(this.selected)
        this.listRegisteredCompany = response.data.data
      } catch (error) {
        this.listRegisteredCompany = []
      }
    },
    onSubmit: (e) => {
      emailjs.sendForm('service_t0l6ne1', 'template_2mmay7e', e.target, 'user_DvRU5QWIIqktS4quJ8HeH')
        .then((result) => {
        }, (error) => {
          console.log('FAILED...', error)
        })
    },
    getCompanyProfile: async function () {
      try {
        const response = await CompanyService.getCompanyProfileByGuid({'company': this.selectedCompany})
        if (response.data.data !== null) {
          this.profile.name = response.data.data.NAME
          this.profile.guid = response.data.data.COMPANY_GUID
          this.profile.slug = response.data.data.SLUG
          this.profile.description = response.data.data.DESCRIPTION
          this.previewBackground = response.data.data.IMAGE
        } else {
          this.profile.name = ''
          this.profile.slug = 'kawal-desa'
          this.profile.guid = ''
          this.profile.description = ''
          this.previewBackground = ''
        }
      } catch (error) {
        this.profile.name = ''
        this.profile.slug = 'kawal-desa'
        this.profile.description = ''
        this.profile.guid = ''
        this.previewBackground = ''
      }
    }
  }
}
</script>
<style scoped>
  @import '../../static/css/style.css';
  @import '../../static/boxicons/css/boxicons.min.css';
  .preview {
    background-color: #DEE2E6;
    display: block;
    max-width: 460px;
    height: 300px;
  }
  .deskription-image-preview {
    position: absolute;
    font-family: 'RobotoRegular';
    max-width: 260px;
    height: 100px;
    top: 160px;
    font-size: 10px;
    left: 50px;
    color: black;
  }
  .title-image-preview {
    font-family: 'RobotoBold';
    position: absolute;
    max-width: 400px;
    font-size: 1.3em;
    top: 120px;
    left: 50px;
    color: black;
  }
</style>
