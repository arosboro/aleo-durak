import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";
import { Account, Address, ViewKey, PrivateKey } from "@entropy1729/aleo-js";
import axios from "axios";

const newAccount: () => string = () => {
  const account = new Account();
  const privateKey = account.privateKey();
  return privateKey.to_string();
};

export const useAccountStore = defineStore("accounts", () => {
  const key00 = useLocalStorage("key00", newAccount());
  const key01 = useLocalStorage("key01", newAccount());
  const key02 = useLocalStorage("key02", newAccount());
  const key03 = useLocalStorage("key03", newAccount());
  const key04 = useLocalStorage("key04", newAccount());
  const key05 = useLocalStorage("key05", newAccount());
  const key06 = useLocalStorage("key06", newAccount());
  const key07 = useLocalStorage("key07", newAccount());

  const acc00 = ref<Account>(new Account({ privateKey: key00.value }));
  const acc00Address = computed<Address>(() => acc00.value.address());
  const acc00ViewKey = computed<ViewKey>(() => acc00.value.viewKey());
  const acc00PrivateKey = computed<PrivateKey>(() => acc00.value.privateKey());
  const acc01 = ref<Account>(new Account({ privateKey: key01.value }));
  const acc01Address = computed<Address>(() => acc01.value.address());
  const acc01ViewKey = computed<ViewKey>(() => acc01.value.viewKey());
  const acc01PrivateKey = computed<PrivateKey>(() => acc01.value.privateKey());
  const acc02 = ref<Account>(new Account({ privateKey: key02.value }));
  const acc02Address = computed<Address>(() => acc02.value.address());
  const acc02ViewKey = computed<ViewKey>(() => acc02.value.viewKey());
  const acc02PrivateKey = computed<PrivateKey>(() => acc02.value.privateKey());
  const acc03 = ref<Account>(new Account({ privateKey: key03.value }));
  const acc03Address = computed<Address>(() => acc03.value.address());
  const acc03ViewKey = computed<ViewKey>(() => acc03.value.viewKey());
  const acc03PrivateKey = computed<PrivateKey>(() => acc03.value.privateKey());
  const acc04 = ref<Account>(new Account({ privateKey: key04.value }));
  const acc04Address = computed<Address>(() => acc04.value.address());
  const acc04ViewKey = computed<ViewKey>(() => acc04.value.viewKey());
  const acc04PrivateKey = computed<PrivateKey>(() => acc04.value.privateKey());
  const acc05 = ref<Account>(new Account({ privateKey: key05.value }));
  const acc05Address = computed<Address>(() => acc05.value.address());
  const acc05ViewKey = computed<ViewKey>(() => acc05.value.viewKey());
  const acc05PrivateKey = computed<PrivateKey>(() => acc05.value.privateKey());
  const acc06 = ref<Account>(new Account({ privateKey: key06.value }));
  const acc06Address = computed<Address>(() => acc06.value.address());
  const acc06ViewKey = computed<ViewKey>(() => acc06.value.viewKey());
  const acc06PrivateKey = computed<PrivateKey>(() => acc06.value.privateKey());
  const acc07 = ref<Account>(new Account({ privateKey: key07.value }));
  const acc07Address = computed<Address>(() => acc07.value.address());
  const acc07ViewKey = computed<ViewKey>(() => acc07.value.viewKey());
  const acc07PrivateKey = computed<PrivateKey>(() => acc07.value.privateKey());

  async function pour(account: Account) {
    const body = {
      address: account.address().to_string(),
      amount: 100000,
    };
    try {
      const result = await axios.post("/api/testnet3/faucet/pour", body);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    acc00,
    acc00Address,
    acc00ViewKey,
    acc00PrivateKey,
    acc01,
    acc01Address,
    acc01ViewKey,
    acc01PrivateKey,
    acc02,
    acc02Address,
    acc02ViewKey,
    acc02PrivateKey,
    acc03,
    acc03Address,
    acc03ViewKey,
    acc03PrivateKey,
    acc04,
    acc04Address,
    acc04ViewKey,
    acc04PrivateKey,
    acc05,
    acc05Address,
    acc05ViewKey,
    acc05PrivateKey,
    acc06,
    acc06Address,
    acc06ViewKey,
    acc06PrivateKey,
    acc07,
    acc07Address,
    acc07ViewKey,
    acc07PrivateKey,
    pour,
  };
});
