<template>
  <div>
    <h2>Inscription</h2>

    <input v-model="nom" placeholder="Nom">
    <input v-model="prenom" placeholder="Prénom">
    <input v-model="adresse_universitaire" type="email" placeholder="Adresse universitaire">
    <input v-model="password" type="password" placeholder="Mot de passe">

    <label for="semester">Choisissez un semestre:</label>
    <select v-model="semester" id="semester">
      <option value="">Sélectionnez un semestre</option>  <!-- Valeur par défaut vide -->
      <option value="BUT1">BUT1</option>
      <option value="BUT2">BUT2</option>
      <option value="BUT3">BUT3</option>
    </select>

    <!-- Bouton désactivé et grisé tant que le formulaire est invalide -->
    <button @click="register" :disabled="isFormInvalid" :class="{ 'disabled-button': isFormInvalid }">
      S'inscrire
    </button>

    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>

    <p>Déjà un compte ? <router-link to="/connexion">Se connecter</router-link></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nom: '',
      prenom: '',
      adresse_universitaire: '',
      password: '',
      semester: '', // Ajout de la variable pour le semestre
      errorMessage: ''
    };
  },
  computed: {
    isFormInvalid() {
      // Vérifie si tous les champs sont remplis, y compris le semestre
      return !this.nom || !this.prenom || !this.adresse_universitaire || !this.password || !this.semester;
    }
  },
  methods: {
    async register() {
      try {
        await axios.post('http://localhost:5000/register', {
          nom: this.nom,
          prenom: this.prenom,
          adresse_universitaire: this.adresse_universitaire,
          password: this.password,
          semester: this.semester // Envoie également le semestre
        });

        alert('Inscription réussie ! Connectez-vous.');
        this.$router.push('/connexion'); // Redirige vers la connexion

      } catch (error) {
        this.errorMessage = error.response?.data?.error || 'Erreur lors de l’inscription';
      }
    }
  }
};
</script>

<style scoped>
/* Style pour le bouton désactivé */
.disabled-button {
  opacity: 0.5; /* Rend le bouton plus transparent */
  cursor: not-allowed; /* Change le curseur en "non autorisé" */
  background-color: #ccc; /* Couleur de fond grisée */
  color: #666; /* Couleur du texte grisée */
  border: 1px solid #999; /* Bordure grisée */
}

/* Style par défaut du bouton */
button {
  padding: 10px 20px;
  background-color: #42b983; /* Couleur verte par défaut */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover:not(.disabled-button) {
  background-color: #369f6e; /* Couleur verte plus foncée au survol */
}
</style>