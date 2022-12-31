<script setup lang="ts">
import { defineProps, toRefs } from "vue";
import { usePlayerStore } from "@/stores/player";

export interface Props {
  player?: ReturnType<typeof usePlayerStore>;
}

const props = withDefaults(defineProps<Props>(), {
  player: () => usePlayerStore(),
});

const { player } = toRefs(props);
</script>

<template>
  <div class="player">
    <div class="player__address">
      <label for="address">Address</label>
      <div id="address">{{ player.address }}</div>
    </div>
    <div class="player__dealer">
      <label for="dealer">Dealer</label>
      <div id="dealer">{{ player.dealer }}</div>
    </div>
    <div class="player__ready">
      <label for="ready">Ready</label>
      <div id="ready">{{ player.ready }}</div>
    </div>
    <div class="player__defender">
      <label for="defender">Defender</label>
      <div id="defender">{{ player.defender }}</div>
    </div>
    <div class="player__attacker">
      <label for="attacker">Attacker</label>
      <div id="attacker">{{ player.attacker }}</div>
    </div>
    <div class="player__random_seed">
      <label for="random_seed">Random Seed</label>
      <div id="random_seed">{{ player.random_seed }}</div>
    </div>
  </div>
</template>

<style></style>
