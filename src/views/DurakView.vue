<template>
  <div class="durak">
    <h1>Дурак</h1>
    <CasinoTableInvitation />
  </div>
</template>

<script setup lang="ts">
import CasinoTableInvitation from "@/components/CasinoTableInvitation.vue";
import { useAccountStore } from "@/stores/account";
import axios from "axios";
import { onMounted, onBeforeUnmount, ref, watch } from "vue";
import type { Account } from "@entropy1729/aleo-js";

const network = useAccountStore();
const account: Account = network.acc00.account;
const pollInterval = ref(0);
const blockHeight = ref(0);

const fetchBlockHeight = () => {
  axios
    .get("/api/testnet3/latest/height")
    .then((response) => {
      blockHeight.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const watchBlockHeight = () => {
  pollInterval.value = setInterval(() => {
    fetchBlockHeight();
  }, 30000);
};

watch(blockHeight, (oldBlockHeight, newBlockHeight) => {
  if (oldBlockHeight !== newBlockHeight) {
    console.log("Block height changed");
    axios
      .post("/api/testnet3/records/all", {
        view_key: account.viewKey().to_string(),
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

onMounted(() => {
  fetchBlockHeight();
  watchBlockHeight();
});

onBeforeUnmount(() => {
  clearInterval(pollInterval.value);
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
