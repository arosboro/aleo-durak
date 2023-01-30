// Create a Provider that can get react hooks
// This Provider will be exported as a react component,
// and all of the vue components in this Provider can get the status of react hooks

import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { createCrossingProviderForPureReactInVue } from "veaury";

// Execute 'useReactRouterForVue' in the setup function of the vue component to get the object returned by the incoming function
const [useReactUseWalletForVue, ReactUseWalletProviderForVue] =
  createCrossingProviderForPureReactInVue(() => {
    return {
      wallet: useWallet(),
    };
  });

export { useReactUseWalletForVue, ReactUseWalletProviderForVue };
