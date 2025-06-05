import { Address, beginCell, Cell, toNano } from '@ton/core';

export function buildJettonTransferPayload(
  amount: string,
  destinationAddress: Address,
  myJettonWalletAddress: Address
): Cell {
  const body = beginCell()
    .storeUint(0xf8a7ea5, 32)
    .storeUint(0, 64)
    .storeCoins(toNano(amount))
    .storeAddress(destinationAddress)
    .storeAddress(myJettonWalletAddress)
    .storeUint(0, 1)
    .storeCoins(toNano('0.02'))
    .storeUint(0, 1)
    .endCell();
  return body;
}
