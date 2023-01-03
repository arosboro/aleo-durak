import { ref } from "vue";
import { defineStore } from "pinia";

// import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";

// const { wallet, publicKey, sendTransaction, signAllTransactions, viewKey } =
//   useWallet();

export interface CasinoTable {
  owner: string;
  gates: number;
  seats: number;
  seats_occupied: number;
  seats_ready: number;
  dealer: string;
  player: string;
  random_seed_hash: string;
  random_seed: number;
}

export type CasinoTableList = CasinoTable[];

export const useCasinoTableStore = defineStore("casinoTable", () => {
  const owner = ref("");
  const gates = ref(0);
  const seats = ref(0);
  const seats_occupied = ref(0);
  const seats_ready = ref(0);
  const dealer = ref("");
  const player = ref("");
  const random_seed_hash = ref("");
  const random_seed = ref(0);

  return {
    owner,
    gates,
    seats,
    seats_occupied,
    seats_ready,
    dealer,
    player,
    random_seed_hash,
    random_seed,
  };
});
