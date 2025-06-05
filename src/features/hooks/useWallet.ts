import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { Address, toNano } from '@ton/core';
import { buildJettonTransferPayload } from '@/features/utils/buildJettonTransferPayload.ts';
import { JettonMaster, JettonWallet, TonClient } from '@ton/ton';
import { showAlert } from '@/features/hooks/useTelegramFeature.ts';

const destinationAddress = Address.parse(
  import.meta.env.VITE_TON_DESTINATION_ADDRESS
);

const client = new TonClient({
  endpoint: 'https://toncenter.com/api/v2/jsonRPC',
  apiKey: import.meta.env.VITE_TONCENTER_KEY,
});

const jettonMasterAddress = Address.parse(
  import.meta.env.VITE_JETTON_MASTER_ADDRESS
);

export const useWallet = () => {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  const connectWallet = async () => {
    await tonConnectUI.openModal();
  };

  const isWalletConnected = Boolean(wallet?.account.address);

  const generateTransaction = async (amount: number) => {
    //TODO: REMOVE
    return true;
    const ownerAddress = Address.parse(wallet?.account.address ?? '');
    let myJettonWalletAddress: Address;
    let balanceHuman = 0;

    try {
      const jettonMasterContract = client.open(
        JettonMaster.create(jettonMasterAddress)
      );
      myJettonWalletAddress =
        await jettonMasterContract.getWalletAddress(ownerAddress);
    } catch (err) {
      console.error('Failed to derive jetton wallet address:', err);
      return;
    }

    try {
      const myWalletContract = client.open(
        JettonWallet.create(myJettonWalletAddress)
      );
      const balanceLowest: bigint = await myWalletContract.getBalance();
      balanceHuman = Number(balanceLowest) / 1e9;
    } catch (err) {
      console.warn('Could not fetch user balance:', err);
    }

    if (amount > balanceHuman) {
      showAlert('Not enough NOT balance!');
      return false;
    }
    const body = buildJettonTransferPayload(
      amount.toString(),
      destinationAddress,
      myJettonWalletAddress
    );

    const forwardTon = toNano('0.05');

    try {
      const tx = {
        validUntil: Math.floor(Date.now() / 1000) + 300,
        messages: [
          {
            address: ownerAddress.toString(),
            amount: forwardTon.toString(),
            payload: body.toBoc().toString('base64'),
          },
        ],
      };
      await tonConnectUI.sendTransaction(tx);
      return true;
    } catch (e) {
      showAlert('Something went wrong');
      console.error('[Tx Error]', e);
      return false;
    }
  };

  return {
    connectWallet,
    isWalletConnected,
    generateTransaction,
  };
};
