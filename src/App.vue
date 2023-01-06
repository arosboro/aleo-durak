<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { computed } from "vue";
// https://github.com/devilwjp/veaury#react-in-vue---basic-usage
import { applyPureReactInVue } from "veaury";
// https://github.com/demox-labs/aleo-wallet-adapter#%EF%B8%8Fsetup
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import { WalletMultiButton } from "@demox-labs/aleo-wallet-adapter-reactui";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";

import { VueContainer } from "veaury";

import IntroMessage from "./components/IntroMessage.vue";

export default {
  name: "App",
  components: {
    WalletProvider: applyPureReactInVue(WalletProvider),
    WalletModalProvider: applyPureReactInVue(WalletModalProvider),
    WalletMultiButton: applyPureReactInVue(WalletMultiButton),
    VueContainer: applyPureReactInVue(VueContainer),
  },
  setup() {
    const wallets = computed(() => [
      new LeoWalletAdapter({
        appName: "Дурак",
      }),
    ]);

    return {
      DecryptPermission,
      WalletAdapterNetwork,
      wallets,
      IntroMessage,
      RouterLink,
      RouterView,
    };
  },
};
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
        <div class="wallet-modal-button">
          <WalletMultiButton class="wallet-multi-button" />
        </div>
        <header>
          <img
            alt="Vue logo"
            class="logo"
            src="@/assets/logo.svg"
            width="125"
            height="125"
          />

          <div class="wrapper">
            <VueContainer
              :component="IntroMessage"
              msg="Дурак"
              v-show="$route.path === '/'"
            />
            <nav>
              <VueContainer
                :component="RouterLink"
                :style="'all: default; margin-right: 1em; padding: 0.5em;'"
                to="/"
              >
                Home
              </VueContainer>
              <VueContainer
                :component="RouterLink"
                :style="'all: default; margin-right: 1em; padding: 0.5em;'"
                to="/durak"
              >
                Дурак
              </VueContainer>
            </nav>
          </div>
        </header>

        <VueContainer :component="RouterView" :wallets="wallets" />
      </section>
    </WalletModalProvider>
  </WalletProvider>
</template>

<style scoped>
.full .wallet-modal-button {
  display: none;
}

.wallet-modal-button {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 100;
}

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
    margin-left: 1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
