<template>
  <div class="auth-container">
    <div class="auth-box">
      <div class="logo">
        <img src="@/assets/logo.png" alt="MMI IUT de Troyes" />
      </div>
      <h2 class="title">Inscription</h2>

      <div class="input-group">
        <label>Nom :</label>
        <input v-model="nom" type="text" placeholder="Nom" />
      </div>

      <div class="input-group">
        <label>Prénom :</label>
        <input v-model="prenom" type="text" placeholder="Prénom" />
      </div>

      <div class="input-group">
        <label>Adresse universitaire :</label>
        <input v-model="adresse_universitaire" type="email" placeholder="Adresse universitaire" />
      </div>

      <div class="input-group">
        <label>Mot de passe :</label>
        <input v-model="password" type="password" placeholder="Mot de passe" />
      </div>

      <div class="input-group">
        <label for="semester">Choisissez un semestre :</label>
        <select v-model="semester" id="semester">
          <option value="">Sélectionnez un semestre</option>
          <option value="BUT1">BUT1</option>
          <option value="BUT2">BUT2</option>
          <option value="BUT3">BUT3</option>
        </select>
      </div>

      <button @click="register" :disabled="isFormInvalid" class="btn" :class="{ 'disabled-button': isFormInvalid }">
        S'inscrire
      </button>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <p class="link-text">
        Déjà un compte ? <router-link to="/connexion">Se connecter</router-link>
      </p>
    </div>
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
      semester: '',
      errorMessage: ''
    };
  },
  computed: {
    isFormInvalid() {
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
          semester: this.semester
        });

        alert('Inscription réussie ! Connectez-vous.');
        this.$router.push('/connexion');

      } catch (error) {
        this.errorMessage = error.response?.data?.error || 'Erreur lors de l’inscription';
      }
    }
  }
};
</script>
