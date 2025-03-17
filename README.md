# mcswap-connector
Solana Wallet Connection Module 

![powered by solana](http://mcswap.xyz/gh/stacked-color.svg)

# Install
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