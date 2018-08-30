var moment = require('moment');

var allowedUnits = ["day", "days", "d",
"hour", "hours", "h",
"minute", "minutes", "m",
"second", "seconds", "s",
"millisecond", "milliseconds", "ms"];

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
      if(this.interval_reset === true){
          this.interval_reset = false;
          if(config.do_enable === true) {
              clearInterval(intervalHandle);
              intervalHandle = setInterval(this.trigger, this.interval);
          }
      }
    }.bind(this);


    if (config.onstart) {
      // hack so other nodes have the time to initialise
      setTimeout(this.trigger, 1000);
    }

    if(config.do_enable) {
        intervalHandle = setInterval(this.trigger, this.interval);
    }

    this.on("input", function (msg) {
        msg.payload = msg.payload.toLowerCase();
        if(msg.payload === "enable" ||msg.payload === "enabled"){
          if (!config.do_enable){
            intervalHandle = setInterval(this.trigger, this.interval);
          }
          config.do_enable = true;
        }
        else if(msg.payload === "disable" || msg.payload === "disabled"){
            config.do_enable = false;
            clearInterval(intervalHandle);
        }
        else if(msg.payload === "interval"){
          if (!isNaN(msg.interval_value)) {
              config.interval = Number(msg.interval_value);
          }else{
            node.error("Parameter interval_value is mandatory together with \"interval\" payload.");
            return;
          }
          if(msg.interval_unit && allowedUnits.includes(msg.interval_unit.toLowerCase())){
            config.unit = msg.interval_unit.toLowerCase();
          }
          this.interval = moment.duration(config.interval, config.unit).asMilliseconds();
          if(msg.interval_activeInstantly === true && config.do_enable === true){
              clearInterval(intervalHandle);
              intervalHandle = setInterval(this.trigger, this.interval);
          }
          else{
            node.interval_reset = true;
          }
          if(msg.interval_fireInstantly === true){
            this.trigger();
          }
        }
    });

    this.on('close', function() {
        clearInterval(intervalHandle);
    });
  }
  RED.nodes.registerType("interval", interval);
};
