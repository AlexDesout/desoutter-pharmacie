import { createRouter, createWebHistory } from "vue-router";
import MedicamentList from "../components/MedicamentList.vue";
import MedicamentForm from "../components/MedicamentForm.vue";

const routes = [
  { path: "/", name: "Home", component: MedicamentList },
  {
    path: "/ajouter",
    component: MedicamentForm,
    props: { mode: "add" },
  },
  {
    path: "/modifier/:id",
    component: MedicamentForm,
    props: (route) => ({ mode: "edit", id: route.params.id }),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
