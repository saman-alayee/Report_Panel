<template>
    <div>
      <canvas ref="lineChartCanvas" class="line-chart-canvas"></canvas>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { Chart } from 'chart.js/auto';
  
  const lineChartCanvas = ref(null);
  
  onMounted(() => {
    const ctx = lineChartCanvas.value.getContext('2d');
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Sample Data',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1,
          borderWidth: 2,
          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
          pointBorderColor: 'rgba(75, 192, 192, 1)',
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
            text: 'Line Chart with Custom Boundaries'
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Months'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Values'
            },
            min: 0, // Set minimum y-axis value
            max: 100, // Set maximum y-axis value
            ticks: {
              stepSize: 20 // Set the interval between y-axis ticks
            }
          }
        }
      }
    });
  });
  </script>
  
  <style scoped>
  .line-chart-canvas {
    width: 100%;
    height: 400px;
  }
  </style>
  