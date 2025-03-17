# mcswap-connector
Solana Wallet Connection Module 

This module currently supports Solana wallet connections for Phantom, Solflare, and Backpack wallets. More wallets and color styles coming soon.

![powered by solana](http://mcswap.xyz/gh/stacked-color.svg)


# install
```javascript
npm i mcswap-connector
```

## without emitter
```javascript
import mcswapConnector from "mcswap-connector";
new mcswapConnector(["phantom","solflare","backpack"]).init();
```

## with emitter
```javascript
import EventEmitter from 'events';
const emitter = new EventEmitter();
emitter.on('connected',async()=>{
  // do things after connection
});
emitter.on('disconnected',async()=>{
  // do things after disconnection
});
import mcswapConnector from "mcswap-connector";
new mcswapConnector(["phantom","solflare","backpack"],emitter).init();
```

## buttons
add mcswap classes to your buttons

disconnect buttons will be hidden by default
```html
<button class="mcswap_connect_button">Connect</button>
<button class="mcswap_disconnect_button">Disconnect</button>
```

## style
style the hilight color of your connector
```javascript
import "mcswap-connector/src/colors/green-connector.css";
```

![powered by solana](https://repository-images.githubusercontent.com/950157346/f62f9fc6-4e8e-49a4-8992-f454334de865)