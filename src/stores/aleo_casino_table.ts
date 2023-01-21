import { defineStore } from "pinia";

// import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";

// const { wallet, publicKey, sendTransaction, signAllTransactions, viewKey } =
//   useWallet();

export interface CasinoTable {
  records: CasinoTableList;
}

export interface CasinoTableInfo {
  owner: string;
  gates: bigint;
  seats: number;
  seats_occupied: number;
  seats_ready: number;
  dealer: string;
  player: string;
  random_seed_hash: bigint;
  random_seed: bigint;
  _nonce: bigint;
}

export interface RawCasinoTable {
  owner: string;
  gates: string;
  seats: string;
  seats_occupied: string;
  seats_ready: string;
  dealer: string;
  player: string;
  random_seed_hash: string;
  random_seed: string;
  _nonce: string;
}

export type RestResponse = {
  [key: string]: string;
};

export type CasinoTableList = {
  [key: string]: CasinoTableInfo;
};

export type txList = string[];

export const useCasinoTableStore = defineStore("CasinoTable", () => {
  const records = {} as CasinoTableList;
  const txIds = [] as txList;

  function parse_record(response: string): CasinoTableInfo {
    const record_body = response
      .replace(/ {2}/g, '  "')
      .replace(/: /g, '": "')
      .replace(/,/g, '",')
      .replace(/\n}/g, '"\n}');
    const record: RawCasinoTable = JSON.parse(record_body);
    return {
      owner: record.owner.replace(".private", ""),
      gates: BigInt(record.gates.replace("u64.private", "")),
      seats: parseInt(record.seats.replace("u8.private", "")),
      seats_occupied: parseInt(record.seats_occupied.replace("u8.private", "")),
      seats_ready: parseInt(record.seats_ready.replace("u8.private", "")),
      dealer: record.dealer.replace(".private", ""),
      player: record.player.replace(".private", ""),
      random_seed_hash: BigInt(
        record.random_seed_hash.replace("field.private", "")
      ),
      random_seed: BigInt(record.random_seed.replace("u64.private", "")),
      _nonce: BigInt(record._nonce.replace("group.public", "")),
    };
  }

  function consume(response: RestResponse): void {
    const keys = Object.keys(response);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const record: CasinoTableInfo = parse_record(response[key]);
      txIds.push(key);
      records[key] = record;
      // Unicode for record icon before printing record and key.
      console.log("\u{1F4C8}", key, record);
    }
  }

  return {
    records,
    txIds,
    consume,
  };
});
