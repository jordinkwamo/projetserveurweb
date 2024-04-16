<template>
    <form @submit.prevent="soumettre">
        <div class="mb-3">
            <label for="prenom" class="form-label">Prenom</label>
            <input type="text" class="form-control" id="prenom" v-model="etudiant.prenom">
        </div>
        <div class="mb-3">
            <label for="nom" class="form-label">Nom</label>
            <input type="text" class="form-control" id="nom" v-model="etudiant.nom">
        </div>
        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" v-model="etudiant.email">
        </div>
        <div class="mb-3">
            <label for="mpd" class="form-label">Mot de passe</label>
            <input type="password" class="form-control" id="mdp" v-model="etudiant.mot_de_passe">
        </div>
        <div class="mb-3">
            <label for="naissance" class="form-label">Date de naissance</label>
            <input type="date" class="form-control" id="naissance" v-model="etudiant.date_de_naissance">
        </div>
        <div class="mb-3">
            <label for="photo" class="form-label">Photo</label>
            <input type="file" class="form-control" id="photo" @change="{ }">
        </div>

        <!-- Ajout des relations  -->

        <div class="mb-3">
            <label for="department" class="form-label">Departements</label>
            <select id="department" class="form-select" v-model="etudiant.departmentId">
                <option selected>Choisir un departement</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="role" class="form-label">Roles</label>
            <select id="role" class="form-select" v-model="etudiant.roleId">
                <option selected>Choisir un role</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useEtudiant from '@/services/servicesEtudiants';
const { getStudentById } = useEtudiant()
const router = useRouter()
const route = useRoute()
const { id } = route.params
const etudiant = ref({
    nom: null,
    prenom: null,
    email: null,
    mot_de_passe: null,
    photo: null,
    date_de_naissance: null,
    departmentId: null,
    roleId: null
})

const soumettre = () => {
    console.log('etudiant', etudiant.value)
}
onBeforeMount(() => {
    getStudentById(id)
    .then(res => etudiant.value = res.data)

});
</script>
