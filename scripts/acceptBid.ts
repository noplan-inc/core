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

const uploadIpfs = async (params: any, node: IPFS.IPFS): Promise<string> => {
  const result = await node.add(params)
  return `https://ipfs.io/ipfs/${result.path}`;
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

  const zora = new Zora(wallet, args.chainId, addressBook.media, addressBook.market);

  const bidder = '0xee0c1D98DCC9721745a2E815A73b497DC80D66Ec';
  const mediaId = 2;
  const bid = await zora.fetchCurrentBidForBidder(mediaId, bidder);
  console.log({
    h1: bid.amount.toString(),
    h2: bid.bidder,
    h3: bid.currency,
    h4: bid.recipient,
    h5: bid.sellOnShare
  });

  const tx = await zora.acceptBid(2, bid);
  console.log(tx.hash);

  await tx.wait(5);

  console.log('accept bid! success!')
}

start()
  .then(() => process.exit(0))
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  });
