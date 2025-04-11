import React from 'react';
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useCallback, useEffect, useState } from "react";
import {Address} from "@ton/core";

const useTonConnection = () => {

    console.log("Привет")

    const [tonConnectUI] = useTonConnectUI();
  
    const [tonWalletAddress, setTonWalletAddress] = useState(null);
  
    const [isLoading, setIsLoading] = useState(true);
  
    const handleWalletConnection = useCallback((address) => {
      setTonWalletAddress(address);
      console.log("Wallet connect successfuly");
      setIsLoading(false);
    }, [] )
  
    const handleWalletDisconnection = useCallback( () => {
      setTonWalletAddress(null);
      console.log("Wallet discconnection successfuly!")
      setIsLoading(false)
    }, [] )
  
  
    useEffect( () => {
  
       const checkWalletConnection = async () => {
        if (tonConnectUI.account?.address){
          handleWalletConnection(tonConnectUI.account.address)
        }
        else{
          handleWalletDisconnection()
        }
       }
  
       checkWalletConnection()
  
       const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
        if (wallet){
          handleWalletConnection(wallet.account.address)
        }
        else{
          handleWalletDisconnection()
        }
       })
  
  
       return () => {
        unsubscribe()
       }
  
    }, [tonConnectUI, handleWalletConnection, handleWalletConnection] );
  
  
    const handleWalletAction = async () => {
      if (tonConnectUI.connected){
        setIsLoading(true);
        await tonConnectUI.disconnect();
      }
      else{
        await tonConnectUI.openModal()
      }
     }
  
    const formatAdress = (address) => {
      const tempAdress = Address.parse(address).toString()
      return `${tempAdress.slice(0, 4)}...${tempAdress.slice(-4)}`
    }

    return {tonWalletAddress, isLoading, handleWalletAction, formatAdress}
};

export default useTonConnection;