<template>
  <div class="card">
    <!-- Affichez la photo de profil si une URL est disponible -->
    <img v-if="etudiant.photo_url" :src="etudiant.photo_url" class="card-img-top" alt="Photo de profil" />
    <div class="card-body">
      <!-- Affichez les informations de l'étudiant -->
      <p class="card-text">Prénom: {{ etudiant.prenom }}</p>
      <p class="card-text">Nom: {{ etudiant.nom }}</p>
      <p class="card-text">Date de naissance: {{ etudiant.date_de_naissance }}</p>
      <p class="card-text">Email: {{ etudiant.email }}</p>
    </div>
  </div>
</template>

<script setup>
import useEtudiant from "@/services/servicesEtudiants";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { id } = route.params;
const etudiant = ref({});

const { getStudentById } = useEtudiant();
onBeforeMount(() => {
  getStudentById(id)
    .then((res) => {
      etudiant.value = res.data;
    })
    .catch((err) =>
      console.log(
        "Erreur lors de la récupération des informations de l'étudiant :",
        err
      )
    );
});
</script>
