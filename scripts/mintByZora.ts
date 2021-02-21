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



  // const wallet = Wallet.createRandom()
  const zora = new Zora(wallet, args.chainId, addressBook.media, addressBook.market);

  const metadataJSON = generateMetadata('zora-20210101', {
    description: '',
    mimeType: 'text/plain',
    name: '',
    version: 'zora-20210101',
  })

  const content = '{"size":25,"cells":[{"id":"id0","live":false},{"id":"id1","live":false},{"id":"id2","live":false},{"id":"id3","live":false},{"id":"id4","live":false},{"id":"id5","live":false},{"id":"id6","live":false},{"id":"id7","live":false},{"id":"id8","live":false},{"id":"id9","live":false},{"id":"id10","live":false},{"id":"id11","live":false},{"id":"id12","live":false},{"id":"id13","live":false},{"id":"id14","live":false},{"id":"id15","live":false},{"id":"id16","live":false},{"id":"id17","live":false},{"id":"id18","live":false},{"id":"id19","live":true},{"id":"id20","live":false},{"id":"id21","live":false},{"id":"id22","live":false},{"id":"id23","live":false},{"id":"id24","live":false},{"id":"id25","live":false},{"id":"id26","live":false},{"id":"id27","live":false},{"id":"id28","live":false},{"id":"id29","live":false},{"id":"id30","live":false},{"id":"id31","live":false},{"id":"id32","live":false},{"id":"id33","live":false},{"id":"id34","live":false},{"id":"id35","live":false},{"id":"id36","live":false},{"id":"id37","live":false},{"id":"id38","live":false},{"id":"id39","live":false},{"id":"id40","live":false},{"id":"id41","live":false},{"id":"id42","live":false},{"id":"id43","live":true},{"id":"id44","live":false},{"id":"id45","live":true},{"id":"id46","live":false},{"id":"id47","live":false},{"id":"id48","live":false},{"id":"id49","live":false},{"id":"id50","live":false},{"id":"id51","live":false},{"id":"id52","live":true},{"id":"id53","live":true},{"id":"id54","live":true},{"id":"id55","live":false},{"id":"id56","live":false},{"id":"id57","live":false},{"id":"id58","live":false},{"id":"id59","live":false},{"id":"id60","live":false},{"id":"id61","live":false},{"id":"id62","live":false},{"id":"id63","live":false},{"id":"id64","live":false},{"id":"id65","live":false},{"id":"id66","live":false},{"id":"id67","live":false},{"id":"id68","live":true},{"id":"id69","live":false},{"id":"id70","live":false},{"id":"id71","live":true},{"id":"id72","live":false},{"id":"id73","live":false},{"id":"id74","live":false},{"id":"id75","live":false},{"id":"id76","live":false},{"id":"id77","live":false},{"id":"id78","live":false},{"id":"id79","live":false},{"id":"id80","live":false},{"id":"id81","live":false},{"id":"id82","live":false},{"id":"id83","live":true},{"id":"id84","live":false},{"id":"id85","live":false},{"id":"id86","live":false},{"id":"id87","live":false},{"id":"id88","live":false},{"id":"id89","live":false},{"id":"id90","live":false},{"id":"id91","live":false},{"id":"id92","live":false},{"id":"id93","live":false},{"id":"id94","live":true},{"id":"id95","live":true},{"id":"id96","live":false},{"id":"id97","live":false},{"id":"id98","live":false},{"id":"id99","live":false},{"id":"id100","live":false},{"id":"id101","live":false},{"id":"id102","live":false},{"id":"id103","live":false},{"id":"id104","live":false},{"id":"id105","live":false},{"id":"id106","live":false},{"id":"id107","live":true},{"id":"id108","live":false},{"id":"id109","live":true},{"id":"id110","live":false},{"id":"id111","live":false},{"id":"id112","live":false},{"id":"id113","live":false},{"id":"id114","live":false},{"id":"id115","live":false},{"id":"id116","live":false},{"id":"id117","live":false},{"id":"id118","live":false},{"id":"id119","live":false},{"id":"id120","live":false},{"id":"id121","live":false},{"id":"id122","live":false},{"id":"id123","live":false},{"id":"id124","live":false},{"id":"id125","live":false},{"id":"id126","live":false},{"id":"id127","live":false},{"id":"id128","live":false},{"id":"id129","live":false},{"id":"id130","live":false},{"id":"id131","live":false},{"id":"id132","live":true},{"id":"id133","live":false},{"id":"id134","live":true},{"id":"id135","live":false},{"id":"id136","live":false},{"id":"id137","live":false},{"id":"id138","live":false},{"id":"id139","live":false},{"id":"id140","live":false},{"id":"id141","live":false},{"id":"id142","live":false},{"id":"id143","live":false},{"id":"id144","live":false},{"id":"id145","live":false},{"id":"id146","live":false},{"id":"id147","live":false},{"id":"id148","live":false},{"id":"id149","live":false},{"id":"id150","live":false},{"id":"id151","live":false},{"id":"id152","live":false},{"id":"id153","live":false},{"id":"id154","live":false},{"id":"id155","live":false},{"id":"id156","live":false},{"id":"id157","live":false},{"id":"id158","live":true},{"id":"id159","live":false},{"id":"id160","live":false},{"id":"id161","live":false},{"id":"id162","live":false},{"id":"id163","live":false},{"id":"id164","live":false},{"id":"id165","live":false},{"id":"id166","live":false},{"id":"id167","live":false},{"id":"id168","live":false},{"id":"id169","live":false},{"id":"id170","live":false},{"id":"id171","live":false},{"id":"id172","live":false},{"id":"id173","live":false},{"id":"id174","live":false},{"id":"id175","live":false},{"id":"id176","live":false},{"id":"id177","live":false},{"id":"id178","live":false},{"id":"id179","live":false},{"id":"id180","live":false},{"id":"id181","live":false},{"id":"id182","live":false},{"id":"id183","live":false},{"id":"id184","live":false},{"id":"id185","live":false},{"id":"id186","live":false},{"id":"id187","live":false},{"id":"id188","live":false},{"id":"id189","live":false},{"id":"id190","live":false},{"id":"id191","live":false},{"id":"id192","live":false},{"id":"id193","live":false},{"id":"id194","live":false},{"id":"id195","live":false},{"id":"id196","live":false},{"id":"id197","live":false},{"id":"id198","live":false},{"id":"id199","live":false},{"id":"id200","live":false},{"id":"id201","live":false},{"id":"id202","live":false},{"id":"id203","live":false},{"id":"id204","live":false},{"id":"id205","live":false},{"id":"id206","live":false},{"id":"id207","live":false},{"id":"id208","live":false},{"id":"id209","live":false},{"id":"id210","live":false},{"id":"id211","live":false},{"id":"id212","live":false},{"id":"id213","live":false},{"id":"id214","live":false},{"id":"id215","live":true},{"id":"id216","live":false},{"id":"id217","live":false},{"id":"id218","live":false},{"id":"id219","live":false},{"id":"id220","live":false},{"id":"id221","live":false},{"id":"id222","live":false},{"id":"id223","live":false},{"id":"id224","live":false},{"id":"id225","live":false},{"id":"id226","live":false},{"id":"id227","live":false},{"id":"id228","live":false},{"id":"id229","live":false},{"id":"id230","live":false},{"id":"id231","live":false},{"id":"id232","live":false},{"id":"id233","live":false},{"id":"id234","live":false},{"id":"id235","live":false},{"id":"id236","live":false},{"id":"id237","live":false},{"id":"id238","live":false},{"id":"id239","live":true},{"id":"id240","live":false},{"id":"id241","live":true},{"id":"id242","live":false},{"id":"id243","live":false},{"id":"id244","live":false},{"id":"id245","live":false},{"id":"id246","live":false},{"id":"id247","live":false},{"id":"id248","live":false},{"id":"id249","live":false},{"id":"id250","live":false},{"id":"id251","live":false},{"id":"id252","live":false},{"id":"id253","live":false},{"id":"id254","live":false},{"id":"id255","live":false},{"id":"id256","live":false},{"id":"id257","live":false},{"id":"id258","live":false},{"id":"id259","live":false},{"id":"id260","live":false},{"id":"id261","live":false},{"id":"id262","live":false},{"id":"id263","live":false},{"id":"id264","live":true},{"id":"id265","live":false},{"id":"id266","live":true},{"id":"id267","live":false},{"id":"id268","live":false},{"id":"id269","live":false},{"id":"id270","live":false},{"id":"id271","live":false},{"id":"id272","live":false},{"id":"id273","live":false},{"id":"id274","live":false},{"id":"id275","live":false},{"id":"id276","live":false},{"id":"id277","live":false},{"id":"id278","live":false},{"id":"id279","live":false},{"id":"id280","live":false},{"id":"id281","live":false},{"id":"id282","live":false},{"id":"id283","live":false},{"id":"id284","live":false},{"id":"id285","live":false},{"id":"id286","live":false},{"id":"id287","live":false},{"id":"id288","live":false},{"id":"id289","live":false},{"id":"id290","live":true},{"id":"id291","live":false},{"id":"id292","live":false},{"id":"id293","live":false},{"id":"id294","live":false},{"id":"id295","live":false},{"id":"id296","live":false},{"id":"id297","live":false},{"id":"id298","live":false},{"id":"id299","live":false},{"id":"id300","live":false},{"id":"id301","live":false},{"id":"id302","live":false},{"id":"id303","live":false},{"id":"id304","live":false},{"id":"id305","live":false},{"id":"id306","live":false},{"id":"id307","live":false},{"id":"id308","live":false},{"id":"id309","live":false},{"id":"id310","live":false},{"id":"id311","live":false},{"id":"id312","live":false},{"id":"id313","live":false},{"id":"id314","live":false},{"id":"id315","live":false},{"id":"id316","live":false},{"id":"id317","live":false},{"id":"id318","live":false},{"id":"id319","live":false},{"id":"id320","live":false},{"id":"id321","live":false},{"id":"id322","live":false},{"id":"id323","live":false},{"id":"id324","live":false},{"id":"id325","live":false},{"id":"id326","live":false},{"id":"id327","live":false},{"id":"id328","live":false},{"id":"id329","live":false},{"id":"id330","live":false},{"id":"id331","live":false},{"id":"id332","live":false},{"id":"id333","live":false},{"id":"id334","live":false},{"id":"id335","live":true},{"id":"id336","live":true},{"id":"id337","live":false},{"id":"id338","live":false},{"id":"id339","live":false},{"id":"id340","live":false},{"id":"id341","live":false},{"id":"id342","live":false},{"id":"id343","live":false},{"id":"id344","live":true},{"id":"id345","live":true},{"id":"id346","live":false},{"id":"id347","live":false},{"id":"id348","live":false},{"id":"id349","live":false},{"id":"id350","live":false},{"id":"id351","live":false},{"id":"id352","live":false},{"id":"id353","live":false},{"id":"id354","live":false},{"id":"id355","live":false},{"id":"id356","live":false},{"id":"id357","live":false},{"id":"id358","live":false},{"id":"id359","live":true},{"id":"id360","live":false},{"id":"id361","live":false},{"id":"id362","live":true},{"id":"id363","live":false},{"id":"id364","live":false},{"id":"id365","live":false},{"id":"id366","live":false},{"id":"id367","live":false},{"id":"id368","live":true},{"id":"id369","live":false},{"id":"id370","live":false},{"id":"id371","live":true},{"id":"id372","live":false},{"id":"id373","live":false},{"id":"id374","live":false},{"id":"id375","live":false},{"id":"id376","live":false},{"id":"id377","live":false},{"id":"id378","live":false},{"id":"id379","live":false},{"id":"id380","live":false},{"id":"id381","live":false},{"id":"id382","live":false},{"id":"id383","live":false},{"id":"id384","live":false},{"id":"id385","live":true},{"id":"id386","live":true},{"id":"id387","live":false},{"id":"id388","live":false},{"id":"id389","live":false},{"id":"id390","live":false},{"id":"id391","live":false},{"id":"id392","live":false},{"id":"id393","live":false},{"id":"id394","live":true},{"id":"id395","live":true},{"id":"id396","live":false},{"id":"id397","live":false},{"id":"id398","live":false},{"id":"id399","live":false},{"id":"id400","live":false},{"id":"id401","live":false},{"id":"id402","live":false},{"id":"id403","live":false},{"id":"id404","live":false},{"id":"id405","live":false},{"id":"id406","live":false},{"id":"id407","live":false},{"id":"id408","live":false},{"id":"id409","live":false},{"id":"id410","live":false},{"id":"id411","live":false},{"id":"id412","live":false},{"id":"id413","live":false},{"id":"id414","live":false},{"id":"id415","live":false},{"id":"id416","live":false},{"id":"id417","live":false},{"id":"id418","live":false},{"id":"id419","live":false},{"id":"id420","live":false},{"id":"id421","live":false},{"id":"id422","live":false},{"id":"id423","live":false},{"id":"id424","live":false},{"id":"id425","live":false},{"id":"id426","live":false},{"id":"id427","live":false},{"id":"id428","live":false},{"id":"id429","live":false},{"id":"id430","live":false},{"id":"id431","live":false},{"id":"id432","live":false},{"id":"id433","live":false},{"id":"id434","live":false},{"id":"id435","live":false},{"id":"id436","live":false},{"id":"id437","live":false},{"id":"id438","live":false},{"id":"id439","live":false},{"id":"id440","live":true},{"id":"id441","live":false},{"id":"id442","live":false},{"id":"id443","live":false},{"id":"id444","live":false},{"id":"id445","live":false},{"id":"id446","live":false},{"id":"id447","live":false},{"id":"id448","live":false},{"id":"id449","live":false},{"id":"id450","live":false},{"id":"id451","live":false},{"id":"id452","live":false},{"id":"id453","live":false},{"id":"id454","live":false},{"id":"id455","live":false},{"id":"id456","live":false},{"id":"id457","live":false},{"id":"id458","live":false},{"id":"id459","live":false},{"id":"id460","live":false},{"id":"id461","live":false},{"id":"id462","live":false},{"id":"id463","live":false},{"id":"id464","live":true},{"id":"id465","live":false},{"id":"id466","live":true},{"id":"id467","live":false},{"id":"id468","live":false},{"id":"id469","live":false},{"id":"id470","live":false},{"id":"id471","live":false},{"id":"id472","live":false},{"id":"id473","live":false},{"id":"id474","live":false},{"id":"id475","live":false},{"id":"id476","live":false},{"id":"id477","live":false},{"id":"id478","live":false},{"id":"id479","live":false},{"id":"id480","live":false},{"id":"id481","live":false},{"id":"id482","live":false},{"id":"id483","live":false},{"id":"id484","live":false},{"id":"id485","live":false},{"id":"id486","live":false},{"id":"id487","live":false},{"id":"id488","live":false},{"id":"id489","live":true},{"id":"id490","live":false},{"id":"id491","live":true},{"id":"id492","live":false},{"id":"id493","live":false},{"id":"id494","live":false},{"id":"id495","live":false},{"id":"id496","live":false},{"id":"id497","live":false},{"id":"id498","live":false},{"id":"id499","live":false},{"id":"id500","live":false},{"id":"id501","live":false},{"id":"id502","live":false},{"id":"id503","live":false},{"id":"id504","live":false},{"id":"id505","live":false},{"id":"id506","live":false},{"id":"id507","live":false},{"id":"id508","live":false},{"id":"id509","live":false},{"id":"id510","live":false},{"id":"id511","live":false},{"id":"id512","live":false},{"id":"id513","live":false},{"id":"id514","live":false},{"id":"id515","live":true},{"id":"id516","live":false},{"id":"id517","live":false},{"id":"id518","live":false},{"id":"id519","live":false},{"id":"id520","live":false},{"id":"id521","live":false},{"id":"id522","live":false},{"id":"id523","live":false},{"id":"id524","live":false},{"id":"id525","live":false},{"id":"id526","live":false},{"id":"id527","live":false},{"id":"id528","live":false},{"id":"id529","live":false},{"id":"id530","live":false},{"id":"id531","live":false},{"id":"id532","live":false},{"id":"id533","live":false},{"id":"id534","live":false},{"id":"id535","live":false},{"id":"id536","live":false},{"id":"id537","live":false},{"id":"id538","live":false},{"id":"id539","live":false},{"id":"id540","live":false},{"id":"id541","live":false},{"id":"id542","live":false},{"id":"id543","live":false},{"id":"id544","live":false},{"id":"id545","live":false},{"id":"id546","live":false},{"id":"id547","live":false},{"id":"id548","live":false},{"id":"id549","live":false},{"id":"id550","live":false},{"id":"id551","live":false},{"id":"id552","live":false},{"id":"id553","live":false},{"id":"id554","live":false},{"id":"id555","live":false},{"id":"id556","live":false},{"id":"id557","live":false},{"id":"id558","live":false},{"id":"id559","live":false},{"id":"id560","live":false},{"id":"id561","live":false},{"id":"id562","live":false},{"id":"id563","live":false},{"id":"id564","live":false},{"id":"id565","live":false},{"id":"id566","live":false},{"id":"id567","live":false},{"id":"id568","live":false},{"id":"id569","live":false},{"id":"id570","live":false},{"id":"id571","live":false},{"id":"id572","live":false},{"id":"id573","live":false},{"id":"id574","live":false},{"id":"id575","live":false},{"id":"id576","live":false},{"id":"id577","live":false},{"id":"id578","live":false},{"id":"id579","live":false},{"id":"id580","live":false},{"id":"id581","live":false},{"id":"id582","live":false},{"id":"id583","live":false},{"id":"id584","live":false},{"id":"id585","live":false},{"id":"id586","live":false},{"id":"id587","live":false},{"id":"id588","live":false},{"id":"id589","live":false},{"id":"id590","live":false},{"id":"id591","live":false},{"id":"id592","live":false},{"id":"id593","live":false},{"id":"id594","live":true},{"id":"id595","live":true},{"id":"id596","live":true},{"id":"id597","live":false},{"id":"id598","live":false},{"id":"id599","live":false},{"id":"id600","live":false},{"id":"id601","live":false},{"id":"id602","live":false},{"id":"id603","live":false},{"id":"id604","live":false},{"id":"id605","live":false},{"id":"id606","live":false},{"id":"id607","live":false},{"id":"id608","live":false},{"id":"id609","live":false},{"id":"id610","live":false},{"id":"id611","live":false},{"id":"id612","live":false},{"id":"id613","live":false},{"id":"id614","live":false},{"id":"id615","live":false},{"id":"id616","live":false},{"id":"id617","live":false},{"id":"id618","live":false},{"id":"id619","live":false},{"id":"id620","live":false},{"id":"id621","live":false},{"id":"id622","live":false},{"id":"id623","live":false},{"id":"id624","live":false}]}'


  const contentHash = sha256FromBuffer(Buffer.from(content))
  const metadataHash = sha256FromBuffer(Buffer.from(metadataJSON))

  const node = await IPFS.create();
  const tokenURI = await uploadIpfs(content, node);
  const metadataURI = await uploadIpfs(metadataJSON, node);

  console.log(metadataJSON);
  console.log(contentHash);
  console.log(metadataHash);

  const mediaData = constructMediaData(
    tokenURI,
    metadataURI,
    contentHash,
    metadataHash
  )

  console.log(mediaData);

  /**
   * Note: Before minting, verify that the content stored at the uris
   * can be hashed and matches the hashes in the `MediaData`.
   *
   * Soon, we will ship utility functions to handle this for you.
   */

  const bidShares = constructBidShares(
    10, // creator share
    90, // owner share
    0 // prevOwner share
  )
  const tx = await zora.mint(mediaData, bidShares)
  console.log(tx.hash);
  await tx.wait(8) // 8 confirmations to finalize

}

start()
  .then(() => process.exit(0))
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  });
