import { computed } from "vue";
import { defineStore } from "pinia";
import { Account, Address, ViewKey, PrivateKey } from "@entropy1729/aleo-js";
import axios from "axios";

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

const acc00 = computed(newAccount);
const acc01 = computed(newAccount);
const acc02 = computed(newAccount);
const acc03 = computed(newAccount);
const acc04 = computed(newAccount);
const acc05 = computed(newAccount);
const acc06 = computed(newAccount);
const acc07 = computed(newAccount);

// await pour(acc00.value.account);

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
    pour,
  };
});
