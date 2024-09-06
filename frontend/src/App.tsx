import React, { useCallback, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { PrinterDriver } from './printer/PrinterDriver';

const driver = new PrinterDriver();

function App() {
  const [connected, setConnected] = useState(true);
  const connectHandler = useCallback(async () => {
    try {
      // await driver.requestPort();
      // setConnected(driver.printerIsConnected());
    } catch (e) {
      console.error(e);
    }
  }, []);

  const printHandler = useCallback(async () => {
    try {
      await driver.print('https://deadcomputersociety.com', 'Printed with <3 by FoxTag ');
    } catch (e) {
      alert(e);
    }
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {connected ? "Printer Connected" : "Printer Not Connected"}
        </p>
        <button onClick={connectHandler}>Connect</button>
        <button onClick={printHandler}>Print</button>
      </header>
    </div>
  );
}

export default App;
