<template>
  <div>
    <!-- Afficher le H1 et les boutons uniquement si la route est "/" -->
    <div v-if="$route.path === '/'">
      <h1>Bienvenue</h1> 
      <nav>
        <router-link to="/register">
          <button>S'inscrire</button>
        </router-link>
        <router-link to="/connexion">
          <button>Se connecter</button>
        </router-link>
      </nav>
    </div>

    <!-- Affichage des composants selon la route -->
    <router-view />

    <!-- Fonctionnalités principales -->

  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      loading: true,
      errorMessage: ''
    };
  },
  async created() {
    await this.loadUsers();
  },
  methods: {
    async loadUsers() {
      try {
        const response = await axios.get('http://localhost:5000/users');
        this.users = response.data;
      } catch (error) {
        this.errorMessage = 'Erreur de chargement des utilisateurs';
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async deleteUser(id) {
      try {
        await axios.delete(`http://localhost:5000/users/${id}`);
        this.users = this.users.filter(user => user.id !== id); // Mise à jour locale
      } catch (error) {
        this.errorMessage = 'Erreur lors de la suppression';
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
/* Style général */

div {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  text-align: center;
}

nav {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}



/* Style pour les messages d'erreur */
.error-message {
  color: red;
  text-align: center;
  margin-top: 20px;
}
</style>
