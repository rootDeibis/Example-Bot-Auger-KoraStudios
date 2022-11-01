const WebSocket = require('ws');


const WebAPIUpaterSocketClient = {

  client: null,
  $onCacheUpdate: () => {},

  connect(host) {
    this.client = new WebSocket("ws:" + host);

    this.client.on('message', data => {
      const $data = JSON.parse(data);
        if ($data.event == 'cache-update') this.$onCacheUpdate($data.data);
    });
  },

  onCacheUpdate(fun) {
    this.$onCacheUpdate = fun;
  }
}


module.exports = WebAPIUpaterSocketClient;


