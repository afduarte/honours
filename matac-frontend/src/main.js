import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faUsers, faArchive, faCog, faAngleRight, faAngleLeft,
  faMagic, faCheckSquare, faSpinner, faInfoCircle, faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import App from './App.vue';
import router from './router';
import store from './store';

const icons = [
  faUsers,
  faArchive,
  faCog,
  faAngleRight,
  faAngleLeft,
  faMagic,
  faCheckSquare,
  faSpinner,
  faSquare,
  faTrashAlt,
  faInfoCircle,
  faTimesCircle,
];

library.add(...icons);
Vue.component('fa-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

const isAdmin = s => ({
  computed: {
    $isAdmin() {
      return s.state.user.user && s.state.user.user.Role === 'AdminRole';
    },
  },
});

Vue.mixin(isAdmin(store));

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

store.dispatch('initialise');
