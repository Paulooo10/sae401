<template>
  <div class="auth-container">
    <div class="auth-box">
      <div class="logo">
        <img src="@/assets/logo.png" alt="MMI IUT de Troyes" />
      </div>
      <p class="description">
        Cette application permet aux enseignants de gérer les devoirs et aux étudiants de les consulter facilement.
      </p>

      <h2 class="title">Connexion</h2>

      <div class="input-group">
        <label>Identifiant :</label>
        <input v-model="adresse_universitaire" type="email" placeholder="Adresse universitaire" />
      </div>

      <div class="input-group">
        <label>Mot de passe :</label>
        <input v-model="password" type="password" placeholder="Mot de passe" />
      </div>

      <button @click="login" :disabled="isFormInvalid" class="btn" :class="{ 'disabled-button': isFormInvalid }">
        Se connecter
      </button>

      <p class="link-text">
        Pas encore inscrit ? <router-link to="/register">Créez votre compte</router-link>.
      </p>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

      <div class="support">
        <p>En cas de problème de connexion, contactez le support :</p>
        <a href="mailto:intranet.iut-troyes@univ-reims.fr">intranet.iut-troyes@univ-reims.fr</a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      adresse_universitaire: '',
      password: '',
      errorMessage: ''
    };
  },
  computed: {
    isFormInvalid() {
      return !this.adresse_universitaire || !this.password;
    }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:5000/login', {
          adresse_universitaire: this.adresse_universitaire,
          password: this.password
        });

        localStorage.setItem('user', JSON.stringify(response.data.user));

        const userSemester = response.data.user.semester;
        this.$router.push(userSemester ? `/${userSemester}` : '/home');

      } catch (error) {
        this.errorMessage = 'Erreur de connexion. Vérifiez vos identifiants.';
      }
    }
  }
}
</script>