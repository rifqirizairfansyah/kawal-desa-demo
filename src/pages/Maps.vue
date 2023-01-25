<template>
  <div class="body">
    <div class="detail-left">
      <div class="detail-box">
      <b-card
          v-if="showDetail"
          thead-class="hidden_header"
          img-alt="Image"
          img-top
          tag="article"
          style="min-width:15em; max-width: 20rem; max-height: 50rem; margin-top: 5px ;"
          class="mb-2"
        >
          <b-card-img :src="`http://absensi-selfie.pptik.id/` + detailUser.image" alt="Image" width="400" class="img-fluid pointer"></b-card-img>
          <b-btn-close v-on:click="closeDetail()" style="background-color: red">
            <h4> x </h4>
          </b-btn-close>

          <b-card-body>
            <b-card-title> {{ detailUser.name }} </b-card-title>
            <br>
            <b-card-sub-title v-if="detailUser.description === undefined" class="mb-2"> - </b-card-sub-title>
            <b-card-sub-title v-else class="mb-2"> {{ detailUser.description }} </b-card-sub-title>
          </b-card-body>
          <b-card-footer>{{ detailUser.time | getDate}}</b-card-footer>
         </b-card>
      </div>
    </div>
    <div v-if="!mapId" style="position: absolute; z-index: 999; right: 0; margin: 5px 0px 5px 5px;" class="col-md-12 col-lg-6 col-xl-3">
      <b-button
        block variant="primary"
        @click="collapseVisible = !collapseVisible"
        :class="'collapsed btn-search'"
        :aria-expanded="collapseVisible ? 'true' : 'false'"
        aria-controls="collapse-3"
      >
        <b v-if="!collapseVisible">Buka Panel</b>
        <b v-else>Tutup Panel</b>
      </b-button>
      <b-collapse id="collapse-3" v-model="collapseVisible">
        <b-card-group deck>
          <b-card>
            <b-tabs content-class="mt-3">
              <b-tab title="Laporan" active>
                <combobox-selected type="report" />
                <b-button :disabled="userData.length === 0 && loading" type="submit" block variant="primary" class="m10" v-on:click="getReport()">
                  <b-spinner class="m-1" small v-if="userData.length === 0 && loading" variant="light" label="Text Centered"></b-spinner>
                  <b v-else>Cek Data</b>
                </b-button>
                <br>
                <b-alert :show="userData.length === 0 && showAlert && loading === false" variant="danger" >
                  <center>
                    <b>Data Tidak Ditemukan</b>
                  </center>
                </b-alert>
              </b-tab>
              <b-tab title="Batas Desa">
                <b-button block variant="primary" v-model="addMapBoundaries" v-on:click="editMapBoundaries()">{{ mapBoundariesButtonTxt }}</b-button>
                <b-button v-if="this.mapBoundariesHasExist.latlngs.length !== 0" block variant="danger" v-on:click="deleteMapBoundaries()">Hapus</b-button>
                <template v-if="addMapBoundaries === true && this.mapBoundaries.latlngs.length !== 0">
                  <b-button v-if="this.mapBoundariesHasExist.latlngs.length === 0" block variant="success" v-on:click="saveMapBoundaries()">Simpan</b-button>
                </template>
              </b-tab>
            </b-tabs>
          </b-card>
        </b-card-group>
      </b-collapse>
    </div>
    <l-map class="mini-map" :zoom.sync="zoom" :center="[center[1], center[0]]" :max-zoom="maxZoom" :options="{disableDoubleClickZoom: true}" @click="addBoundaries">
      <l-tile-layer url="http://vectormap.pptik.id/styles/klokantech-basic/{z}/{x}/{y}.png"></l-tile-layer>
      <!-- :icon di l marker ga bisa pake file .svg, entah kenapa -->
      <l-polygon
        v-if="addMapBoundaries"
        :lat-lngs="mapBoundaries.latlngs"
        :color="mapBoundaries.color"
      />
      <l-polygon
        v-if="showLandBoundaries"
        :lat-lngs="landBoundaries.latlngs"
        :color="landBoundaries.color"
      />
      <l-marker-cluster :options="clusterOptions">
        <l-marker v-for="marker in userData" :key="marker._id" :lat-lng="[marker.LAT, marker.LONG]" @click="loadDetail(marker)">
        </l-marker>
      </l-marker-cluster>
    </l-map>
  </div>
