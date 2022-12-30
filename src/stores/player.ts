import { ref } from "vue";
import { defineStore } from "pinia";

export interface Player {
  address: string;
  dealer: boolean;
  ready: boolean;
  defender: boolean;
  attacker: boolean;
  random_seed: number;
}

export type PlayerList = Player[];

export const usePlayerStore = defineStore("player", () => {
  const address = ref("");
  const dealer = ref(false);
  const ready = ref(false);
  const random_seed = ref(0);

  return { address, dealer, ready, random_seed };
});
