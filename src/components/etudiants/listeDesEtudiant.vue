<template>
  <div class="wrapper">
    <h1>Liste des étudiants</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Prénom</th>
          <th>Nom</th>
          <th>Date de naissance</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="etudiant in listeEtudiant" :key="etudiant.id">
          <td>{{ etudiant.prenom }}</td>
          <td>{{ etudiant.nom }}</td>
          <td>{{ etudiant.date_de_naissance }}</td>
          <td>{{ etudiant.email }}</td>
          <td>
            <button class="btn btn-primary" id="primary"@click="update(etudiant.id)">
              Modifier
            </button>
            <button class="btn btn-success" id="success" @click="goToDetails(etudiant.id)">
              Détails
            </button>
            <button class="btn btn-danger" id="danger" @click="supprimer(etudiant.id)">
              Supprimer
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-primary" id="btnlistE" @click="goToAddStudent">
      Ajouter un étudiant
    </button>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import useEtudiant from "../../services/servicesEtudiants";
import { useRouter } from "vue-router";
const { getAllStudents, deleteStudent } = useEtudiant();

const listeEtudiant = ref([]);
const router = useRouter();

const supprimer = (id) => {
  deleteStudent(id)
    .then((res) => {
      console.log("suppression", res);
      getAllStudents()
        .then((res) => {
          listeEtudiant.value = res.data
        })
        .catch((err) => console.log(err));
    })

    .catch((err) => console.log(err));
};
const update = (id) => {
  router.push(`/update-student/${id}`);
};
onBeforeMount(() => {
  getAllStudents()
  // j'ai ajouté rows a cause de l'imbriqué
    .then((res) => {
      console.log({res})
      listeEtudiant.value = res.data
    })
    .catch((err) => console.log(err));
});

const goToAddStudent = () => router.push("/add-student");

const goToProfile = (id) => {
  router.push(`/profile/${id}`);
};
</script>
<style>
#btnlistE{
  background-color: rgb(0, 0, 0);
  color:white
}
#primary{
  background-color: blue;
}
#success{
  background-color: chartreuse;
}
#danger{
  background-color: chocolate;
}
</style>
