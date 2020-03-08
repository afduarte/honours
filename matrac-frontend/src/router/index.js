import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import { ls } from '@/utils';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/logout',
    name: 'Logout',
    beforeEnter: () => {
      ls.removeItem('token');
      window.location.search = '';
      window.location.replace('/');
    },
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
  {
    path: '/admin/project-wizard',
    name: 'New Project Wizard',
    component: () => import(/* webpackChunkName: "admin/project-wizard" */ '../views/Admin/ProjectWizard/Index.vue'),
    children: [
      {
        path: 'create-project',
        name: 'Create Project',
        component: () => import(/* webpackChunkName: "admin/project-wizard" */ '../views/Admin/ProjectWizard/Steps/One.vue'),
      },
      {
        path: 'link-dataset',
        name: 'Link Dataset',
        component: () => import(/* webpackChunkName: "admin/project-wizard" */ '../views/Admin/ProjectWizard/Steps/Two.vue'),
      },
      {
        path: 'link-users',
        name: 'Link Users',
        component: () => import(/* webpackChunkName: "admin/project-wizard" */ '../views/Admin/ProjectWizard/Steps/Three.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
