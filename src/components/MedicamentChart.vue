<script setup>
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { computed } from 'vue'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
    medicaments: {
        type: Array,
        required: true
    }
})

const chartData = computed(() => {
    const counts = {}

    props.medicaments.forEach(med => {
        const denomination = med.denomination || 'Inconnue'
        counts[denomination] = (counts[denomination] || 0) + (med.qte || 0)
    })

    return {
        labels: Object.keys(counts),
        datasets: [
            {
                label: 'Quantité totale',
                backgroundColor: '#0d6efd',
                data: Object.values(counts)
            }
        ]
    }
})

const chartOptions = {
    responsive: true,
    plugins: {
        legend: { display: false },
        title: { display: false }
    }
}
</script>

<template>
    <div>
        <h4 class="mb-3">Répartition des médicaments :</h4>
        <Bar :data="chartData" :options="chartOptions" />
    </div>
</template>
