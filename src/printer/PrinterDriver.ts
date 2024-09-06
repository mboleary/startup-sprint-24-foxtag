import EscPosEncoder from "esc-pos-encoder";
import { PrinterSettings } from "../types/PrinterSettings.type";
import { EPSON_PRINTER_OPTIONS } from "./const";

export class PrinterDriver {
  private readonly ports: SerialPort[] = [];
  private readonly encoder = new EscPosEncoder();
  private printerConnected = false;
  private portWriter: WritableStream<Uint8Array> | null = null;
  private portReader: ReadableStream<Uint8Array> | null = null;

  constructor(
    private readonly printerSettings: PrinterSettings = EPSON_PRINTER_OPTIONS
  ) {
    this.setupPorts();
  }

  private async setupPorts() {
    const ports = await navigator.serial.getPorts();
    this.ports.push(...ports);

    if (ports.length) {
      this.openPort(ports[0]);
    }

    navigator.serial.addEventListener('connect', this.handleConnect.bind(this));
    navigator.serial.addEventListener('disconnect', this.handleDisconnect.bind(this));
  }

  public async requestPort() {
    const port = await navigator.serial.requestPort({ filters: [{ usbVendorId: this.printerSettings.usbVendorId }]});
    // @TODO unsure if this is necessary
    const existingPortFromArr = this.ports.filter(p => p === port);
    if (!existingPortFromArr) {
      this.ports.push(port);
      await this.openPort(port);
      console.log('Port Connected Successfully!');
    } else {
      console.log('Port already cnnected');
    }
  }

  public printerIsConnected() {
    return this.printerConnected;
  }

  private async handleConnect(event: Event) {}

  private async handleDisconnect(event: Event) {}

  private async openPort(port: SerialPort) {
    await port.open(this.printerSettings.serialOptions);
    this.portReader = port.readable;
    this.portWriter = port.writable;
    this.printerConnected = true;
  }

  private async closePort(port: SerialPort) {
    await port.close();
    this.portReader = null;
    this.portWriter = null;
    this.printerConnected = false;
  }

  public async print(url: string, label: string) {
    const bytes = this.encoder
      .initialize()
      .align('center')
      .text('FoxTag')
      .newline()
      .qrcode(url, 2, undefined, 'h')
      .newline()
      .text(url)
      .newline()
      .text(label)
      .encode();
    await this.printRaw(bytes);
  }

  public async printRaw(data: Uint8Array) {
    console.log(`Printing content: \n${data.toString()}`);
    if (this.portWriter) {
      const writer = this.portWriter.getWriter();
      writer.write(data);
      writer.releaseLock();
    } else {
      throw new Error('Port not Writable! Did you connect to the port?');
    }
  }
}