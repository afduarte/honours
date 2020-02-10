import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';
import router from './router';
import store from './store';


library.add(faUsers);

Vue.component('fa-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

store.dispatch('initialise');
