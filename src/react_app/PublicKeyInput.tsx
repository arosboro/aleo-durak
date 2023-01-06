import type { FC, PropsWithChildren, ReactElement } from "react";
import React, { useMemo } from "react";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";

import "./PublicKeyInput.css";

export type PublicKeyInputProps = PropsWithChildren<{
  className?: string;
}>;

export const PublicKeyInput: FC<PublicKeyInputProps> = ({ className }) => {
  const { publicKey } = useWallet();
  console.log(useWallet());

  const base58 = useMemo(() => publicKey?.toString(), [publicKey]);

  return (
    <input
      className={"public-key-input " + className}
      type="text"
      readOnly
      value={base58 || ""}
      placeholder="Not connected"
    />
  ) as ReactElement;
};
