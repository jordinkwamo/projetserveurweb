<template>
  <div class="container">
    <h1>AJOUT ETUDIANT</h1>
    <form @submit.prevent="soumettre" enctype="multipart/form-data">
      <div class="form-group">
        <label for="prenom">Prénom</label>
        <input
          type="text"
          class="form-control"
          id="prenom"
          v-model="etudiant.prenom"
          required
        />
      </div>
      <div class="form-group">
        <label for="nom">Nom</label>
        <input
          type="text"
          class="form-control"
          id="nom"
          v-model="etudiant.nom"
          required
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="etudiant.email"
          required
        />
      </div>
      <div class="form-group">
        <label for="mdp">Mot de passe</label>
        <input
          type="password"
          class="form-control"
          id="mdp"
          v-model="etudiant.mot_de_passe"
          required
        />
      </div>
      <div class="form-group">
        <label for="naissance">Date de naissance</label>
        <input
          type="date"
          class="form-control"
          id="naissance"
          v-model="etudiant.date_de_naissance"
          required
        />
      </div>
      <div class="form-group">
        <label for="photo">Photo</label>
        <input
          type="file"
          class="form-control"
          id="photo"
          @change="addPhoto"
          accept="image/*"
        />
      </div>

      <!-- Ajout des relations -->

      <div class="form-group">
        <label for="department">Départements</label>
        <select
          id="department"
          class="form-control"
          v-model="etudiant.departmentId"
        >
          <option value="" disabled selected>Choisir un département</option>
          <option
            v-for="department in departmentList"
            :value="department.id"
            :key="department.id"
          >
            {{ department.nom }}
          </option>
          <option> INFORMATIQUE</option>
          <option> SCIENCE</option>
          <option> GENIE-CIVIL</option>
          <option> ADMINISTRATION </option>
        </select>
      </div>
      <div class="form-group">
        <label for="role">Rôles</label>
        <select id="role" class="form-control" v-model="etudiant.roleId">
          <option value="" disabled selected>Choisir un rôle</option>
          <option> ADMINISTRATEUR</option>
          <option> ETUDIANT</option>
          <option> PROFESSEUR</option>
          <!-- Ajoutez ici les options pour les rôles -->
        </select>
      </div>
      <button type="submit" class="btn btn-primary">S'inscrire</button>
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
  color: white;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  color: #fff;
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
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import useEtudiant from "@/services/servicesEtudiants";
import useDepartment from "@/services/serviceDepartement";
// import useRole from '@/services/serviceRole'

const { addStudent } = useEtudiant();

// const { getAllDepartments } = useDepartment()
// const { getAllRoles } = useRole()

const router = useRouter();
const departmentList = ref([]);
// const roleList = ref([])
const etudiant = ref({
  nom: null,
  prenom: null,
  email: null,
  mot_de_passe: null,
  photo: null,
  date_de_naissance: null,
  // departmentId: null,
  // roleId: null
});
const formData = new FormData();

const soumettre = () => {
  for (let clef in etudiant.value) {
    formData.append(clef, etudiant.value[clef]);
  }
  console.log("formdata", formData);
  addStudent(etudiant.value)
    .then((res) => {
      console.log(res);
      router.push("/");
    })
    .catch((err) => console.log("erreur", err));
  console.log("etudiant", etudiant.value);
};

onBeforeMount(() => {
  // getAllDepartments()
  //     .then(res => departmentList.value = res.data)
  //     .catch(err => console.log('Department list error', err))
  // getAllRoles()
  //     .then(res => roleList.value = res.data)
  //     .catch(err => console.log('Role list error', err))
});

const addPhoto = (e) => {
  etudiant.value.photo = e.target.files[0];
  console.log("event", e.target);
};
</script>
