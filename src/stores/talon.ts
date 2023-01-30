import { ref } from "vue";
import { defineStore } from "pinia";
import type { Card, CardList } from "./card";
import type { Deck } from "./deck";

export interface Talon extends Deck {
  cards: CardList;
  take(card: Card): void;
}

export const useHandStore = defineStore("hand", () => {
  const cards = ref([] as CardList);
  function play(card: Card) {
    cards.value.splice(cards.value.indexOf(card), 1);
  }

  return { cards, play };
});
