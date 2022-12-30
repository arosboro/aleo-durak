import { ref, computed } from "vue";
import { defineStore } from "pinia";

export interface Card {
  suit: string;
  rank: string;
  color: string;
  value: number;
  bits: number;
  new_from_bits(bits: number): void;
}

export type CardList = Card[];

export const valid_suits = ["♠", "♥", "♦", "♣"];
export const valid_ranks = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export const useCardStore = defineStore("card", () => {
  const suit = ref("");
  const rank = ref("");
  const color = computed(() => {
    if (suit.value === "♠" || suit.value === "♣") {
      return "black";
    } else {
      return "red";
    }
  });
  const value = computed(() => {
    const index = valid_ranks.indexOf(rank.value);
    if (index < 9) {
      return index + 1;
    } else {
      return 10;
    }
  });
  const bits = computed(() => {
    return (
      (valid_ranks.indexOf(rank.value) << 2) | valid_suits.indexOf(suit.value)
    );
  });
  const new_from_bits = (bits: number) => {
    suit.value = valid_suits[bits & 3];
    rank.value = valid_ranks[(bits >> 2) & 15];
  };

  return { suit, rank, color, value, bits, new_from_bits };
});
