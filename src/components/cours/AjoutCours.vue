<template>
  <div class="container">
    <h1>Ajouter un nouveau cours</h1>
    <form @submit.prevent="soumettre">
      <div class="form-group">
        <label for="nom">Nom</label>
        <input
          type="text"
          class="form-control"
          id="nom"
          placeholder="Entrez le nom du cours"
          v-model="cours.nom"
          required
        />
      </div>
      <div class="form-group">
        <label for="code">Code</label>
        <input
          type="text"
          class="form-control"
          id="code"
          placeholder="Entrez le code du cours"
          v-model="cours.code"
          required
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          placeholder="Entrez la description du cours"
          v-model="cours.description"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Ajouter cours</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background-color: hsl(0, 4%, 11%);
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import useCours from "@/services/servicesCours";
const { ajoutCours } = useCours();
const router = useRouter();
const cours = ref({
  nom: null,
  code: null,
  description: null,
});

const soumettre = () => {
  ajoutCours(cours.value)
    .then((res) => {
      console.log(res);
      router.push("/liste-cours");
    })
    .catch((err) => console.log("erreur", err));
  console.log("cours", cours.value);
};
</script>
