import EscPosEncoder from "esc-pos-encoder";
import { PrinterSettings } from "../types/PrinterSettings.type";
import { EPSON_PRINTER_OPTIONS } from "./const";

export class PrinterDriver {
  private readonly encoder = new EscPosEncoder();

  private ws: WebSocket;
  private img: HTMLImageElement;

  constructor() {
    this.ws = new WebSocket('http://localhost:8080');
    this.img = new Image();
    this.img.src = "/logo.png";
    (globalThis as typeof globalThis & {printerDriver: any}).printerDriver = this;
  }

  public async print(url: string, label: string) {
    const bytes = this.encoder
      .initialize()
      .align('center')
      .image(this.img, 256, 256)
      .newline()
      .text('Printed with <3 by FoxTag')
      .newline()
      .qrcode(url, 2, undefined, 'h')
      .newline()
      .text(url)
      .newline()
      .text(label)
      .newline()
      .newline()
      .newline()
      .newline()
      .newline()
      .cut('partial')
      .encode();
    await this.printRaw(bytes);
  }

  public async printRaw(data: Uint8Array) {
    console.log(`Printing content: \n${data.toString()}`);
    this.ws.send(data);
  }
}