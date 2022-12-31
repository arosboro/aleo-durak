<template>
  <div class="about">
    <h1>Дурак</h1>
    <CasinoTable />
  </div>
</template>

<script setup lang="ts">
import CasinoTable from "@/components/CasinoTable.vue";
</script>

<style>
@media (min-width: 1024px) {
  .about {
    width: 100%;
    min-height: 100vh;
    display: flex-grid;
    align-items: center;
  }
}
</style>
