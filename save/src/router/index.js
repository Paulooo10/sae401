import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import RegisterView from '../views/Register.vue';
import ConnexionView from '../views/Connexion.vue';
import AdminView from '../views/AdminView.vue';
import BUT1View from '../views/BUT1View.vue';  // Importer la page BUT1
import BUT2View from '../views/BUT2View.vue';  // Importer la page BUT2
import BUT3View from '../views/BUT3View.vue';  // Importer la page BUT3


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/connexion',
      name: 'connexion',
      component: ConnexionView,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true } // ✅ Protège la page d'accueil
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/admin', // Route pour la page Admin
      name: 'admin',
      component: AdminView,
      meta: { requiresAuth: true } // Protège la page Admin
    },
    {
      path: '/BUT1',  // Route pour la page BUT1
      name: 'BUT1',
      component: BUT1View,
      meta: { requiresAuth: true, requiresBUT1: true } // Protège la page BUT1
    },
    {
      path: '/BUT2',  // Route pour la page BUT2
      name: 'BUT2',
      component: BUT2View, // Utilisez la bonne vue pour BUT2
      meta: { requiresAuth: true, requiresBUT2: true } // Protège la page BUT2
    },

    {
      path: '/BUT3',  // Route pour la page BUT3
      name: 'BUT3',
      component: BUT3View, // Utilisez la bonne vue pour BUT3
      meta: { requiresAuth: true, requiresBUT3: true } // Protège la page BUT3
    },

    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    }
  ],
});

// ✅ Vérifie si l'utilisateur est connecté avant d'accéder aux pages protégées
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user'); // Vérifie si l'utilisateur est stocké dans localStorage
  const user = JSON.parse(localStorage.getItem('user')); // Récupère les infos de l'utilisateur

  console.log(user); // Vérifie que les données de l'utilisateur (et en particulier `semester`) sont correctement récupérées

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/connexion'); // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
  } else if (to.meta.requiresBUT1 && user?.semester !== 'BUT1') {
    next('/home'); // Redirige vers la page d'accueil si l'utilisateur n'est pas en BUT1
  } else if (to.meta.requiresBUT2 && user?.semester !== 'BUT2') {
    next('/home'); // Redirige vers la page d'accueil si l'utilisateur n'est pas en BUT2
  } else if (to.meta.requiresBUT3 && user?.semester !== 'BUT3') {
    next('/home'); // Redirige vers la page d'accueil si l'utilisateur n'est pas en BUT3
  } else {
    next();
  }
});

export default router;
