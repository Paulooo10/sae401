<template>
  <div>
    <h2>Connexion</h2>

    <input v-model="nom" type="text" placeholder="Nom">
    <input v-model="prenom" type="text" placeholder="Prénom">
    <input v-model="adresse_universitaire" type="email" placeholder="Adresse universitaire">
    <input v-model="password" type="password" placeholder="Mot de passe">

    <!-- Bouton désactivé et grisé tant que le formulaire est invalide -->
    <button @click="login" :disabled="isFormInvalid" :class="{ 'disabled-button': isFormInvalid }">
      Se connecter
    </button>

    <p>Pas encore inscrit ? <router-link to="/register">Créer un compte</router-link></p>

    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
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
      errorMessage: ''
    };
  },
  computed: {
    isFormInvalid() {
      // Vérifie si tous les champs sont remplis
      return !this.nom || !this.prenom || !this.adresse_universitaire || !this.password;
    }
  },
  methods: {
    // Fonction de connexion
    async login() {
      try {
        const response = await axios.post('http://localhost:5000/login', {
          adresse_universitaire: this.adresse_universitaire,
          password: this.password
        });

        // Sauvegarde les informations de l'utilisateur dans localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));

        // Redirection en fonction du semestre
        const userSemester = response.data.user.semester;

        if (userSemester === 'BUT1') {
          this.$router.push('/BUT1');  // Redirection vers la page BUT1
        } else if (userSemester === 'BUT2') {
          this.$router.push('/BUT2');  // Redirection vers la page BUT2
        } else if (userSemester === 'BUT3') {
          this.$router.push('/BUT3');  // Redirection vers la page BUT3
        } else {
          this.$router.push('/home');  // Redirection vers la page d'accueil pour d'autres semestres
        }
        
      } catch (error) {
        console.error(error);
        this.errorMessage = 'Erreur de connexion. Vérifiez vos identifiants.';
      }
    }
  }
}
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