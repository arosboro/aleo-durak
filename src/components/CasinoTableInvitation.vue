<script setup lang="ts">
import { computed, ref } from "vue";
import {
  useTableInvitationStore,
  type Address,
} from "@/stores/table_invitation";
import IconFlame from "./icons/IconFlame.vue";
import IconError from "./icons/IconError.vue";
import IconValid from "./icons/IconValid.vue";
import "highlight.js/lib/common";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import { PublicKeyInput } from "@/react_app/PublicKeyInput";
import { ExecuteTransactionButton } from "@/react_app/ExecuteTransactionButton";
import { applyPureReactInVue } from "veaury";

const VuePublicKeyInput = applyPureReactInVue(PublicKeyInput);
const VueExecuteTransactionButton = applyPureReactInVue(
  ExecuteTransactionButton
);

const highlightjs = hljsVuePlugin.component;

const store = useTableInvitationStore();
// const player00 = ref(store.player00);
const player01 = ref(store.player01);
const player02 = ref(store.player02);
const player03 = ref(store.player03);
const player04 = ref(store.player04);
const player05 = ref(store.player05);
const player06 = ref(store.player06);
const player07 = ref(store.player07);

const random_seed = computed(() => {
  return Math.floor(Math.random() * 100);
});

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

function set(index: number, value: Address) {
  switch (index) {
    case 1:
      store.$patch({ player01: value });
      break;
    case 2:
      store.$patch({ player02: value });
      break;
    case 3:
      store.$patch({ player03: value });
      break;
    case 4:
      store.$patch({ player04: value });
      break;
    case 5:
      store.$patch({ player05: value });
      break;
    case 6:
      store.$patch({ player06: value });
      break;
    case 7:
      store.$patch({ player07: value });
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
      <div class="field table__player01">
        <label>Player 1</label>
        <VuePublicKeyInput />
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
          @blur="set(3, player02?.toString() || '')"
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
          @blur="set(4, player02?.toString() || '')"
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
          @blur="set(5, player02?.toString() || '')"
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
          @blur="set(6, player02?.toString() || '')"
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
      <VueExecuteTransactionButton
        label="Create Table"
        :arg0="random_seed"
        :arg1="player01"
        :arg2="player02"
        :arg3="player03"
        :arg4="player04"
        :arg5="player05"
        :arg6="player06"
        :arg7="player07"
      />
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
        :code="`slingshot execute aleo_casino_table main ${random_seed} ${player01} ${player02} ${player03} ${player04} ${player05} ${player06} ${player07}`"
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
