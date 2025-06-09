<script setup>
import { defineProps } from 'vue'
import Medicament from '../models/medicament'
import emptyMedic from '@/assets/empty_medic.jpeg';

defineProps({
  medicament: {
    type: Medicament,
    required: true
  }
})

const emit = defineEmits(['delete','deliver', 'dispense']);
</script>

<template>
  <div class="card mb-3">
    <div class="row g-0 align-items-center">
      <div class="col-auto mx-2">
        <img :src="'https://apipharmacie.pecatte.fr/images/' + medicament.photo" @error="$event.target.src = emptyMedic"
          alt="photo du médicament" class="medicament-photo" />
      </div>

      <div class="col">
        <div class="card-body p-2">

          <h5 class="card-title mb-1">{{ medicament.denomination }}</h5>
          <p class="mb-1"><strong>Forme :</strong> {{ medicament.formepharmaceutique }}</p>
          <p class="mb-2"><strong>Qté :</strong> {{ medicament.qte }}</p>

          <div class="btn-group btn-group-sm" role="group">
            <router-link :to="`/modifier/${medicament.id}`" class="btn btn-outline-success">
              Modifier
            </router-link>
            <button class="btn btn-outline-primary" @click="emit('deliver', medicament)">+1</button>
            <button class="btn btn-outline-primary" @click="emit('dispense', medicament)">-1</button>
            <button class="btn btn-outline-danger" @click="emit('delete', medicament.id)">
              Supprimer
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
.medicament-photo {
  width: 100px;
  height: auto;
  object-fit: cover;
}
</style>
