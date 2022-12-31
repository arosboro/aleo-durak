<script setup lang="ts">
import { defineProps, toRefs } from "vue";
import { useCasinoTableStore } from "@/stores/aleo_casino_table";

export interface Props {
  table?: ReturnType<typeof useCasinoTableStore>;
}

const props = withDefaults(defineProps<Props>(), {
  table: () => useCasinoTableStore(),
});

const { table } = toRefs(props);
</script>

<template>
  <div class="table">
    <div class="field table__seats">
      <label for="seats">Seats</label>
      <div id="seats">{{ table.seats }}</div>
    </div>
    <div class="field table__seats_occupied">
      <label for="seats_occupied">Seats Occupied</label>
      <div id="seats_occupied">{{ table.seats_occupied }}</div>
    </div>
    <div class="field table__seats_ready">
      <label for="seats_ready">Seats Ready</label>
      <div id="seats_ready">{{ table.seats_ready }}</div>
    </div>
    <div class="field table__dealer">
      <label for="dealer">Dealer</label>
      <div id="dealer">{{ table.dealer }}</div>
    </div>
    <div class="field table__player">
      <label for="player">Player</label>
      <div id="player">{{ table.player }}</div>
    </div>
  </div>
</template>
