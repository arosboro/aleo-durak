import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Player, PlayerList } from "./player";

export interface Table {
  dealer: Player;
  players: PlayerList;
  seats: number;
  ready_states: boolean[];
  defender: Player;
  attackers: PlayerList;
}

export type TableList = Table[];

export const useTableStore = defineStore("table", () => {
  const dealer = ref({} as Player);
  const players = ref([] as PlayerList);
  const seats = ref(0);
  const ready_states = computed(() => {
    return players.value.map((player) => player.ready);
  });

  return { dealer, players, seats, ready_states };
});
