import { computed } from "vue";
import { defineStore } from "pinia";
import { Account, Address, ViewKey, PrivateKey } from "@entropy1729/aleo-js";

export interface AccountInfo {
  account: Account;
  address: Address;
  viewKey: ViewKey;
  privateKey: PrivateKey;
}

function newAccount(): AccountInfo {
  const account = new Account();
  return {
    account,
    address: account.address(),
    viewKey: account.viewKey(),
    privateKey: account.privateKey(),
  };
}

const acc00 = computed(newAccount);
const acc01 = computed(newAccount);
const acc02 = computed(newAccount);
const acc03 = computed(newAccount);
const acc04 = computed(newAccount);
const acc05 = computed(newAccount);
const acc06 = computed(newAccount);
const acc07 = computed(newAccount);

export const useAccountStore = defineStore("accounts", () => {
  return {
    acc00,
    acc01,
    acc02,
    acc03,
    acc04,
    acc05,
    acc06,
    acc07,
  };
});
