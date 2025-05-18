<script setup>
import { onMounted, reactive, ref } from 'vue'
import { defineProps } from 'vue'
import { getMedicamentById, addMedicament, editMedicament } from '../utils/api'
import { useRouter } from 'vue-router';

const { mode, id } = defineProps({
    mode: String,
    id: String
});

const medicament = reactive({
    id: null,
    denomination: '',
    formepharmaceutique: '',
    photo: '',
    qte: 0
});

const modifiedImage = ref(false);

onMounted(async () => {
    if (mode === 'edit' && id) {
        const data = await getMedicamentById(id);

        Object.assign(medicament, {
            id: data._id,
            denomination: data._denomination,
            formepharmaceutique: data._formepharmaceutique,
            photo: data._photo,
            qte: Number(data._qte),
        });
    }
});

const router = useRouter();

function goBack() {
    router.back();
}

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        medicament.photo = reader.result
        modifiedImage.value = true;
    };
    reader.readAsDataURL(file);
};

async function submitForm() {
    try {
        if (mode === 'add') {
            await addMedicament(medicament);

        } else {
            const dataToSend = { ...medicament };
            if (!modifiedImage.value) delete dataToSend.photo; // ne pas écraser l'image côté serveur si l'on ne la touche pas

            await editMedicament(dataToSend);
        }

        alert('Enregistré avec succès !');
    } catch (error) {
        console.error('Erreur lors de l’envoi du formulaire :', error);
    }
}


</script>

<template>
    <button @click="goBack" class="btn btn-secondary my-3">
        Retour
    </button>
    <h2>{{ mode === 'add' ? 'Ajouter un médicament' : 'Modifier le médicament' }}</h2>

    <form class="d-flex flex-column" @submit.prevent="submitForm">
        <input v-model="medicament.denomination" class="form-control mb-3" placeholder="Dénomination" />
        <input v-model="medicament.formepharmaceutique" class="form-control mb-3" placeholder="Forme pharmaceutique" />
        <input v-model.number="medicament.qte" type="number" class="form-control mb-3" placeholder="Quantité" />
        <input id="photo" @change="handleFileUpload" type="file" class="form-control mb-3" />

        <button class="btn btn-primary btn-sm" type="submit">
            {{ mode === 'add' ? 'Ajouter' : 'Enregistrer' }}
        </button>
    </form>
</template>
