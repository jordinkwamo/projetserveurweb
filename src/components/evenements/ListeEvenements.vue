<template>
  <div class="wrapper">
    <div>
      <h1>Liste des événements</h1>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Titre</th>
            <th>Date de début</th>
            <th>Lieu</th>
            <th> Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="evenement in listesEvenement" :key="evenement.id">
            <td>{{ evenement.titre }}</td>
            <td>{{ evenement.date_debut }}</td>
            <td>{{ evenement.lieu }}</td>
            <td>
            <button class="btn btn-danger" id="danger" @click="supprimer(evenement.id)" > supprimer</button>
          </td>
          </tr>
          
        </tbody>
      </table>
      <button class=" btn btn-primary" id="btnlistE" @click="goToAddEvenement">
        Ajouter un événement
      </button>
    </div>
  </div>
</template>

<script setup>
import useEvenement from "@/services/serviceEvenement";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";

const { getAllEvenement, deleteEvenement } = useEvenement();
const listesEvenement = ref([]);
const router = useRouter();

const supprimer = (id) =>{
  deleteEvenement(id)
  .then((res) =>{
    console.log("suppression",res);
    getAllEvenement()
    .then((res) => (listesEvenement.value =res.data))
    .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err)); 
}
onBeforeMount(() => {
  getAllEvenement()
    .then((res) => (listesEvenement.value = res.data))
    .catch((err) => console.log(err));
});

const goToAddEvenement = () => router.push("/evenements1");

const goToProfile = (id) => {
  router.push(`/profile/${id}`);
};
</script>

<style>
#btnlistE{
  background-color: rgb(0, 0, 0);
  color:white
}
#danger{
  background-color: chocolate;
}
</style>
