import type { FC, PropsWithChildren } from "react";
import React, { useMemo } from "react";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";

import "./ExecuteTransactionButton.css";
import axios from "axios";

export type ExecuteTransactionButtonProps = PropsWithChildren<{
  className?: string;
  label?: string;
  program_id: string;
  arg0?: string;
  arg1?: string;
  arg2?: string;
  arg3?: string;
  arg4?: string;
  arg5?: string;
  arg6?: string;
  arg7?: string;
}>;

export type Transaction = {
  private_key: string | null;
  program_id: string | null;
  function_name: string | null;
  inputs: string[];
  additional_fee: number;
};

export const ExecuteTransactionButton: FC<ExecuteTransactionButtonProps> = ({
  className,
  label,
  arg0,
  arg1,
  arg2,
  arg3,
  arg4,
  arg5,
  arg6,
  arg7,
}) => {
  const { connected, publicKey } = useWallet();

  const onClick = async () => {
    if (!connected) {
      return;
    }
    const transaction = {
      private_key: null,
      program_id: "aleo_casino_table.aleo",
      function_name: "main",
      inputs: [arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7],
      additional_fee: 0,
    } as Transaction;
    axios
      .post("http://localhost:4180/testnet3/execute", transaction)
      .then((res) => {
        console.log(res);
      });
  };

  const base58 = useMemo(() => publicKey?.toString(), [publicKey]);

  return (
    <button className={"transaction-button " + className} onClick={onClick}>
      {label}
    </button>
  );
};
