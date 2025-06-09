<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: String
})

const localValue = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  localValue.value = newVal
})
</script>

<template>
  <input
    v-model="localValue"
    type="search"
    placeholder="Rechercher un médicament"
    class="form-control mb-3"
    @input="$emit('update:modelValue', localValue)"
  />
</template>