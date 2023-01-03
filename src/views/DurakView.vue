<template>
  <div class="durak">
    <h1>Дурак</h1>
    <CasinoTableInvitation :wallets="$props.wallets" :player00="publicKey" />
  </div>
</template>

<script setup lang="ts">
import CasinoTableInvitation from "@/components/CasinoTableInvitation.vue";
import {
  WalletContext,
  type WalletContextState,
} from "@demox-labs/aleo-wallet-adapter-react";
import { inject } from "vue";

// Implement this in the current project:
// export const WalletContext = createContext<WalletContextState>(DEFAULT_CONTEXT as WalletContextState);
//
// export function useWallet(): WalletContextState {
//   return useContext(WalletContext);
// }

const walletContext = inject<WalletContextState>(WalletContext);

const { publicKey } = walletContext || {};

defineProps<{
  wallets: any;
}>();
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
