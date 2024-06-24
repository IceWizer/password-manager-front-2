import Vuex from 'vuex'

import appStore from './modules/app'
import authStore from './modules/authStore'
import passwordStore from './modules/passwordStore'
import personStore from './modules/personStore'

export default new Vuex.Store({
  modules: {
    app_store: appStore,
    auth_store: authStore,
    [personStore.name]: personStore.store,
    [passwordStore.name]: passwordStore.store,
  }
})
