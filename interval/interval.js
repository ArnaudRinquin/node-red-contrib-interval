var moment = require('moment');

module.exports = function(RED) {

  function updateState(node, config) {

    if (!config.showstatus) {
      node.status({});
      return;
    }

    var last = moment().format(config.statusformat);
    var next = moment().add(node.interval, 'ms').format(config.statusformat);

    var textStatus = [
      'last:',
      last,
      ', next:',
      next
    ].join(' ');

    node.status({fill:"blue",shape:"dot",text:textStatus});

  }

  function interval(config) {

    var intervalHandle;

    RED.nodes.createNode(this, config);
    var node = this;
    this.interval = moment.duration(parseInt(config.interval), config.unit).asMilliseconds();

    this.trigger = function trigger() {
      this.send({
        payload: config.msg,
        last: this.last
      });
      updateState(this, config);
      this.last = Date.now();
    }.bind(this);


    if (config.onstart) {
      // hack so other nodes have the time to initialise
      setTimeout(this.trigger, 1000);
    }

    if(config.do_enable) {
        intervalHandle = setInterval(this.trigger, this.interval);
    }

    this.on("input", function (msg) {
        if(msg.payload === "enable" ||msg.payload === "enabled"){
          if (!config.do_enable){
            intervalHandle = setInterval(this.trigger, this.interval);
          }
          config.do_enable = true;
        }
        if(msg.payload === "disable" || msg.payload === "disabled"){
            config.do_enable = false;
            clearInterval(intervalHandle);
        }
    });

    this.on('close', function() {
        clearInterval(intervalHandle);
    });
  }
  RED.nodes.registerType("interval", interval);
};
