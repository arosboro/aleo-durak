<template>{{ $attrs.children }}</template>

<script lang="ts">
import { WalletContext } from "@demox-labs/aleo-wallet-adapter-react";
import { provide } from "vue";

export default {
  props: ["walletContextProvider"],
  // do not destructure props
  setup(props) {
    function useWallet() {
      const {
        autoConnect,
        wallets,
        wallet,
        publicKey,
        viewKey,
        connecting,
        connected,
        disconnecting,
        select,
        connect,
        disconnect,
        sendTransaction,
        signTransaction,
        signAllTransactions,
        signMessage,
        decrypt,
        requestViewKey,
      } = props.walletContextProvider || {};
      provide(WalletContext, {
        autoConnect,
        wallets,
        wallet,
        publicKey,
        viewKey,
        connecting,
        connected,
        disconnecting,
        select,
        connect,
        disconnect,
        sendTransaction,
        signTransaction,
        signAllTransactions,
        signMessage,
        decrypt,
        requestViewKey,
      });
    }
    return {
      useWallet,
    };
  },
};
</script>
