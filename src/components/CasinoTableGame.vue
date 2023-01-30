<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAccountStore } from "@/stores/account";
import { useTableInvitationStore } from "@/stores/table_invitation";
import IconInfo from "./icons/IconInfo.vue";
import "highlight.js/lib/common";
// import { PublicKeyInput } from "@/react_app/PublicKeyInput";
// import { ExecuteTransactionButton } from "@/react_app/ExecuteTransactionButton";
// import { applyPureReactInVue } from "veaury";
// import { Account, NodeConnection } from "@entropy1729/aleo-js";
import { useCasinoTableStore } from "@/stores/aleo_casino_table";

// const VuePublicKeyInput = applyPureReactInVue(PublicKeyInput);
// const VueExecuteTransactionButton = applyPureReactInVue(
//   ExecuteTransactionButton
// );

const accountStore = useAccountStore();
const casinoTableStore = useCasinoTableStore();
const tableInvitationStore = useTableInvitationStore();

const { records } = storeToRefs(casinoTableStore);

const {
  player00,
  player01,
  player02,
  player03,
  player04,
  player05,
  player06,
  player07,
} = storeToRefs(tableInvitationStore);

const players = [
  player00,
  player01,
  player02,
  player03,
  player04,
  player05,
  player06,
  player07,
];

const {
  acc00Address,
  acc01Address,
  acc02Address,
  acc03Address,
  acc04Address,
  acc05Address,
  acc06Address,
  acc07Address,
} = storeToRefs(accountStore);

set(0, acc00Address.value.to_string());
set(1, acc01Address.value.to_string());
set(2, acc02Address.value.to_string());
set(3, acc03Address.value.to_string());
set(4, acc04Address.value.to_string());
set(5, acc05Address.value.to_string());
set(6, acc06Address.value.to_string());
set(7, acc07Address.value.to_string());

const visibility = ref(false);

function set(index: number, value: string | null) {
  switch (index) {
    case 0:
      tableInvitationStore.$patch({ player00: value });
      player00.value = value;
      break;
    case 1:
      tableInvitationStore.$patch({ player01: value });
      player01.value = value;
      break;
    case 2:
      tableInvitationStore.$patch({ player02: value });
      player02.value = value;
      break;
    case 3:
      tableInvitationStore.$patch({ player03: value });
      player03.value = value;
      break;
    case 4:
      tableInvitationStore.$patch({ player04: value });
      player04.value = value;
      break;
    case 5:
      tableInvitationStore.$patch({ player05: value });
      player05.value = value;
      break;
    case 6:
      tableInvitationStore.$patch({ player06: value });
      player06.value = value;
      break;
    case 7:
      tableInvitationStore.$patch({ player07: value });
      player07.value = value;
      break;
  }
}
</script>

