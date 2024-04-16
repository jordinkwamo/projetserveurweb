import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ListeDesEtudiant from "@/components/etudiants/listeDesEtudiant.vue";
import ProfileEtudiant from "@/components/etudiants/profilEtudiant.vue";
import AjoutEtudiant from "@/components/etudiants/AjoutEtudiant.vue";
import MiseAJourEtudiant from "@/components/etudiants/MiseAjourEtudiant.vue";
// cours
import listeCours from "@/components/cours/listeCours.vue";
import AjoutCours from "@/components/cours/AjoutCours.vue";
// departement
import AjoutDepartement from "@/components/departements/AjoutDepartement.vue";
import ListeDepartement from "@/components/departements/ListeDepartement.vue";
// evenement
import AjoutEvenements from "@/components/evenements/AjoutEvenements.vue";
import ListeEvenements from "@/components/evenements/ListeEvenements.vue";
// login
import login from "@/components/auth/login.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ListeDesEtudiant,
    },

    {
      path: "/profile/:id",
      name: "profile",
      component: ProfileEtudiant,
    },
    {
      path: "/add-student",
      name: "add-student",
      component: AjoutEtudiant,
    },
    {
      path: "/update-student/:id",
      name: "update-student",
      component: MiseAJourEtudiant,
    },
    {
      path: "/about",
      name: "about",
      // cours
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    //cours
    {
      path: "/ajout-cours",
      name: "ajout-cours",
      component: AjoutCours,
    },
    {
      path: "/liste-cours",
      name: "liste-cours",
      component: listeCours,
    },
    // departements
    {
      path: "/departements/",
      name: "ajout-departement",
      component: AjoutDepartement,
    },
    {
      path: "/liste-departements",
      name: "liste-departement",
      component: ListeDepartement,
    },
    // evenements
    {
      path: "/evenements1",
      name: "ajout-evenements",
      component: AjoutEvenements,
    },
    {
      path: "/evenements",
      name: "liste-evenements",
      component: ListeEvenements,
    },
    {
      path: "/login",
      name: "login",
      component: login,
    },
  ],
});
import useAuthStore from '@/stores/authStore'
const routeOuvertes = ['login']

router.beforeEach((to, from, next) => {
  const { currentToken: token } = useAuthStore()
  if (routeOuvertes.includes(to.name.toLowerCase()) && token) next({ name: 'home' })
  if (!routeOuvertes.includes(to.name.toLowerCase()) && !token) next({ name: 'login' })
  else next()
})
export default router;
