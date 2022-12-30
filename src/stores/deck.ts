import { ref } from "vue";
import { defineStore } from "pinia";
import type { CardList } from "./card";

export interface Deck {
  cards: CardList;
  shuffle(): void;
}

export const useDeckStore = defineStore("deck", () => {
  const cards = ref([] as CardList);
  function shuffle() {
    let currentIndex = cards.value.length,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [cards.value[currentIndex], cards.value[randomIndex]] = [
        cards.value[randomIndex],
        cards.value[currentIndex],
      ];
    }
  }

  return { cards, shuffle };
});
