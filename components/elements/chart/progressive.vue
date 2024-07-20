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
  
  const addData = (chart, label, data) => {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    chart.update();
  };
  
  const removeData = (chart) => {
    chart.data.labels.shift();
    chart.data.datasets.forEach((dataset) => {
      dataset.data.shift();
    });
    chart.update();
  };
  
  onMounted(() => {
    chart = new Chart(canvas.value, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Progressive Line',
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          data: [],
        }]
      },
      options: {
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Time'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Value'
            }
          }
        }
      }
    });
  
    let count = 0;
    const interval = setInterval(() => {
      if (chart.data.labels.length >= 20) {
        removeData(chart);
      }
      addData(chart, count, Math.floor(Math.random() * 100));
      count++;
    }, 1000);
  
    onBeforeUnmount(() => {
      clearInterval(interval);
      if (chart) {
        chart.destroy();
      }
    });
  });
  </script>
  