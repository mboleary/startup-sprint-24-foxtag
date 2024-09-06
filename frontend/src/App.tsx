import React, { useCallback, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { PrinterDriver } from './printer/PrinterDriver';

const driver = new PrinterDriver();

function App() {
  const [label, setLabel] = useState('Hello World');
  const [url, setUrl] = useState('https://deadcomputersociety.com');

  const printHandler = useCallback(async () => {
    try {
      await driver.print(url, label);
    } catch (e) {
      alert(e);
    }
  }, [url, label]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={'logo.png'} className="App-logo" alt="logo" />
        <h1>
          FoxTag
        </h1>
        <label>Label<br/>
          <input onChange={(e) => setLabel(e.target.value)} value={label} />
        </label>
        <label>URL<br/>
          <input onChange={(e) => setUrl(e.target.value)} value={url} />
        </label>
        <br/>
        <button onClick={printHandler}>Print</button>
      </header>
    </div>
  );
}

export default App;
