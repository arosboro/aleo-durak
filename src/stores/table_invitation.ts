import { ref, computed } from "vue";
import { defineStore } from "pinia";

export interface TableInvitation {
  player01: string | null;
  player02: string | null;
  player03: string | null;
  player04: string | null;
  player05: string | null;
  player06: string | null;
  player07: string | null;
  burnToPlayer(index: number): void;
}

export type Address = string | null;

export const useTableInvitationStore = defineStore("table_invitation", () => {
  const player00 = ref("" as Address);
  const player01 = ref("" as Address);
  const player02 = ref("" as Address);
  const player03 = ref("" as Address);
  const player04 = ref("" as Address);
  const player05 = ref("" as Address);
  const player06 = ref("" as Address);
  const player07 = ref("" as Address);

  function set(index: number, address: string | null) {
    if (index === 0) {
      player00.value = address;
    }
    if (index === 1) {
      player01.value = address;
    }
    if (index === 2) {
      player02.value = address;
    }
    if (index === 3) {
      player03.value = address;
    }
    if (index === 4) {
      player04.value = address;
    }
    if (index === 5) {
      player05.value = address;
    }
    if (index === 6) {
      player06.value = address;
    }
    if (index === 7) {
      player07.value = address;
    }
    return address;
  }

  const burn_address = computed(
    () =>
      "aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc" as Address
  );

  return {
    player00,
    player01,
    player02,
    player03,
    player04,
    player05,
    player06,
    player07,
    set,
    burn_address,
  };
});
