<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs } from "vue";
import { useTableStore } from "@/store/table";
import { useDeckStore } from "@/store/deck";

export interface Props {
  msg?: string;
  labels?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  msg: "hello",
  labels: () => ["one", "two"],
});

const { msg, labels } = toRefs(props);
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
