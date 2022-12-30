<script setup lang="ts">
defineProps<{
  id: number;
  rank?: boolean;
  suit: string;
  color: string;
}>();
</script>

<template>
  <div :class="'card ' + color + '-card'">
    <span class="rank">{{ rank }}</span>
    <span class="suit">{{ suit }}</span>
  </div>
</template>
