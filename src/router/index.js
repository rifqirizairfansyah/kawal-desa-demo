import Vue from 'vue'
import Router from 'vue-router'
import Reports from '@/pages/Reports'
import Maps from '@/pages/Maps'
import Login from '@/pages/Login'
import Setting from '@/pages/Setting'
import WeeklyReport from '@/pages/Weekly-Report'
import News from '@/pages/News'
import NewsDetails from '@/pages/News-Detail'
import Institution from '@/pages/Institution'
import Village from '@/pages/Village'
import VillageProfile from '@/pages/Village-Profile'
import LandingPage from '@/pages/Landing-Page'
import Announcement from '@/pages/Announcement'
import Trajectory from '@/pages/Trajectory'
import Registration from '@/pages/Registration'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/landing-page/:slugVillage/:companyGuid',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/village-profile',
      name: 'VillageProfile',
      component: VillageProfile
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/weekly-report',
      name: 'weekly-report',
      component: WeeklyReport,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/news/:slugvillage',
      name: 'News',
      component: News
    },
    {
      path: '/news-detail/:slugvillage/:slug',
      name: 'NewsDetail',
      component: NewsDetails
    },
    {
      path: '/map/',
      name: 'Map',
      component: Maps,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/map/:id',
      name: 'MapTrajectory',
      component: Maps,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/institution',
      name: 'Institution',
      component: Institution,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/village',
      name: 'Village',
      component: Village,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/announcement',
      name: 'Announcement',
      component: Announcement,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/trajectory',
      name: 'Trajectory',
      component: Trajectory,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/:page?',
      name: 'Reports',
      component: Reports,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const loggedInToken = localStorage.getItem('token')
  const loggedInRole = localStorage.getItem('role')
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (!loggedInToken && !loggedInRole && requiresAuth) {
    return next('/village-profile')
  } else if (loggedInToken && loggedInRole && !requiresAuth) {
    return next('/')
  }
  next()
})

export default router
