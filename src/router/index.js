import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BookmarksView from '@/views/BookmarksView.vue';
import NotesView from '@/views/NotesView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import ProfileView from '@/views/ProfileView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/bookmarks',
      name: 'bookmarks',
      component: BookmarksView,
    },
    {
      path: '/notes',
      name: 'notes',
      component: NotesView,
    }
    ,
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    }
    ,
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    }
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('accessToken');
  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next();
});

export default router;