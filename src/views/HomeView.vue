<template>
  <div>
    <h2>Bienvenueeeeeeee, {{ user.username }}</h2>
    <button @click="logout">Déconnexion</button>
    <button @click="goToAdmin">Accéder à l'Admin</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem('user'))
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('user');
      this.$router.push('/');
    },
    goToAdmin() {
      // Vérifie si l'utilisateur est connecté avant de rediriger vers la page Admin
      const isAuthenticated = localStorage.getItem('user');
      if (isAuthenticated) {
        this.$router.push('/admin'); // Redirige vers la page admin
      } else {
        this.$router.push('/connexion'); // Redirige vers la page de connexion si non authentifié
      }
    }
  }
};
</script>
