import fs from 'fs-extra';
import { JsonRpcProvider } from '@ethersproject/providers';
import { MediaFactory } from '../typechain/MediaFactory';
import Decimal from '../utils/Decimal';
import { Zora } from '@zoralabs/zdk'
import { Wallet } from 'ethers'
import {
  constructBidShares,
  constructMediaData,
  sha256FromBuffer,
  generateMetadata,
} from '@zoralabs/zdk'
import IPFS from 'ipfs';


const chainEnvPath = {
  1: '.prod',
  4: '.dev',
  97: '.bsc'
}

async function start() {
  const args = require('minimist')(process.argv.slice(2), {
    string: ['tokenURI', 'metadataURI', 'contentHash', 'metadataHash'],
  });

  if (!args.chainId) {
    throw new Error('--chainId chain ID is required');
  }
  const path = `${process.cwd()}/.env${chainEnvPath[args.chainId]}`;
  await require('dotenv').config({ path });
  const provider = new JsonRpcProvider(process.env.RPC_ENDPOINT);
  const wallet = new Wallet(`0x${process.env.PRIVATE_KEY}`, provider);
  const sharedAddressPath = `${process.cwd()}/addresses/${args.chainId}.json`;
  // @ts-ignore
  const addressBook = JSON.parse(await fs.readFileSync(sharedAddressPath));
  if (!addressBook.media) {
    throw new Error(`Media contract has not yet been deployed`);
  }



  // const wallet = Wallet.createRandom()
  const zora = new Zora(wallet, args.chainId, addressBook.media, addressBook.market);

  await zora.burn(0);
  await zora.burn(1);
}

start()
  .then(() => process.exit(0))
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  });
