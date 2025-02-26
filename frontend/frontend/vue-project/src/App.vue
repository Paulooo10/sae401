<template>
  <div>
    <h2>Liste des utilisateurs</h2>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }}
        <button @click="deleteUser(user.id)">🗑 Supprimer</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: []
    };
  },
  async created() {
    this.loadUsers();
  },
  methods: {
    async loadUsers() {
      try {
        const response = await axios.get('http://localhost:5000/users');
        this.users = response.data;
      } catch (error) {
        console.error('Erreur de chargement des utilisateurs', error);
      }
    },
    async deleteUser(id) {
      try {
        await axios.delete(`http://localhost:5000/users/${id}`);
        this.users = this.users.filter(user => user.id !== id); // Mettre à jour la liste localement
      } catch (error) {
        console.error('Erreur lors de la suppression', error);
      }
    }
  }
};
</script>
