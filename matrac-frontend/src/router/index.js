import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/admin',
    name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "admin" */ '../views/Admin/Index.vue'),
  },
  {
    path: '/admin/manage-users',
    name: 'Manage Users',
    component: () => import(/* webpackChunkName: "admin/manage-users" */ '../views/Admin/ManageUsers/Index.vue'),
  },
  {
    path: '/admin/manage-projects',
    name: 'Manage Projects',
    component: () => import(/* webpackChunkName: "admin/manage-projects" */ '../views/Admin/ManageProjects/Index.vue'),
  },
  {
    path: '/admin/manage-datasets',
    name: 'Manage Datasets',
    component: () => import(/* webpackChunkName: "admin/manage-datasets" */ '../views/Admin/ManageDatasets/Index.vue'),
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
