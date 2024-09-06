import { PrinterSettings } from "../types/PrinterSettings.type";

export const EPSON_PRINTER_OPTIONS: PrinterSettings = {
  name: 'epson tmt20ii',
  usbVendorId: 0x04B8,
  serialOptions: {
    baudRate: 38400
  }
}