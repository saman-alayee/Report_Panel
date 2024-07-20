<template>
    <div class="">
        <canvas ref="pieChartCanvas"></canvas>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Chart } from 'chart.js/auto';

const pieChartCanvas = ref(null);

onMounted(() => {
    const ctx = pieChartCanvas.value.getContext('2d');

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Red', 'Blue'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',

                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',

                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Pie Chart Example'
                }
            }
        }
    });
});
</script>

<style scoped>
/* Add any custom styles for your chart here */
</style>