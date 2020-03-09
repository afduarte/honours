import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Annotation from '../views/Annotation.vue';
import { ls } from '@/utils';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/annotate/:session',
    name: 'Annotate',
    component: Annotation,
    props: true,
    async beforeEnter(to, from, next) {
      const proj = store.state.project.projectList.find(p => p.Name === to.params.session);
      if (!proj) {
        await store.dispatch('project/fetchProjects');
      }
      next();
    },
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
      {
        path: 'project-type',
        name: 'Select Project Type',
        component: () => import(/* webpackChunkName: "admin/project-wizard" */ '../views/Admin/ProjectWizard/Steps/Four.vue'),
      },
      {
        path: 'done',
        name: 'Done!',
        component: () => import(/* webpackChunkName: "admin/project-wizard" */ '../views/Admin/ProjectWizard/Steps/Five.vue'),
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
