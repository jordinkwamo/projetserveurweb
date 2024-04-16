<template>
  <div class="container">
    <h1>Ajouter un événement</h1>
    <form @submit.prevent="soumettre">
      <div class="form-group">
        <label for="titre">Titre</label>
        <input type="text" class="form-control" id="titre" placeholder="Entrez le titre de l'événement" v-model="evenement.titre" required>
      </div>
      <div class="form-group">
        <label for="date-debut">Date de début</label>
        <input type="date" class="form-control" id="date-debut" v-model="evenement.date_debut" required>
      </div>
      <div class="form-group">
        <label for="lieu">Lieu</label>
        <input type="text" class="form-control" id="lieu" placeholder="Entrez le lieu de l'événement" v-model="evenement.lieu" required>
      </div>
      <button type="submit" class="btn btn-primary">Ajouter l'événement</button>
    </form>
  </div>
</template>
<style scoped>


.container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background-color: hsl(0, 3%, 7%);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  gap: 100px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #fff
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  color: #fff
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-primary {
  width: 100%;
  padding: 10px;
  background-color: #00ff55;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>

<script setup>
import useEvenement from '@/services/serviceEvenement';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { ajoutEvenement } = useEvenement()
const router = useRouter()
const evenement = ref({
  titre: null,
  date_debut: null,
  lieu: null,
})

const soumettre = () => {
  ajoutEvenement(evenement.value)
    .then((res) => {
      console.log(res);
      router.push("/evenements");
    })
    .catch((err) => console.log("erreur", err));
  console.log("evenement", evenement.value);
};
</script>
