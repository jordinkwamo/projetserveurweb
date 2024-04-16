<template>
  <div class="wrapper">
    <div>
      <h1>Liste des cours</h1>
      <table class="table table-striped">
        <thead>
          <tr id="champ">
            <th>Nom</th>
            <th>Code</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cours in listeCours" :key="cours.id">
            <td>{{ cours.nom }}</td>
            <td>{{ cours.code }}</td>
            <td>{{ cours.description }}</td>
            <td>
              <!-- <button class="btn btn-primary" id="primary" @click="update(cours.id)">Modifier</button>
              <button class="btn btn-success" id="success" @click="goToDetails(cours.id)">Détails</button> -->
              <button class="btn btn-danger" id="danger" @click="supprimer(cours.id)">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="btn btn-primary" id="btnlistE" @click="goToAddCours">Ajouter un cours</button>
    </div>
  </div>
  </template>
  
<script setup>
import { onBeforeMount, ref } from "vue";
import useCours from '../../services/servicesCours'
import { useRouter } from "vue-router";
const { getAllCours, deleteCours } = useCours()

const listeCours = ref([])
const router = useRouter()

const supprimer = id => {
    deleteCours(id)
        .then((res) => {
            console.log('suppression', res)
            getAllCours()
                .then((res) => listeCours.value = res.data)
                .catch(err => console.log(err))
        })

        .catch(err => console.log(err))
}
// const update = (id) => {
//     router.push(`/update-student/${id}`)
// }
onBeforeMount(() => {
    getAllCours()
        .then((res) => listeCours.value = res.data)
        .catch(err => console.log(err))
})

const goToAddCours = () => router.push('/ajout-cours')

// const goToProfile = id => {
//     router.push(`/profile/${id}`)
// }

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
