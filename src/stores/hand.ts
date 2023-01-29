import { ref } from "vue";
import { defineStore } from "pinia";
import type { Card, CardList } from "./card";
import type { Deck } from "./deck";

export interface Hand extends Deck {
  cards: CardList;
  play(card: Card): void;
}

export const useHandStore = defineStore("hand", () => {
  const cards = ref<CardList>([]);
  function play(card: Card) {
    cards.value.splice(cards.value.indexOf(card), 1);
  }

  return { cards, play };
});
