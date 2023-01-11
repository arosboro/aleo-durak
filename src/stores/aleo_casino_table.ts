import { ref } from "vue";
import { defineStore } from "pinia";

// import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";

// const { wallet, publicKey, sendTransaction, signAllTransactions, viewKey } =
//   useWallet();

export interface CasinoTable {
  records: CasinoTableList;
}

export interface CasinoTableInfo {
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
  const records = [] as CasinoTableList;

  return {
    records,
  };
});
