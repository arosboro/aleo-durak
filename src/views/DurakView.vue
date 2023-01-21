<template>
  <div class="durak">
    <h1>Дурак</h1>
    <CasinoTableInvitation v-if="!record_count" />
    <CasinoTableGame v-if="record_count" />
  </div>
</template>

<script setup lang="ts">
import CasinoTableInvitation from "@/components/CasinoTableInvitation.vue";
import CasinoTableGame from "@/components/CasinoTableGame.vue";
import { useAccountStore } from "@/stores/account";
import { useCasinoTableStore } from "@/stores/aleo_casino_table";
import axios from "axios";
import { onMounted, onBeforeUnmount, ref, watch, computed } from "vue";
import type { Account } from "@entropy1729/aleo-js";

const CasinoTable = useCasinoTableStore();
const network = useAccountStore();
const account: Account = network.acc00.account;
const pollInterval = ref(0);
const blockHeight = ref(0);
const txIds = ref(CasinoTable.txIds);
const record_count = computed(() => txIds.value.length);

const fetchBlockHeight = async () => {
  try {
    const response = await axios.get("/api/testnet3/latest/height");
    blockHeight.value = response.data;
  } catch (error) {
    console.log(error);
  }
};

const watchBlockHeight = () => {
  pollInterval.value = setInterval(async () => {
    try {
      await fetchBlockHeight();
    } catch (error) {
      console.log(error);
    }
  }, 30000);
};

watch(blockHeight, async (oldBlockHeight, newBlockHeight) => {
  if (oldBlockHeight !== newBlockHeight) {
    console.log("Block height changed");
    try {
      const response = await axios.post("/api/testnet3/records/unspent", {
        view_key: account.viewKey().to_string(),
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
});

onMounted(() => {
  fetchBlockHeight();
  watchBlockHeight();
});

onBeforeUnmount(() => {
  clearInterval(pollInterval.value);
  pollInterval.value = 0;
});
</script>

<style>
@media (min-width: 1024px) {
  .about {
    width: 100%;
    min-height: 100vh;
    display: flex-grid;
    align-items: center;
  }
}
</style>
