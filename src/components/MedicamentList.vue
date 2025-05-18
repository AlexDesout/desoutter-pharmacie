<script setup>
import { ref, computed, onMounted } from 'vue';
import { getMedicaments, deleteMedicament, editMedicament } from '../utils/api';
import MedicamentItem from './MedicamentItem.vue';

const medicaments = ref([]);
const searchTerm = ref('');
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
    try {
        medicaments.value = await getMedicaments();
    } catch (e) {
        error.value = 'Erreur de chargement';
    } finally {
        loading.value = false;
    }
});

const filteredMedicaments = computed(() => {
    if (!searchTerm.value.trim()) return medicaments.value;
    return medicaments.value.filter(m =>
        m.denomination.toLowerCase().includes(searchTerm.value.trim().toLowerCase())
    );
});

async function deleteMed(id) {
    try {
        await deleteMedicament(id);
        medicaments.value = medicaments.value.filter(m => m.id !== id);
    } catch (e) { console.error(e); }
}

async function livraisonMed(med) {
    try {
        med.livrer();
        const { id, denomination, formepharmaceutique, qte } = med;
        await editMedicament({ id, denomination, formepharmaceutique, qte }); //éviter d'écraser l'image actuelle
    } catch (e) { med.dispenser(); console.error(e); }
}

async function dispensationMed(med) {
    try {
        med.dispenser();
        const { id, denomination, formepharmaceutique, qte } = med;
        await editMedicament({ id, denomination, formepharmaceutique, qte }); //éviter d'écraser l'image actuelle
    } catch (e) { med.livrer(); console.error(e); }
}
</script>

<template>
    <h2>Quoi de neuf docteur ?</h2>

    <input v-model="searchTerm" type="search" placeholder="Rechercher un médicament" class="form-control mb-3" />
    <router-link to="/ajouter" class="btn btn-primary btn-sm mb-3">
        Ajouter un médicament
    </router-link>

    <div v-if="loading">Chargement…</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="d-flex flex-wrap justify-content-between">
        <MedicamentItem v-for="medicament in filteredMedicaments" :key="medicament.id" :medicament="medicament"
            @supprimer="deleteMed" @livrer="livraisonMed" @dispenser="dispensationMed" />
    </div>
</template>