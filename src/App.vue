<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { computed } from "vue";
// https://github.com/devilwjp/veaury#react-in-vue---basic-usage
import { applyPureReactInVue } from "veaury";
// https://github.com/demox-labs/aleo-wallet-adapter#%EF%B8%8Fsetup
import { WalletProvider as WalletProviderReact } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider as WalletModalProviderReact } from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter as LeoWalletAdapterReact } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";

import Introduction from "./components/IntroMessage.vue";

const WalletProvider = applyPureReactInVue(WalletProviderReact);
const WalletModalProvider = applyPureReactInVue(WalletModalProviderReact);

const wallets = computed(() => [
  new LeoWalletAdapterReact({
    appName: "Дурак",
  }),
]);
</script>

<template>
  <WalletProvider
    :wallets="wallets"
    :decryptPermission="DecryptPermission.UponRequest"
    :network="WalletAdapterNetwork.Localnet"
    autoConnect
  >
    <WalletModalProvider>
      <section :class="$route.path === '/' ? 'full' : 'lowprofile'">
        <header>
          <img
            alt="Vue logo"
            class="logo"
            src="@/assets/logo.svg"
            width="125"
            height="125"
          />

          <div class="wrapper">
            <Introduction msg="Дурак" v-show="$route.path === '/'" />

            <nav>
              <RouterLink to="/">Home</RouterLink>
              <RouterLink to="/durak">Дурак</RouterLink>
            </nav>
          </div>
        </header>

        <RouterView />
      </section>
    </WalletModalProvider>
  </WalletProvider>
</template>

<style scoped>
@import "@demox-labs/aleo-wallet-adapter-reactui/dist/styles.css";

.full header {
  line-height: 1.5;
}

.lowprofile header {
  line-height: 1.5;
  width: 100%;
}

.lowprofile header .logo {
  width: 2em;
  height: 2em;
  margin: 1em;
  display: inline-block;
  max-width: 4em;
  width: auto;
  vertical-align: top;
}

.lowprofile header div.wrapper {
  display: inline-block;
  margin: 1em;
  max-width: calc(1280px - 4em);
  width: auto;
}

.lowprofile header nav {
  text-align: left;
  margin: 0;
  display: inline-block;
  max-width: inherit;
  width: inherit;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  .lowprofile header {
    max-height: 10vh;
    display: inline-block;
    padding-right: initial;
  }

  .lowprofile header .logo {
    width: 2em;
    height: 2em;
    margin: 1em;
    display: inline-block;
    max-width: 4em;
    width: auto;
  }

  .lowprofile header div.wrapper {
    display: inline-block;
    max-width: calc(1280px - 4em);
    vertical-align: top;
    width: auto;
  }

  .lowprofile header nav {
    text-align: left;
    margin: 0;
    display: inline-block;
    max-width: inherit;
    width: inherit;
    padding: 0;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 1rem 2rem;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