<template>
  <i @click="visibility = !visibility">
    <IconInfo />
  </i>
  <section v-if="!visibility">
    <!-- A table with 8 chairs potentially not all available (no icon for a chair),
       with players represented by icons of humans facing around a table, but not 
       all seated (icon visibility depending on record for readyness) -->
    <div class="table">
      <div
        class="table__chair"
        v-for="player in players"
        :key="player.value?.toString()"
      >
        <div class="table__player">
          <div class="table__player__icon">
            <!-- <IconPlayer /> -->
          </div>
          <div class="table__player__name">
            <p>
              {{ player.value?.slice(0, 4) + ".." + player.value?.slice(-4) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section v-if="visibility">
    <!-- Print CasinoTableInfo properties in a formated card view with labels -->
    <!-- owner, gates, seats, seats_occupied, seats_ready, dealer, player, random_seed_hash, random_seed, _nonce are the fields to show -->
    <div v-for="record in records" :key="record.owner" class="card">
      <div class="card__header">
        <h3 class="card__title">Дурак Table</h3>
      </div>
      <div class="card__body">
        <div class="field table__owner">
          <label>Owner</label>
          <p class="value">{{ record.owner }}</p>
        </div>
        <div class="field table__gates">
          <label>Gates</label>
          <p class="value">{{ record.gates }}</p>
        </div>
        <div class="field table__seats">
          <label>Seats</label>
          <p class="value">{{ record.seats }}</p>
        </div>
        <div class="field table__seats_occupied">
          <label>Seats Occupied</label>
          <p class="value">{{ record.seats_occupied }}</p>
        </div>
        <div class="field table__seats_ready">
          <label>Seats Ready</label>
          <p class="value">{{ record.seats_ready }}</p>
        </div>
        <div class="field table__dealer">
          <label>Dealer</label>
          <p class="value">{{ record.dealer }}</p>
        </div>
        <div class="field table__player">
          <label>Player</label>
          <p class="value">{{ record.player }}</p>
        </div>
        <div class="field table__random_seed_hash">
          <label>Random Seed Hash</label>
          <p class="value">{{ record.random_seed_hash }}</p>
        </div>
        <div class="field table__random_seed">
          <label>Random Seed</label>
          <p class="value">{{ record.random_seed }}</p>
        </div>
        <div class="field table__nonce">
          <label>Nonce</label>
          <p class="value">{{ record._nonce }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Chairs positioned relatively around 16:8 ratio table at 360/8 degrees seperation */

.table {
  position: relative;
  width: 80%;
  height: 0;
  margin-top: 10%;
  padding-bottom: 40%;
  /* vegas casino velvet green */
  background-color: #2b2b2b;
  border-radius: 4px;
}

.table__chair {
  position: absolute;
  width: 4rem;
  height: 4rem;
  border-radius: 4px;
  background-color: #f5f5f5;
}

.table__player__name {
  color: #2b2b2b;
  margin: 0;
  padding: 0.6em;
  font-size: 1rem;
  text-align: center;
  word-wrap: break-word;
}

.table__chair:nth-child(1) {
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}

.table__chair:nth-child(2) {
  top: 0%;
  left: 75%;
  transform: translate(-50%, -50%);
}

.table__chair:nth-child(3) {
  top: 50%;
  left: 100%;
  transform: translate(-50%, -50%);
}

.table__chair:nth-child(4) {
  top: 100%;
  left: 75%;
  transform: translate(-50%, -50%);
}

.table__chair:nth-child(5) {
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.table__chair:nth-child(6) {
  top: 100%;
  left: 25%;
  transform: translate(-50%, -50%);
}

.table__chair:nth-child(7) {
  top: 50%;
  left: 0%;
  transform: translate(-50%, -50%);
}

.table__chair:nth-child(8) {
  top: 0%;
  left: 25%;
  transform: translate(-50%, -50%);
}

/* Position table__chair values on top or bottom of chairs
 depending on the side of the table they appear */

.table__chair:nth-child(1) .value {
  top: -4rem;
  left: 50%;
  transform: translate(-50%, -50%);
}

.table__chair:nth-child(2) .value {
  top: -4rem;
  left: 50%;
  transform: translate(-50%, -50%);
}

.table__chair:nth-child(3) .value {
  top: -4rem;
  left: 50%;
  transform: translate(-50%, -50%);
}

.table__chair:nth-child(4) .value {
  top: 4rem;
  left: 50%;
  transform: translate(-50%, -50%);
}

.table__chair:nth-child(5) .value {
  top: 4rem;
  left: 50%;
  transform: translate(-50%, -50%);
}

.table__chair:nth-child(6) .value {
  top: 4rem;
  left: 50%;
  transform: translate(-50%, -50%);
}

.table__chair:nth-child(7) .value {
  top: -4rem;
  left: 50%;
  transform: translate(-50%, -50%);
}

section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

pre,
code {
  white-space: pre-wrap;
}

pre {
  margin-top: 1rem;
  width: auto;
  height: auto;
}

code {
  background-color: #f5f5f5;
  padding: 0.5rem;
  border-radius: 4px;
}

.field {
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
}

.field label {
  /* on top of the input */
  width: 6rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.field i {
  /* before the input on the same row */
  width: 2rem;
  height: 2rem;
  margin-right: 0.5rem;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: #333;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}

.field i.validation,
.field i.error {
  margin-top: 1rem;
}

.field input {
  width: 64em;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.table__player00 input,
.table__player01 input {
  margin-left: 2.5rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #333;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background-color: #555;
}

button:active {
  background-color: #777;
}
</style>
