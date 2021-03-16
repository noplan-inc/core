import fs from 'fs-extra';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { MediaOvmFactory } from '../typechain/MediaOvmFactory';
import Decimal from '../utils/Decimal';
import {
  signMintWithSigMessage,
  EIP712Domain,
  generateMetadata,
  sha256FromBuffer,
  constructMediaData,
} from '@zoralabs/zdk';
import IPFS from 'ipfs';

const uploadIpfs = async (params: any, node: IPFS.IPFS): Promise<string> => {
  const result = await node.add(params);
  return `https://ipfs.io/ipfs/${result.path}`;
};


const chainId = {
  1: '.prod',
  4: '.dev',
  420: '.optimism',
};

async function start() {
  const args = require('minimist')(process.argv.slice(2), {
    string: ['tokenURI', 'metadataURI', 'contentHash', 'metadataHash'],
  });

  if (!args.chainId) {
    throw new Error('--chainId chain ID is required');
  }

  const path = `${process.cwd()}/.env${chainId[args.chainId]}`;

  await require('dotenv').config({ path });
  const provider = new JsonRpcProvider(process.env.RPC_ENDPOINT);
  // const wallet = new Wallet(`0x${process.env.PRIVATE_KEY}`, provider);
  const serviceWallet = new Wallet(`0x${process.env.PRIVATE_KEY}`, provider);
  const creatorWallet = new Wallet(`0x${process.env.PRIVATE_KEY2}`, provider);
  const sharedAddressPath = `${process.cwd()}/addresses/${args.chainId}.json`;
  // @ts-ignore
  const addressBook = JSON.parse(await fs.readFileSync(sharedAddressPath));
  if (!addressBook.media) {
    throw new Error(`Media contract has not yet been deployed`);
  }
  console.log('addressBook.media', addressBook.media);

  const media = MediaOvmFactory.connect(addressBook.media, serviceWallet);

  const metadataJSON = generateMetadata('zora-20210101', {
    description: '',
    mimeType: 'text/plain',
    name: '',
    version: 'zora-20210101',
  });

  const content = 'hello world in optimism';


  const contentHash = sha256FromBuffer(Buffer.from(content));
  const metadataHash = sha256FromBuffer(Buffer.from(metadataJSON));

  const node = await IPFS.create();
  const tokenURI = await uploadIpfs(content, node);
  const metadataURI = await uploadIpfs(metadataJSON, node);

  console.log('metadataJSON', metadataJSON);
  console.log('contentHash', contentHash);
  console.log('metadataHash', metadataHash);

  const mediaData = constructMediaData(
    tokenURI,
    metadataURI,
    contentHash,
    metadataHash,
  );

  const date = new Date();
  // 1hのつもり
  const deadline = Math.floor(date.getTime() / 1000) + 3600;

  const domain: EIP712Domain = {
    name: 'Zora',
    version: '1',
    chainId: 420,
    verifyingContract: addressBook.media,
  };

  console.log(domain);

  try {

    const signedMessage = await signMintWithSigMessage(
      creatorWallet,
      Buffer.from(contentHash).slice(0,32),
      Buffer.from(metadataHash).slice(0,32),
      Decimal.new(0.1).value,
      1,
      deadline,
      domain,
    );
    console.log('signedMessage', signedMessage);

    const bidShare = {
      prevOwner: Decimal.new(0),
      creator: Decimal.new(0.1),
      owner: Decimal.new(100 - 0.1),
    };
    //
    console.log('minting.....');
    const mintTx = await media.mintWithSig(
      creatorWallet.address,
      mediaData,
      bidShare,
      signedMessage,
    );

    await mintTx.wait();

    console.log('minted!')

    // const total = await media.totalSupply();
    // console.log(total.toNumber());

    console.log(`New piece is minted ☼☽`);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

start()
  .then(()=> process.exit(0))
  .catch((e: Error) => {
  console.error(e);
  process.exit(1);
});
