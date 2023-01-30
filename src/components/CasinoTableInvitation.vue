<script setup lang="ts">
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
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
import { useCasinoTableStore } from "@/stores/aleo_casino_table";

// const VuePublicKeyInput = applyPureReactInVue(PublicKeyInput);
// const VueExecuteTransactionButton = applyPureReactInVue(
//   ExecuteTransactionButton
// );

const highlightjs = hljsVuePlugin.component;

const accountStore = useAccountStore();
const aleo_casino_table = useCasinoTableStore();
const tableInvitationStore = useTableInvitationStore();
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

const random_seed = ref(tableInvitationStore.random_seed);

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
  const { acc00 } = storeToRefs(accountStore);
  const arg0 = random_seed.value?.toString() + "u64";
  const arg1 = player01.value?.toString();
  const arg2 = player02.value?.toString();
  const arg3 = player03.value?.toString();
  const arg4 = player04.value?.toString();
  const arg5 = player05.value?.toString();
  const arg6 = player06.value?.toString();
  const arg7 = player07.value?.toString();
  const transaction = {
    private_key: acc00.value.privateKey().to_string(),
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
        // Unicode for tx icon before tx_result data is printed
        console.log("\u2705", tx_result.data);
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
            view_key: acc00.value.viewKey().to_string(),
          }
        );
        // The keys are hashes, (field values) in string format
        // Each record is JSON format of a serialized aleo_casino_table.aleo/CasinoTable.record
        aleo_casino_table.consume(unspent_records.data.records);
        clearInterval(timeout);
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

function burnToPlayer(index: number) {
  switch (index) {
    case 2:
      tableInvitationStore.$patch({
        player02: tableInvitationStore.burn_address,
      });
      player02.value = tableInvitationStore.burn_address;
      break;
    case 3:
      tableInvitationStore.$patch({
        player03: tableInvitationStore.burn_address,
      });
      player03.value = tableInvitationStore.burn_address;
      break;
    case 4:
      tableInvitationStore.$patch({
        player04: tableInvitationStore.burn_address,
      });
      player04.value = tableInvitationStore.burn_address;
      break;
    case 5:
      tableInvitationStore.$patch({
        player05: tableInvitationStore.burn_address,
      });
      player05.value = tableInvitationStore.burn_address;
      break;
    case 6:
      tableInvitationStore.$patch({
        player06: tableInvitationStore.burn_address,
      });
      player06.value = tableInvitationStore.burn_address;
      break;
    case 7:
      tableInvitationStore.$patch({
        player07: tableInvitationStore.burn_address,
      });
      player07.value = tableInvitationStore.burn_address;
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
          @blur="set(7, player07?.toString() || '')"
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
  float: right;
}

button:hover {
  background-color: #555;
}

button:active {
  background-color: #777;
}
</style>
