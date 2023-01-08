<script setup lang="ts">
import { computed, ref } from "vue";
import { useAccountStore } from "@/stores/account";
import { useTableInvitationStore } from "@/stores/table_invitation";
import IconFlame from "./icons/IconFlame.vue";
import IconError from "./icons/IconError.vue";
import IconValid from "./icons/IconValid.vue";
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";
// import { PublicKeyInput } from "@/react_app/PublicKeyInput";
// import { ExecuteTransactionButton } from "@/react_app/ExecuteTransactionButton";
// import { applyPureReactInVue } from "veaury";
// import { Account, NodeConnection } from "@entropy1729/aleo-js";
import axios from "axios";
import type { Account } from "@entropy1729/aleo-js";

// const VuePublicKeyInput = applyPureReactInVue(PublicKeyInput);
// const VueExecuteTransactionButton = applyPureReactInVue(
//   ExecuteTransactionButton
// );

const highlightjs = hljsVuePlugin.component;

const network = useAccountStore();
const store = useTableInvitationStore();
const player00 = ref(store.player00);
const player01 = ref(store.player01);
const player02 = ref(store.player02);
const player03 = ref(store.player03);
const player04 = ref(store.player04);
const player05 = ref(store.player05);
const player06 = ref(store.player06);
const player07 = ref(store.player07);

set(0, network.acc00.address.to_string());
set(1, network.acc01.address.to_string());
set(2, network.acc02.address.to_string());
set(3, network.acc03.address.to_string());
set(4, network.acc04.address.to_string());
set(5, network.acc05.address.to_string());
set(6, network.acc06.address.to_string());
set(7, network.acc07.address.to_string());

const random_seed = ref(store.random_seed);

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

function pour(account: Account) {
  const body = {
    address: account.address().to_string(),
    amount: 100,
  };
  axios
    .post("/api/testnet3/faucet/pour", body)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

function execute() {
  const account = network.acc00.account;
  const arg0 = random_seed.value?.toString() + "u64";
  const arg1 = player01.value?.toString();
  const arg2 = player02.value?.toString();
  const arg3 = player03.value?.toString();
  const arg4 = player04.value?.toString();
  const arg5 = player05.value?.toString();
  const arg6 = player06.value?.toString();
  const arg7 = player07.value?.toString();
  // TODO: use an environment variable for uri parameter
  const transaction = {
    private_key: account.privateKey().to_string(),
    program_id: "aleo_casino_table.aleo",
    function_name: "main",
    inputs: [arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7],
    additional_fee: 0,
  };
  axios
    .post("/api/testnet3/program/execute", transaction)
    .then((res) => {
      console.log(res);
      // Then get the transaction and store the relevant results
      const transaction_id = res.data.transaction_id;
    })
    .catch((err) => {
      console.log(err);
    });
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
  <section>
    <form class="table">
      <!-- <div class="field table__player01">
        <label>Player 1</label>
        <VuePublicKeyInput />
      </div> -->
      <div class="field table__player00">
        <label :for="player00?.toString()">Player 1</label>
        <input
          @blur="set(0, player00?.toString() || '')"
          :id="player00?.toString()"
          type="text"
          v-model="player00"
        />
      </div>
      <div class="field table__player01">
        <label :for="player01?.toString()">Player 2</label>
        <input
          @blur="set(1, player01?.toString() || '')"
          :id="player01?.toString()"
          type="text"
          v-model="player01"
        />
      </div>
      <div class="field table__player02">
        <label :for="player02?.toString()">Player 3</label>
        <i @click="burnToPlayer(2)">
          <IconFlame />
        </i>
        <input
          @blur="set(2, player02?.toString() || '')"
          :id="player02?.toString()"
          type="text"
          v-model="player02"
        />
      </div>
      <div class="field table__player03">
        <label :for="player03?.toString()">Player 4</label>
        <i @click="burnToPlayer(3)">
          <IconFlame />
        </i>
        <input
          @blur="set(3, player03?.toString() || '')"
          :id="player03?.toString()"
          type="text"
          v-model="player03"
        />
      </div>
      <div class="field table__player04">
        <label :for="player04?.toString()">Player 5</label>
        <i @click="burnToPlayer(4)">
          <IconFlame />
        </i>
        <input
          @blur="set(4, player04?.toString() || '')"
          :id="player04?.toString()"
          type="text"
          v-model="player04"
        />
      </div>
      <div class="field table__player05">
        <label :for="player05?.toString()">Player 6</label>
        <i @click="burnToPlayer(5)">
          <IconFlame />
        </i>
        <input
          @blur="set(5, player05?.toString() || '')"
          :id="player05?.toString()"
          type="text"
          v-model="player05"
        />
      </div>
      <div class="field table__player06">
        <label :for="player06?.toString()">Player 7</label>
        <i @click="burnToPlayer(6)">
          <IconFlame />
        </i>
        <input
          @blur="set(6, player06?.toString() || '')"
          :id="player06?.toString()"
          type="text"
          v-model="player06"
        />
      </div>
      <div class="field table__player07">
        <label :for="player07?.toString()">Player 8</label>
        <i @click="burnToPlayer(7)">
          <IconFlame />
        </i>
        <input
          @blur="set(7, player02?.toString() || '')"
          :id="player07?.toString()"
          type="text"
          v-model="player07"
        />
      </div>
      <button @click.prevent="execute">Create Table</button>
      <!-- <VueExecuteTransactionButton
        label="Create Table"
        :arg0="random_seed"
        :arg1="player01"
        :arg2="player02"
        :arg3="player03"
        :arg4="player04"
        :arg5="player05"
        :arg6="player06"
        :arg7="player07"
      /> -->
    </form>
    <div class="wrapper">
      <i class="validation valid" v-show="allValid">
        <IconValid />
      </i>
      <i class="validation error" v-show="!allValid">
        <IconError />
      </i>
      <highlightjs
        autodetect
        language="bash"
        :code="`slingshot execute aleo_casino_table.aleo main ${random_seed}u64 ${player01} ${player02} ${player03} ${player04} ${player05} ${player06} ${player07}`"
      />
    </div>
  </section>
</template>

<style scoped>
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
