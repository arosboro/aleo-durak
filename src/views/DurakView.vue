<template>
  <div class="durak">
    <h1>Дурак</h1>
    <CasinoTableInvitation />
  </div>
</template>

<script setup lang="ts">
import CasinoTableInvitation from "@/components/CasinoTableInvitation.vue";
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
