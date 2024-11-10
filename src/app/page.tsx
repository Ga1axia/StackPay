"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

import { Connect } from "@stacks/connect-react";

import ConnectWallet, { userSession } from "../components/ConnectWallet";
import ContractCallVote from "../components/ContractCallVote";

// Import the smart contract function
import { triggerSmartContract } from "../components/ContractCallVote"; // Adjust the import based on your project structure
const numPay = 2.73;
export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [numPay, setNumPay] = useState(""); // New state variable for input
  const [isWalletConnected, setIsWalletConnected] = useState(false); // New state to track wallet connection

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setIsWalletConnected(userSession.isUserSignedIn()); // Check if wallet is connected
  }, [userSession]);

  const handleButtonClick = async () => {
    try {
      // Call the smart contract function without arguments
      await triggerSmartContract(); 
      alert("Smart contract triggered successfully!");
    } catch (error) {
      console.error("Error triggering smart contract:", error);
      alert("Failed to trigger smart contract.");
    }
  };

  if (!isClient) return null;

  return (
    <Connect
      authOptions={{
        appDetails: {
          name: "Stacks Next.js Template",
          icon: window.location.origin + "/logo.png",
        },
        redirectTo: "/",
        onFinish: () => {
          window.location.reload();
          setIsWalletConnected(true); // Update wallet connection state on finish
        },
        userSession,
      }}
    >
      <main className={styles.main} style={{ backgroundImage: `url('https://example.com/cool-background.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', color: 'purple' }}>
        <div style={{ position: 'absolute', top: '20px', left: '20px' }}> {/* Positioning the logo in the top left corner */}
          <Image src="/futuretech.jpg" alt="Logo" width={100} height={100} />
        </div>
        <div className={styles.center} style={{ fontSize: '40px', margin: '10px', justifyContent: 'top', color: 'purple' }}>
          <h1>StackPay</h1>
        </div>
        <div style={{ margin: '10px', display: 'flex', justifyContent: 'center' }}>
          {/* ConnectWallet file: `./src/components/ConnectWallet.js` */}
          <ConnectWallet />
        </div>
        {isWalletConnected && ( // Only show input if wallet is connected
          <div style={{ margin: '10px', display: 'flex', justifyContent: 'center' }}>
            <input 
              type="text" 
              value={numPay} 
              onChange={(e) => setNumPay(e.target.value)} 
              placeholder="Enter payment amount" 
              style={{ 
                width: '300px', 
                padding: '10px', 
                fontSize: '16px', 
                borderRadius: 'var(--border-radius)', 
                border: '1px solid rgba(var(--callout-border-rgb), 0.5)',
                marginBottom: '10px',
                color: 'purple'
              }} 
            />
          </div>
        )}
        {/* ContractCallVote file: `./src/components/ContractCallVote.js` */}
        <ContractCallVote />
      </main>
    </Connect>
  );
}
