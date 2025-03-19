<template>
  <div>
    <h1>Bienvenue sur la page BUT1</h1>
    <p>Contenu exclusif pour les étudiants en BUT1</p>

    <!-- Boutons -->
    <button @click="logout">Déconnexion</button>
    <button @click="goToAdmin">Accéder à l'Admin</button>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BUT1View',
  data() {
    return {
      isModalVisible: false,  // Contrôle l'affichage du popup
      user: {},               // Initialiser un objet vide pour les informations de l'utilisateur
    };
  },
  methods: {
    // Récupérer les informations de l'utilisateur depuis le serveur
    async fetchUserData() {
      try {
        const response = await axios.get('http://localhost:5000');  // Remplacer par l'URL correcte de ton fichier JSON
        this.user = response.data;  // Assigner les données récupérées à la variable user
      } catch (error) {
        console.error("Erreur lors de la récupération des informations : ", error);
      }
    },
    logout() {
      // Suppression des informations de session ou token
      localStorage.removeItem('userToken'); 
      sessionStorage.removeItem('userToken'); 

      // Redirection vers la page d'accueil
      this.$router.push('/');
    },
    goToAdmin() {
      // Redirection vers la page Admin
      this.$router.push('/admin');
    },
  }
};
</script>

<style scoped>
</style>
