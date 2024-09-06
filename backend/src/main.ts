import { WebSocketServer } from 'ws';
import fs, { FileHandle } from "node:fs/promises";

const wss = new WebSocketServer({ port: 8080 });

let handle: FileHandle | null = null;

wss.on('connection', async function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', async function message(data) {
    console.log('received: %s', data);
    if (handle) {
      await handle.write(data as Uint8Array);
    }
  });
});

async function main() {
  console.log("open lp");
  try {
    handle = await fs.open('/dev/usb/lp0', 'a+');
    const writeStream = await handle.createWriteStream();
    writeStream.write('this is a test');
  } catch (err) {
    console.error(err);
  }
}

main();
