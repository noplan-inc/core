import IPFS from 'ipfs';


async function start() {
  const node = await IPFS.create();
  const json = JSON.stringify({
    name: 'test',
    version: '0.1.0',
    now: new Date().toISOString()
  });
  console.log(json);
  const result = await node.add(json);

  console.log(result.cid);
  const stream = node.cat(result.cid)
  let data = ''

  for await (const chunk of stream) {
    // chunks of data are returned as a Buffer, convert it back to a string
    data += chunk.toString()
  }

  console.log(data)


}

start()
  .then(() => {
    process.exit(0);
  })
  .catch((e: Error) => {
    console.error(e);
    process.exit(1);
  });
