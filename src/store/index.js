import Vue from 'vue'
import Vuex from 'vuex'

import { alert } from './alert.module'
import { authentication } from './authentication.module'
import { combobox } from './selected-cbx.module'
import { unit } from './unit.module'
import { profile } from './profile.module'
import { getApplicationType } from './app-type.module'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    authentication,
    getApplicationType,
    profile,
    alert,
    combobox,
    unit
  }
})
