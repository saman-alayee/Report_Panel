<template>
    <div>
      <canvas ref="canvas"></canvas>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
  
  Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);
  
  const canvas = ref(null);
  let chart;
  
  onMounted(() => {
    chart = new Chart(canvas.value, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Sample Data',
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          data: [65, 59, 80, 81, 56, 55, 40],
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Month'
            }
          },
          y: {
            min: 0,
            max: 100,
            title: {
              display: true,
              text: 'Value'
            }
          }
        }
      }
    });
  });
  
  onBeforeUnmount(() => {
    if (chart) {
      chart.destroy();
    }
  });
  </script>
  
  <style scoped>
  /* Add any styles here if necessary */
  </style>
  