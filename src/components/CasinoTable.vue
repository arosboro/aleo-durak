<script setup lang="ts">
import { defineProps } from "vue";
import { Table, useTableStore } from "@/store/table";

export interface Props extends Table {
}

const props = withDefaults(defineProps<Props>(), {
  cards: () => [],
  players: () => [],
  dealer: () => "",
});

const { msg, labels } = toRefs(props);

const table = useTableStore();

