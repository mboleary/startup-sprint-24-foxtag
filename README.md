# startup-sprint-24-foxtag
Startup Sprint 2024 project for printing qr code labels

This was a prototype of a portable label printer where a user fills out a basic web form and a label is printed from a thermal printer. In this case, the printer was an Epson TMT-20ii and the content is generated on the receipt printer through the use of ESC/POS, the control language used by the printer.

Originally, the printer was going to be controlled using WebSerial, but on linux, the device was mapped to the `/dev/usb/lpX` file and as such didn't appear to be accessable from the browser, so a NodeJS WebSocket server was hastily thrown together to write WebSocket messages to that file. After opening the file in append write mode, this worked perfectly.

The frontend was also hastily built using React so that it could be built quickly.
