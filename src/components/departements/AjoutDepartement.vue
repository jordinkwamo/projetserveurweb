<template>
  <div class="container">
    <h1>Ajouter un nouveau département</h1>
    <form @submit.prevent="soumettre">
      <div class="form-group">
        <label for="nom">Nom</label>
        <input
          type="text"
          class="form-control"
          id="nom"
          placeholder="Entrez le nom"
          v-model="departement.nom"
          required
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          placeholder="Entrez la description"
          v-model="departement.description"
          required
        />
      </div>
      <div class="form-group">
        <label for="date_creation">Date de création</label>
        <input
          type="date"
          class="form-control"
          id="date_creation"
          v-model="departement.date_creation"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">Ajouter</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  background-color: hsl(0, 0%, 4%);
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
import useDepartment from "@/services/serviceDepartement";

const { addDepartement } = useDepartment();
const router = useRouter();

const departement = ref({
  nom: "",
  description: "",
  date_creation: "",
});

const soumettre = () => {
  addDepartement(departement.value)
    .then((res) => {
      console.log(res);
      // Redirection après l'ajout réussi
      router.push("/liste-departements");
    })
    .catch((err) =>
      console.error("Erreur lors de l'ajout du département :", err)
    );
};
</script>
