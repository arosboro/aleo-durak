import { ref } from "vue";
import { defineStore } from "pinia";

export interface BufferSeries256Bit {
  b00: number;
  b01: number;
  b02: number;
  b03: number;
  b04: number;
  b05: number;
  b06: number;
  b07: number;
}

export interface AleoBitwiseStack {
  owner: string;
  gates: number;
  capacity: number;
  top: number;
  member_size: number;
  s00: BufferSeries256Bit;
  s01: BufferSeries256Bit;
  s02: BufferSeries256Bit;
  s03: BufferSeries256Bit;
  _nonce: BigInteger;
}

export const useStackStore = defineStore("stack", () => {
  const stacks = ref<AleoBitwiseStack[]>([]);

  return { stacks };
});
