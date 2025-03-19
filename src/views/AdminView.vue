<template>
  <div>
    <h2>Ajouter un Devoir</h2>
    <form @submit.prevent="addDevoir">
     
      <div>
<label for="numero_matiere">Numéro de la matière :</label>
<input type="text" v-model="devoir.numero_matiere" required />
</div>

      
      <div>
        <label for="nom_matiere">Nom de la matière :</label>
        <input type="text" v-model="devoir.nom_matiere" required />
      </div>

      <div>
        <label for="consignes">Consignes du devoir :</label>
        <textarea v-model="devoir.consignes" required></textarea>
      </div>

      <div>
        <label for="date_rendu">Date de rendu :</label>
        <input type="date" v-model="devoir.date_rendu" required />
      </div>

      <div>
        <label for="heure_rendu">Heure de rendu :</label>
        <input type="time" v-model="devoir.heure_rendu" required />
      </div>

      <div>
        <label for="format_rendu">Format du rendu :</label>
        <input type="text" v-model="devoir.format_rendu" required />
      </div>

      <div>
<label for="lieu_depot">Lieu de dépôt :</label>
<input type="text" v-model="devoir.lieu_depot" required />
</div>


      <div>
        <label for="information_complementaire">Informations complémentaires :</label>
        <textarea v-model="devoir.information_complementaire"></textarea>
      </div>

      <button type="submit">Ajouter le Devoir</button>
    </form>

    <p v-if="message" :style="{ color: message.success ? 'green' : 'red' }">{{ message.text }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      devoir: {
        numero_matiere: '',
        nom_matiere: '',
        consignes: '',
        date_rendu: '',
        heure_rendu: '',
        format_rendu: '',
        lieu_depot: '',
        information_complementaire: ''
      },
      message: null
    };
  },
  methods: {
    async addDevoir() {
      try {
        const response = await axios.post('http://localhost:5000/devoirs', this.devoir);
        this.message = { text: 'Devoir ajouté avec succès!', success: true };
        this.devoir = { // Réinitialiser le formulaire
          numero_matiere: '',
          nom_matiere: '',
          consignes: '',
          date_rendu: '',
          heure_rendu: '',
          format_rendu: '',
          lieu_depot: '',
          information_complementaire: ''
        };
      } catch (error) {
        this.message = { text: 'Erreur lors de l\'ajout du devoir.', success: false };
        console.error(error);
      }
    }
  }
};
</script>
