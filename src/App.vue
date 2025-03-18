<template>
  <div>
    <!-- Afficher le H1 et les boutons uniquement si la route est "/" -->
    <div v-if="$route.path === '/'">
      <h1>Bienvenue sur mon site</h1> 
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

<style>
nav {
  margin-bottom: 20px;
}
nav a {
  margin: 0 10px;
  text-decoration: none;
  color: blue;
}
nav a:hover {
  text-decoration: underline;
}

button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}
</style>
