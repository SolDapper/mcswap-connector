# mcswap-connector
Solana Wallet Connection Module 

This module currently supports Solana wallet connections for Phantom, Solflare, and Backpack wallets. More wallets soon.

![mcswap connector](https://repository-images.githubusercontent.com/950157346/52497295-4d7a-49bd-8d18-81dfdf0a9881)

![powered by solana](https://cd6na2lma222gpigviqcpr5n7uewgxd7uhockofelflsuaop7oiq.arweave.net/EPzQaWwGtaM9BqogJ8et_QljXH-h3CU4pFlXKgHP-5E)


# install
```javascript
npm i mcswap-connector
```

## without emitter
```javascript
import mcswapConnector from "mcswap-connector";
new mcswapConnector(["phantom","solflare","backpack"]).init();
```

## provider 
You can access the connected wallet provider object like so:
```javascript
const provider = window.mcswap;
```

## with emitter
Make sure you've installed the "events" npm module in your app.
```html
npm i events
```
```javascript
import EventEmitter from 'events';
const emitter = new EventEmitter();
emitter.on('mcswap_connected',async()=>{
  // do things after connection
});
emitter.on('mcswap_disconnected',async()=>{
  // do things after disconnection
});
import mcswapConnector from "mcswap-connector";
new mcswapConnector(["phantom","solflare","backpack"],emitter).init();
```

## buttons
Add mcswap classes to your buttons

Disconnect buttons will be hidden by default
```html
<button class="mcswap_connect_button">Connect</button>
<button class="mcswap_disconnect_button">Disconnect</button>
```

## style
Style the hilight color of your connector
```javascript
import "mcswap-connector/src/colors/blue-connector.css";
import "mcswap-connector/src/colors/green-connector.css";
import "mcswap-connector/src/colors/orange-connector.css";
import "mcswap-connector/src/colors/pink-connector.css";
import "mcswap-connector/src/colors/purple-connector.css";
import "mcswap-connector/src/colors/red-connector.css";
import "mcswap-connector/src/colors/yellow-connector.css";
```