# WebAPI-Socket-Module

# Usage

```js
const Client = require('./WebAPIConnector.js');

Client.connect("localhost:3001");

Client.onCacheUpdate(data => {
    console.log(data);
})