</template>
<script>
import { format } from 'date-fns'
import id from 'date-fns/locale/id'
import ReportService from '@/services/ReportService'
import MapService from '@/services/MapService'
import ComboboxComponent from '@/components/_SelectedComboBox'
import L from 'leaflet'
import { LMap, LTileLayer, LMarker, LPopup, LPolygon } from 'vue2-leaflet'
import Vue2LeafletMarkercluster from 'vue2-leaflet-markercluster'
import VueSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.imagePath = ''
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'Maps',
  components: {
    LPolygon,
    VueSelect,
    'combobox-selected': ComboboxComponent,
    'l-map': LMap,
    'l-tile-layer': LTileLayer,
    'l-marker': LMarker,
    'l-popup': LPopup,
    'l-marker-cluster': Vue2LeafletMarkercluster
  },
  computed: {
    role () {
      return this.$store.state.authentication.role
    },
    mapId () {
      return this.$route.params.id
    }
  },
  data () {
    return {
      zoom: 8,
      minZoom: 8,
      maxZoom: 18,
      center: [107.668887, -7.090911],
      url: 'http://vectormap.pptik.id/styles/klokantech-basic/{z}/{x}/{y}.png',
      clusterOptions: {},
      userData: [],
      selected: {
        additional: {
          date: undefined,
          minified: true
        }
      },
      showAlert: false,
      units: [],
      companies: [],
      data: [],
      showDetail: false,
      detailUser: {
        'name': undefined,
        'description': undefined,
        'image': undefined,
        'time': undefined
      },
      areaData: {
        'JAWA BARAT': [
          'KOTA BANDUNG',
          'KOTA CIMAHI'
        ]
      },
      // Map Boundary
      mapBoundaryGuid: null,
      mapBoundaries: {
        latlngs: [],
        color: '#007bff'
      },
      mapBoundariesHasExist: {
        latlngs: [],
        color: '#007bff'
      },
      mapBoundariesCount: 0,
      loading: false,
      collapseVisible: true,
      addMapBoundaries: false,
      mapBoundariesExist: false,
      mapBoundariesButtonTxt: 'Tambah Batas Desa',
      // Land Boundary
      landBoundaries: {
        latlngs: [],
        color: '#007bff'
      },
      showLandBoundaries: false
    }
  },
  created () {
    this.mapBoundariesExist = false
  },
  mounted () {
    this.selected.additional.date = format(new Date(), 'yyyy-MM-dd')
    this.getMapBoundaries()
    if (this.mapId) {
      this.getReportById()
    } else {
      this.addMapBoundaries = false
    }
  },
  filters: {
    getDate: function (date) {
      date = date.toString().length === 10 ? parseInt(date) * 1000 : date
      const formattedDate = format(date, 'dd LLLL yyyy HH:mm:ss', { locale: id })
      return formattedDate
    }
  },
  methods: {
    addBoundaries: function (add) {
      if (this.addMapBoundaries) {
        this.mapBoundaries.latlngs.push(add.latlng)
      }
    },
    editMapBoundaries: async function () {
      this.addMapBoundaries = !this.addMapBoundaries
      this.addMapBoundaries ? this.mapBoundariesButtonTxt = 'Kembali' : (this.mapBoundariesExist) ? this.mapBoundariesButtonTxt = 'Lihat Batas Desa' : this.mapBoundariesButtonTxt = 'Tambah Batas Desa'
    },
    getReportById: async function () {
      try {
        const response = await ReportService.fetchDetailReport(this.mapId)
        this.landBoundaries.latlngs = response.data.data.MAP_BOUNDARIES
        this.showLandBoundaries = true
      } catch (error) {
        this.landBoundaries.latlngs = []
      }
    },
    deleteMapBoundaries: async function () {
      try {
        await MapService.deleteMapBoundary(this.mapBoundaryGuid)
        this.getMapBoundaries()
        this.clearMap()
        this.showToast('Berhasil Dihapus', 'Berhasil menghapus batas desa', 'success')
      } catch (error) {
        this.showToast('Gagal Dihapus', 'Berhasil gagal batas desa', 'danger')
      }
    },
    saveMapBoundaries: async function () {
      const polygonList = this.mapBoundaries.latlngs
      const polygon = polygonList.map(poly => ({
        lat: poly.lat.toString(),
        lng: poly.lng.toString()
      }))
      const save = await MapService.addMapBoundary({'map_boundaries': polygon})
      save ? this.showToast('Berhasil Disimpan', 'Berhasil menyimpan batas desa', 'success') : this.showToast('Gagal Disimpan', 'Gagal menyimpan batas desa', 'danger')
      this.getMapBoundaries()
    },
    clearMapBoundaries: async function () {
      this.mapBoundaries.latlngs = []
    },
    showToast: function (title, context, type) {
      this.$bvToast.toast(context, {
        title: title,
        variant: type,
        solid: true
      })
    },
    getMapBoundaries: async function () {
      try {
        if (this.mapBoundaries.latlngs.length === 0) {
          const response = await MapService.getMapBoundary()
          const mapBoundary = response.data.data.MAP_BOUNDARIES
          this.mapBoundaryGuid = response.data.data.BOUNDARIES_GUID
          this.mapBoundariesExist = mapBoundary.length !== 0 ? this.addMapBoundaries = true : this.addMapBoundaries = false
          if (this.mapBoundariesExist) {
            this.mapBoundariesButtonTxt = 'Kembali'
            this.mapBoundariesHasExist.latlngs.push(mapBoundary)
            this.mapBoundaries.latlngs.push(mapBoundary)
          } else {
            return null
          }
        } else {
          this.mapBoundaries.latlngs = []
        }
      } catch (error) {
        this.mapBoundaries.latlngs = []
      }
    },
    getReport: async function () {
      try {
        this.selected = this.$store.state.combobox.selected
        this.loading = true
        this.userData = []
        const response = await ReportService.getReports(this.selected, this.role)
        this.userData = response.data.data.reports
        if (this.userData.length === 0) {
          this.showAlert = true
          this.loading = false
        } else {
          this.showAlert = true
          this.loading = false
        }
      } catch (error) {
        this.showToast('Gagal Memuat Report', 'Gagal memuat report', 'danger')
      }
    },
    loadDetail: async function (param) {
      try {
        this.showDetail = false
        const response = await ReportService.fetchDetailReport(param._id)
        let data = response.data.data
        this.detailUser = {
          'name': data.NAME,
          'description': data.DESCRIPTION,
          'image': data.IMAGE,
          'time': data.TIMESTAMP
        }
        this.showDetail = true
      } catch (error) {
        this.showToast('Gagal Memuat Detail', 'Gagal memuat detail', 'danger')
      }
    },
    closeDetail () {
      this.showDetail = false
      this.detailUser = {
        'name': undefined,
        'description': undefined,
        'image': undefined,
        'time': undefined
      }
    },
    clearMap () {
      this.mapBoundariesHasExist.latlngs = []
      this.mapBoundaries.latlngs = []
    }
  }
}
</script>
<style>
@import "leaflet/dist/leaflet.css";
@import "leaflet.markercluster/dist/MarkerCluster.css";
@import "leaflet.markercluster/dist/MarkerCluster.Default.css";

.btn-search {
  margin-bottom: 5px;
}
.mini-map {
  height:105vh !important;
}
.detail-left {
  width: 270px;
  position: absolute;
  z-index: 999;
  left: 50px;
}
.close {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
}
.selectedbox-right {
  display: block;
  position: absolute;
  top: 60px;
  right: 20px;
  width: 300px;
  z-index: 999;
}
.hidden_header {
  display: none;
}
.transition_backdrop{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1040;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    opacity: .5;
    transition: opacity 1s linear;
}
</style>
