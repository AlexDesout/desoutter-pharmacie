<script setup>
import { ref, computed, onMounted } from 'vue';
import { getMedicaments, deleteMedicament, editMedicament } from '../utils/api';
import { jsPDF } from 'jspdf'
import MedicamentItem from './MedicamentItem.vue';
import MedicamentChart from './MedicamentChart.vue';

const medicaments = ref([]);
const searchTerm = ref('');
const loading = ref(true);
const error = ref(null);
const displayChart = ref(false)

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
        if (med.qte === 0) {
            alert("Impossible d'avoir une quantité inférieure à 0.");
            return;
        }
        med.dispenser();
        const { id, denomination, formepharmaceutique, qte } = med;
        await editMedicament({ id, denomination, formepharmaceutique, qte }); // éviter d'écraser l'image actuelle
    } catch (e) {
        med.livrer();
        console.error(e);
    }
}


function exportPDF() {
    const doc = new jsPDF()
    doc.text('Liste des médicaments :', 10, 10)

    filteredMedicaments.value.forEach((med, index) => {
        doc.text(`${index + 1}. ${med.denomination} - Qté: ${med.qte}`, 10, 20 + index * 10)
    })

    doc.save('medicaments.pdf')
}
</script>

<template>
    <h2>Quoi de neuf docteur ?</h2>
    <br>
    <input v-model="searchTerm" type="search" placeholder="Rechercher un médicament" class="form-control mb-3" />
    <div class="d-flex">
        <router-link to="/ajouter" class="btn btn-primary btn-sm mb-3">
            Ajouter un médicament
        </router-link>
        <button @click="exportPDF" class="btn btn-primary btn-sm mb-3">Exporter PDF</button>
        <div class="form-check form-switch mb-3">
            <input class="form-check-input" type="checkbox" v-model="displayChart" id="displayChartSwitch">
            <label class="form-check-label" for="displayChartSwitch">Afficher le diagramme</label>
        </div>
    </div>

    <div v-if="loading">Chargement…</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="d-flex flex-wrap justify-content-between">
        <MedicamentItem v-for="medicament in filteredMedicaments" :key="medicament.id" :medicament="medicament"
            @supprimer="deleteMed" @livrer="livraisonMed" @dispenser="dispensationMed" />
    </div>
    <MedicamentChart v-if="displayChart" :medicaments="filteredMedicaments" />
</template>