"use client";

import React, { useEffect, useState } from "react";
import { useConnect } from "@stacks/connect-react";
import { StacksTestnet } from "@stacks/network";
import {
  AnchorMode,
  PostConditionMode,
  stringUtf8CV,
  uintCV,
} from "@stacks/transactions";
import { userSession } from "./ConnectWallet";

// export const triggerSmartContract = () => {
//   console.log("Smart contract triggered!");
// };
import { Pc } from '@stacks/transactions';

const postCondition = Pc.principal('STB44HYPYAT2BB2QE513NSP81HTMYWBJP02HPGK6')
  .willSendLte(999999999999999)
  .ustx();
const payNum = 3;
export const triggerSmartContract = () => {
  const { doContractCall } = useConnect();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  function pay(pick: string) {
    doContractCall({
      network: new StacksTestnet(),
      anchorMode: AnchorMode.Any,
      contractAddress: "STJ8VVRY1GF5BZMS2D5691S1V1E956AEA9WNDVWP",
      contractName: "empirical-chocolate-starfish",
      functionName: "send-to-recipient",
      functionArgs: [uintCV(pick)],
      postConditionMode: PostConditionMode.Allow,
      postConditions: [postCondition],
      onFinish: (data) => {
        console.log("onFinish:", data);
        console.log("Transaction Successful!")
      },
      onCancel: () => {
        console.log("onCancel:", "Transaction was canceled");
      },
    });
  }

  if (!mounted || !userSession.isUserSignedIn()) {
    return null;
  }

  return (
    <div className="Container" style = {{margin: '10'}}>
      <button className="Connect" onClick={() => pay("" + 3)}>
        Pay
      </button>
    </div>
  );
};

export default triggerSmartContract;
