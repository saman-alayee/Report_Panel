<template>
    <div>
      <header>
        <!-- Custom Header Content -->
        <h1>Custom Header</h1>
      </header>
      <main>
        <!-- This is where the page content will be injected -->
        <NuxtPage />
      </main>
      <footer>
        <!-- Custom Footer Content -->
        <p>Custom Footer</p>
      </footer>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  /* Add any styles here if necessary */
  header {
    background-color: #333;
    color: #fff;
    padding: 1rem;
  }
  main {
    padding: 1rem;
  }
  footer {
    background-color: #333;
    color: #fff;
    padding: 1rem;
    text-align: center;
  }
  </style>
  