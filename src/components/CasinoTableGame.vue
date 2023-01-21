<script setup lang="ts">
import { computed, ref } from "vue";
import { useAccountStore } from "@/stores/account";
import { useTableInvitationStore } from "@/stores/table_invitation";
import IconFlame from "./icons/IconFlame.vue";
import IconError from "./icons/IconError.vue";
import IconValid from "./icons/IconValid.vue";
import IconInfo from "./icons/IconInfo.vue";
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";
// import { PublicKeyInput } from "@/react_app/PublicKeyInput";
// import { ExecuteTransactionButton } from "@/react_app/ExecuteTransactionButton";
// import { applyPureReactInVue } from "veaury";
// import { Account, NodeConnection } from "@entropy1729/aleo-js";
import axios from "axios";
import type { Account } from "@entropy1729/aleo-js";
import { useCasinoTableStore } from "@/stores/aleo_casino_table";

// const VuePublicKeyInput = applyPureReactInVue(PublicKeyInput);
// const VueExecuteTransactionButton = applyPureReactInVue(
//   ExecuteTransactionButton
// );

const highlightjs = hljsVuePlugin.component;

const network = useAccountStore();
const CasinoTable = useCasinoTableStore();
const store = useTableInvitationStore();

const records = ref(CasinoTable.records);

const player00 = ref(store.player00);
const player01 = ref(store.player01);
const player02 = ref(store.player02);
const player03 = ref(store.player03);
const player04 = ref(store.player04);
const player05 = ref(store.player05);
const player06 = ref(store.player06);
const player07 = ref(store.player07);
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

set(0, network.acc00.address.to_string());
set(1, network.acc01.address.to_string());
set(2, network.acc02.address.to_string());
set(3, network.acc03.address.to_string());
set(4, network.acc04.address.to_string());
set(5, network.acc05.address.to_string());
set(6, network.acc06.address.to_string());
set(7, network.acc07.address.to_string());

const random_seed = ref(store.random_seed);
const visibility = ref(false);

const allValid = computed(() => {
  return (
    player01.value?.length === 63 &&
    player02.value?.length === 63 &&
    player03.value?.length === 63 &&
    player04.value?.length === 63 &&
    player05.value?.length === 63 &&
    player06.value?.length === 63 &&
    player07.value?.length === 63
  );
});

async function execute() {
  const account: Account = network.acc00.account;
  const arg0 = random_seed.value?.toString() + "u64";
  const arg1 = player01.value?.toString();
  const arg2 = player02.value?.toString();
  const arg3 = player03.value?.toString();
  const arg4 = player04.value?.toString();
  const arg5 = player05.value?.toString();
  const arg6 = player06.value?.toString();
  const arg7 = player07.value?.toString();
  const transaction = {
    private_key: account.privateKey().to_string(),
    program_id: "aleo_casino_table.aleo",
    function_name: "main",
    inputs: [arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7],
  };
  try {
    const result = await axios.post(
      "/api/testnet3/program/execute",
      transaction
    );
    console.log(result.data.transaction_id);
    // Then get the transaction and store the relevant results
    // TODO: This fails
    const transaction_id = result.data.transaction_id;
    const uri = "/api/testnet3/transaction/" + transaction_id;
    try {
      const timeout = setTimeout(async () => {
        const tx_result = await axios.get(uri);
        console.log(tx_result);
        clearInterval(timeout);
      }, 1500);
    } catch (e) {
      console.log(e);
    }
    // It should show up in unspent records as soon as program/execute resolves
    try {
      const timeout = setTimeout(async () => {
        const unspent_records = await axios.post(
          "/api/testnet3/records/unspent",
          {
            view_key: account.viewKey().to_string(),
          }
        );
        // The keys are hashes, (field values) in string format
        const keys = Object.keys(unspent_records.data.records);
        for (let i = 0; i < keys.length; i++) {
          // Each record is JSON format of a serialized aleo_casino_table.aleo/CasinoTable.record
          CasinoTable.consume(unspent_records.data.records[keys[i]]);
          clearInterval(timeout);
        }
      }, 1500);
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }
}

function set(index: number, value: string | null) {
  switch (index) {
    case 0:
      store.$patch({ player00: value });
      player00.value = value;
      break;
    case 1:
      store.$patch({ player01: value });
      player01.value = value;
      break;
    case 2:
      store.$patch({ player02: value });
      player02.value = value;
      break;
    case 3:
      store.$patch({ player03: value });
      player03.value = value;
      break;
    case 4:
      store.$patch({ player04: value });
      player04.value = value;
      break;
    case 5:
      store.$patch({ player05: value });
      player05.value = value;
      break;
    case 6:
      store.$patch({ player06: value });
      player06.value = value;
      break;
    case 7:
      store.$patch({ player07: value });
      player07.value = value;
      break;
  }
}

function burnToPlayer(index: number) {
  switch (index) {
    case 2:
      store.$patch({ player02: store.burn_address });
      player02.value = store.burn_address;
      break;
    case 3:
      store.$patch({ player03: store.burn_address });
      player03.value = store.burn_address;
      break;
    case 4:
      store.$patch({ player04: store.burn_address });
      player04.value = store.burn_address;
      break;
    case 5:
      store.$patch({ player05: store.burn_address });
      player05.value = store.burn_address;
      break;
    case 6:
      store.$patch({ player06: store.burn_address });
      player06.value = store.burn_address;
      break;
    case 7:
      store.$patch({ player07: store.burn_address });
      player07.value = store.burn_address;
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
            <IconPlayer />
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
